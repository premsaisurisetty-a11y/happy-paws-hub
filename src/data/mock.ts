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

export const providersByCategory: Record<string, Provider[]> = {
  grooming: [
    { id: "g1", name: "Bubbles & Bows Spa", category: "Grooming", rating: 4.9, reviews: 312, distanceKm: 0.8, priceFrom: 28, image: grooming, badge: "Top rated" },
    { id: "g2", name: "Fluff & Buff Studio", category: "Grooming", rating: 4.7, reviews: 198, distanceKm: 1.6, priceFrom: 32, image: grooming },
    { id: "g3", name: "The Pampered Pup", category: "Grooming", rating: 4.8, reviews: 256, distanceKm: 2.3, priceFrom: 35, image: grooming, badge: "New" },
    { id: "g4", name: "Shiny Coats Mobile", category: "Grooming", rating: 4.6, reviews: 142, distanceKm: 3.0, priceFrom: 40, image: grooming },
  ],
  vet: [
    { id: "v1", name: "Dr. Maya's Pet Clinic", category: "Veterinary", rating: 4.8, reviews: 540, distanceKm: 1.4, priceFrom: 35, image: vet, badge: "Top rated" },
    { id: "v2", name: "Brooklyn Animal Hospital", category: "Veterinary", rating: 4.9, reviews: 812, distanceKm: 2.1, priceFrom: 50, image: vet },
    { id: "v3", name: "Happy Tails Vet Care", category: "Veterinary", rating: 4.7, reviews: 305, distanceKm: 2.8, priceFrom: 40, image: vet },
    { id: "v4", name: "PawMed 24/7 Emergency", category: "Veterinary", rating: 4.6, reviews: 420, distanceKm: 4.2, priceFrom: 75, image: vet, badge: "24/7" },
  ],
  training: [
    { id: "t1", name: "Pawsitive Training Co.", category: "Trainer", rating: 4.7, reviews: 184, distanceKm: 2.1, priceFrom: 45, image: trainer, badge: "New" },
    { id: "t2", name: "Good Dog Academy", category: "Trainer", rating: 4.9, reviews: 296, distanceKm: 1.8, priceFrom: 60, image: trainer, badge: "Top rated" },
    { id: "t3", name: "Sit, Stay, Play", category: "Trainer", rating: 4.6, reviews: 121, distanceKm: 3.4, priceFrom: 35, image: trainer },
    { id: "t4", name: "Wagging Tails School", category: "Trainer", rating: 4.8, reviews: 240, distanceKm: 4.0, priceFrom: 50, image: trainer },
  ],
  boarding: [
    { id: "b1", name: "Cozy Tails Boarding", category: "Boarding", rating: 4.9, reviews: 220, distanceKm: 3.6, priceFrom: 32, image: boarding, badge: "Top rated" },
    { id: "b2", name: "Pawside Inn", category: "Boarding", rating: 4.7, reviews: 158, distanceKm: 2.4, priceFrom: 40, image: boarding },
    { id: "b3", name: "Happy Hounds Hotel", category: "Boarding", rating: 4.8, reviews: 274, distanceKm: 5.1, priceFrom: 45, image: boarding },
    { id: "b4", name: "Whisker Retreat", category: "Boarding", rating: 4.6, reviews: 96, distanceKm: 6.3, priceFrom: 38, image: boarding, badge: "Cats welcome" },
  ],
  cafes: [
    { id: "cf1", name: "The Biscuit Bar", category: "Cafe", rating: 4.8, reviews: 410, distanceKm: 0.6, priceFrom: 0, image: cafe, badge: "Free entry" },
    { id: "cf2", name: "Cream & Crumb", category: "Bakery", rating: 4.7, reviews: 188, distanceKm: 1.8, priceFrom: 0, image: cafe },
    { id: "cf3", name: "Willow Bark Park", category: "Park", rating: 4.9, reviews: 612, distanceKm: 1.1, priceFrom: 0, image: trainer, badge: "Off-leash" },
    { id: "cf4", name: "Paws & Pour Coffee", category: "Cafe", rating: 4.6, reviews: 145, distanceKm: 2.0, priceFrom: 0, image: cafe },
  ],
};

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