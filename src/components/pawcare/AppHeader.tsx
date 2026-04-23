import { MapPin, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-cta grid place-items-center text-primary-foreground shadow-soft">
            <span className="font-display text-lg leading-none">🐾</span>
          </div>
          <div>
            <p className="font-display text-lg leading-none">PawCare</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" /> Brooklyn, NY
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
          <Button variant="soft" size="icon" aria-label="Notifications">
            <Bell />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;