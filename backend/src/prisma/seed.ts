import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.flower.deleteMany();
  await prisma.shop.deleteMany();

  const shops = await prisma.shop.createMany({
    data: [
      { name: "Bloom & Co", address: "Warsaw, Marszałkowska 10" },
      { name: "Rose Garden", address: "Warsaw, Mokotowska 5" },
      { name: "Tulip House", address: "Kraków, Floriańska 22" },
      { name: "Sunshine Flowers", address: "Lviv, Svobody Ave 12" },
      { name: "Orchid World", address: "Kyiv, Khreshchatyk 15" },
      { name: "Peony Dreams", address: "Gdańsk, Długa 45" },
      { name: "Lavender Bliss", address: "Poznań, Stary Rynek 8" },
    ],
  });

  const allShops = await prisma.shop.findMany();

  await prisma.flower.createMany({
    data: [
      // Bloom & Co
      {
        shopId: allShops[0].id,
        name: "Red Roses Bouquet",
        description: "Classic 12 red roses",
        imageUrl: "https://picsum.photos/seed/redroses/400/300",
        priceCents: 12900,
      },
      {
        shopId: allShops[0].id,
        name: "Peonies Deluxe",
        description: "Romantic peonies",
        imageUrl: "https://picsum.photos/seed/peonies/400/300",
        priceCents: 15900,
      },
      {
        shopId: allShops[0].id,
        name: "Daisy Mix",
        description: "Cheerful daisies",
        imageUrl: "https://picsum.photos/seed/daisies/400/300",
        priceCents: 4900,
      },
      {
        shopId: allShops[0].id,
        name: "Blue Iris",
        description: "Beautiful blue iris flowers",
        imageUrl: "https://picsum.photos/seed/iris/400/300",
        priceCents: 8700,
      },
      {
        shopId: allShops[0].id,
        name: "Wildflowers Mix",
        description: "Colorful wildflowers",
        imageUrl: "https://picsum.photos/seed/wildflowers/400/300",
        priceCents: 5600,
      },
      {
        shopId: allShops[0].id,
        name: "Romantic Basket",
        description: "Mixed seasonal flowers in basket",
        imageUrl: "https://picsum.photos/seed/romanticbasket/400/300",
        priceCents: 14900,
      },
      {
        shopId: allShops[0].id,
        name: "Spring Tulips",
        description: "Fresh spring tulips",
        imageUrl: "https://picsum.photos/seed/springtulips/400/300",
        priceCents: 7200,
      },
      {
        shopId: allShops[0].id,
        name: "Garden Roses",
        description: "Classic garden roses",
        imageUrl: "https://picsum.photos/seed/gardenroses/400/300",
        priceCents: 13200,
      },
      {
        shopId: allShops[0].id,
        name: "Sunset Bouquet",
        description: "Orange-yellow sunset colors",
        imageUrl: "https://picsum.photos/seed/sunsetbouquet/400/300",
        priceCents: 11800,
      },
      {
        shopId: allShops[0].id,
        name: "Romantic Lilies",
        description: "White and pink lilies mix",
        imageUrl: "https://picsum.photos/seed/romanticlilies/400/300",
        priceCents: 14100,
      },
      {
        shopId: allShops[0].id,
        name: "Autumn Bouquet",
        description: "Warm autumn colors",
        imageUrl: "https://picsum.photos/seed/autumnbouquet/400/300",
        priceCents: 9900,
      },
      {
        shopId: allShops[0].id,
        name: "Luxury Orchids",
        description: "Exclusive orchids bouquet",
        imageUrl: "https://picsum.photos/seed/luxuryorchids/400/300",
        priceCents: 21900,
      },

      // Rose Garden
      {
        shopId: allShops[1].id,
        name: "White Lilies",
        description: "Elegant lilies",
        imageUrl: "https://picsum.photos/seed/lilies/400/300",
        priceCents: 9900,
      },
      {
        shopId: allShops[1].id,
        name: "Sunflower Joy",
        description: "Bright sunflowers",
        imageUrl: "https://picsum.photos/seed/sunflowers/400/300",
        priceCents: 6900,
      },
      {
        shopId: allShops[1].id,
        name: "Pink Roses",
        description: "Lovely pink roses",
        imageUrl: "https://picsum.photos/seed/pinkroses/400/300",
        priceCents: 11900,
      },

      // Tulip House
      {
        shopId: allShops[2].id,
        name: "Yellow Tulips",
        description: "Sunny yellow tulips",
        imageUrl: "https://picsum.photos/seed/yellowtulips/400/300",
        priceCents: 7500,
      },
      {
        shopId: allShops[2].id,
        name: "Purple Tulips",
        description: "Elegant purple tulips",
        imageUrl: "https://picsum.photos/seed/purpletulips/400/300",
        priceCents: 8200,
      },
      {
        shopId: allShops[2].id,
        name: "Tulip Spring Mix",
        description: "Mixed tulips bouquet",
        imageUrl: "https://picsum.photos/seed/tulipmix/400/300",
        priceCents: 8900,
      },

      // Sunshine Flowers
      {
        shopId: allShops[3].id,
        name: "Hydrangea Blue",
        description: "Romantic blue hydrangea",
        imageUrl: "https://picsum.photos/seed/hydrangea/400/300",
        priceCents: 13900,
      },
      {
        shopId: allShops[3].id,
        name: "Gerbera Mix",
        description: "Colorful gerberas",
        imageUrl: "https://picsum.photos/seed/gerberas/400/300",
        priceCents: 6700,
      },
      {
        shopId: allShops[3].id,
        name: "Spring Basket",
        description: "Seasonal basket flowers",
        imageUrl: "https://picsum.photos/seed/springbasket/400/300",
        priceCents: 14900,
      },

      // Orchid World
      {
        shopId: allShops[4].id,
        name: "Pink Orchid",
        description: "Delicate pink orchid",
        imageUrl: "https://picsum.photos/seed/pinkorchid/400/300",
        priceCents: 19900,
      },
      {
        shopId: allShops[4].id,
        name: "White Orchid",
        description: "Elegant white orchid",
        imageUrl: "https://picsum.photos/seed/whiteorchid/400/300",
        priceCents: 18900,
      },
      {
        shopId: allShops[4].id,
        name: "Mini Orchid Set",
        description: "3 mini orchids",
        imageUrl: "https://picsum.photos/seed/miniorchid/400/300",
        priceCents: 25900,
      },

      // Peony Dreams
      {
        shopId: allShops[5].id,
        name: "White Peonies",
        description: "Luxury white peonies",
        imageUrl: "https://picsum.photos/seed/whitepeonies/400/300",
        priceCents: 17900,
      },
      {
        shopId: allShops[5].id,
        name: "Pink Peonies",
        description: "Classic pink peonies",
        imageUrl: "https://picsum.photos/seed/pinkpeonies/400/300",
        priceCents: 16900,
      },
      {
        shopId: allShops[5].id,
        name: "Peony Mix",
        description: "Mix of peonies",
        imageUrl: "https://picsum.photos/seed/peonymix/400/300",
        priceCents: 18900,
      },

      // Lavender Bliss
      {
        shopId: allShops[6].id,
        name: "Lavender Bunch",
        description: "Fresh lavender",
        imageUrl: "https://picsum.photos/seed/lavender/400/300",
        priceCents: 6700,
      },
      {
        shopId: allShops[6].id,
        name: "Lavender & Roses",
        description: "Lavender with roses bouquet",
        imageUrl: "https://picsum.photos/seed/lavrose/400/300",
        priceCents: 12900,
      },
      {
        shopId: allShops[6].id,
        name: "Lavender Basket",
        description: "Decorative lavender basket",
        imageUrl: "https://picsum.photos/seed/lavbasket/400/300",
        priceCents: 14900,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🌸 Seed completed successfully with 7 shops and ~25 flowers.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
