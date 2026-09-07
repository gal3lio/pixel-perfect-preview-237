import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Goyal Textile — Chandni Chowk, Delhi" },
      {
        name: "description",
        content:
          "Goyal Textile is a family fabric shop in Chandni Chowk, Delhi, selling suiting, shirting, kurta and coat fabric cut off the thaan.",
      },
      { property: "og:title", content: "About Goyal Textile" },
      {
        property: "og:description",
        content: "A family fabric shop in Chandni Chowk, Delhi — now online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl md:text-5xl">A fabric shop, the old way — online</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
        <p>
          Goyal Textile sits in Chandni Chowk, Delhi, where fabric has been sold by the thaan for
          as long as anyone in the family can remember. You pick a roll, we unroll it on the
          counter, measure out exactly the length your tailor asked for, and cut it there and then.
        </p>
        <p>
          This website is the same shop, without the trip to Old Delhi. Every fabric is priced per
          metre, every order is cut to your length, and the person packing your parcel is the same
          family that runs the counter.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Visit the shop</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Address and opening hours to be confirmed by the owner. Chandni Chowk, Delhi.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl">Talk to us</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Phone and WhatsApp number to be confirmed by the owner.
          </p>
        </div>
      </div>
    </div>
  );
}
