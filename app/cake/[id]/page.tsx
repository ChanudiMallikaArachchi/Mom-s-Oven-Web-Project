import { cakes } from "@/app/data/cakes";
import CakeGallery from "@/components/cakeDetails/cakeGallery";
import CakeInfo from "@/components/cakeDetails/cakeInfo";
import QuantitySelector from "@/components/cakeDetails/quantitySelector";
import AddToCartButton from "@/components/cakeDetails/addToCartButton";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CakeDetailsPage({ params }: Props) {
  const { id: idStr } = await params;
  const id = Number(idStr);

  const cake = cakes.find((cake) => cake.id === id);

  if (!cake) return notFound();

  return (
    <section className="min-h-screen bg-[#FFF8F2] pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          
          {/* Left */}
          <CakeGallery image={cake.image} />

          {/* Right */}
          <div className="space-y-8">
            <CakeInfo
              name={cake.name}
              price={cake.price}
              description={cake.description}
            />

            <QuantitySelector />
            <AddToCartButton />
          </div>

        </div>
      </div>
    </section>
  );
}