import { Calendar, Syringe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pets } from "@/data/mock";

export const PetHealth = () => {
  return (
    <section className="container py-8 md:py-12">
      <div className="rounded-[2.5rem] bg-gradient-warm p-6 md:p-10 border border-border/60">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-semibold border border-border/60">
              <Syringe className="h-3.5 w-3.5 text-primary" /> Pet health
            </span>
            <h2 className="text-2xl md:text-3xl mt-3">Never miss a vaccine again.</h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-md">
              We track every shot and remind you by push, SMS, and a friendly call —
              so your pet stays protected and you stay calm.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="hero" size="lg">Add a pet</Button>
              <Button variant="outline" size="lg">View vaccine log</Button>
            </div>
          </div>

          <div className="space-y-3">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="flex items-center gap-4 rounded-2xl bg-card border border-border/60 p-4 shadow-soft"
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  loading="lazy"
                  width={80}
                  height={80}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate">{pet.name}</p>
                    <span className="text-xs text-muted-foreground">{pet.age}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{pet.breed}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-secondary-foreground bg-secondary rounded-full px-2 py-0.5">
                      <Calendar className="h-3 w-3" /> {pet.nextVaccine}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      <Bell className="h-3 w-3" /> in {pet.daysUntil} days
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetHealth;