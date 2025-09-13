import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ShopsPage from "./pages/ShopsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.tsx";
import "./styles/index.css";
import { CartProvider } from "./cart/CartProvider";
import { FavoritesProvider } from "./favorites/FavoritesProvider.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ShopsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "order/:id", element: <OrderDetailsPage /> },
      { path: "favorites", element: <FavoritesPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </CartProvider>
  </React.StrictMode>
);
