import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Track from "./pages/Track";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/track" element={<Track />} />
          <Route
            path="/services"
            element={
              <Placeholder
                title="Services"
                description="Explore our shipping services and pricing options"
              />
            }
          />
          <Route
            path="/help"
            element={
              <Placeholder
                title="Help Center"
                description="Find answers to frequently asked questions and get support"
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Placeholder
                title="Contact Us"
                description="Get in touch with our customer service team"
              />
            }
          />
          <Route
            path="/claims"
            element={
              <Placeholder
                title="File a Claim"
                description="Report damaged or lost packages and file insurance claims"
              />
            }
          />
          <Route
            path="/about"
            element={
              <Placeholder
                title="About Us"
                description="Learn more about our company and mission"
              />
            }
          />
          <Route
            path="/careers"
            element={
              <Placeholder
                title="Careers"
                description="Join our team and explore career opportunities"
              />
            }
          />
          <Route
            path="/privacy"
            element={
              <Placeholder
                title="Privacy Policy"
                description="Read our privacy policy and data protection practices"
              />
            }
          />
          <Route
            path="/terms"
            element={
              <Placeholder
                title="Terms of Service"
                description="Review our terms and conditions"
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
