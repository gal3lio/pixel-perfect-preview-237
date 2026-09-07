import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getFabric, type Fabric } from "@/data/fabrics";

export interface CartLine {
  productId: string;
  metres: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  isDrawerOpen: boolean;
  justAdded: number; // increments on each add — drives the badge pulse
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (productId: string, metres: number) => void;
  setMetres: (productId: string, metres: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  fabricFor: (productId: string) => Fabric | undefined;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "goyal-textile-cart-v1";

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(0);
  const hydrated = useRef(false);

  useEffect(() => {
    setLines(readStored());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    }
  }, [lines]);

  const add = useCallback((productId: string, metres: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, metres: l.metres + metres } : l,
        );
      }
      return [...prev, { productId, metres }];
    });
    setJustAdded((n) => n + 1);
    setDrawerOpen(true);
  }, []);

  const setMetres = useCallback((productId: string, metres: number) => {
    setLines((prev) =>
      metres <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, metres } : l)),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const fabricFor = useCallback((id: string) => getFabric(id), []);

  const value = useMemo<CartContextValue>(() => {
    const total = lines.reduce((sum, l) => {
      const f = getFabric(l.productId);
      return f ? sum + f.pricePerMetre * l.metres : sum;
    }, 0);
    return {
      lines,
      count: lines.length,
      total,
      isDrawerOpen,
      justAdded,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      add,
      setMetres,
      remove,
      clear,
      fabricFor,
    };
  }, [lines, isDrawerOpen, justAdded, add, setMetres, remove, clear, fabricFor]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
