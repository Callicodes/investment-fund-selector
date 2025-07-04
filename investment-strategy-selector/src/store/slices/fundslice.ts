import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FundState {
  selectedFundId: string | null;
}

const initialFundId =
  typeof window !== "undefined"
    ? localStorage.getItem("selectedFundId")
    : null;

const initialState: FundState = {
  selectedFundId: initialFundId,
};

export const fundSlice = createSlice({
  name: "fund",
  initialState,
  reducers: {
    setSelectedFundId: (state, action: PayloadAction<string>) => {
      state.selectedFundId = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedFundId", action.payload);
      }
    },
  },
});

export const { setSelectedFundId } = fundSlice.actions;

export default fundSlice.reducer;