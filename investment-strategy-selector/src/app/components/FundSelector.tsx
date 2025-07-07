"use client";
import React, { useState, useEffect } from "react";
import { fetchFundData } from "../utils/fetchFundData";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";

const fundOptions = {
  Growth: [
    { name: "Cautious", id: "BYW8RV9" },
    { name: "Balanced", id: "BYW8RX1" },
    { name: "Adventurous", id: "BYW8VG2" },
  ],
  Responsible: [{ name: "Responsible", id: "BN0S2V9" }],
};

export default function FundSelector() {
  // Adjust the selector to match your actual Redux state structure.
  // For example, if your strategy slice is named 'strategySelector', update as follows:
    const strategy = useAppSelector((state) => state.strategySelector?.selectedStrategyId) as
      | "Growth"
      | "Responsible"
      | null;
  
  // If your strategy is nested differently, update the path accordingly.
  // Example: state.someParent.strategy.selectedStrategyId

  const [selectedFundId, setSelectedFundId] = useState<string>("");
  const [fundData, setFundData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Moved to top and supports both events and direct string input
  const handleFundChange = async (
    input: React.ChangeEvent<{ value: unknown }> | string
  ) => {
    const fundId = typeof input === "string" ? input : (input.target.value as string);
    if (!fundId) return;

    setSelectedFundId(fundId);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchFundData(fundId);
      setFundData(data);
      localStorage.setItem("selectedFundId", fundId);
    } catch (err) {
      setError("Failed to load fund data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!strategy || !fundOptions[strategy]) {
      setSelectedFundId("");
      setFundData(null);
      return;
    }

    const validIds = fundOptions[strategy].map((f) => f.id);
    if (!validIds.includes(selectedFundId)) {
      setSelectedFundId("");
      setFundData(null);
    }
  }, [strategy, selectedFundId]);

  useEffect(() => {
    const savedFundId = localStorage.getItem("selectedFundId");
    if (savedFundId && strategy && fundOptions[strategy]) {
      const validIds = fundOptions[strategy].map((f) => f.id);
      if (validIds.includes(savedFundId)) {
        setSelectedFundId(savedFundId);
        handleFundChange(savedFundId); // ✅ Clean call with string input
      }
    }
  }, [strategy]);

  if (!strategy) return null;

  return (
    <Box mt={4}>
      <FormControl fullWidth>
        <InputLabel>Select Fund</InputLabel>
        <Select
          value={selectedFundId}
          onChange={handleFundChange}
          label="Select Fund"
        >
          {fundOptions[strategy]?.map((fund) => (
            <MenuItem key={fund.id} value={fund.id}>
              {fund.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      {fundData && (
        <Box mt={4}>
          <Typography variant="h6">Fund Details</Typography>
          <Typography>
            <strong>Name:</strong> {fundData.name}
          </Typography>
          <Typography>
            <strong>Strategy:</strong> {fundData.strategy}
          </Typography>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              borderRadius: "8px",
              marginTop: "1rem",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(fundData, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
}