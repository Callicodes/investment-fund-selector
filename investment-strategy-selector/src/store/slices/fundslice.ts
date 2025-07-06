import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FundState {
  selectedStrategyId: "Growth" | "Responsible" | null;
  selectedFundId: string | null;
}

const validStrategies = ["Growth", "Responsible"];

const getInitialStrategyId = (): "Growth" | "Responsible" | null => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("selectedStrategyId");
    return validStrategies.includes(saved!) ? (saved as "Growth" | "Responsible") : null;
  }
  return null;
};

const getInitialFundId = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedFundId");
  }
  return null;
};

const initialState: FundState = {
  selectedStrategyId: getInitialStrategyId(),
  selectedFundId: getInitialFundId(),
};

export const fundSlice = createSlice({
  name: "fund",
  initialState,
  reducers: {
    setSelectedStrategyId: (state, action: PayloadAction<"Growth" | "Responsible">) => {
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