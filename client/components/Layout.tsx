import { Link, useLocation } from "react-router-dom";
import { Package, Truck, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isActive("/")
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        <Package className="h-5 w-5" />
        <span className="font-medium">Ship Package</span>
      </Link>
      <Link
        to="/track"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isActive("/track")
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        <Search className="h-5 w-5" />
        <span className="font-medium">Track Package</span>
      </Link>
      <Link
        to="/services"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isActive("/services")
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        <Truck className="h-5 w-5" />
        <span className="font-medium">Services</span>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PostShip</h1>
              <p className="text-xs text-muted-foreground">Express Delivery</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLinks />
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm">Get Quote</Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button size="sm">Get Quote</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">PostShip</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Fast, reliable, and secure postal shipment services for all your
                delivery needs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/services" className="hover:text-foreground">
                    Express Delivery
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-foreground">
                    Standard Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-foreground">
                    International
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-foreground">
                    Business Solutions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/track" className="hover:text-foreground">
                    Track Package
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/claims" className="hover:text-foreground">
                    File a Claim
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} PostShip Express Delivery. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
