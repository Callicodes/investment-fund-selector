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
  const strategy = useAppSelector((state) => state.fund.selectedStrategyId) as
    | "Growth"
    | "Responsible"
    | null;

  const [selectedFundId, setSelectedFundId] = useState<string | "">("");
  const [fundData, setFundData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFundChange = async (event: any) => {
    const fundId = event.target.value;
    if (!fundId) return; // Guard against empty fund IDs
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
    const savedFundId = localStorage.getItem("selectedFundId");
    if (savedFundId) {
      setSelectedFundId(savedFundId);
      handleFundChange({ target: { value: savedFundId } });
    }
  }, []);

  if (!strategy) return null;

  return (
    <Box mt={4}>
      <FormControl fullWidth>
        <InputLabel>Select Fund</InputLabel>
        <Select value={selectedFundId} onChange={handleFundChange} label="Select Fund">
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
          <Typography><strong>Name:</strong> {fundData.name}</Typography>
          <Typography><strong>Strategy:</strong> {fundData.strategy}</Typography>
          <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
            {JSON.stringify(fundData, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
}