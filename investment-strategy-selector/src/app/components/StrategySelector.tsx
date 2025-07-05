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

// Add the prop type definition here
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
      // fetchFundData logic here
    } catch (err) {
      setError("Failed to load fund data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // logic for loading saved fundId if needed
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
        // Render fund details here
        <div>Fund details...</div>
      )}
    </Box>
  );
}