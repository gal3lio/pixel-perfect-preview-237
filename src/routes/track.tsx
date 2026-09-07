import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PackageCheck, Scissors, Truck, Package, CheckCircle2 } from "lucide-react";
import { inr, getFabric } from "@/data/fabrics";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Goyal Textile" },
      { name: "description", content: "Check the status of your Goyal Textile fabric order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TrackPage,
});

const STAGES = [
  { icon: PackageCheck, label: "Order received" },
  { icon: Scissors, label: "Fabric cut & packed" },
  { icon: Truck, label: "Shipped" },
  { icon: Package, label: "Delivered" },
];

function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<null | { id: string; total: number; lines: { productId: string; metres: number }[] }>(null);
  const [notFound, setNotFound] = useState(false);

  const lookup = () => {
    setNotFound(false);
    setResult(null);
    try {
      const orders = JSON.parse(localStorage.getItem("goyal-textile-orders") ?? "[]");
      const found = orders.find((o: { id: string }) => o.id.toLowerCase() === orderId.trim().toLowerCase());
      if (found) setResult(found);
      else setNotFound(true);
    } catch {
      setNotFound(true);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl md:text-4xl">Track your order</h1>
      <p className="mt-2 text-muted-foreground">
        Enter the order ID from your confirmation (it looks like GT-XXXXXX).
      </p>

      <div className="mt-6 flex gap-3">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          placeholder="GT-XXXXXX"
          className="h-12 flex-1 rounded-xl border border-input bg-card px-4 uppercase"
        />
        <button onClick={lookup} className="btn-pill !py-0">Track</button>
      </div>

      {notFound && (
        <p className="mt-6 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          We couldn't find that order on this device. Orders placed here are stored on your own
          phone or computer until the shop's order system goes live.
        </p>
      )}

      {result && (
        <div className="animate-rise mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">{result.id}</h2>
            <span className="font-semibold tabular-nums">{inr(result.total)}</span>
          </div>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {result.lines.map((l) => {
              const f = getFabric(l.productId);
              return (
                <li key={l.productId}>
                  {f?.name ?? l.productId} — {l.metres} m
                </li>
              );
            })}
          </ul>
          <ol className="mt-6 space-y-0">
            {STAGES.map(({ icon: Icon, label }, i) => {
              const done = i === 0; // demo: every stored order is at stage 1
              return (
                <li key={label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className={`grid size-10 place-items-center rounded-full ${done ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>
                      {done ? <CheckCircle2 className="size-5" /> : <Icon className="size-4" />}
                    </span>
                    {i < STAGES.length - 1 && <span className="h-6 w-px bg-border" />}
                  </div>
                  <p className={`pt-2 text-sm ${done ? "font-semibold" : "text-muted-foreground"}`}>{label}</p>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <p className="mt-10 text-sm text-muted-foreground">
        Placed an order some other way? <Link to="/about" className="font-semibold text-primary hover:underline">Contact the shop</Link> and we'll check for you.
      </p>
    </div>
  );
}
