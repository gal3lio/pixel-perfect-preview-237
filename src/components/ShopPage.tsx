import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CATEGORIES, FABRICS, type Category } from "@/data/fabrics";
import { FabricCard } from "@/components/FabricCard";

const FIBRES = [...new Set(FABRICS.map((f) => f.fibre))];
const PATTERNS = [...new Set(FABRICS.map((f) => f.pattern))];

export function ShopPage({ category }: { category: Category | undefined }) {
  const navigate = useNavigate();
  const [fibre, setFibre] = useState<string | null>(null);
  const [pattern, setPattern] = useState<string | null>(null);
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const cat = CATEGORIES.find((c) => c.slug === category);

  const results = useMemo(() => {
    let list = category
      ? FABRICS.filter((f) => f.categories.includes(category))
      : [...FABRICS];
    if (fibre) list = list.filter((f) => f.fibre === fibre);
    if (pattern) list = list.filter((f) => f.pattern === pattern);
    if (sort === "low") list.sort((a, b) => a.pricePerMetre - b.pricePerMetre);
    if (sort === "high") list.sort((a, b) => b.pricePerMetre - a.pricePerMetre);
    return list;
  }, [category, fibre, pattern, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        {cat ? cat.label : "All fabrics"}
      </nav>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">
        {cat ? `${cat.label} fabrics` : "All fabrics"}
      </h1>
      {cat && <p className="mt-2 text-muted-foreground">{cat.blurb}.</p>}

      {/* Category chips */}
      <div className="no-scrollbar -mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-1">
        <button
          className="chip"
          data-active={!category}
          onClick={() => navigate({ to: "/shop" })}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.slug}
            className="chip"
            data-active={category === c.slug}
            onClick={() => navigate({ to: "/shop/$category", params: { category: c.slug } })}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Filters + sort */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {FIBRES.map((f) => (
          <button
            key={f}
            className="chip"
            data-active={fibre === f}
            onClick={() => setFibre(fibre === f ? null : f)}
          >
            {f}
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
        {PATTERNS.map((p) => (
          <button
            key={p}
            className="chip capitalize"
            data-active={pattern === p}
            onClick={() => setPattern(pattern === p ? null : p)}
          >
            {p}
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="Sort fabrics"
          className="ml-auto h-9 rounded-full border border-border bg-card px-4 text-sm font-medium"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      {/* Grid with cross-fade */}
      <div
        key={`${category}-${fibre}-${pattern}-${sort}`}
        className="animate-rise mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        style={{ animationDuration: "280ms" }}
      >
        {results.map((f) => (
          <FabricCard key={f.id} fabric={f} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">
          No fabrics match these filters yet. Try clearing one.
        </p>
      )}
      <p className="mt-8 text-xs text-muted-foreground">
        Sample catalogue — real fabrics, prices and photographs will be supplied by the shop.
      </p>
    </div>
  );
}
