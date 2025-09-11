import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useCart } from "../cart/useCart";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, remove, changeQty, clear } = useCart();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const totalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.flower.priceCents * i.quantity, 0),
    [items]
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!items.length) return;

    const body = {
      email,
      phone,
      deliveryAddress: address,
      items: items.map((i) => ({
        flowerId: i.flower.id,
        quantity: i.quantity,
      })),
    };

    const res = await api.post("/orders", body);
    clear();
    navigate(`/order/${res.data.id}`);
  };

  return (
    <div>
      <h2>Shopping cart</h2>
      {!items.length && <p>Your cart is empty.</p>}

      {items.map((i) => (
        <div
          key={i.flower.id}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ minWidth: 220 }}>{i.flower.name}</div>
          <input
            type="number"
            min={1}
            value={i.quantity}
            onChange={(e) => changeQty(i.flower.id, Number(e.target.value))}
            style={{ width: 64 }}
          />
          <div>{((i.flower.priceCents * i.quantity) / 100).toFixed(2)} zł</div>
          <button onClick={() => remove(i.flower.id)}>Remove</button>
        </div>
      ))}

      <hr style={{ margin: "16px 0" }} />
      <div style={{ fontWeight: 700, marginBottom: 16 }}>
        Total: {(totalCents / 100).toFixed(2)} zł
      </div>

      <form
        onSubmit={submit}
        style={{ display: "grid", gap: 8, maxWidth: 420 }}
      >
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit" disabled={!items.length}>
          Submit order
        </button>
      </form>
    </div>
  );
}
