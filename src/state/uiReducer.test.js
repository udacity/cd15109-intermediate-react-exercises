import { describe, expect, test } from "vitest";
import { uiReducer, initialUiState, UI_ACTIONS } from "./uiReducer";

describe("uiReducer", () => {
  test("SET_SORT updates sort", () => {
    const state = { ...initialUiState, sort: "newest" };
    const next = uiReducer(state, { type: UI_ACTIONS.SET_SORT, payload: "priority" });

    expect(next.sort).toBe("priority");
    expect(next).not.toBe(state);
    expect(state.sort).toBe("newest");
  });

  test("SET_VIEW updates view", () => {
    const state = { ...initialUiState, view: "grid" };
    const next = uiReducer(state, { type: UI_ACTIONS.SET_VIEW, payload: "list" });

    expect(next.view).toBe("list");
    expect(next).not.toBe(state);
    expect(state.view).toBe("grid");
  });

  test("TOGGLE_SELECTED adds an id when not selected", () => {
    const state = { ...initialUiState, selectedIds: [] };
    const next = uiReducer(state, { type: UI_ACTIONS.TOGGLE_SELECTED, payload: 42 });

    expect(next.selectedIds).toEqual([42]);
    expect(next.selectedIds).not.toBe(state.selectedIds);
    expect(state.selectedIds).toEqual([]);
  });

  test("TOGGLE_SELECTED removes an id when already selected", () => {
    const state = { ...initialUiState, selectedIds: [42] };
    const next = uiReducer(state, { type: UI_ACTIONS.TOGGLE_SELECTED, payload: 42 });

    expect(next.selectedIds).toEqual([]);
    expect(next.selectedIds).not.toBe(state.selectedIds);
    expect(state.selectedIds).toEqual([42]);
  });

  test("CLEAR_SELECTED clears selectedIds", () => {
    const state = { ...initialUiState, selectedIds: [1, 2, 3] };
    const next = uiReducer(state, { type: UI_ACTIONS.CLEAR_SELECTED });

    expect(next.selectedIds).toEqual([]);
    expect(next.selectedIds).not.toBe(state.selectedIds);
    expect(state.selectedIds).toEqual([1, 2, 3]);
  });

  test("unknown action returns the same object reference", () => {
    const state = { ...initialUiState };
    const next = uiReducer(state, { type: "DOES_NOT_EXIST" });

    expect(next).toBe(state);
  });
});
