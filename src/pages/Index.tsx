import AppHeader from "@/components/pawcare/AppHeader";
import Hero from "@/components/pawcare/Hero";
import CategoryGrid from "@/components/pawcare/CategoryGrid";
import NearbyProviders from "@/components/pawcare/NearbyProviders";
import PetHealth from "@/components/pawcare/PetHealth";
import ChillWithPaws from "@/components/pawcare/ChillWithPaws";
import BottomNav from "@/components/pawcare/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />
      <main>
        <Hero />
        <CategoryGrid />
        <NearbyProviders />
        <PetHealth />
        <ChillWithPaws />
        <footer className="container pt-8 pb-4 text-center text-xs text-muted-foreground">
          Made with 🐾 for pet parents · PawCare MVP
        </footer>
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
