import { Link } from "@tanstack/react-router";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/fabrics";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count, openDrawer, justAdded } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (justAdded === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 340);
    return () => clearTimeout(t);
  }, [justAdded]);

  return (
    <>
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <p>Cutting fabric in Chandni Chowk, Delhi — now delivered across India</p>
          <div className="flex items-center gap-5">
            <a href="tel:+910000000000" className="inline-flex items-center gap-1.5 hover:underline">
              <Phone className="size-3.5" /> Call the shop
            </a>
            <Link to="/track" className="hover:underline">
              Track order
            </Link>
          </div>
        </div>
      </div>

      <header className="glass sticky top-0 z-40 border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-full text-foreground md:hidden"
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight md:text-2xl">Goyal Textile</span>
            <span className="text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
              Chandni Chowk · since generations
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop/$category"
                params={{ category: c.slug }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" }}
              >
                {c.label}
              </Link>
            ))}
            <Link
              to="/shop"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
            >
              Shop all
            </Link>
          </nav>

          <button
            onClick={openDrawer}
            aria-label={`Open cart, ${count} items`}
            className="relative ml-auto grid size-11 place-items-center rounded-full transition-colors hover:bg-secondary lg:ml-4"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span
                className={`absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1.5 py-0.5 text-[0.6875rem] font-bold text-primary-foreground ${
                  pulse ? "animate-badge-pulse" : ""
                }`}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <div className={`fixed inset-0 z-50 md:hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-navy/35 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          className={`glass absolute left-0 top-0 h-full w-[85%] max-w-xs border-r border-border p-5 transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-lg">Browse</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full hover:bg-secondary"
            >
              <X className="size-5" />
            </button>
          </div>
          <ul className="space-y-1">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop/$category"
                  params={{ category: c.slug }}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 font-medium hover:bg-secondary"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5">
              Shop all fabrics
            </Link>
            <Link to="/track" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5">
              Track order
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5">
              About the shop
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
