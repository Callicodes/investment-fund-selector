import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StrategyState {
  selectedStrategyId: "Growth" | "Responsible" | null;
}

const initialState: StrategyState = {
  selectedStrategyId: null,
};

export const strategySlice = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    setStrategy: (state, action: PayloadAction<"Growth" | "Responsible">) => {
      state.selectedStrategyId = action.payload;
    },
  },
});

export const { setStrategy } = strategySlice.actions;
export default strategySlice.reducer;