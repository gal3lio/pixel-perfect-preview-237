import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingBag, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart";

export function MobileTabBar() {
  const { count, openDrawer } = useCart();

  const item = "flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.6875rem] font-medium text-muted-foreground min-h-[56px] justify-center";

  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-40 border-t border-border md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch px-2 pb-[env(safe-area-inset-bottom)]">
        <Link to="/" className={item} activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
          <Home className="size-5" />
          Home
        </Link>
        <Link to="/shop" className={item} activeProps={{ className: "text-primary" }}>
          <LayoutGrid className="size-5" />
          Shop
        </Link>
        <button onClick={openDrawer} className={`${item} relative`} aria-label={`Cart, ${count} items`}>
          <ShoppingBag className="size-5" />
          Cart
          {count > 0 && (
            <span className="absolute right-[22%] top-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.625rem] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
        <Link to="/track" className={item} activeProps={{ className: "text-primary" }}>
          <MapPin className="size-5" />
          Track
        </Link>
      </div>
    </nav>
  );
}
