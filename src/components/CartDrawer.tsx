import { Link } from "@tanstack/react-router";
import { X, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { inr } from "@/data/fabrics";
import { QuantityStepper } from "./QuantityStepper";

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, lines, fabricFor, setMetres, remove, total } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isDrawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isDrawerOpen}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-navy/35 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Your cart"
        className={`glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border shadow-2xl transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl">Your cart</h2>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Your cart is empty. Browse a category to pick your fabric.
            </p>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => {
                const f = fabricFor(line.productId);
                if (!f) return null;
                return (
                  <li key={line.productId} className="flex gap-3">
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="size-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{f.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {inr(f.pricePerMetre)} / metre
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <QuantityStepper
                          compact
                          value={line.metres}
                          min={f.minMetres}
                          max={f.availableMetres}
                          step={f.stepMetres}
                          onChange={(v) => setMetres(line.productId, v)}
                        />
                        <button
                          onClick={() => remove(line.productId)}
                          aria-label={`Remove ${f.name}`}
                          className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 font-semibold tabular-nums">
                      {inr(f.pricePerMetre * line.metres)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="space-y-3 border-t border-border px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl">{inr(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Delivery charges are shown at checkout before you pay — nothing hidden.
            </p>
            <Link to="/checkout" onClick={closeDrawer} className="btn-pill w-full">
              Checkout
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
