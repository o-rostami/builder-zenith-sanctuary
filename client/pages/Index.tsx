import { useState } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  Clock,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

export default function Index() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderCity: "",
    senderZip: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientCity: "",
    recipientZip: "",
    recipientPhone: "",
    packageType: "",
    weight: "",
    dimensions: "",
    description: "",
    value: "",
    serviceType: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ship Packages <span className="text-primary">Anywhere,</span>{" "}
              <span className="text-primary">Anytime</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Fast, reliable, and secure postal shipment registration. Get your
              tracking barcode instantly and pay online.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 p-4 bg-background/60 rounded-lg backdrop-blur-sm">
                <Clock className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">24/7 Service</p>
                  <p className="text-sm text-muted-foreground">Ship anytime</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-background/60 rounded-lg backdrop-blur-sm">
                <Shield className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    Secure Payment
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Protected transactions
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-background/60 rounded-lg backdrop-blur-sm">
                <Truck className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Fast Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Express options
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shipment Registration Form */}
        <section className="container mx-auto px-4 pb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Register Your Shipment</CardTitle>
              <CardDescription>
                Complete the form below to register your package and receive a
                tracking barcode
              </CardDescription>

              {/* Progress Steps */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((stepNum) => (
                    <div key={stepNum} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          step >= stepNum
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {stepNum}
                      </div>
                      {stepNum < 3 && (
                        <div
                          className={`w-16 h-1 mx-2 rounded ${
                            step > stepNum ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-2">
                <Badge variant="secondary">
                  {step === 1 && "Address Information"}
                  {step === 2 && "Package Details"}
                  {step === 3 && "Service & Payment"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Address Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sender Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">
                          Sender Information
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="senderName">Full Name</Label>
                        <Input
                          id="senderName"
                          value={formData.senderName}
                          onChange={(e) =>
                            handleInputChange("senderName", e.target.value)
                          }
                          placeholder="Enter sender's full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="senderAddress">Address</Label>
                        <Input
                          id="senderAddress"
                          value={formData.senderAddress}
                          onChange={(e) =>
                            handleInputChange("senderAddress", e.target.value)
                          }
                          placeholder="Street address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="senderCity">City</Label>
                          <Input
                            id="senderCity"
                            value={formData.senderCity}
                            onChange={(e) =>
                              handleInputChange("senderCity", e.target.value)
                            }
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="senderZip">ZIP Code</Label>
                          <Input
                            id="senderZip"
                            value={formData.senderZip}
                            onChange={(e) =>
                              handleInputChange("senderZip", e.target.value)
                            }
                            placeholder="ZIP"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="senderPhone">Phone Number</Label>
                        <Input
                          id="senderPhone"
                          value={formData.senderPhone}
                          onChange={(e) =>
                            handleInputChange("senderPhone", e.target.value)
                          }
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Recipient Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Package className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">
                          Recipient Information
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientName">Full Name</Label>
                        <Input
                          id="recipientName"
                          value={formData.recipientName}
                          onChange={(e) =>
                            handleInputChange("recipientName", e.target.value)
                          }
                          placeholder="Enter recipient's full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientAddress">Address</Label>
                        <Input
                          id="recipientAddress"
                          value={formData.recipientAddress}
                          onChange={(e) =>
                            handleInputChange(
                              "recipientAddress",
                              e.target.value,
                            )
                          }
                          placeholder="Street address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="recipientCity">City</Label>
                          <Input
                            id="recipientCity"
                            value={formData.recipientCity}
                            onChange={(e) =>
                              handleInputChange("recipientCity", e.target.value)
                            }
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipientZip">ZIP Code</Label>
                          <Input
                            id="recipientZip"
                            value={formData.recipientZip}
                            onChange={(e) =>
                              handleInputChange("recipientZip", e.target.value)
                            }
                            placeholder="ZIP"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="recipientPhone">Phone Number</Label>
                        <Input
                          id="recipientPhone"
                          value={formData.recipientPhone}
                          onChange={(e) =>
                            handleInputChange("recipientPhone", e.target.value)
                          }
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Package Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Package Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="packageType">Package Type</Label>
                      <Select
                        value={formData.packageType}
                        onValueChange={(value) =>
                          handleInputChange("packageType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select package type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="envelope">Envelope</SelectItem>
                          <SelectItem value="small-box">Small Box</SelectItem>
                          <SelectItem value="medium-box">Medium Box</SelectItem>
                          <SelectItem value="large-box">Large Box</SelectItem>
                          <SelectItem value="tube">Tube</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (lbs)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={formData.weight}
                        onChange={(e) =>
                          handleInputChange("weight", e.target.value)
                        }
                        placeholder="0.0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) =>
                          handleInputChange("dimensions", e.target.value)
                        }
                        placeholder="12 x 8 x 4 inches"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="value">Declared Value ($)</Label>
                      <Input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) =>
                          handleInputChange("value", e.target.value)
                        }
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Package Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Brief description of package contents"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Service & Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Service & Payment</h3>
                  </div>

                  <div className="space-y-4">
                    <Label>Select Shipping Service</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          id: "standard",
                          name: "Standard",
                          price: "$8.50",
                          time: "3-5 business days",
                        },
                        {
                          id: "express",
                          name: "Express",
                          price: "$15.99",
                          time: "1-2 business days",
                        },
                        {
                          id: "overnight",
                          name: "Overnight",
                          price: "$24.99",
                          time: "Next business day",
                        },
                      ].map((service) => (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all ${
                            formData.serviceType === service.id
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                          onClick={() =>
                            handleInputChange("serviceType", service.id)
                          }
                        >
                          <CardContent className="p-4 text-center">
                            <h4 className="font-semibold text-lg">
                              {service.name}
                            </h4>
                            <p className="text-2xl font-bold text-primary">
                              {service.price}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {service.time}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Service Fee:</span>
                        <span>
                          {formData.serviceType === "standard" && "$8.50"}
                          {formData.serviceType === "express" && "$15.99"}
                          {formData.serviceType === "overnight" && "$24.99"}
                          {!formData.serviceType && "$0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance (Optional):</span>
                        <span>$2.50</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>
                          {formData.serviceType === "standard" && "$11.00"}
                          {formData.serviceType === "express" && "$18.49"}
                          {formData.serviceType === "overnight" && "$27.49"}
                          {!formData.serviceType && "$2.50"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                >
                  Previous
                </Button>

                {step < 3 ? (
                  <Button onClick={nextStep}>Next</Button>
                ) : (
                  <Button className="bg-primary hover:bg-primary/90">
                    Complete Registration & Pay
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
