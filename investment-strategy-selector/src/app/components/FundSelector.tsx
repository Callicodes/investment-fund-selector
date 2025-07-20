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
  LinearProgress,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import PieChartComponent from "./PieChartComponent";

interface FundData {
  name: string;
  analystRating: number;
  srri: number;
  portfolio: {
    asset: { name: string; value: number }[];
  };
}

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
  const [fundData, setFundData] = useState<FundData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFundChange = async (event: SelectChangeEvent<string>) => {
    const fundId = event.target.value;
    if (!fundId) return;

    setSelectedFundId(fundId);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${fundId}.json`
      );
      if (!response.ok) throw new Error(`Failed to fetch fund data: ${response.statusText}`);

      const data: FundData = await response.json();
      setFundData(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedFundId", fundId);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load fund data. Please try again later.");
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

    if (typeof window !== "undefined") {
      const savedFundId = localStorage.getItem("selectedFundId");
      const validIds = fundOptions[strategy].map((f) => f.id);

      if (savedFundId && validIds.includes(savedFundId)) {
        setSelectedFundId(savedFundId);
        (async () => {
          await handleFundChange({ target: { value: savedFundId } } as SelectChangeEvent);
        })();
      }
    }
  }, [strategy]);

  if (!strategy) {
    return (
      <Box mt={4}>
        <Typography variant="h6" color="textSecondary">
          Please select a strategy to view available funds.
        </Typography>
      </Box>
    );
  }

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

      {loading && (
        <Box mt={2}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Loading fund data...
          </Typography>
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}

      {fundData && (
        <Box mt={4}>
          <Typography variant="h6">Fund Details</Typography>
          <Typography>
            <strong>Name:</strong> {fundData.name}
          </Typography>
          <Typography>
            <strong>Analyst Rating:</strong>{" "}
            {"⭐".repeat(Math.round(fundData.analystRating))}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>SRRI (Risk Level):</strong> {fundData.srri} / 10
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(fundData.srri / 10) * 100}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />

          <Typography variant="h6" sx={{ mt: 4 }}>
            Asset Allocation
          </Typography>
          <PieChartComponent data={fundData.portfolio?.asset || []} />
        </Box>
      )}
    </Box>
  );
}