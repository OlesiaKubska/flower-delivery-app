import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import type { OrderResponse } from "../types";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get<OrderResponse>(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order #{order.id}</h2>
      <div>
        <b>Total:</b> {(order.totalCents / 100).toFixed(2)} zł
      </div>
      <div>
        <b>Address:</b> {order.deliveryAddress}
      </div>
      <div>
        <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
      </div>

      <h3 style={{ marginTop: 16 }}>Products</h3>
      <ul>
        {order.items.map((i) => (
          <li key={i.id}>
            {i.flower.name} × {i.quantity} —{" "}
            {((i.unitPriceCents * i.quantity) / 100).toFixed(2)} zł
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 16 }}>
        <Link to="/">Back to shops</Link>
      </p>
    </div>
  );
}
