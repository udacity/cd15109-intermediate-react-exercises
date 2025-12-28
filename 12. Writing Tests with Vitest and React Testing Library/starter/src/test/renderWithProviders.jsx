import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { CartProvider } from "../cart/CartProvider.jsx";

export function renderWithProviders(ui) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={client}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper });
}
