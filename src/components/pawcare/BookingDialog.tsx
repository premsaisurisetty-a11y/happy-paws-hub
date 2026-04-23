import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import type { Provider } from "@/data/mock";
import { Link, useNavigate } from "react-router-dom";

type Pet = { id: string; name: string };

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const isBoarding = (cat: string) => cat.toLowerCase().includes("board");

export const BookingDialog = ({
  provider,
  open,
  onOpenChange,
}: {
  provider: Provider | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [petId, setPetId] = useState<string>("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    supabase
      .from("pets")
      .select("id,name")
      .then(({ data }) => setPets(data ?? []));
  }, [open, user]);

  useEffect(() => {
    if (!provider || !date) {
      setTakenSlots([]);
      return;
    }
    supabase
      .from("bookings")
      .select("booking_time")
      .eq("provider_id", provider.id)
      .eq("booking_date", date)
      .eq("status", "confirmed")
      .then(({ data }) => setTakenSlots((data ?? []).map((r: any) => r.booking_time).filter(Boolean)));
  }, [provider, date]);

  if (!provider) return null;

  const boarding = isBoarding(provider.category);

  const handleConfirm = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!date || (!boarding && !time)) {
      toast({ title: "Pick a date and time", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      provider_id: provider.id,
      provider_name: provider.name,
      category: provider.category,
      booking_date: date,
      booking_time: boarding ? null : time,
      end_date: boarding ? endDate || null : null,
      pet_id: petId || null,
      price_estimate: provider.priceFrom,
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Couldn't book",
        description: error.message.includes("bookings_no_double_book")
          ? "That slot was just taken — pick another time."
          : error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Booking confirmed! 🎉", description: `${provider.name} on ${date}` });
    onOpenChange(false);
    setDate("");
    setEndDate("");
    setTime("");
    setPetId("");
    navigate("/bookings");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {provider.name}</DialogTitle>
        </DialogHeader>

        {!user ? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">Sign in to book this service.</p>
            <Button asChild variant="hero" className="w-full">
              <Link to="/auth">Sign in to continue</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Pet</Label>
              <Select value={petId} onValueChange={setPetId}>
                <SelectTrigger>
                  <SelectValue placeholder={pets.length ? "Choose a pet" : "Add a pet first"} />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {pets.length === 0 && (
                <Link to="/pets" className="text-xs text-primary hover:underline mt-1 inline-block">
                  + Add a pet
                </Link>
              )}
            </div>

            <div>
              <Label htmlFor="bk-date">{boarding ? "Check-in" : "Date"}</Label>
              <Input id="bk-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            {boarding ? (
              <div>
                <Label htmlFor="bk-end">Check-out</Label>
                <Input id="bk-end" type="date" min={date || today} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            ) : (
              <div>
                <Label>Time</Label>
                <div className="grid grid-cols-4 gap-2 mt-1.5">
                  {TIME_SLOTS.map((slot) => {
                    const taken = takenSlots.includes(slot);
                    const selected = time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => setTime(slot)}
                        className={`text-sm font-semibold rounded-xl py-2 border transition-all ${
                          taken
                            ? "bg-muted text-muted-foreground border-transparent line-through cursor-not-allowed"
                            : selected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border hover:border-primary/40"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between rounded-2xl bg-primary-soft p-3 text-sm">
              <span className="text-muted-foreground">Estimated price</span>
              <span className="font-display text-lg text-primary">${provider.priceFrom}</span>
            </div>

            <Button variant="hero" className="w-full" onClick={handleConfirm} disabled={submitting}>
              {submitting ? "Booking..." : "Confirm booking"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;