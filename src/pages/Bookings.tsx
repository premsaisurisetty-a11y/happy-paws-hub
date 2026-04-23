import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AppHeader from "@/components/pawcare/AppHeader";
import BottomNav from "@/components/pawcare/BottomNav";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Booking = {
  id: string;
  provider_name: string;
  category: string;
  booking_date: string;
  booking_time: string | null;
  end_date: string | null;
  status: string;
  price_estimate: number | null;
  pet_id: string | null;
};

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const load = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true });
    if (error) {
      toast({ title: "Couldn't load bookings", description: error.message, variant: "destructive" });
      return;
    }
    setBookings(data ?? []);
  };

  useEffect(() => {
    load();
  }, [user]);

  const cancel = async (id: string) => {
    const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id);
    if (error) {
      toast({ title: "Couldn't cancel", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Booking cancelled" });
    load();
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />
      <main className="container py-6">
        <h1 className="text-2xl md:text-3xl font-display mb-1">Your bookings</h1>
        <p className="text-sm text-muted-foreground mb-6">Upcoming visits and past appointments.</p>

        {bookings.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-border/60 p-12 text-center">
            <CalendarDays className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No bookings yet</p>
            <p className="text-sm text-muted-foreground mt-1">Browse providers on the home page to book a visit.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <article
                key={b.id}
                className="rounded-3xl bg-card border border-border/60 p-5 shadow-soft flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs uppercase tracking-wide font-bold bg-primary-soft text-primary rounded-full px-2.5 py-0.5">
                      {b.category}
                    </span>
                    <span
                      className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${
                        b.status === "confirmed"
                          ? "bg-secondary text-secondary-foreground"
                          : b.status === "cancelled"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <h3 className="font-display text-lg mt-2">{b.provider_name}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(b.booking_date).toLocaleDateString()}
                      {b.end_date ? ` → ${new Date(b.end_date).toLocaleDateString()}` : ""}
                    </span>
                    {b.booking_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {b.booking_time}
                      </span>
                    )}
                    {b.price_estimate && (
                      <span className="font-semibold text-foreground">~${b.price_estimate}</span>
                    )}
                  </div>
                </div>
                {b.status === "confirmed" && (
                  <Button variant="ghost" size="icon" onClick={() => cancel(b.id)} aria-label="Cancel">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Bookings;