import { useState } from "react";
import { Search, Package, MapPin, Truck, CheckCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

interface TrackingEvent {
  status: string;
  location: string;
  date: string;
  time: string;
  description: string;
}

const mockTrackingData: TrackingEvent[] = [
  {
    status: "Delivered",
    location: "New York, NY 10001",
    date: "March 15, 2024",
    time: "2:30 PM",
    description: "Package delivered to recipient",
  },
  {
    status: "Out for Delivery",
    location: "New York, NY 10001",
    date: "March 15, 2024",
    time: "8:45 AM",
    description: "Package out for delivery",
  },
  {
    status: "Arrived at Facility",
    location: "New York Distribution Center",
    date: "March 14, 2024",
    time: "11:20 PM",
    description: "Package arrived at destination facility",
  },
  {
    status: "In Transit",
    location: "Philadelphia, PA",
    date: "March 14, 2024",
    time: "6:15 AM",
    description: "Package in transit to destination",
  },
  {
    status: "Departed Facility",
    location: "Boston Distribution Center",
    date: "March 13, 2024",
    time: "9:30 PM",
    description: "Package departed from origin facility",
  },
  {
    status: "Processing",
    location: "Boston, MA 02101",
    date: "March 13, 2024",
    time: "4:15 PM",
    description: "Package received and processing",
  },
];

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingEvent[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "out for delivery":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "in transit":
        return <Package className="h-5 w-5 text-orange-500" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "out for delivery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "in transit":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Track Your <span className="text-primary">Package</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your tracking number to get real-time updates on your
              shipment status and location.
            </p>
          </div>

          {/* Tracking Form */}
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Enter Tracking Number
              </CardTitle>
              <CardDescription className="text-center">
                You can find your tracking number in your confirmation email or
                receipt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="trackingNumber"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number (e.g., PS123456789)"
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                    />
                    <Button
                      onClick={handleTrack}
                      disabled={isLoading || !trackingNumber.trim()}
                      className="px-6"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Track
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Sample tracking numbers to try:</p>
                  <div className="flex flex-wrap gap-2">
                    {["PS123456789", "PS987654321", "PS555123456"].map(
                      (sample) => (
                        <Badge
                          key={sample}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => setTrackingNumber(sample)}
                        >
                          {sample}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      Tracking: {trackingNumber}
                    </CardTitle>
                    <CardDescription>
                      Last updated: March 15, 2024 at 2:30 PM
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(trackingData[0].status)}>
                    {trackingData[0].status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Status */}
                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(trackingData[0].status)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {trackingData[0].status}
                      </h3>
                      <p className="text-muted-foreground">
                        {trackingData[0].description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {trackingData[0].location}
                        </span>
                        <span>
                          {trackingData[0].date} at {trackingData[0].time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">
                    Tracking History
                  </h3>
                  <div className="relative">
                    {trackingData.map((event, index) => (
                      <div key={index} className="flex items-start gap-4 pb-6">
                        {/* Timeline line */}
                        {index < trackingData.length - 1 && (
                          <div className="absolute left-2.5 top-8 w-0.5 h-16 bg-border"></div>
                        )}

                        {/* Status icon */}
                        <div className="flex-shrink-0 bg-background border-2 rounded-full p-1">
                          {getStatusIcon(event.status)}
                        </div>

                        {/* Event details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{event.status}</h4>
                            <Badge
                              variant="outline"
                              className={getStatusColor(event.status)}
                            >
                              {event.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                            <span>
                              {event.date} at {event.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="border-t pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Delivery Details</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Service: Express Delivery</p>
                        <p>Weight: 2.5 lbs</p>
                        <p>Expected Delivery: March 15, 2024</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recipient</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>John Smith</p>
                        <p>123 Main St, Apt 4B</p>
                        <p>New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need help with your shipment?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">Contact Support</Button>
              <Button variant="outline">File a Claim</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
