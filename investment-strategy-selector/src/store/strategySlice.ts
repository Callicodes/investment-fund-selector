import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//let's typescript know the shape of the state

interface StrategyState {
  selectedStrategyId: "Growth" | "Responsible" | null;
}

// Initial state for the strategy slice
const initialState: StrategyState = {
  selectedStrategyId: null,
};

// Create a slice for the strategy state - Part of the Redux Toolkit, combines actions and reducers
// This slice manages the selected investment strategy
// It handles the selection of strategies like "Growth" or "Responsible"


export const strategySlice = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    setStrategy: (state, action: PayloadAction<"Growth" | "Responsible">) => {
      state.selectedStrategyId = action.payload;
    },
  },
});

// Export the action creator for setting the strategy
// This allows components to dispatch actions to change the selected strategy
// The action is used to update the selected strategy in the Redux store

export const { setStrategy } = strategySlice.actions;

// Export the reducer to be used in the store
// This reducer will handle actions related to the strategy state
// It will be combined with other reducers in the Redux store configuration
export default strategySlice.reducer;