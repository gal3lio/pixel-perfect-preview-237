import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/ShopPage";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Fabrics — Goyal Textile" },
      {
        name: "description",
        content:
          "Browse the full Goyal Textile catalogue: suiting, shirting, trouser, kurta, coat and gifting fabrics, priced per metre.",
      },
      { property: "og:title", content: "Shop All Fabrics — Goyal Textile" },
      {
        property: "og:description",
        content: "Every fabric priced per metre, cut to your exact length.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ShopPage category={undefined} />,
});
