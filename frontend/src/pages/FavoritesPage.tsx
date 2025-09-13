import { useFavorites } from "../favorites/useFavorites";
import { useCart } from "../cart/useCart";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { add } = useCart();

  if (!favorites.length) {
    return (
      <p className={styles.empty}>You don’t have favorite flowers yet 💐</p>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>⭐ My Favorites</h2>

      <div className={styles.grid}>
        {favorites.map((f) => (
          <div key={f.id} className={styles.card}>
            {f.imageUrl && (
              <img src={f.imageUrl} alt={f.name} className={styles.image} />
            )}
            <div className={styles.name}>{f.name}</div>
            <div className={styles.description}>{f.description}</div>
            <div className={styles.price}>
              {(f.priceCents / 100).toFixed(2)} €
            </div>

            <div className={styles.actions}>
              <button onClick={() => add(f)} className={styles.addBtn}>
                Add to cart
              </button>
              <button
                onClick={() => toggleFavorite(f)}
                className={`${styles.favBtn} ${
                  isFavorite(f.id) ? styles.activeFav : ""
                }`}
              >
                {isFavorite(f.id) ? "★ Remove" : "☆ Add"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
