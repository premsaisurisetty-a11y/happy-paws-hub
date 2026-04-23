import { useState } from "react";
import { Star, MapPin } from "lucide-react";
import { nearbyProviders, type Provider } from "@/data/mock";
import { Button } from "@/components/ui/button";
import BookingDialog from "./BookingDialog";

export const NearbyProviders = () => {
  const [selected, setSelected] = useState<Provider | null>(null);
  const [open, setOpen] = useState(false);

  const book = (p: Provider) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <section className="container py-8 md:py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl">Nearby favorites</h2>
          <p className="text-sm text-muted-foreground mt-1">Top-rated within 5 km of you.</p>
        </div>
        <Button variant="ghost" size="sm" className="rounded-full">See all</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nearbyProviders.map((p) => (
          <article
            key={p.id}
            className="rounded-3xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={768}
                height={768}
                className="h-full w-full object-cover"
              />
              {p.badge && (
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wide font-bold bg-accent text-accent-foreground rounded-full px-2.5 py-1">
                  {p.badge}
                </span>
              )}
              <span className="absolute top-3 right-3 flex items-center gap-1 bg-card/95 backdrop-blur rounded-full px-2 py-1 text-xs font-semibold shadow-soft">
                <Star className="h-3 w-3 fill-accent text-accent" /> {p.rating}
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground">{p.category}</p>
              <h3 className="font-display text-lg mt-0.5">{p.name}</h3>
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.distanceKm} km
                </span>
                <span className="font-semibold">
                  from <span className="text-primary">${p.priceFrom}</span>
                </span>
              </div>
              <Button variant="soft" size="sm" className="w-full mt-3" onClick={() => book(p)}>Book now</Button>
            </div>
          </article>
        ))}
      </div>
      <BookingDialog provider={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default NearbyProviders;