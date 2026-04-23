import { categories } from "@/data/mock";

export const CategoryGrid = () => {
  return (
    <section className="container py-12 md:py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl">What does your pet need today?</h2>
          <p className="text-sm text-muted-foreground mt-1">Tap a category to explore nearby pros.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {categories.map((c) => (
          <button
            key={c.id}
            className="group text-left rounded-3xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                width={768}
                height={768}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 md:p-4">
              <p className="font-semibold text-sm md:text-base">{c.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.tagline}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;