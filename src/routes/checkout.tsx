import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr } from "@/data/fabrics";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Goyal Textile" },
      { name: "description", content: "Review your fabric order and pay securely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

const STEPS = ["Cart", "Address", "Payment"];

function CheckoutPage() {
  const { lines, fabricFor, total, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [placed, setPlaced] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "cod">("upi");
  const [form, setForm] = useState({ name: "", phone: "", address: "", pin: "" });

  const delivery = total >= 1500 ? 0 : 99;
  const grand = total + delivery;

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto size-16 text-primary" />
        <h1 className="mt-6 font-display text-3xl">Order placed!</h1>
        <p className="mt-3 text-muted-foreground">
          Order <span className="font-semibold text-foreground">{placed}</span> is confirmed. We'll
          cut your fabric and send tracking details shortly.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/track" className="btn-pill">Track order</Link>
          <Link to="/shop" className="btn-pill-outline">Keep shopping</Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Pick a fabric and choose your length first.</p>
        <Link to="/shop" className="btn-pill mt-8">Browse fabrics</Link>
      </div>
    );
  }

  const addressValid =
    form.name.trim() && /^\d{10}$/.test(form.phone) && form.address.trim() && /^\d{6}$/.test(form.pin);

  const placeOrder = () => {
    const id = "GT-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      const existing = JSON.parse(localStorage.getItem("goyal-textile-orders") ?? "[]");
      existing.push({ id, total: grand, lines, placedAt: new Date().toISOString() });
      localStorage.setItem("goyal-textile-orders", JSON.stringify(existing));
    } catch { /* ignore */ }
    clear();
    setPlaced(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <h1 className="font-display text-3xl md:text-4xl">Checkout</h1>

      {/* Step indicator */}
      <ol className="mt-6 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`grid size-8 place-items-center rounded-full text-sm font-semibold transition-colors duration-200 ${
                i < step ? "bg-primary text-primary-foreground" : i === step ? "border-2 border-primary text-primary" : "border border-border text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span className={`text-sm ${i <= step ? "font-medium" : "text-muted-foreground"}`}>{label}</span>
            {i < STEPS.length - 1 && <span className="mx-1 h-px w-6 bg-border sm:w-12" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {step === 1 && (
            <section>
              <h2 className="font-display text-2xl">Review your cuts</h2>
              <ul className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
                {lines.map((l) => {
                  const f = fabricFor(l.productId);
                  if (!f) return null;
                  return (
                    <li key={l.productId} className="flex items-center gap-4 p-4">
                      <img src={f.image} alt={f.name} width={1024} height={1024} className="size-16 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{f.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {l.metres} m × {inr(f.pricePerMetre)}/m
                        </p>
                      </div>
                      <p className="font-semibold tabular-nums">{inr(f.pricePerMetre * l.metres)}</p>
                    </li>
                  );
                })}
              </ul>
              <button onClick={() => setStep(2)} className="btn-pill mt-6">
                Continue to address
              </button>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="font-display text-2xl">Delivery address</h2>
              <div className="mt-5 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Full name
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-input bg-background px-4"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm font-medium">
                  Phone (10 digits)
                  <input
                    value={form.phone}
                    inputMode="numeric"
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-input bg-background px-4"
                    placeholder="98XXXXXXXX"
                  />
                </label>
                <label className="block text-sm font-medium sm:col-span-2">
                  Address
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-input bg-background p-4"
                    placeholder="House / street / area / city / state"
                  />
                </label>
                <label className="block text-sm font-medium">
                  PIN code
                  <input
                    value={form.pin}
                    inputMode="numeric"
                    onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-input bg-background px-4"
                    placeholder="1100XX"
                  />
                </label>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <button onClick={() => setStep(3)} disabled={!addressValid} className="btn-pill disabled:opacity-40">
                  Continue to payment
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="font-display text-2xl">Payment</h2>
              <div className="mt-5 space-y-3 rounded-2xl border border-border bg-card p-6">
                {(
                  [
                    ["upi", "UPI", "GPay, PhonePe, Paytm and any UPI app"],
                    ["card", "Card / Netbanking", "Visa, Mastercard, RuPay and major banks"],
                    ["cod", "Cash on delivery", "Pay when your fabric arrives"],
                  ] as const
                ).map(([value, label, sub]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                      payMethod === value ? "border-primary bg-secondary" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      checked={payMethod === value}
                      onChange={() => setPayMethod(value)}
                      className="mt-1 accent-[var(--color-primary)]"
                    />
                    <span>
                      <span className="block font-semibold">{label}</span>
                      <span className="block text-sm text-muted-foreground">{sub}</span>
                    </span>
                  </label>
                ))}
                <p className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-primary" />
                  Payments will be processed securely via Razorpay once the shop connects its
                  account. This demo places the order without charging you.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(2)} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <button onClick={placeOrder} className="btn-pill">
                  Pay {inr(grand)}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Order summary — always visible so costs never surprise */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl">Order summary</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Fabric subtotal</dt>
              <dd className="tabular-nums">{inr(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="tabular-nums">{delivery === 0 ? "Free" : inr(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums">{inr(grand)}</dd>
            </div>
          </dl>
          {delivery > 0 && (
            <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-xs text-secondary-foreground">
              Free delivery on orders above {inr(1500)}.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
