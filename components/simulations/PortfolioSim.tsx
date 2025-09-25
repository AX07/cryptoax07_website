import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ASSETS = {
  pBTC: { name: 'Practice Bitcoin', color: '#F7931A' },
  pETH: { name: 'Practice Ethereum', color: '#8C8C8C' },
  pUSD: { name: 'Practice Stablecoin', color: '#26A17B' },
  pALT: { name: 'Practice Altcoin', color: '#627EEA' },
};

type AssetId = keyof typeof ASSETS;

const PortfolioSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [portfolio, setPortfolio] = useState<{ [key in AssetId]: number }>({
    pBTC: 25,
    pETH: 25,
    pUSD: 25,
    pALT: 25,
  });

  const total = useMemo(() => Object.values(portfolio).reduce((sum, val) => sum + val, 0), [portfolio]);

  const handleSliderChange = (asset: AssetId, value: number) => {
    setPortfolio(prev => ({ ...prev, [asset]: value }));
  };

  const normalizePortfolio = () => {
    const currentTotal = Object.values(portfolio).reduce((sum, val) => sum + val, 0);
    
    // Avoid division by zero and unnecessary updates
    if (currentTotal === 0 || currentTotal === 100) return;

    const newPortfolio = {} as typeof portfolio;
    let runningTotal = 0;
    const assetKeys = Object.keys(portfolio) as AssetId[];
    
    assetKeys.forEach((key, index) => {
      // For all but the last item, calculate the normalized value and round it.
      if (index < assetKeys.length - 1) {
        const normalizedValue = Math.round((portfolio[key] / currentTotal) * 100);
        newPortfolio[key] = normalizedValue;
        runningTotal += normalizedValue;
      } else {
        // For the last item, assign the remainder to ensure the total is exactly 100.
        newPortfolio[key] = 100 - runningTotal;
      }
    });
    setPortfolio(newPortfolio);
  };
  
  const chartData = Object.entries(portfolio).map(([key, value]) => ({
      name: ASSETS[key as AssetId].name,
      value: value,
      color: ASSETS[key as AssetId].color
  }));

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Portfolio Simulator</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
        Here you will learn asset allocation, a key strategy for managing risk. Use the sliders to distribute a mock fund across different crypto assets. The goal is to understand how diversification works and to think strategically about building a balanced portfolio before investing.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          {Object.entries(portfolio).map(([key, value]) => (
            <div key={key} className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-white">{ASSETS[key as AssetId].name}</label>
                <span className="text-brand-primary font-mono">{value}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={e => handleSliderChange(key as AssetId, parseInt(e.target.value))}
                onMouseUp={normalizePortfolio}
                onTouchEnd={normalizePortfolio}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{'--thumb-color': ASSETS[key as AssetId].color} as React.CSSProperties}
              />
            </div>
          ))}
           <div className={`mt-4 text-center font-bold ${total === 100 ? 'text-brand-secondary' : 'text-red-500'}`}>
                Total Allocation: {total}%
            </div>
        </div>
        
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="text-center mt-8">
        <Button onClick={onComplete} disabled={total !== 100} variant="secondary">
          {total === 100 ? 'Save Portfolio & Complete' : 'Allocation must be 100%'}
        </Button>
      </div>
    </Card>
  );
};

export default PortfolioSim;