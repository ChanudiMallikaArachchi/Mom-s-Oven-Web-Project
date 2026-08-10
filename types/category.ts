export interface Category {
  id: number;
  name: string;
  slug: string;
  cakeSlug: string;
  image: string;
  description: string;
}

export interface CategorySection {
  id: number;
  title: string;
  categories: Category[];
}
