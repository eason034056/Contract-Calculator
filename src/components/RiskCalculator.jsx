import React, { useState, useEffect } from "react";
import "../styles.css";

function RiskCalculator() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [riskPercentage, setRiskPercentage] = useState(2);
  const [principal, setPrincipal] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [orderValue, setOrderValue] = useState(null);

  const calculateOrderValue = () => {
    const stopLossPercentage =
      Math.abs(entryPrice - stopLossPrice) / entryPrice;
    const calculatedOrderValue =
      principal * ( (riskPercentage / 100) / stopLossPercentage);
    setOrderValue(calculatedOrderValue);
  };

  const isButtonDisabled =
    !riskPercentage || !principal || !entryPrice || !stopLossPrice;

  return (
    <div className="risk-calculator-container">
      <h2>Risk Calculator</h2>
      <div>
        <label>Stop Loss Percentage (%):</label>
        <input
          type="number"
          value={riskPercentage}
          onChange={(e) => setRiskPercentage(e.target.value)}
        />
      </div>
      <div>
        <label>Principal:</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </div>
      <div>
        <label>Entry Price:</label>
        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Stop Loss Price:</label>
        <input
          type="number"
          value={stopLossPrice}
          onChange={(e) => setStopLossPrice(e.target.value)}
        />
      </div>
      <div>
        <button onClick={calculateOrderValue} disabled={isButtonDisabled}>
          Calculate Order Value
        </button>
      </div>
      {orderValue !== null && (
          <h3>Order Value: {orderValue.toFixed(2)}</h3>
      )}
    </div>
  );
}

export default RiskCalculator;
