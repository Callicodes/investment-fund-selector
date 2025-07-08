'use client';
import React, { useState, useEffect } from "react";
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
  const strategy = useAppSelector((state) => state.strategy.selectedStrategyId);
  const [selectedFundId, setSelectedFundId] = useState<string | "">("");
  const [fundData, setFundData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleFundChange = async (event: any) => {
    const fundId = event.target.value;
    setSelectedFundId(fundId);
    setLoading(true);
    setError(null);
    try {
      // Simulate async fetch
      await new Promise((res) => setTimeout(res, 500));
      setFundData({ id: fundId });
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
    const validIds = fundOptions[strategy].map(f => f.id);
    if (!validIds.includes(selectedFundId)) {
      setSelectedFundId("");
      setFundData(null);
    }
  }, [strategy, selectedFundId]);

  if (!hasMounted || !strategy || !["Growth", "Responsible"].includes(strategy)) return null;

  return (
    <Box mt={4}>
      <FormControl fullWidth>
        <InputLabel>Select Fund</InputLabel>
        <Select
          value={selectedFundId}
          onChange={handleFundChange}
          label="Select Fund"
        >
          {fundOptions[strategy].map((fund) => (
            <MenuItem key={fund.id} value={fund.id}>
              {fund.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      {fundData && (
        <div>Fund details: {fundData.id}</div>
      )}
    </Box>
  );
}