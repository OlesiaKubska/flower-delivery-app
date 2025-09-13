import { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useCart } from "../cart/useCart";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

import { Autocomplete } from "@react-google-maps/api";
import Map from "../components/Map/Map";

export default function CartPage() {
  const { items, remove, changeQty, clear } = useCart();
  const navigate = useNavigate();

  const [coords, setCoords] = useState({ lat: 50.4501, lng: 30.5234 });
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

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

  const handlePlaceChanged = (
    setFieldValue: FormikHelpers<{
      email: string;
      phone: string;
      address: string;
    }>["setFieldValue"]
  ) => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry?.location;
        if (location) {
          setCoords({
            lat: location.lat(),
            lng: location.lng(),
          });
          setFieldValue("address", place.formatted_address || "");
        }
      }
    }
  };

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
      location: coords,
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
          {({ isSubmitting, setFieldValue }) => (
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

                <Autocomplete
                  onLoad={(a) => setAutocomplete(a)}
                  onPlaceChanged={() => handlePlaceChanged(setFieldValue)}
                >
                  <Field name="address" className={styles.input} />
                </Autocomplete>
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

        <Map lat={coords.lat} lng={coords.lng} />

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
