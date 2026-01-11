import React from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import { addItem, updateQty, removeItem, clearCart } from "./cartActions";

const PRODUCTS = [
  { id: "p1", name: "Socks", price: 6 },
  { id: "p2", name: "T-Shirt", price: 18 },
  { id: "p3", name: "Hoodie", price: 52 },
  { id: "p4", name: "Cap", price: 14 },
];

function getTotals(items) {
  const itemCount = items.reduce((sum, it) => sum + it.qty, 0);
  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);
  return { itemCount, total };
}

export default function App() {
  // TODO: Replace this with useReducer(cartReducer, initialCartState)
  const [state, dispatch] = React.useState(initialCartState);

  const { itemCount, total } = getTotals(state.items);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 16,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginTop: 0 }}>Cart Reducer</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <section
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
        >
          <h2 style={{ marginTop: 0, fontSize: 16 }}>Products</h2>

          {/* TODO: Render products with an Add button that dispatches ADD */}
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
                <button type="button">Add</button>
              </li>
            ))}
          </ul>
        </section>

        <section
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
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

            {/* TODO: Wire up Clear cart (dispatch CLEAR) */}
            <button type="button">Clear</button>
          </header>

          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
            {itemCount} items • ${total}
          </div>

          {/* TODO: Show empty state when cart is empty */}
          <div>Your cart is empty.</div>

          {/* TODO: When cart has items:
              - render each item row
              - '-' dispatches UPDATE with qty-1
              - '+' dispatches UPDATE with qty+1
              - Remove dispatches REMOVE
           */}
        </section>
      </div>
    </div>
  );
}
