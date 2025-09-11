export type Shop = {
  id: number;
  name: string;
  address?: string | null;
  createdAt: string;
};

export type Flower = {
  id: number;
  shopId: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  priceCents: number;
  createdAt: string;
};

export type CartItem = {
  flower: Flower;
  quantity: number;
};

export type OrderResponse = {
  id: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  totalCents: number;
  createdAt: string;
  items: Array<{
    id: number;
    quantity: number;
    unitPriceCents: number;
    flower: Flower;
  }>;
};
