"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setSelectedStrategyId, setSelectedFundId } from "../../store/slices/fundSlice";

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
  const dispatch = useDispatch();

  // Selectors from Redux store
  const selectedStrategyId = useSelector(
    (state: RootState) => state.fund.selectedStrategyId
  );
  const selectedFundId = useSelector(
    (state: RootState) => state.fund.selectedFundId
  );

  // Find selected strategy object
  const selectedStrategy =
    strategies.find((s) => s.id === selectedStrategyId) || null;

  function handleStrategyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const strategyId = e.target.value;
    dispatch(setSelectedStrategyId(strategyId));
    dispatch(setSelectedFundId("")); // reset fund when strategy changes
  }

  function handleFundChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setSelectedFundId(e.target.value));
  }

  return (
    <div>
      <label>
        Select Strategy:{" "}
        <select value={selectedStrategyId || ""} onChange={handleStrategyChange}>
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
            <select value={selectedFundId || ""} onChange={handleFundChange}>
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

      {selectedFundId && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Selected Fund:</strong>{" "}
          {selectedStrategy?.funds.find((f) => f.id === selectedFundId)?.name}
        </div>
      )}
    </div>
  );
}