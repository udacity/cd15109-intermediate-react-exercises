import { describe, expect, test } from "vitest";
import { getSelectedCount } from "./uiSelectors";

describe("uiSelectors", () => {
  test("getSelectedCount returns length", () => {
    expect(getSelectedCount({ selectedIds: [] })).toBe(0);
    expect(getSelectedCount({ selectedIds: [1, 2, 3] })).toBe(3);
  });
});
