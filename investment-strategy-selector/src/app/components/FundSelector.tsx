"use client";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import PieChartComponent from "./PieChartComponent";

const fundOptions = {
  Growth: [
    { name: "Cautious", id: "BYW8RV9" },
    { name: "Balanced", id: "BYW8RX1" },
    { name: "Adventurous", id: "BYW8VG2" },
  ],
  Responsible: [{ name: "Responsible", id: "BN0S2V9" }],
};

export default function FundSelector() {
  const strategy = useAppSelector((state) => state.strategy.selectedStrategyId);
  const [selectedFundId, setSelectedFundId] = useState<string>("");
  const [fundData, setFundData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFundChange = async (event: SelectChangeEvent<string>) => {
    const fundId = event.target.value;
    if (!fundId) return;

    setSelectedFundId(fundId);
    setLoading(true);
    setError(null);

    try {
      // Simulate fetch
      const mockData = {
        name: fundOptions[strategy!].find(f => f.id === fundId)?.name || "Unknown",
        strategy,
        allocation: [
          { name: "Equities", value: 50 },
          { name: "Bonds", value: 30 },
          { name: "Cash", value: 20 },
        ],
      };

      await new Promise((res) => setTimeout(res, 800)); // Simulated delay

      setFundData(mockData);
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

    const savedFundId = localStorage.getItem("selectedFundId");
    const validIds = fundOptions[strategy].map((f) => f.id);

    if (savedFundId && validIds.includes(savedFundId)) {
      setSelectedFundId(savedFundId);
      handleFundChange({ target: { value: savedFundId } } as SelectChangeEvent);
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

          <Typography variant="h6" sx={{ mt: 3 }}>
            Fund Allocation
          </Typography>
          <PieChartComponent data={fundData.allocation} />
        </Box>
      )}
    </Box>
  );
}