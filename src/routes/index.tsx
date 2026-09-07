import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Ruler, Truck, BadgeCheck } from "lucide-react";
import { CATEGORIES, FABRICS, heroFabrics, inr } from "@/data/fabrics";
import { FabricCard } from "@/components/FabricCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goyal Textile — Suiting & Shirting Fabrics, Chandni Chowk Delhi" },
      {
        name: "description",
        content:
          "Buy suiting, shirting, trouser, kurta and coat fabric by the metre from Goyal Textile, Chandni Chowk, Delhi. Cut to your exact length and delivered across India.",
      },
      { property: "og:title", content: "Goyal Textile — Suiting & Shirting Fabrics" },
      {
        property: "og:description",
        content: "Premium fabrics cut to your exact length, from Chandni Chowk to your door.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = FABRICS.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroFabrics}
            alt="Shelves of folded suiting and shirting fabrics inside the Goyal Textile shop"
            width={1920}
            height={1080}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/55 to-navy/20" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 py-24 md:py-36 lg:py-44">
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.22em] text-navy-foreground/80">
            Chandni Chowk, Delhi
          </p>
          <h1
            className="animate-rise mt-4 max-w-2xl font-display text-4xl leading-[1.08] text-navy-foreground md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Fabric cut to the exact length you need
          </h1>
          <p
            className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/80 md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Suiting, shirting, kurta and coat fabric from a shop that has sold by the thaan for
            generations — now measured, cut and delivered to your door.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Link to="/shop" className="btn-pill">
              Browse fabrics <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-[44px] items-center rounded-full border border-navy-foreground/40 px-7 py-3 font-semibold text-navy-foreground transition-colors hover:border-navy-foreground hover:bg-navy-foreground/10"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-3">
          {[
            {
              icon: Ruler,
              title: "Cut to your length",
              text: "Order from 1 metre up — we cut exactly what your tailor asks for.",
            },
            {
              icon: BadgeCheck,
              title: "Honest per-metre pricing",
              text: "The price you see per metre is the price you pay. No surprises at checkout.",
            },
            {
              icon: Truck,
              title: "Delivered across India",
              text: "Packed carefully and shipped to your PIN code, with tracking on every order.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Shop by what you're making</h2>
            <p className="mt-2 text-muted-foreground">
              Every fabric is priced per metre with guidance on how much your garment needs.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const sample = FABRICS.find((f) => f.categories.includes(c.slug));
            const count = FABRICS.filter((f) => f.categories.includes(c.slug)).length;
            return (
              <Link
                key={c.slug}
                to="/shop/$category"
                params={{ category: c.slug }}
                className="card-lift group relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                {sample && (
                  <div className="aspect-[16/9] overflow-hidden bg-ivory">
                    <img
                      src={sample.image}
                      alt={`${c.label} fabric example`}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-xl">{c.label}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {c.blurb} · {count} fabric{count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 pt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl md:text-4xl">This week's picks</h2>
          <Link to="/shop" className="hidden shrink-0 text-sm font-semibold text-primary hover:underline sm:block">
            View all fabrics →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((f) => (
            <FabricCard key={f.id} fabric={f} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Catalogue and prices shown are sample content — real fabrics and photos will be added by
          the shop.
        </p>
      </section>
    </div>
  );
}
