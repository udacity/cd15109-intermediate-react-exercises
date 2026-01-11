import React from "react";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "./test/msw/server";
import { renderWithProviders } from "./test/renderWithProviders";
import App from "./App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cart flow (integration)", () => {
  it("loads products, adds items, and checkouts", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", { name: "Mini Cart" }),
    ).toBeInTheDocument();

    const addButtons = await screen.findAllByRole("button", {
      name: "Add to cart",
    });
    await user.click(addButtons[0]);
    await user.click(addButtons[0]);

    expect(screen.getByText("Items:")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Checkout" }));
    expect(await screen.findByText(/Checked out/)).toBeInTheDocument();

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
  });
});
