import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.flower.deleteMany();
  await prisma.shop.deleteMany();

  const shop1 = await prisma.shop.create({
    data: { name: "Bloom & Co", address: "Warsaw, Marszałkowska 10" },
  });
  const shop2 = await prisma.shop.create({
    data: { name: "Rose Garden", address: "Warsaw, Mokotowska 5" },
  });

  await prisma.flower.createMany({
    data: [
      {
        shopId: shop1.id,
        name: "Red Roses Bouquet",
        description: "12 red roses",
        imageUrl: "https://picsum.photos/seed/roses/400/300",
        priceCents: 12900,
      },
      {
        shopId: shop1.id,
        name: "Tulips Mix",
        description: "Spring mix",
        imageUrl: "https://picsum.photos/seed/tulips/400/300",
        priceCents: 8900,
      },
      {
        shopId: shop2.id,
        name: "White Lilies",
        description: "Elegant lilies",
        imageUrl: "https://picsum.photos/seed/lilies/400/300",
        priceCents: 9900,
      },
      {
        shopId: shop2.id,
        name: "Sunflower Joy",
        description: "Bright and cheerful",
        imageUrl: "https://picsum.photos/seed/sunflower/400/300",
        priceCents: 5900,
      }
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed done.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
