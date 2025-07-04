import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FundState {
  selectedStrategyId: string | null;
  selectedFundId: string | null;
}

const initialStrategyId =
  typeof window !== "undefined"
    ? localStorage.getItem("selectedStrategyId")
    : null;

const initialFundId =
  typeof window !== "undefined"
    ? localStorage.getItem("selectedFundId")
    : null;

const initialState: FundState = {
  selectedStrategyId: initialStrategyId,
  selectedFundId: initialFundId,
};

export const fundSlice = createSlice({
  name: "fund",
  initialState,
  reducers: {
    setSelectedStrategyId: (state, action: PayloadAction<string>) => {
      state.selectedStrategyId = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedStrategyId", action.payload);
      }
    },
    setSelectedFundId: (state, action: PayloadAction<string>) => {
      state.selectedFundId = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedFundId", action.payload);
      }
    },
  },
});

export const { setSelectedStrategyId, setSelectedFundId } = fundSlice.actions;

export default fundSlice.reducer;