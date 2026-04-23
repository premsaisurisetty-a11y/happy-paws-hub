import bella from "@/assets/pet-bella.jpg";
import milo from "@/assets/pet-milo.jpg";
import grooming from "@/assets/svc-grooming.jpg";
import vet from "@/assets/svc-vet.jpg";
import trainer from "@/assets/svc-trainer.jpg";
import boarding from "@/assets/svc-boarding.jpg";
import cafe from "@/assets/svc-cafe.jpg";

export type ServiceCategory = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  tone: "primary" | "accent" | "secondary";
};

export const categories: ServiceCategory[] = [
  { id: "grooming", title: "Grooming", tagline: "Spa days & fresh trims", image: grooming, tone: "primary" },
  { id: "vet", title: "Vet visits", tagline: "Checkups & care", image: vet, tone: "secondary" },
  { id: "training", title: "Trainers", tagline: "Manners & tricks", image: trainer, tone: "accent" },
  { id: "boarding", title: "Boarding", tagline: "Cozy stays nearby", image: boarding, tone: "primary" },
  { id: "cafes", title: "Chill with paws", tagline: "Pet-friendly spots", image: cafe, tone: "accent" },
];

export type Provider = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distanceKm: number;
  priceFrom: number;
  image: string;
  badge?: string;
};

export const nearbyProviders: Provider[] = [
  { id: "p1", name: "Bubbles & Bows Spa", category: "Grooming", rating: 4.9, reviews: 312, distanceKm: 0.8, priceFrom: 28, image: grooming, badge: "Top rated" },
  { id: "p2", name: "Dr. Maya's Pet Clinic", category: "Veterinary", rating: 4.8, reviews: 540, distanceKm: 1.4, priceFrom: 35, image: vet },
  { id: "p3", name: "Pawsitive Training Co.", category: "Trainer", rating: 4.7, reviews: 184, distanceKm: 2.1, priceFrom: 45, image: trainer, badge: "New" },
  { id: "p4", name: "Cozy Tails Boarding", category: "Boarding", rating: 4.9, reviews: 220, distanceKm: 3.6, priceFrom: 32, image: boarding },
];

export type ChillSpot = {
  id: string;
  name: string;
  type: string;
  rating: number;
  distanceKm: number;
  image: string;
};

export const chillSpots: ChillSpot[] = [
  { id: "c1", name: "The Biscuit Bar", type: "Cafe", rating: 4.8, distanceKm: 0.6, image: cafe },
  { id: "c2", name: "Willow Bark Park", type: "Park", rating: 4.9, distanceKm: 1.1, image: trainer },
  { id: "c3", name: "Cream & Crumb", type: "Bakery", rating: 4.7, distanceKm: 1.8, image: cafe },
];

export type Pet = {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  nextVaccine: string;
  daysUntil: number;
};

export const pets: Pet[] = [
  { id: "pet1", name: "Bella", breed: "Chihuahua mix", age: "3 yrs", image: bella, nextVaccine: "Rabies booster", daysUntil: 12 },
  { id: "pet2", name: "Milo", breed: "Tabby cat", age: "2 yrs", image: milo, nextVaccine: "FVRCP", daysUntil: 38 },
];