import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, ShoppingBag, Zap } from "lucide-react";
import { getFabric, inr } from "@/data/fabrics";
import { useCart } from "@/lib/cart";
import { QuantityStepper } from "@/components/QuantityStepper";
import { FabricCard } from "@/components/FabricCard";

export const Route = createFileRoute("/fabric/$id")({
  loader: ({ params }) => {
    const fabric = getFabric(params.id);
    if (!fabric) throw notFound();
    return fabric;
  },
  head: ({ loaderData: f }) => ({
    meta: [
      { title: `${f?.name ?? "Fabric"} — Goyal Textile` },
      { name: "description", content: f?.short ?? "" },
      { property: "og:title", content: `${f?.name ?? "Fabric"} — Goyal Textile` },
      { property: "og:description", content: f?.short ?? "" },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FabricPage,
});

function FabricPage() {
  const fabric = Route.useLoaderData();
  const { add, openDrawer } = useCart();
  const [metres, setMetres] = useState(fabric.guide[0]?.metres ?? fabric.minMetres);
  const [flash, setFlash] = useState(false);

  const total = useMemo(() => fabric.pricePerMetre * metres, [fabric, metres]);

  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 520);
    return () => clearTimeout(t);
  }, [total]);

  const related = useMemo(
    () =>
      // avoid importing FABRICS directly here keeps loader data authoritative
      fabric.categories
        .flatMap(() => [] as typeof import.meta [])
        .concat(),
    [fabric],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pt-8 pb-24 md:pb-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/shop" className="hover:underline">Shop</Link>
        <span className="mx-1.5">/</span>
        <Link
          to="/shop/$category"
          params={{ category: fabric.categories[0] }}
          className="capitalize hover:underline"
        >
          {fabric.categories[0]}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="overflow-hidden rounded-3xl border border-border bg-ivory">
          <img
            src={fabric.image}
            alt={`${fabric.name} — ${fabric.colour} ${fabric.fibre} fabric, close-up texture`}
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-3xl leading-tight md:text-4xl">{fabric.name}</h1>
          <p className="mt-3 text-lg">
            <span className="font-display text-2xl">{inr(fabric.pricePerMetre)}</span>
            <span className="text-muted-foreground"> / metre</span>
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{fabric.description}</p>

          {/* "Enough for" guidance */}
          <div className="mt-6 flex flex-wrap gap-2">
            {fabric.guide.map((g) => (
              <button
                key={g.garment}
                onClick={() => setMetres(g.metres)}
                className="chip"
                data-active={metres === g.metres}
              >
                {g.metres} m · {g.garment}
              </button>
            ))}
          </div>

          {/* Quantity + total */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <QuantityStepper
              value={metres}
              min={fabric.minMetres}
              max={fabric.availableMetres}
              step={fabric.stepMetres}
              onChange={setMetres}
            />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Your total</p>
              <p className={`font-display text-2xl tabular-nums ${flash ? "animate-flash" : ""}`}>
                {inr(total)}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {fabric.availableMetres} m available on the thaan.
          </p>

          {/* Actions — pill reserved for the two primary actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => add(fabric.id, metres)} className="btn-pill flex-1">
              <ShoppingBag className="size-4" /> Add {metres} m to cart
            </button>
            <button
              onClick={() => {
                add(fabric.id, metres);
                openDrawer();
              }}
              className="btn-pill-outline flex-1"
            >
              <Zap className="size-4" /> Buy now
            </button>
          </div>

          <a
            href={`https://wa.me/910000000000?text=${encodeURIComponent(
              `Hi! I have a question about ${fabric.name} (${inr(fabric.pricePerMetre)}/m).`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <MessageCircle className="size-4" /> Ask about this fabric on WhatsApp
          </a>

          {/* Spec sheet — optional rows render only when present */}
          <dl className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
            {[
              ["Colour", fabric.colour],
              ["Pattern", fabric.pattern],
              ["Fibre", fabric.fibre],
              ["Suitable for", fabric.suitableFor.join(", ")],
              ["Season", fabric.season],
              fabric.width ? ["Width", fabric.width] : null,
              fabric.care ? ["Care", fabric.care] : null,
            ]
              .filter((row): row is string[] => row !== null)
              .map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3.5 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium capitalize">{v}</dd>
                </div>
              ))}
          </dl>
        </div>
      </div>

      {/* Related */}
      <RelatedRail currentId={fabric.id} categories={fabric.categories} />

      {/* Mobile sticky add-to-cart */}
      <div className="glass fixed inset-x-0 bottom-[64px] z-30 border-t border-border px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{fabric.name}</p>
            <p className="text-sm tabular-nums text-muted-foreground">
              {metres} m · {inr(total)}
            </p>
          </div>
          <button onClick={() => add(fabric.id, metres)} className="btn-pill ml-auto !py-2.5">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

import { FABRICS } from "@/data/fabrics";
function RelatedRail({ currentId, categories }: { currentId: string; categories: string[] }) {
  const related = FABRICS.filter(
    (f) => f.id !== currentId && f.categories.some((c) => categories.includes(c)),
  ).slice(0, 4);
  if (related.length === 0) return null;
  return (
    <section className="mt-20">
      <h2 className="font-display text-2xl md:text-3xl">You may also like</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {related.map((f) => (
          <FabricCard key={f.id} fabric={f} />
        ))}
      </div>
    </section>
  );
}
