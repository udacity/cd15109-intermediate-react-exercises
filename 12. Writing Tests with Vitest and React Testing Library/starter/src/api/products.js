import { useQuery } from "@tanstack/react-query";

const fallbackProducts = [
  { id: "p1", name: "Widget", price: 5 },
  { id: "p2", name: "Gadget", price: 7 },
];

async function fetchProducts() {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Failed to load products");
    return await res.json();
  } catch {
    // If we're in the browser without an API,
    // return fallback data instead of crashing
    return fallbackProducts;
  }
}

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
