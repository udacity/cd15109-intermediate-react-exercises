import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { server } from "../test/msw/server";
import { renderWithProviders } from "../test/renderWithProviders";
import { useProductsQuery } from "./products";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function TestComponent() {
  // Call useProductsQuery and render state
  return null;
}

describe("useProductsQuery", () => {
  it("renders loading state", () => {
    // Render and assert loading appears
  });

  it("renders loaded data", async () => {
    // Wait for data and assert content
  });
});
