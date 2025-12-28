import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "./test/msw/server";
import { renderWithProviders } from "./test/renderWithProviders";
import App from "./App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cart flow", () => {
  it("allows a user to add items and checkout", async () => {
    // Render App
    // Wait for products
    // Click add to cart
    // Assert updated count and total
    // Checkout
    // Assert cleared cart
  });
});
