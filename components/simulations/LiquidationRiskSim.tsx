import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ExclamationTriangleIcon } from '../icons/Icons';

const LiquidationRiskSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [collateralAmount, setCollateralAmount] = useState(2); // ETH
  const [collateralPrice, setCollateralPrice] = useState(3500); // Price of ETH
  const [borrowedAmount, setBorrowedAmount] = useState(4000); // pUSD
  const [liquidationThreshold] = useState(0.85); // 85%

  const collateralValue = collateralAmount * collateralPrice;
  const healthFactor = useMemo(() => {
    if (borrowedAmount === 0) return Infinity;
    return (collateralValue * liquidationThreshold) / borrowedAmount;
  }, [collateralValue, borrowedAmount, liquidationThreshold]);

  const liquidationPrice = useMemo(() => {
    if (collateralAmount === 0) return 0;
    return borrowedAmount / (collateralAmount * liquidationThreshold);
  }, [borrowedAmount, collateralAmount, liquidationThreshold]);

  const getHealthColor = () => {
    if (healthFactor <= 1.1) return { text: 'text-red-500', bg: 'bg-red-500', label: 'Very High Risk' };
    if (healthFactor <= 1.5) return { text: 'text-yellow-500', bg: 'bg-yellow-500', label: 'Medium Risk' };
    return { text: 'text-green-500', bg: 'bg-green-500', label: 'Safe' };
  };

  const healthInfo = getHealthColor();
  const healthPercentage = Math.min((healthFactor - 1) / 1, 1) * 100; // Scale from 1.0 to 2.0+

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Liquidation Risk Calculator</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
        When you borrow in DeFi, you must maintain a safe collateral level. If your collateral's value drops too low, the protocol can sell it to repay your loan. This tool helps you understand that risk.
      </p>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Panel: Inputs */}
        <div className="space-y-6">
          <Card className="p-4 bg-brand-bg/50">
            <label className="block font-semibold text-white mb-1">Collateral Amount (ETH)</label>
            <input
              type="number"
              value={collateralAmount}
              onChange={e => setCollateralAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2"
            />
          </Card>
          <Card className="p-4 bg-brand-bg/50">
            <label className="block font-semibold text-white mb-1">Collateral Price (ETH Price in USD)</label>
            <input
              type="range"
              min="1000"
              max="6000"
              step="50"
              value={collateralPrice}
              onChange={e => setCollateralPrice(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center font-mono text-lg text-brand-primary mt-1">${collateralPrice}</div>
          </Card>
          <Card className="p-4 bg-brand-bg/50">
            <label className="block font-semibold text-white mb-1">Borrowed Amount (pUSD)</label>
            <input
              type="range"
              min="0"
              max={collateralValue * 0.8} // Max borrow is 80% of collateral
              step="100"
              value={borrowedAmount}
              onChange={e => setBorrowedAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center font-mono text-lg text-brand-primary mt-1">${borrowedAmount}</div>
          </Card>
        </div>

        {/* Right Panel: Outputs */}
        <div className="space-y-4">
          <Card className="p-6 text-center bg-brand-surface">
            <p className="text-sm font-semibold text-brand-text-secondary uppercase">Health Factor</p>
            <p className={`text-5xl font-bold my-2 ${healthInfo.text}`}>
              {isFinite(healthFactor) ? healthFactor.toFixed(2) : '∞'}
            </p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${healthInfo.bg}`}
                style={{ width: `${isFinite(healthFactor) ? Math.max(0, healthPercentage) : 100}%` }}
              ></div>
            </div>
            <p className={`mt-2 font-semibold ${healthInfo.text}`}>{healthInfo.label}</p>
          </Card>

          <Card className="p-6 text-center bg-brand-surface">
             <div className="flex items-center justify-center gap-2">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400"/>
                <p className="text-sm font-semibold text-brand-text-secondary uppercase">Liquidation Price</p>
             </div>
            <p className="text-3xl font-bold my-2 text-red-400">
              ${liquidationPrice > 0 ? liquidationPrice.toFixed(2) : 'N/A'}
            </p>
            <p className="text-xs text-brand-text-secondary">If the price of ETH drops to this level, your collateral will be sold to repay your loan.</p>
          </Card>
           <p className="text-sm text-brand-text-secondary p-2">
            <strong>How to avoid liquidation?</strong>
            <br />1. Repay part of your loan.
            <br />2. Deposit more collateral.
            <br />
            Both actions will increase your health factor and lower your liquidation price.
          </p>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-gray-700 pt-6">
        <Button onClick={onComplete} variant="secondary">
          Mark Lesson as Complete
        </Button>
      </div>
    </Card>
  );
};

export default LiquidationRiskSim;
