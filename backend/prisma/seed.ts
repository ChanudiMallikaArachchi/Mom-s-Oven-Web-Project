import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Mom's Oven database...");

  // 1. Admin User
  const adminPasswordHash = await bcrypt.hash("Admin@123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@momsoven.com" },
    update: {},
    create: {
      name: "Bakery Admin",
      email: "admin@momsoven.com",
      phone: "+94 77 123 4567",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // 2. Categories
  const categoriesData = [
    { name: "Birthday Cakes", slug: "birthday-cakes", imageUrl: "/images/cake9.jpeg", description: "Celebration birthday cakes" },
    { name: "Wedding Cakes", slug: "wedding-cakes", imageUrl: "/images/weddingCake1.jpeg", description: "Elegant wedding cakes" },
    { name: "Bento Cakes", slug: "bento-cakes", imageUrl: "/images/bentoCakePack1.jpeg", description: "Cute Korean mini bento cakes" },
    { name: "Cupcakes", slug: "cupcakes", imageUrl: "/images/cupCake1.jpeg", description: "Freshly baked iced cupcakes" },
    { name: "Brownies", slug: "brownies", imageUrl: "/images/browniesBox1.jpeg", description: "Fudgy Belgian chocolate brownies" },
    { name: "Mini Cakes", slug: "mini-cakes", imageUrl: "/images/jarCake1.jpeg", description: "Jar cakes and dessert mini pots" },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ 6 Categories created");

  const bdayCategory = await prisma.category.findUnique({ where: { slug: "birthday-cakes" } });
  const weddingCategory = await prisma.category.findUnique({ where: { slug: "wedding-cakes" } });
  const bentoCategory = await prisma.category.findUnique({ where: { slug: "bento-cakes" } });
  const cupcakeCategory = await prisma.category.findUnique({ where: { slug: "cupcakes" } });
  const brownieCategory = await prisma.category.findUnique({ where: { slug: "brownies" } });

  // 3. Sample Cakes
  const cakesData = [
    {
      title: "Birthday Bliss Cake",
      slug: "birthday-bliss-cake",
      categoryId: bdayCategory!.id,
      price: 3500,
      description: "Handcrafted 1kg birthday cake layered with rich cream and delicious toppings.",
      images: ["/images/cake9.jpeg"],
      isFeatured: true,
    },
    {
      title: "Red Velvet Delight",
      slug: "red-velvet-delight",
      categoryId: bdayCategory!.id,
      price: 4200,
      description: "Classic 1kg Red Velvet Cake with silky smooth cream cheese frosting.",
      images: ["/images/cake7.jpeg"],
      isFeatured: true,
    },
    {
      title: "Wedding Elegance Cake",
      slug: "wedding-elegance-cake",
      categoryId: weddingCategory!.id,
      price: 4000,
      description: "Elegant 2-tier celebration cake styled for weddings and anniversaries.",
      images: ["/images/weddingCake1.jpeg"],
      isFeatured: true,
    },
    {
      title: "Bento Cake Pack",
      slug: "bento-cake-pack",
      categoryId: bentoCategory!.id,
      price: 4500,
      description: "Pair of cute mini Korean-style bento cakes packaged in eco boxes.",
      images: ["/images/bentoCakePack1.jpeg"],
      isFeatured: true,
    },
    {
      title: "Cupcake Heaven",
      slug: "cupcake-heaven",
      categoryId: cupcakeCategory!.id,
      price: 3200,
      description: "Set of 6 freshly baked cupcakes decorated with gourmet butter icing.",
      images: ["/images/cupCake1.jpeg"],
      isFeatured: false,
    },
    {
      title: "Fudgy Brownies Box",
      slug: "fudgy-brownies-box",
      categoryId: brownieCategory!.id,
      price: 3000,
      description: "Box of 6 rich, fudgy chocolate brownies made with Belgian dark chocolate.",
      images: ["/images/browniesBox1.jpeg"],
      isFeatured: false,
    },
  ];

  for (const cake of cakesData) {
    await prisma.cake.upsert({
      where: { slug: cake.slug },
      update: {},
      create: cake,
    });
  }
  console.log("✅ Sample cakes seeded");

  // 4. Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        customerName: "Anusha Wickramasinghe",
        rating: 5,
        message: "The Red Velvet cake for my daughter's birthday was stunning and fresh!",
        imageUrl: "/images/bentoCakepack2.jpeg",
        isPublished: true,
      },
      {
        customerName: "Pradeep Ranasinghe",
        rating: 5,
        message: "Fast delivery, beautifully packed bento cakes. Best bakery in town!",
        imageUrl: "/images/cake1.jpeg",
        isPublished: true,
      },
    ],
  });
  console.log("✅ Testimonials seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
