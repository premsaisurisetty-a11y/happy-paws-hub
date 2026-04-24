import { Star, MapPin } from "lucide-react";
import { chillSpots } from "@/data/mock";
import { Link } from "react-router-dom";

export const ChillWithPaws = () => {
  return (
    <section className="container py-8 md:py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl">Chill with paws 🐾</h2>
          <p className="text-sm text-muted-foreground mt-1">Pet-friendly cafes & parks loved by locals.</p>
        </div>
        <Link to="/services/cafes" className="text-sm font-semibold text-primary hover:underline">
          See all
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scroll-smooth">
        {chillSpots.map((s) => (
          <Link
            key={s.id}
            to="/services/cafes"
            className="snap-start shrink-0 w-72 md:w-80 rounded-3xl overflow-hidden bg-card border border-border/60 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={768}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">{s.name}</h3>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {s.rating}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{s.type}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {s.distanceKm} km away
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ChillWithPaws;