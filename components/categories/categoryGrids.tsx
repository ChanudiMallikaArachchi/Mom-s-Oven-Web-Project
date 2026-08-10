import CategoryCard from "@/components/categories/categoryCard";
import { categorySections } from "@/app/data/categories";

export default function CategoryGrid() {
  return (
    <section className="bg-[#FFF8F2] py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">

          <h1 className="text-5xl font-bold text-[#4A2C1D]">
            Explore Our Categories
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Browse our handcrafted cake collections and find the
            perfect cake for every celebration.
          </p>

        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {categorySections.flatMap(
            (section) => section.categories).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </div>

    </section>
  );
}