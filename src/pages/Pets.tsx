import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Plus, Trash2, PawPrint, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AppHeader from "@/components/pawcare/AppHeader";
import BottomNav from "@/components/pawcare/BottomNav";
import { toast } from "@/hooks/use-toast";

type Pet = {
  id: string;
  name: string;
  breed: string | null;
  age_years: number | null;
  next_vaccine: string | null;
  next_vaccine_date: string | null;
  notes: string | null;
};

const Pets = () => {
  const { user, loading } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age_years: "",
    next_vaccine: "",
    next_vaccine_date: "",
    notes: "",
  });

  const load = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Couldn't load pets", description: error.message, variant: "destructive" });
      return;
    }
    setPets(data ?? []);
  };

  useEffect(() => {
    load();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("pets").insert({
      user_id: user.id,
      name: form.name,
      breed: form.breed || null,
      age_years: form.age_years ? Number(form.age_years) : null,
      next_vaccine: form.next_vaccine || null,
      next_vaccine_date: form.next_vaccine_date || null,
      notes: form.notes || null,
    });
    if (error) {
      toast({ title: "Couldn't save pet", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Pet added 🐾" });
    setForm({ name: "", breed: "", age_years: "", next_vaccine: "", next_vaccine_date: "", notes: "" });
    setOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("pets").delete().eq("id", id);
    if (error) {
      toast({ title: "Couldn't delete", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Pet removed" });
    load();
  };

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />
      <main className="container py-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display">My pets</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage profiles & vaccine reminders.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="h-4 w-4" /> Add pet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new pet</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-3">
                <div>
                  <Label htmlFor="pet-name">Name</Label>
                  <Input id="pet-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="pet-breed">Breed</Label>
                    <Input id="pet-breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="pet-age">Age (years)</Label>
                    <Input id="pet-age" type="number" step="0.1" value={form.age_years} onChange={(e) => setForm({ ...form, age_years: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="pet-vac">Next vaccine</Label>
                    <Input id="pet-vac" placeholder="Rabies booster" value={form.next_vaccine} onChange={(e) => setForm({ ...form, next_vaccine: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="pet-vac-date">Vaccine date</Label>
                    <Input id="pet-vac-date" type="date" value={form.next_vaccine_date} onChange={(e) => setForm({ ...form, next_vaccine_date: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="pet-notes">Notes</Label>
                  <Textarea id="pet-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <Button type="submit" variant="hero" className="w-full">Save pet</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {pets.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-border/60 p-12 text-center">
            <PawPrint className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No pets yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add your first furry family member to get started.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((p) => (
              <article key={p.id} className="rounded-3xl bg-card border border-border/60 p-5 shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-primary-soft grid place-items-center">
                      <PawPrint className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg leading-tight">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {p.breed ?? "Unknown breed"}
                        {p.age_years ? ` · ${p.age_years} yrs` : ""}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {p.next_vaccine && (
                  <div className="mt-4 flex items-center gap-2 text-xs bg-secondary rounded-full px-3 py-1.5 w-fit">
                    <Calendar className="h-3 w-3" />
                    {p.next_vaccine}
                    {p.next_vaccine_date ? ` · ${new Date(p.next_vaccine_date).toLocaleDateString()}` : ""}
                  </div>
                )}
                {p.notes && <p className="text-xs text-muted-foreground mt-3">{p.notes}</p>}
              </article>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Pets;