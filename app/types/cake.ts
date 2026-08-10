export interface Cake {
  id: number;
  name: string;
  slug: string;
  category: string;

  price: number;

  rating: number;

  shortDescription: string;

  description: string;

  availability: "In Stock" | "Out of Stock" | "Pre Order";

  image: string;

  images: string[];
}