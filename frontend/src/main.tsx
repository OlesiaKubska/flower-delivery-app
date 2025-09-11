import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ShopsPage from "./pages/ShopsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.tsx";
import "./index.css";
import { CartProvider } from "./cart/CartProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ShopsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "order/:id", element: <OrderDetailsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
