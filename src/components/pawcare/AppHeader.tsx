import { MapPin, Bell, Search, LogIn, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export const AppHeader = () => {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-2xl bg-gradient-cta grid place-items-center shadow-soft overflow-hidden">
            <PawPrint className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent border-2 border-card" />
          </div>
          <div>
            <p className="font-display text-lg leading-none">
              Paw<span className="text-accent">Care</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" /> Brooklyn, NY
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
          {user ? (
            <Button variant="soft" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
          ) : (
            <Button asChild variant="hero" size="sm">
              <Link to="/auth"><LogIn className="h-4 w-4" /> Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;