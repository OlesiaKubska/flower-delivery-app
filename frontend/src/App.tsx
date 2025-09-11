import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <header
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ marginRight: "auto" }}>🌸 Flower Delivery</h1>
        <Link to="/">Shops</Link>
        <Link to="/cart">Cart</Link>
      </header>
      <Outlet />
    </div>
  );
}
