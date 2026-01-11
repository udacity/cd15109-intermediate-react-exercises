import React from "react";
import { CartProvider, useCartState } from "./cart/CartProvider";
import {
  useCartCount,
  useCartTotal,
  useCartOperations,
} from "./cart/cartHooks";
import { ToastProvider } from "./ui/ToastProvider";

const PRODUCTS = [
  { id: "p1", name: "Socks", price: 6 },
  { id: "p2", name: "T-Shirt", price: 18 },
  { id: "p3", name: "Hoodie", price: 52 },
  { id: "p4", name: "Cap", price: 14 },
];

function CartUI() {
  const { items } = useCartState();
  const count = useCartCount();
  const total = useCartTotal();
  const ops = useCartOperations();

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 16,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Cart Provider</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <section
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 12,
            minHeight: 280,
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 16 }}>Products</h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 10,
            }}
          >
            {PRODUCTS.map((p) => (
              <li
                key={p.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>${p.price}</div>
                </div>
                <button type="button" onClick={() => ops.add(p)}>
                  Add
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 12,
            minHeight: 280,
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 16 }}>Cart</h2>
            <button
              type="button"
              onClick={() => ops.clear()}
              disabled={items.length === 0}
            >
              Clear
            </button>
          </header>

          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
            {count} items • ${total}
          </div>

          {items.length === 0 ? (
            <div>Your cart is empty.</div>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 10,
              }}
            >
              {items.map((it) => (
                <li
                  key={it.id}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "grid", gap: 2 }}>
                      <div style={{ fontWeight: 700 }}>{it.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.75 }}>
                        ${it.price}
                      </div>
                    </div>

                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <button
                        type="button"
                        onClick={() => ops.update(it.id, it.qty - 1)}
                      >
                        -
                      </button>
                      <div style={{ minWidth: 24, textAlign: "center" }}>
                        {it.qty}
                      </div>
                      <button
                        type="button"
                        onClick={() => ops.update(it.id, it.qty + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button type="button" onClick={() => ops.remove(it.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <CartUI />
      </CartProvider>
    </ToastProvider>
  );
}
