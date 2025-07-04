"use client";

import React, { useState } from "react";

type Fund = {
  id: string;
  name: string;
};

type Strategy = {
  id: string;
  name: string;
  funds: Fund[];
};

const strategies: Strategy[] = [
  {
    id: "strategy1",
    name: "Growth Funds",
    funds: [
      { id: "BYW8RV9", name: "Cautious" },
      { id: "BYW8RX1", name: "Balanced" },
      { id: "BYW8VG2", name: "Adventurous" },
    ],
  },
  {
    id: "strategy2",
    name: "Responsible Growth Fund",
    funds: [{ id: "BN0S2V9", name: "Responsible Growth Fund" }],
  },
];

export default function StrategySelector() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  function handleStrategyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const strategy = strategies.find((s) => s.id === e.target.value) || null;
    setSelectedStrategy(strategy);
    setSelectedFund(null);
  }

  function handleFundChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!selectedStrategy) return;
    const fund = selectedStrategy.funds.find((f) => f.id === e.target.value) || null;
    setSelectedFund(fund);
  }

  return (
    <div>
      <label>
        Select Strategy:{" "}
        <select value={selectedStrategy?.id || ""} onChange={handleStrategyChange}>
          <option value="" disabled>
            -- Choose a strategy --
          </option>
          {strategies.map((strategy) => (
            <option key={strategy.id} value={strategy.id}>
              {strategy.name}
            </option>
          ))}
        </select>
      </label>

      {selectedStrategy && (
        <div style={{ marginTop: "1rem" }}>
          <label>
            Select Fund:{" "}
            <select value={selectedFund?.id || ""} onChange={handleFundChange}>
              <option value="" disabled>
                -- Choose a fund --
              </option>
              {selectedStrategy.funds.map((fund) => (
                <option key={fund.id} value={fund.id}>
                  {fund.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {selectedFund && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Selected Fund:</strong> {selectedFund.name}
        </div>
      )}
    </div>
  );
}