import React from "react";
import { Slider, Typography, Box } from "@mui/material";

interface RiskSliderProps {
  value: number;
}

const RiskSlider: React.FC<RiskSliderProps> = ({ value }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Risk Level (SRRI): {value}
      </Typography>
      <Slider
        value={value}
        min={0}
        max={10}
        step={1}
        disabled
        marks
        valueLabelDisplay="auto"
        sx={{ color: '#f44336' }}
      />
    </Box>
  );
};

export default RiskSlider;