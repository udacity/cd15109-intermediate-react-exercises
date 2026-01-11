export const initialUiState = {
  sort: "newest",
  view: "grid",
  selectedIds: [],
};

export const UI_ACTIONS = {
  SET_SORT: "ui/setSort",
  SET_VIEW: "ui/setView",
  TOGGLE_SELECTED: "ui/toggleSelected",
  CLEAR_SELECTED: "ui/clearSelected",
};

export function uiReducer(state, action) {
  switch (action.type) {
    case UI_ACTIONS.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case UI_ACTIONS.SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };

    case UI_ACTIONS.TOGGLE_SELECTED: {
      const id = action.payload;
      const exists = state.selectedIds.includes(id);

      return {
        ...state,
        selectedIds: exists
          ? state.selectedIds.filter((x) => x !== id)
          : [...state.selectedIds, id],
      };
    }

    case UI_ACTIONS.CLEAR_SELECTED:
      return {
        ...state,
        selectedIds: [],
      };

    default:
      return state;
  }
}
