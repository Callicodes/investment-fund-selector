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
} from "@mui/material";

interface FundSelectorProps {
  strategy: "Growth" | "Responsible";
}

const fundOptions = {
  Growth: [
    { name: "Cautious", id: "BYW8RV9" },
    { name: "Balanced", id: "BYW8RX1" },
    { name: "Adventurous", id: "BYW8VG2" },
  ],
  Responsible: [{ name: "Responsible", id: "BN0S2V9" }],
};

export default function FundSelector({ strategy }: FundSelectorProps) {
  const [selectedFundId, setSelectedFundId] = useState<string | "">("");
  const [fundData, setFundData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFundChange = async (event: any) => {
    const fundId = event.target.value;
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

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select Fund</InputLabel>
        <Select value={selectedFundId} onChange={handleFundChange} label="Select Fund">
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
        <pre style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          {JSON.stringify(fundData, null, 2)}
        </pre>
      )}
    </>
  );
}