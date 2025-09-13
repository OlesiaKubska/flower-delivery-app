import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import styles from "./styles/App.module.css";
import { LoadScript } from "@react-google-maps/api";

export default function App() {
  return (
    <>
      <Header />
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <main className={styles.container}>
          <Outlet />
        </main>
      </LoadScript>
    </>
  );
}
