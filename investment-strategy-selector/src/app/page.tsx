import StrategySelector from "./components/StrategySelector";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Investment Fund Selector</h1>
      <StrategySelector />
    </main>
  );
}