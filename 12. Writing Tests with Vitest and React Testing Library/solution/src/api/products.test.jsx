import React from "react";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { server } from "../test/msw/server";
import { http, HttpResponse } from "msw";
import { renderWithProviders } from "../test/renderWithProviders";
import { useProductsQuery } from "./products";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function ProductsProbe() {
  const { data, isLoading, isError } = useProductsQuery();

  if (isLoading) return <p role="status">Loading…</p>;
  if (isError) return <p role="alert">Error</p>;

  return <p>Loaded: {data.length}</p>;
}

describe("useProductsQuery (MSW)", () => {
  it("loads products successfully", async () => {
    renderWithProviders(<ProductsProbe />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(await screen.findByText("Loaded: 2")).toBeInTheDocument();
  });

  it("handles server error", async () => {
    server.use(
      http.get("/api/products", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<ProductsProbe />);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
