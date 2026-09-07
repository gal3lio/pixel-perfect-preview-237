import { Link } from "@tanstack/react-router";
import { inr, type Fabric } from "@/data/fabrics";

export function FabricCard({ fabric }: { fabric: Fabric }) {
  return (
    <Link
      to="/fabric/$id"
      params={{ id: fabric.id }}
      className="card-lift group block overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="aspect-[4/5] overflow-hidden bg-ivory">
        <img
          src={fabric.image}
          alt={`${fabric.name} — ${fabric.colour} ${fabric.fibre} fabric close-up`}
          loading="lazy"
          width={1024}
          height={1024}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="space-y-1.5 p-4">
        <h3 className="font-display text-lg leading-snug">{fabric.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{fabric.short}</p>
        <p className="pt-1 text-sm font-semibold">
          {inr(fabric.pricePerMetre)}
          <span className="font-normal text-muted-foreground"> / metre</span>
        </p>
      </div>
    </Link>
  );
}
