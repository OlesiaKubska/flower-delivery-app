import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// GET /shops
app.get("/shops", async (_req, res) => {
  const shops = await prisma.shop.findMany({ orderBy: { createdAt: "desc" } });
  res.json(shops);
});

// GET /flowers?shopId=1
app.get("/flowers", async (req, res) => {
  const shopId = req.query.shopId ? Number(req.query.shopId) : undefined;
  const where = shopId ? { shopId } : {};
  const flowers = await prisma.flower.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(flowers);
});

// POST /orders
// body: { email, phone, deliveryAddress, items: [{ flowerId, quantity }] }
const OrderSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(5),
  deliveryAddress: z.string().min(5),
  items: z.array(
    z.object({
      flowerId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ).min(1)
});

app.post("/orders", async (req, res) => {
  const parsed = OrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { email, phone, deliveryAddress, items } = parsed.data;

  // determine and calculate total
  const flowerIds = items.map(i => i.flowerId);
  const flowers = await prisma.flower.findMany({
    where: { id: { in: flowerIds } }
  });

  let totalCents = 0;
  const itemsData = items.map(i => {
    const f = flowers.find(f => f.id === i.flowerId);
    if (!f) throw new Error(`Flower ${i.flowerId} not found`);
    totalCents += f.priceCents * i.quantity;
    return {
      flowerId: f.id,
      quantity: i.quantity,
      unitPriceCents: f.priceCents
    };
  });

  const order = await prisma.order.create({
    data: {
      email,
      phone,
      deliveryAddress,
      totalCents,
      items: { create: itemsData }
    },
    include: { items: true }
  });

  res.status(201).json(order);
});

// GET /orders/:id
app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { flower: true } } }
  });
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
