import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// TODO: Add a small in-memory PRODUCTS dataset (at least ~8 items) with:
// id, name, category, price, relatedIds
const PRODUCTS = [];

// TODO: Keep the allowed categories in one place.
// Include: all, apparel, electronics, home
const CATEGORIES = ["all", "apparel", "electronics", "home"];

// Keep latency simulation (already set up for you)
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function jitter(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO: Implement a fake API that returns filtered products.
// - Use simulated latency
// - Treat invalid/missing category as "all"
// - Return all products for "all", otherwise filter by category
async function fetchProducts({ category }) {
  await sleep(jitter(250, 450));
  throw new Error("Not implemented");
}

// TODO: Implement a fake API that returns a single product by id.
// - Use simulated latency
// - Throw a friendly Error when not found
async function fetchProductById(productId) {
  await sleep(jitter(250, 450));
  throw new Error("Not implemented");
}

// TODO: Implement a fake API that returns products for a list of ids.
// - Use simulated latency
// - Throw if any are missing
async function fetchProductsByIds(ids) {
  await sleep(jitter(250, 450));
  throw new Error("Not implemented");
}

// TODO: Create a tiny query key factory for:
// - filtered list (category)
// - detail (productId)
// - related (stable key; can be productId-based or ids-based)
const keys = {
  products: {
    list: (category) => ["products", "list", category],
    detail: (productId) => ["products", "detail", productId],
    related: (productId) => ["products", "related", productId],
  },
};

// TODO: Turn this into a thin custom hook for the products list.
// Requirements:
// - dynamic key based on category
// - intentional staleTime (list should be shorter than detail)
function useProducts(category) {
  return useQuery({
    queryKey: keys.products.list(category),
    queryFn: () => fetchProducts({ category }),
    staleTime: 30_000,
  });
}

// TODO: Turn this into a thin custom hook for product detail.
// Requirements:
// - enabled should prevent running without a productId
// - longer staleTime than list
function useProduct(productId) {
  return useQuery({
    queryKey: keys.products.detail(productId),
    queryFn: () => fetchProductById(productId),
    enabled: Boolean(productId),
    staleTime: 90_000,
  });
}

// TODO: Turn this into a dependent query hook for related products.
// Requirements:
// - use enabled so it DOES NOT run until product detail is available
// - uses the selected product's relatedIds
function useRelatedProducts(product) {
  return useQuery({
    queryKey: product
      ? keys.products.related(product.id)
      : ["products", "related", "none"],
    queryFn: () => fetchProductsByIds(product.relatedIds),
    enabled: Boolean(product),
    staleTime: 90_000,
  });
}

// URL helpers (provided)
// The URL is the source of truth for category + product selection.
function readParams() {
  const sp = new URLSearchParams(window.location.search);
  const categoryRaw = sp.get("category") || "all";
  const category = CATEGORIES.includes(categoryRaw) ? categoryRaw : "all";
  const productId = sp.get("product") || "";
  return { category, productId };
}

function setSearchParams(next) {
  const sp = new URLSearchParams(window.location.search);
  Object.entries(next).forEach(([k, v]) => {
    if (!v) sp.delete(k);
    else sp.set(k, v);
  });
  const url = `${window.location.pathname}?${sp.toString()}`;
  window.history.pushState({}, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function App() {
  const queryClient = useQueryClient();

  // Keep URL sync (provided)
  const [{ category, productId }, setState] = React.useState(() =>
    readParams(),
  );

  React.useEffect(() => {
    const onPop = () => setState(readParams());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // TODO: Wire up queries using your custom hooks:
  // - products list depends on category
  // - product detail depends on productId
  // - related is dependent on the loaded product detail
  const productsQuery = useProducts(category);
  const productQuery = useProduct(productId);
  const relatedQuery = useRelatedProducts(productQuery.data);

  // TODO: Implement prefetch-on-hover for product detail.
  // Use queryClient.prefetchQuery with:
  // - the detail query key
  // - the same detail query function
  // - a sensible staleTime
  function prefetchDetail(id) {
    queryClient.prefetchQuery({
      queryKey: keys.products.detail(id),
      queryFn: () => fetchProductById(id),
      staleTime: 90_000,
    });
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 16,
        maxWidth: 980,
        margin: "0 auto",
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
        <h1 style={{ margin: 0 }}>Products Explorer</h1>

        {/* TODO: Show a simple "syncing" indicator driven by query fetching state */}
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          {productsQuery.isFetching ||
          productQuery.isFetching ||
          relatedQuery.isFetching
            ? "Syncing…"
            : "Idle"}
        </div>
      </header>

      <section
        style={{
          marginTop: 12,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* TODO: Keep category controlled by URL param.
            When it changes, update the URL and clear selection. */}
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 14 }}>Category</span>
          <select
            value={category}
            onChange={(e) =>
              setSearchParams({ category: e.target.value, product: "" })
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {/* Provided: clear selection */}
        <button
          type="button"
          onClick={() => setSearchParams({ product: "" })}
          disabled={!productId}
        >
          Clear selection
        </button>
      </section>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <section
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
        >
          <h2 style={{ marginTop: 0, fontSize: 16 }}>List</h2>

          {/* TODO: Implement list loading + error states */}
          {productsQuery.isLoading && <div>Loading products…</div>}
          {productsQuery.isError && (
            <div style={{ color: "crimson" }}>
              Error: {productsQuery.error.message}
            </div>
          )}

          {/* TODO: Render the filtered list.
              - Hover should prefetch detail
              - Click should set product=<id> in the URL */}
          {productsQuery.data && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 10,
              }}
            >
              {productsQuery.data.map((p) => (
                <li
                  key={p.id}
                  onMouseEnter={() => prefetchDetail(p.id)}
                  style={{
                    border:
                      p.id === productId ? "2px solid #111" : "1px solid #ddd",
                    borderRadius: 10,
                    padding: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                  }}
                  onClick={() => setSearchParams({ product: p.id })}
                >
                  <div style={{ display: "grid", gap: 4 }}>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.75 }}>
                      {p.category} • ${p.price}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>{p.id}</div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
        >
          <h2 style={{ marginTop: 0, fontSize: 16 }}>Detail</h2>

          {/* Provided: empty selection state */}
          {!productId && <div>Select a product to see details.</div>}

          {/* TODO: Implement detail loading + error states (including a way to clear selection) */}
          {productId && productQuery.isLoading && <div>Loading product…</div>}

          {productId && productQuery.isError && (
            <div>
              <div style={{ color: "crimson" }}>
                Error: {productQuery.error.message}
              </div>
              <button
                type="button"
                style={{ marginTop: 10 }}
                onClick={() => setSearchParams({ product: "" })}
              >
                Clear selection
              </button>
            </div>
          )}

          {/* TODO: Render product details and the related products section.
              Related products must come from a dependent query using enabled. */}
          {productQuery.data && (
            <div style={{ display: "grid", gap: 12 }}>
              <div
                style={{
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {productQuery.data.id}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>
                  {productQuery.data.name}
                </div>
                <div style={{ fontSize: 14 }}>
                  {productQuery.data.category} •{" "}
                  <strong>${productQuery.data.price}</strong>
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Related</div>

                {/* TODO: Implement related loading + error states */}
                {relatedQuery.isLoading && <div>Loading related…</div>}
                {relatedQuery.isError && (
                  <div style={{ color: "crimson" }}>
                    Error: {relatedQuery.error.message}
                  </div>
                )}

                {/* TODO: Render related products list (clicking sets product=<id> in URL) */}
                {relatedQuery.data && (
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {relatedQuery.data.map((rp) => (
                      <li key={rp.id} style={{ marginBottom: 6 }}>
                        <button
                          type="button"
                          onClick={() => setSearchParams({ product: rp.id })}
                          style={{
                            background: "transparent",
                            border: 0,
                            padding: 0,
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {rp.name}
                        </button>{" "}
                        <span style={{ fontSize: 12, opacity: 0.7 }}>
                          (${rp.price})
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
