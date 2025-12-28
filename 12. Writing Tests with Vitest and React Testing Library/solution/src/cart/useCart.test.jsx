import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "./CartProvider.jsx";
import { useCart } from "./useCart";

function Harness() {
  const { count, addItem } = useCart();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => addItem({ id: "p1", name: "Widget", price: 5 })}>
        Add
      </button>
    </div>
  );
}

describe("useCart", () => {
  it("throws if used outside CartProvider", () => {
    expect(() => render(<Harness />)).toThrow(
      "useCart must be used within a CartProvider",
    );
  });

  it("updates state when actions are called inside provider", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <Harness />
      </CartProvider>,
    );

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
