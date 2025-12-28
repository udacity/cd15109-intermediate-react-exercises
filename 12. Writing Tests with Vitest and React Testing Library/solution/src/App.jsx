import { CartProvider } from "./cart/CartProvider.jsx";
import { useCart } from "./cart/useCart";
import { useProductsQuery } from "./api/products";

function ProductsList() {
  const { data, isLoading, isError, error } = useProductsQuery();
  const { addItem } = useCart();

  if (isLoading) return <p role="status">Loading…</p>;
  if (isError) return <p role="alert">{error.message}</p>;

  return (
    <section aria-label="Products">
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            <span>
              {p.name} (${p.price})
            </span>{" "}
            <button onClick={() => addItem(p)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CartSummary() {
  const { count, total, checkout, checkoutMessage, clearCheckoutMessage } =
    useCart();

  return (
    <section aria-label="Cart">
      <p>
        Items: <strong>{count}</strong>
      </p>
      <p>
        Total: <strong>${total}</strong>
      </p>

      <button onClick={checkout} disabled={count === 0}>
        Checkout
      </button>

      {checkoutMessage ? (
        <p role="status">
          {checkoutMessage}{" "}
          <button onClick={clearCheckoutMessage}>Dismiss</button>
        </p>
      ) : null}
    </section>
  );
}

export default function App() {
  return (
    <CartProvider>
      <h1>Mini Cart</h1>
      <ProductsList />
      <CartSummary />
    </CartProvider>
  );
}
