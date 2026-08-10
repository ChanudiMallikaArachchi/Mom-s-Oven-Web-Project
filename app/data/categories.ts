import { CategorySection } from "../types/category";

export const categorySections: CategorySection[] = [
  {
    id: 1,
    title: "Celebration Cakes",
    categories: [
      {
        id: 1,
        name: "Birthday Cakes",
        slug: "birthday-cakes",
        cakeSlug: "birthday-bliss-cake",
        image: "/images/cake1.jpeg",
        description: "Delicious handcrafted cakes perfect for birthday celebrations.",
      },
      {
        id: 2,
        name: "Wedding Cakes",
        slug: "wedding-cakes",
        cakeSlug: "wedding-elegance-cake",
        image: "/images/weddingCake1.jpeg",
        description: "Elegant, multi-tiered wedding cakes for your special day.",
      },
    ],
  },
  {
    id: 2,
    title: "Mini Cakes & Pastries",
    categories: [
      {
        id: 3,
        name: "Bento Cakes",
        slug: "bento-cakes",
        cakeSlug: "bento-cake-pack",
        image: "/images/bentoCakePack1.jpeg",
        description: "Cute Korean mini bento cakes for sweet single treats.",
      },
      {
        id: 4,
        name: "Cupcakes",
        slug: "cupcakes",
        cakeSlug: "cupcake-heaven",
        image: "/images/cupCake1.jpeg",
        description: "Freshly baked cupcakes topped with delicious butter icing.",
      },
    ],
  },
  {
    id: 3,
    title: "Sweet Treats & Brownies",
    categories: [
      {
        id: 5,
        name: "Fudgy Brownies",
        slug: "brownies",
        cakeSlug: "fudgy-brownies-box",
        image: "/images/brownieCake1.jpeg",
        description: "Rich, gooey chocolate brownies made with dark cocoa.",
      },
      {
        id: 6,
        name: "Jar Cakes",
        slug: "mini-cakes",
        cakeSlug: "jar-cake-special",
        image: "/images/jarCake1.jpeg",
        description: "Layered sponge cake and fresh cream served in cute glass jars.",
      },
    ],
  },
];