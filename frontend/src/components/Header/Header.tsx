import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <img src={logo} alt="Flower Delivery" className={styles.logo} />
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Shops
          </Link>
          <Link to="/cart" className={styles.navLink}>
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
