import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/fabrics";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">Goyal Textile</p>
          <p className="mt-3 max-w-sm text-sm text-navy-foreground/70">
            A fabric shop in Chandni Chowk, Delhi. We cut suiting, shirting, trouser, kurta and
            coat fabric off the thaan to the exact length you need.
          </p>
          <p className="mt-5 text-sm text-navy-foreground/60">
            Shop address, phone number and opening hours to be confirmed by the owner.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-navy-foreground/60">Shop</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop/$category"
                  params={{ category: c.slug }}
                  className="text-navy-foreground/80 hover:text-navy-foreground hover:underline"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-navy-foreground/60">Help</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-navy-foreground/80 hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link to="/track" className="text-navy-foreground/80 hover:underline">
                Track your order
              </Link>
            </li>
            <li>
              <Link to="/policies" className="text-navy-foreground/80 hover:underline">
                Shipping &amp; returns
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15 px-6 py-5 text-center text-xs text-navy-foreground/55">
        © {new Date().getFullYear()} Goyal Textile. Prices in Indian Rupees.
      </div>
    </footer>
  );
}
