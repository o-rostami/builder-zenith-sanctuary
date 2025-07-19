import { RequestHandler } from "express";
import {
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  PaymentIntent,
} from "@shared/api";
import { z } from "zod";

// Mock payment processing (in production, this would integrate with Stripe, PayPal, etc.)
const paymentIntents = new Map<string, PaymentIntent>();

function generatePaymentIntentId(): string {
  return `pi_${Math.random().toString(36).substr(2, 16)}`;
}

function generateClientSecret(paymentIntentId: string): string {
  return `${paymentIntentId}_secret_${Math.random().toString(36).substr(2, 8)}`;
}

export const createPaymentIntent: RequestHandler = async (req, res) => {
  try {
    const { shipmentId } = req.query;

    if (!shipmentId || typeof shipmentId !== "string") {
      res.status(400).json({ error: "Shipment ID is required" });
      return;
    }

    // In a real implementation, you would:
    // 1. Fetch the shipment from database
    // 2. Calculate the total amount
    // 3. Create a Stripe PaymentIntent

    const mockAmount = 1149; // $11.49 in cents
    const paymentIntentId = generatePaymentIntentId();
    const clientSecret = generateClientSecret(paymentIntentId);

    const paymentIntent: PaymentIntent = {
      id: paymentIntentId,
      amount: mockAmount,
      currency: "usd",
      status: "requires_payment_method",
      clientSecret,
    };

    paymentIntents.set(paymentIntentId, paymentIntent);

    res.json({
      paymentIntent,
      publishableKey: "pk_test_mock_key", // In production, use real Stripe publishable key
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const processPayment: RequestHandler = async (req, res) => {
  try {
    const schema = z.object({
      shipmentId: z.string(),
      paymentMethodId: z.string(),
      amount: z.number(),
    });

    const validatedData = schema.parse(req.body) as ProcessPaymentRequest;

    // Mock payment processing
    const paymentIntentId = generatePaymentIntentId();
    const paymentIntent: PaymentIntent = {
      id: paymentIntentId,
      amount: validatedData.amount,
      currency: "usd",
      status: "succeeded", // In real implementation, this would be determined by payment processor
      clientSecret: generateClientSecret(paymentIntentId),
    };

    paymentIntents.set(paymentIntentId, paymentIntent);

    // In a real implementation, you would:
    // 1. Process payment with Stripe/PayPal
    // 2. Update shipment status in database
    // 3. Send confirmation email
    // 4. Generate shipping label

    const response: ProcessPaymentResponse = {
      success: true,
      paymentIntent,
      shipment: {
        id: validatedData.shipmentId,
        trackingNumber: "PS123456789",
        status: "processing",
        sender: {
          name: "Mock Sender",
          address: "123 Main St",
          city: "Boston",
          zipCode: "02101",
        },
        recipient: {
          name: "Mock Recipient",
          address: "456 Oak Ave",
          city: "New York",
          zipCode: "10001",
        },
        package: {
          type: "small-box",
          weight: 2.5,
          dimensions: "8x6x4",
          description: "Books",
          declaredValue: 50,
        },
        serviceType: "express",
        shippingCost: 15.99,
        totalCost: 18.49,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    } else {
      console.error("Error processing payment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getPaymentStatus: RequestHandler = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    if (!paymentIntentId) {
      res.status(400).json({ error: "Payment intent ID is required" });
      return;
    }

    const paymentIntent = paymentIntents.get(paymentIntentId);

    if (!paymentIntent) {
      res.status(404).json({ error: "Payment intent not found" });
      return;
    }

    res.json({ paymentIntent });
  } catch (error) {
    console.error("Error getting payment status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
