import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Flower, Shop } from "../types";
import { useCart } from "../cart/useCart";
import styles from "./ShopsPage.module.css";

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [activeShopId, setActiveShopId] = useState<number | undefined>();
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const { add } = useCart();

  useEffect(() => {
    api.get<Shop[]>("/shops").then((res) => {
      setShops(res.data);
      if (res.data.length) setActiveShopId(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    const params = activeShopId
      ? { params: { shopId: activeShopId } }
      : undefined;
    api.get<Flower[]>("/flowers", params).then((res) => setFlowers(res.data));
  }, [activeShopId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose a shop</h2>

      <div className={styles.shopButtons}>
        {shops.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveShopId(s.id)}
            className={`${styles.shopButton} ${
              activeShopId === s.id ? styles.active : ""
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className={styles.flowersGrid}>
        {flowers.map((f) => (
          <div key={f.id} className={styles.card}>
            {f.imageUrl && (
              <img src={f.imageUrl} alt={f.name} className={styles.image} />
            )}
            <div className={styles.name}>{f.name}</div>
            <div className={styles.description}>{f.description}</div>
            <div className={styles.price}>
              {(f.priceCents / 100).toFixed(2)} €
            </div>
            <button onClick={() => add(f)} className={styles.addBtn}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
