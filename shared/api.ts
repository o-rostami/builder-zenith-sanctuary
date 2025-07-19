/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Shipment related types
 */

export type ShipmentStatus =
  | "draft"
  | "processing"
  | "shipped"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed"
  | "returned";

export type PackageType =
  | "envelope"
  | "small-box"
  | "medium-box"
  | "large-box"
  | "tube"
  | "custom";

export type ServiceType = "standard" | "express" | "overnight";

export interface Address {
  name: string;
  address: string;
  city: string;
  state?: string;
  zipCode: string;
  country?: string;
  phone?: string;
}

export interface PackageDetails {
  type: PackageType;
  weight: number; // in pounds
  dimensions: string; // "L x W x H"
  description: string;
  declaredValue: number; // in USD
}

export interface CreateShipmentRequest {
  sender: Address;
  recipient: Address;
  package: PackageDetails;
  serviceType: ServiceType;
  insurance?: boolean;
  signatureRequired?: boolean;
  specialInstructions?: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  sender: Address;
  recipient: Address;
  package: PackageDetails;
  serviceType: ServiceType;
  shippingCost: number;
  insuranceCost?: number;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  barcode?: string;
  specialInstructions?: string;
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: string;
  facilityName?: string;
  nextLocation?: string;
}

export interface CreateShipmentResponse {
  shipment: Shipment;
  trackingEvents: TrackingEvent[];
  paymentUrl?: string;
  barcode: string;
}

export interface TrackShipmentResponse {
  shipment: Shipment;
  trackingEvents: TrackingEvent[];
  estimatedDelivery?: string;
}

export interface ShippingRate {
  serviceType: ServiceType;
  cost: number;
  estimatedDays: number;
  description: string;
}

export interface GetRatesRequest {
  senderZip: string;
  recipientZip: string;
  packageType: PackageType;
  weight: number;
  dimensions: string;
  declaredValue: number;
}

export interface GetRatesResponse {
  rates: ShippingRate[];
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "succeeded"
    | "failed";
  clientSecret: string;
}

export interface ProcessPaymentRequest {
  shipmentId: string;
  paymentMethodId: string;
  amount: number;
}

export interface ProcessPaymentResponse {
  success: boolean;
  paymentIntent: PaymentIntent;
  shipment: Shipment;
}

/**
 * Database Schema Design (for reference)
 *
 * Table: shipments
 * - id (UUID, primary key)
 * - tracking_number (string, unique, indexed)
 * - status (enum: ShipmentStatus)
 * - sender_name (string)
 * - sender_address (string)
 * - sender_city (string)
 * - sender_state (string)
 * - sender_zip_code (string)
 * - sender_country (string, default: 'US')
 * - sender_phone (string, optional)
 * - recipient_name (string)
 * - recipient_address (string)
 * - recipient_city (string)
 * - recipient_state (string)
 * - recipient_zip_code (string)
 * - recipient_country (string, default: 'US')
 * - recipient_phone (string, optional)
 * - package_type (enum: PackageType)
 * - package_weight (decimal)
 * - package_dimensions (string)
 * - package_description (text)
 * - package_declared_value (decimal)
 * - service_type (enum: ServiceType)
 * - shipping_cost (decimal)
 * - insurance_cost (decimal, optional)
 * - total_cost (decimal)
 * - created_at (timestamp)
 * - updated_at (timestamp)
 * - estimated_delivery (timestamp, optional)
 * - actual_delivery (timestamp, optional)
 * - barcode (string, optional)
 * - special_instructions (text, optional)
 * - payment_status (enum: 'pending', 'paid', 'failed', 'refunded')
 * - payment_intent_id (string, optional)
 *
 * Table: tracking_events
 * - id (UUID, primary key)
 * - shipment_id (UUID, foreign key references shipments.id)
 * - status (enum: ShipmentStatus)
 * - location (string)
 * - description (text)
 * - timestamp (timestamp)
 * - facility_name (string, optional)
 * - next_location (string, optional)
 * - created_at (timestamp)
 *
 * Table: shipping_rates
 * - id (UUID, primary key)
 * - service_type (enum: ServiceType)
 * - from_zip_prefix (string, indexed) -- first 3 digits of ZIP
 * - to_zip_prefix (string, indexed)   -- first 3 digits of ZIP
 * - base_cost (decimal)
 * - cost_per_pound (decimal)
 * - estimated_days (integer)
 * - active (boolean, default: true)
 * - created_at (timestamp)
 * - updated_at (timestamp)
 *
 * Table: payment_intents
 * - id (string, primary key) -- Stripe payment intent ID
 * - shipment_id (UUID, foreign key references shipments.id)
 * - amount (integer) -- amount in cents
 * - currency (string, default: 'usd')
 * - status (enum: 'requires_payment_method', 'requires_confirmation', 'succeeded', 'failed')
 * - client_secret (string)
 * - created_at (timestamp)
 * - updated_at (timestamp)
 *
 * Indexes:
 * - shipments.tracking_number (unique)
 * - shipments.status
 * - shipments.created_at
 * - tracking_events.shipment_id
 * - tracking_events.timestamp
 * - shipping_rates.from_zip_prefix, to_zip_prefix
 */
