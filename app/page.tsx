import Hero from "@/components/home/hero/hero";
import CategoriesShowcase from "@/components/home/categoriesShowcase/categoriesShowcase";
import FeaturedCakes from "@/components/home/featuredCakes/featuredCakes";
import WhyChooseUs from "@/components/home/whyChooseUs/whyChooseUs";
import Testimonials from "@/components/home/testimonials/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesShowcase />
      <FeaturedCakes />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}