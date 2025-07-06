"use client";
import React from "react";
import { Box, Typography, Slider } from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import RiskSlider from "./RiskSlider";

ChartJS.register(ArcElement, Tooltip, Legend);

interface FundDetailsProps {
  data: any;
}

export default function FundDetails({ data }: FundDetailsProps) {
  if (!data) return null;

  const analystRating = data?.analystRating ?? 0;
  const srri = data?.SRRI ?? 0;
  const portfolio = data?.portfolio?.asset ?? [];

  const pieData = {
    labels: portfolio.map((p: any) => p.label),
    datasets: [
      {
        data: portfolio.map((p: any) => p.value),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ]
      }
    ]
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Analyst Rating</Typography>
      <Typography variant="h6">Portfolio Allocation</Typography>
      <Pie data={pieData} />

      <RiskSlider value={srri} />

    </Box>
  );
}