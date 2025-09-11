import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Flower, Shop } from "../types";
import { useCart } from "../cart/useCart";

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
    <div>
      <h2>Choose a shop</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {shops.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveShopId(s.id)}
            style={{
              padding: "6px 10px",
              border:
                activeShopId === s.id ? "2px solid black" : "1px solid #ccc",
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {flowers.map((f) => (
          <div
            key={f.id}
            style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}
          >
            {f.imageUrl && (
              <img
                src={f.imageUrl}
                alt={f.name}
                style={{ width: "100%", borderRadius: 6, marginBottom: 8 }}
              />
            )}
            <div style={{ fontWeight: 600 }}>{f.name}</div>
            <div style={{ opacity: 0.8, fontSize: 14 }}>{f.description}</div>
            <div style={{ margin: "8px 0" }}>
              {(f.priceCents / 100).toFixed(2)} zł
            </div>
            <button onClick={() => add(f)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
