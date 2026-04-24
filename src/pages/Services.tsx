import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { categories, providersByCategory, type Provider } from "@/data/mock";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/pawcare/AppHeader";
import BottomNav from "@/components/pawcare/BottomNav";
import BookingDialog from "@/components/pawcare/BookingDialog";

const Services = () => {
  const { category = "" } = useParams();
  const navigate = useNavigate();
  const cat = categories.find((c) => c.id === category);
  const list = providersByCategory[category] ?? [];
  const [selected, setSelected] = useState<Provider | null>(null);
  const [open, setOpen] = useState(false);

  const isCafes = category === "cafes";

  const book = (p: Provider) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-warm pb-24">
      <AppHeader />
      <main className="container py-6 md:py-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl">{cat?.title ?? "Services"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {cat?.tagline ?? "Browse nearby options"} · {list.length} near you
          </p>
        </div>

        {list.length === 0 ? (
          <div className="rounded-3xl bg-card border border-border/60 p-8 text-center">
            <p className="text-muted-foreground">No examples for this category yet.</p>
            <Button asChild variant="soft" className="mt-4">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((p) => (
              <article
                key={p.id}
                className="rounded-3xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
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
                  <p className="text-xs text-muted-foreground">{p.category} · {p.reviews} reviews</p>
                  <h3 className="font-display text-lg mt-0.5">{p.name}</h3>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {p.distanceKm} km
                    </span>
                    {!isCafes && (
                      <span className="font-semibold">
                        from <span className="text-primary">${p.priceFrom}</span>
                      </span>
                    )}
                  </div>
                  {!isCafes && (
                    <Button variant="soft" size="sm" className="w-full mt-3" onClick={() => book(p)}>
                      Book now
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <BookingDialog provider={selected} open={open} onOpenChange={setOpen} />
      <BottomNav />
    </div>
  );
};

export default Services;
