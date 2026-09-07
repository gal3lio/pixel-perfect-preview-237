import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/ShopPage";
import { CATEGORIES, type Category } from "@/data/fabrics";

export const Route = createFileRoute("/shop/$category")({
  head: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.category);
    const label = cat?.label ?? "Fabrics";
    return {
      meta: [
        { title: `${label} Fabrics — Goyal Textile` },
        {
          name: "description",
          content: `${label} fabrics priced per metre, cut to the exact length you need. From Goyal Textile, Chandni Chowk, Delhi.`,
        },
        { property: "og:title", content: `${label} Fabrics — Goyal Textile` },
        {
          property: "og:description",
          content: `${label} fabrics priced per metre, cut to the exact length you need.`,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryRoute,
});

function CategoryRoute() {
  const { category } = Route.useParams();
  return <ShopPage category={category as Category} />;
}
