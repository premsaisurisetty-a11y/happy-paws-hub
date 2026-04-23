import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="container relative pt-10 pb-12 md:pt-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
              <Sparkles className="h-3.5 w-3.5" /> Trusted by 12,000 pet parents
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05]">
              Care your <span className="text-primary">furry family</span> deserves.
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-md">
              Book grooming, vet visits, trainers, and cozy stays — all from one
              friendly place near you.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 rounded-full bg-card border border-border pl-5 pr-2 py-2 shadow-soft">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                  placeholder="Try 'grooming near me'"
                  aria-label="Search services"
                />
                <Button variant="hero" size="sm" className="rounded-full">Search</Button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm">
              <Stat value="800+" label="Verified pros" />
              <span className="h-8 w-px bg-border" />
              <Stat value="4.9★" label="Avg. rating" />
              <span className="h-8 w-px bg-border" />
              <Stat value="24/7" label="Support" />
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-card animate-float-soft">
              <img
                src={heroImage}
                alt="A happy golden retriever and tabby cat sitting together in a sunny park"
                width={1536}
                height={1024}
                className="w-full h-auto object-cover"
              />
            </div>
            <FloatingCard className="absolute -left-3 md:-left-6 bottom-6 md:bottom-10">
              <div className="text-2xl">🦴</div>
              <div>
                <p className="text-xs text-muted-foreground">Next visit</p>
                <p className="text-sm font-semibold">Bella · Grooming · Sat 10:00</p>
              </div>
            </FloatingCard>
            <FloatingCard className="absolute -right-2 top-6 md:top-10">
              <div className="text-2xl">💉</div>
              <div>
                <p className="text-xs text-muted-foreground">Vaccine reminder</p>
                <p className="text-sm font-semibold">Milo · in 12 days</p>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="font-display text-xl leading-none">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </div>
);

const FloatingCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center gap-3 rounded-2xl bg-card/95 backdrop-blur px-4 py-3 shadow-card border border-border/60 ${className}`}
  >
    {children}
  </div>
);

export default Hero;