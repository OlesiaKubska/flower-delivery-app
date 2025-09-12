import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import type { OrderResponse } from "../types";
import styles from "./OrderDetailsPage.module.css";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get<OrderResponse>(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Details</h2>
      <h3 className={styles.shopName}>Order #{order.id}</h3>

      <div className={styles.products}>
        <h3>Products</h3>
        <ul className={styles.productList}>
          {order.items.map((i) => (
            <li key={i.id} className={styles.productItem}>
              {i.flower.imageUrl && (
                <img
                  src={i.flower.imageUrl}
                  alt={i.flower.name}
                  className={styles.image}
                />
              )}
              <span className={styles.productName}>
                {i.flower.name} × {i.quantity}
              </span>
              <span className={styles.productPrice}>
                {((i.unitPriceCents * i.quantity) / 100).toFixed(2)} €
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <b>Total:</b> {(order.totalCents / 100).toFixed(2)} €
      </div>
      <div className={styles.section}>
        <b>Delivery Address:</b> {order.deliveryAddress}
      </div>
      <div className={styles.section}>
        <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
      </div>

      <Link to="/" className={styles.backLink}>
        Back to shops
      </Link>
    </div>
  );
}
