import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
}
