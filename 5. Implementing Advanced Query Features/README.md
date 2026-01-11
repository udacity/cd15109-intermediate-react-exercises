# Exercise: Advanced React Query Features

You’ll build a tiny single-screen “Products Explorer” that practices:

- Dynamic query keys
- Product detail query
- Dependent queries with `enabled`
- Prefetching on hover (`queryClient.prefetchQuery`)
- URL-synced filters (category) + selected product
- Per-query `staleTime`
- Key factories + small custom query hooks

## Files you edit

- `src/main.jsx`
- `src/App.jsx`

## UI behavior (single screen)

Your app has:

1. A category filter driven by URL search param:
   - `?category=all|apparel|electronics|home`
   - If missing/invalid, treat as `all`

2. A product list (filtered by category)
   - Each row shows name + price
   - On hover, prefetch that product’s detail query
   - On click, set `?product=<id>` in the URL

3. A detail panel (right side or below the list is fine)
   - Reads selected product from URL search param: `?product=<id>`
   - If no `product` param, show “Select a product”
   - If invalid id, show an error state

4. Related products section
   - Loaded via a dependent query using `enabled`
   - Must not run until the product detail query succeeds
   - Uses the selected product’s `relatedIds`

## Data + fake API (in-memory)

Inside `src/App.jsx`, create:

- An in-memory dataset of at least 8 products:
  - `id` (string)
  - `name` (string)
  - `category` (`apparel` | `electronics` | `home`)
  - `price` (number)
  - `relatedIds` (string[])

Create async functions with simulated latency (~250–500ms):

- `fetchProducts({ category })`
- `fetchProductById(productId)` (throw if not found)
- `fetchProductsByIds(ids)` (throw if any missing)

## React Query requirements

### A) Query key factory

In `src/App.jsx`, define a small key factory:

- `keys.products.list(category)`
- `keys.products.detail(productId)`
- `keys.products.related(productId)` (or based on ids—your choice, but stable)

### B) Custom hooks

Create thin wrappers:

- `useProducts(category)`
- `useProduct(productId)`
- `useRelatedProducts(product)`

Dependent query requirement:

- `useRelatedProducts(product)` uses `enabled: Boolean(product)`
- It reads `product.relatedIds`

### C) Prefetch on hover

When hovering a product row, prefetch its detail query:

- `queryClient.prefetchQuery({ queryKey, queryFn, staleTime })`

### D) staleTime

Use staleTime intentionally:

- List: 20–60s
- Detail: 60–120s
- Related: 60–120s

## URL sync requirements (no router needed)

Use `window.history.pushState` to update search params.
Listen to `popstate` so Back/Forward updates the UI.

The URL must remain the source of truth for:

- `category`
- `product`

## Acceptance checklist

- Changing the filter updates the URL and refetches the list
- Clicking a product updates `?product=...` and loads detail
- Hovering a product prefetches detail (detail should feel faster after hover)
- Related query does not run until product detail is available (enabled dependency)
- Invalid `product` id shows an error + “Clear selection” action
