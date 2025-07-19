import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  createShipment,
  trackShipment,
  getRates,
  getAllShipments,
} from "./routes/shipments";
import {
  createPaymentIntent,
  processPayment,
  getPaymentStatus,
} from "./routes/payment";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "PostShip API is running!" });
  });

  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // Shipment routes
  app.post("/api/shipments", createShipment);
  app.get("/api/shipments", getAllShipments);
  app.get("/api/shipments/track/:trackingNumber", trackShipment);
  app.get("/api/shipments/rates", getRates);

  // Payment routes
  app.get("/api/payment/create", createPaymentIntent);
  app.post("/api/payment/process", processPayment);
  app.get("/api/payment/:paymentIntentId", getPaymentStatus);

  return app;
}
