import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PRODUCTS = [
  {
    id: "p1",
    name: "Canvas Tote",
    category: "apparel",
    price: 24,
    relatedIds: ["p2", "p7"],
  },
  {
    id: "p2",
    name: "Wool Beanie",
    category: "apparel",
    price: 18,
    relatedIds: ["p1", "p4"],
  },
  {
    id: "p3",
    name: "Desk Lamp",
    category: "home",
    price: 39,
    relatedIds: ["p6", "p7"],
  },
  {
    id: "p4",
    name: "Travel Hoodie",
    category: "apparel",
    price: 62,
    relatedIds: ["p2", "p1"],
  },
  {
    id: "p5",
    name: "Wireless Mouse",
    category: "electronics",
    price: 29,
    relatedIds: ["p6", "p8"],
  },
  {
    id: "p6",
    name: "Mechanical Keyboard",
    category: "electronics",
    price: 89,
    relatedIds: ["p5", "p8"],
  },
  {
    id: "p7",
    name: "Ceramic Mug",
    category: "home",
    price: 16,
    relatedIds: ["p3", "p1"],
  },
  {
    id: "p8",
    name: "USB-C Hub",
    category: "electronics",
    price: 49,
    relatedIds: ["p5", "p6"],
  },
];

const CATEGORIES = ["all", "apparel", "electronics", "home"];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function jitter(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchProducts({ category }) {
  await sleep(jitter(250, 450));
  const cat = CATEGORIES.includes(category) ? category : "all";
  if (cat === "all") return PRODUCTS.slice();
  return PRODUCTS.filter((p) => p.category === cat);
}

async function fetchProductById(productId) {
  await sleep(jitter(250, 450));
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) throw new Error("Product not found");
  return p;
}

async function fetchProductsByIds(ids) {
  await sleep(jitter(250, 450));
  const map = new Map(PRODUCTS.map((p) => [p.id, p]));
  const result = ids.map((id) => map.get(id));
  if (result.some((x) => !x)) throw new Error("Related product missing");
  return result;
}

const keys = {
  products: {
    list: (category) => ["products", "list", category],
    detail: (productId) => ["products", "detail", productId],
    related: (productId) => ["products", "related", productId],
  },
};

function useProducts(category) {
  return useQuery({
    queryKey: keys.products.list(category),
    queryFn: () => fetchProducts({ category }),
    staleTime: 30_000,
  });
}

function useProduct(productId) {
  return useQuery({
    queryKey: keys.products.detail(productId),
    queryFn: () => fetchProductById(productId),
    enabled: Boolean(productId),
    staleTime: 90_000,
  });
}

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
  const [{ category, productId }, setState] = React.useState(() =>
    readParams(),
  );

  React.useEffect(() => {
    const onPop = () => setState(readParams());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const productsQuery = useProducts(category);
  const productQuery = useProduct(productId);
  const relatedQuery = useRelatedProducts(productQuery.data);

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

          {productsQuery.isLoading && <div>Loading products…</div>}
          {productsQuery.isError && (
            <div style={{ color: "crimson" }}>
              Error: {productsQuery.error.message}
            </div>
          )}

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

          {!productId && <div>Select a product to see details.</div>}

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

                {relatedQuery.isLoading && <div>Loading related…</div>}
                {relatedQuery.isError && (
                  <div style={{ color: "crimson" }}>
                    Error: {relatedQuery.error.message}
                  </div>
                )}

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
