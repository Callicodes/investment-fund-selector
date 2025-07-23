'use client';
import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Box,
} from "@mui/material";


import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setStrategy } from "../../store/strategySlice";

export default function StrategySelector() {
  const dispatch = useAppDispatch();
  const selectedStrategy = useAppSelector((state) => state.strategy.selectedStrategyId);

  const handleStrategyChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as 'Growth' | 'Responsible';
    dispatch(setStrategy(value));
    localStorage.setItem('selectedStrategy', value); // Optional
  };

  // Load the selected strategy from localStorage on initial render

  useEffect(() => {
    const saved = localStorage.getItem('selectedStrategy') as 'Growth' | 'Responsible' | null;
    if (saved) dispatch(setStrategy(saved));
  }, [dispatch]);

  return (
    <Box mt={4}>
      <FormControl fullWidth>
        <InputLabel>Select Strategy</InputLabel>
        <Select
          value={selectedStrategy || ""}
          onChange={handleStrategyChange}
          label="Select Strategy"
        >
          <MenuItem value="Growth">Growth</MenuItem>
          <MenuItem value="Responsible">Responsible</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}