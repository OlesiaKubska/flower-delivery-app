import { useEffect, useState } from "react";
import { api } from "../services/api";
import type {
  Flower,
  Shop,
  FlowersParams,
  SortField,
  SortOrder,
} from "../types";
import { useCart } from "../cart/useCart";
import { useFavorites } from "../favorites/useFavorites";
import styles from "./ShopsPage.module.css";

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [activeShopId, setActiveShopId] = useState<number | undefined>();
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { add } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    api.get<Shop[]>("/shops").then((res) => {
      setShops(res.data);
      if (res.data.length) setActiveShopId(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    const params: FlowersParams = {
      page,
      limit: 6,
    };
    if (activeShopId) params.shopId = activeShopId;

    api
      .get<{ data: Flower[]; pagination: { totalPages: number } }>("/flowers", {
        params,
      })
      .then((res) => {
        const sorted = [...res.data.data];

        if (sortBy === "price") {
          sorted.sort((a, b) =>
            sortOrder === "asc"
              ? a.priceCents - b.priceCents
              : b.priceCents - a.priceCents
          );
        } else if (sortBy === "date") {
          sorted.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          });
        }

        setFlowers(sorted);
        setTotalPages(res.data.pagination.totalPages);
      });
  }, [activeShopId, sortBy, sortOrder, page]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <h1 className={styles.header}>🌸 Flower Delivery</h1>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h2 className={styles.title}>Shops:</h2>
          <div className={styles.shopButtons}>
            {shops.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveShopId(s.id);
                  setPage(1);
                }}
                className={`${styles.shopButton} ${
                  activeShopId === s.id ? styles.active : ""
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </aside>

        <section className={styles.flowersSection}>
          <div className={styles.sortBar}>
            <span>Sort by:</span>
            <button
              className={`${styles.sortBtn} ${
                sortBy === "price" ? styles.activeSort : ""
              }`}
              onClick={() => handleSort("price")}
            >
              Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`${styles.sortBtn} ${
                sortBy === "date" ? styles.activeSort : ""
              }`}
              onClick={() => handleSort("date")}
            >
              Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
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
                  ${(f.priceCents / 100).toFixed(2)}
                </div>
                <button onClick={() => add(f)} className={styles.addBtn}>
                  Add to cart
                </button>
                <button
                  onClick={() => toggleFavorite(f)}
                  className={`${styles.favBtn} ${
                    isFavorite(f.id) ? styles.activeFav : ""
                  }`}
                >
                  {isFavorite(f.id) ? "★ Favorite" : "☆ Add to favorites"}
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Пагінація */}
          <div className={styles.pagination}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
