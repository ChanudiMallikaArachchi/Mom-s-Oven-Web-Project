import type { CategorySection as Section } from "@/types/category";
import CategoryCard from "./categoryCard";

interface Props {
  section: Section;
}

export default function CategorySection({ section }: Props) {
  return (
    <section className="mb-20">

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-[#4A2C1D]">
          {section.title}
        </h2>

        <div className="mt-3 h-1 w-24 rounded bg-[#D9A11A]" />

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {section.categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>

    </section>
  );
}