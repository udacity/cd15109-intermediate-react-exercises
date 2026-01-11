import { cartReducer, initialCartState } from "./cartReducer";
import { describe, it, expect } from "vitest";

describe("cartReducer", () => {
  it("ADD_ITEM adds a new item with quantity 1", () => {
    const next = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      payload: { item: { id: "p1", name: "Widget", price: 5 } },
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toMatchObject({ id: "p1", quantity: 1 });
  });

  it("ADD_ITEM increments quantity if item exists", () => {
    const state = {
      items: [{ id: "p1", name: "Widget", price: 5, quantity: 1 }],
    };

    const next = cartReducer(state, {
      type: "ADD_ITEM",
      payload: { item: { id: "p1", name: "Widget", price: 5 } },
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0].quantity).toBe(2);
  });

  it("REMOVE_ITEM decrements quantity and removes at 0", () => {
    const state = {
      items: [{ id: "p1", name: "Widget", price: 5, quantity: 2 }],
    };

    const next1 = cartReducer(state, {
      type: "REMOVE_ITEM",
      payload: { id: "p1" },
    });
    expect(next1.items[0].quantity).toBe(1);

    const next2 = cartReducer(next1, {
      type: "REMOVE_ITEM",
      payload: { id: "p1" },
    });
    expect(next2.items).toHaveLength(0);
  });

  it("CLEAR resets to initial state", () => {
    const state = {
      items: [{ id: "p1", name: "Widget", price: 5, quantity: 3 }],
    };

    const next = cartReducer(state, { type: "CLEAR" });
    expect(next).toEqual(initialCartState);
  });
});
