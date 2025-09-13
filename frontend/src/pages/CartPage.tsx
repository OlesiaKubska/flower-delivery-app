import { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCart } from "../cart/useCart";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { items, remove, changeQty, clear } = useCart();
  const navigate = useNavigate();

  const totalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.flower.priceCents * i.quantity, 0),
    [items]
  );

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .min(9, "Too short")
      .max(15, "Too long")
      .required("Required"),
    address: Yup.string().required("Required"),
  });

  const submit = async (values: {
    email: string;
    phone: string;
    address: string;
  }) => {
    if (!items.length) return;

    const body = {
      email: values.email,
      phone: values.phone,
      deliveryAddress: values.address,
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
    <div className={styles.container}>
      <h2 className={styles.title}>Shopping cart</h2>

      {!items.length && <p className={styles.empty}>Your cart is empty.</p>}

      <div className={styles.layout}>
        <Formik
          initialValues={{ email: "", phone: "", address: "" }}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <label>
                <div className={styles.label}>Email:</div>
                <Field name="email" type="email" className={styles.input} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label>
                <div className={styles.label}>Phone:</div>
                <Field name="phone" className={styles.input} />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label>
                <div className={styles.label}>Delivery address:</div>
                <Field name="address" className={styles.input} />
                <ErrorMessage
                  name="address"
                  component="div"
                  className={styles.error}
                />
              </label>

              <button
                type="submit"
                disabled={!items.length || isSubmitting}
                className={styles.button}
              >
                Submit order
              </button>
            </Form>
          )}
        </Formik>

        <div className={styles.products}>
          {items.map((i) => (
            <div key={i.flower.id} className={styles.item}>
              {i.flower.imageUrl && (
                <img
                  src={i.flower.imageUrl}
                  alt={i.flower.name}
                  className={styles.image}
                />
              )}
              <div className={styles.itemName}>{i.flower.name}</div>
              <input
                type="number"
                min={1}
                value={i.quantity}
                onChange={(e) => changeQty(i.flower.id, Number(e.target.value))}
                className={styles.itemInput}
              />
              <div className={styles.itemPrice}>
                ${((i.flower.priceCents * i.quantity) / 100).toFixed(2)}
              </div>
              <button
                onClick={() => remove(i.flower.id)}
                className={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          ))}

          {items.length > 0 && (
            <div className={styles.total}>
              Total: ${(totalCents / 100).toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
