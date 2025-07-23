'use client';
import StrategySelector from "./components/StrategySelector";
import dynamic from "next/dynamic";

const FundSelector = dynamic(() => import("./components/FundSelector"), { ssr: false });

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Investment Fund Selector</h1>
      <StrategySelector />
      <FundSelector />
    </main>
  );
}