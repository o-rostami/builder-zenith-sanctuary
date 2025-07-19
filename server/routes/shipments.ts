import { RequestHandler } from "express";
import {
  CreateShipmentRequest,
  CreateShipmentResponse,
  TrackShipmentResponse,
  GetRatesRequest,
  GetRatesResponse,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  Shipment,
  TrackingEvent,
  ShippingRate,
} from "@shared/api";
import { z } from "zod";

// Mock data storage (in production, this would be a database)
const shipments = new Map<string, Shipment>();
const trackingEvents = new Map<string, TrackingEvent[]>();

// Validation schemas
const addressSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().optional(),
  zipCode: z.string().min(5),
  country: z.string().optional(),
  phone: z.string().optional(),
});

const packageSchema = z.object({
  type: z.enum([
    "envelope",
    "small-box",
    "medium-box",
    "large-box",
    "tube",
    "custom",
  ]),
  weight: z.number().positive(),
  dimensions: z.string().min(1),
  description: z.string().min(1),
  declaredValue: z.number().min(0),
});

const createShipmentSchema = z.object({
  sender: addressSchema,
  recipient: addressSchema,
  package: packageSchema,
  serviceType: z.enum(["standard", "express", "overnight"]),
  insurance: z.boolean().optional(),
  signatureRequired: z.boolean().optional(),
  specialInstructions: z.string().optional(),
});

// Helper functions
function generateTrackingNumber(): string {
  return `PS${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function calculateShippingCost(serviceType: string, weight: number): number {
  const baseCosts = {
    standard: 8.5,
    express: 15.99,
    overnight: 24.99,
  };

  const baseRate = baseCosts[serviceType as keyof typeof baseCosts] || 8.5;
  const weightSurcharge = Math.max(0, weight - 1) * 2.0; // $2 per pound over 1 lb

  return baseRate + weightSurcharge;
}

function createMockTrackingEvents(
  shipmentId: string,
  status: string,
): TrackingEvent[] {
  const now = new Date();
  const events: TrackingEvent[] = [];

  // Create mock tracking history based on status
  const baseEvents = [
    {
      status: "processing" as const,
      location: "Origin Facility",
      description: "Package received and processing",
      hoursAgo: 24,
    },
    {
      status: "shipped" as const,
      location: "Origin Distribution Center",
      description: "Package departed from origin facility",
      hoursAgo: 18,
    },
    {
      status: "in_transit" as const,
      location: "Transit Hub",
      description: "Package in transit to destination",
      hoursAgo: 12,
    },
  ];

  baseEvents.forEach((event, index) => {
    const timestamp = new Date(now.getTime() - event.hoursAgo * 60 * 60 * 1000);
    events.push({
      id: generateId(),
      shipmentId,
      status: event.status,
      location: event.location,
      description: event.description,
      timestamp: timestamp.toISOString(),
    });
  });

  return events.reverse(); // Most recent first
}

// API Handlers
export const createShipment: RequestHandler = async (req, res) => {
  try {
    const validatedData = createShipmentSchema.parse(
      req.body,
    ) as CreateShipmentRequest;

    const id = generateId();
    const trackingNumber = generateTrackingNumber();
    const now = new Date().toISOString();

    const shippingCost = calculateShippingCost(
      validatedData.serviceType,
      validatedData.package.weight,
    );
    const insuranceCost = validatedData.insurance ? 2.5 : 0;
    const totalCost = shippingCost + insuranceCost;

    // Calculate estimated delivery
    const deliveryDays = {
      standard: 5,
      express: 2,
      overnight: 1,
    };

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(
      estimatedDelivery.getDate() + deliveryDays[validatedData.serviceType],
    );

    const shipment: Shipment = {
      id,
      trackingNumber,
      status: "processing",
      sender: validatedData.sender,
      recipient: validatedData.recipient,
      package: validatedData.package,
      serviceType: validatedData.serviceType,
      shippingCost,
      insuranceCost: validatedData.insurance ? insuranceCost : undefined,
      totalCost,
      createdAt: now,
      updatedAt: now,
      estimatedDelivery: estimatedDelivery.toISOString(),
      barcode: `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50"><rect width="200" height="50" fill="white"/><text x="100" y="30" text-anchor="middle" font-family="monospace" font-size="14">${trackingNumber}</text></svg>`).toString("base64")}`,
      specialInstructions: validatedData.specialInstructions,
    };

    const events = createMockTrackingEvents(id, "processing");

    // Store in mock database
    shipments.set(id, shipment);
    trackingEvents.set(id, events);

    const response: CreateShipmentResponse = {
      shipment,
      trackingEvents: events,
      barcode: shipment.barcode!,
      paymentUrl: `/api/payment/create?shipmentId=${id}`,
    };

    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    } else {
      console.error("Error creating shipment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const trackShipment: RequestHandler = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    if (!trackingNumber) {
      res.status(400).json({ error: "Tracking number is required" });
      return;
    }

    // Find shipment by tracking number
    let foundShipment: Shipment | undefined;
    let foundEvents: TrackingEvent[] = [];

    for (const [id, shipment] of shipments.entries()) {
      if (shipment.trackingNumber === trackingNumber) {
        foundShipment = shipment;
        foundEvents = trackingEvents.get(id) || [];
        break;
      }
    }

    if (!foundShipment) {
      res.status(404).json({ error: "Shipment not found" });
      return;
    }

    const response: TrackShipmentResponse = {
      shipment: foundShipment,
      trackingEvents: foundEvents,
      estimatedDelivery: foundShipment.estimatedDelivery,
    };

    res.json(response);
  } catch (error) {
    console.error("Error tracking shipment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRates: RequestHandler = async (req, res) => {
  try {
    const schema = z.object({
      senderZip: z.string().min(5),
      recipientZip: z.string().min(5),
      packageType: z.enum([
        "envelope",
        "small-box",
        "medium-box",
        "large-box",
        "tube",
        "custom",
      ]),
      weight: z.string().transform(Number),
      dimensions: z.string(),
      declaredValue: z.string().transform(Number),
    });

    const validatedData = schema.parse(req.query);

    const rates: ShippingRate[] = [
      {
        serviceType: "standard",
        cost: calculateShippingCost("standard", validatedData.weight),
        estimatedDays: 5,
        description: "Standard delivery in 3-5 business days",
      },
      {
        serviceType: "express",
        cost: calculateShippingCost("express", validatedData.weight),
        estimatedDays: 2,
        description: "Express delivery in 1-2 business days",
      },
      {
        serviceType: "overnight",
        cost: calculateShippingCost("overnight", validatedData.weight),
        estimatedDays: 1,
        description: "Overnight delivery by next business day",
      },
    ];

    const response: GetRatesResponse = { rates };
    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Validation error", details: error.errors });
    } else {
      console.error("Error getting rates:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAllShipments: RequestHandler = async (req, res) => {
  try {
    const allShipments = Array.from(shipments.values());
    res.json({ shipments: allShipments });
  } catch (error) {
    console.error("Error getting shipments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
