import { categorySections } from "@/app/data/categories";
import CategorySection from "./categorySection";

export default function CategoriesContent() {
  return (
    <section className="bg-[#FFF8F2] py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">

          <h1 className="text-5xl font-bold text-[#4A2C1D]">
            Explore Our Categories
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Discover handcrafted cakes and sweet treats for every celebration.
          </p>

        </div>

        {categorySections.map((section) => (
          <CategorySection
            key={section.id}
            section={section}
          />
        ))}

      </div>

    </section>
  );
}