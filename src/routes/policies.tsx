import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Goyal Textile" },
      {
        name: "description",
        content: "Shipping, returns, privacy and terms for Goyal Textile fabric orders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl md:text-4xl">Shipping &amp; returns</h1>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Shipping</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>We ship across India. Delivery is free on orders above ₹1,500; otherwise a flat ₹99 applies.</li>
          <li>Fabric is cut, checked and packed within 1–2 working days of your order.</li>
          <li>Every order gets a tracking link as soon as it ships.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Returns on cut fabric</h2>
        <p className="mt-3 text-muted-foreground">
          Because each length is cut to your specification, cut fabric generally cannot be resold.
          The shop's final return policy will be confirmed by the owner and published here. If your
          fabric arrives damaged or the cut is shorter than ordered, contact us and we will make it
          right.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Privacy</h2>
        <p className="mt-3 text-muted-foreground">
          We only collect the details needed to deliver your order — name, address, phone and
          payment confirmation. We do not sell or share your information.
        </p>
      </section>
    </div>
  );
}
