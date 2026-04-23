import { Home, CalendarDays, PawPrint, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "pets", label: "Pets", icon: PawPrint },
  { id: "profile", label: "Profile", icon: User },
];

export const BottomNav = () => {
  const [active, setActive] = useState("home");
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,420px)] rounded-full bg-card/95 backdrop-blur border border-border/60 shadow-card px-2 py-2 flex items-center justify-between"
    >
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-full transition-all",
              isActive
                ? "bg-primary-soft text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[11px] font-semibold">{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;