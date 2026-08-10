import { notFound } from "next/navigation";
import Link from "next/link";
import { cakes } from "@/app/data/cakes";
import { categorySections } from "@/app/data/categories";
import CakeCard from "@/components/home/featuredCakes/cakeCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailsPage({ params }: Props) {
  const { slug } = await params;

  // Find the category by slug to get its name
  const category = categorySections
    .flatMap((section) => section.categories)
    .find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter cakes by category slug
  const categoryCakes = cakes.filter(
    (c) => c.category === category.slug || category.slug.includes(c.category) || c.category.includes(category.slug)
  );

  return (
    <main className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <Link href="/categories" className="mb-6 inline-block text-sm font-semibold text-[#D9A11A] hover:underline">
            &larr; Back to all categories
          </Link>
          <h1 className="text-4xl font-bold text-[#4A2C1D]">{category.name}</h1>
          <p className="mt-3 text-lg text-gray-600">{category.description}</p>
          <div className="mt-4 h-1 w-24 rounded bg-[#D9A11A]" />
        </div>

        {categoryCakes.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCakes.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={{
                  id: cake.id,
                  name: cake.name,
                  price: cake.price,
                  image: cake.image,
                  rating: 5,
                  badge: "In Stock",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-[#4A2C1D]">No cakes found</h3>
            <p className="mt-2 text-gray-600">We are currently out of {category.name.toLowerCase()}. Please check back later!</p>
          </div>
        )}
      </div>
    </main>
  );
}
