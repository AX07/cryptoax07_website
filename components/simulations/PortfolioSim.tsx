import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ExclamationTriangleIcon, CheckCircleIcon } from '../icons/Icons';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSimText } from './useSimText';

const COLORS = { pBTC: '#F7931A', pETH: '#8C8C8C', pUSD: '#26A17B', pALT: '#627EEA' };
type AssetId = keyof typeof COLORS;

// Diversification rule the learner must satisfy to finish the lesson
const MAX_SINGLE_ASSET = 50;
const MIN_STABLE = 10;

const COPY = {
  en: {
    title: 'Portfolio Simulator',
    intro: 'Here you will learn asset allocation, a key strategy for managing risk. Distribute a mock fund across different crypto assets. The goal is to build a portfolio that survives a bad month: no single asset above 50%, and at least 10% in a stablecoin as a cushion.',
    names: { pBTC: 'Practice Bitcoin', pETH: 'Practice Ethereum', pUSD: 'Practice Stablecoin', pALT: 'Practice Altcoin' } as Record<AssetId, string>,
    total: 'Total Allocation:',
    ruleOk: 'Well balanced. No single asset can sink this portfolio.',
    ruleConcentrated: 'Too concentrated: {{name}} is above 50%. If it drops 60%, your portfolio takes a heavy hit.',
    ruleStable: 'Keep at least 10% in the stablecoin as a cushion for dips (and to buy more when prices fall).',
    save: 'Save Portfolio & Complete',
    mustTotal: 'Allocation must be 100%',
    mustRule: 'Follow the diversification rule',
  },
  es: {
    title: 'Simulador de Portafolio',
    intro: 'Aquí aprenderás la asignación de activos, una estrategia clave para gestionar el riesgo. Distribuye un fondo simulado entre distintos activos cripto. El objetivo es construir un portafolio que resista un mal mes: ningún activo por encima del 50% y al menos 10% en una stablecoin como colchón.',
    names: { pBTC: 'Bitcoin de Práctica', pETH: 'Ethereum de Práctica', pUSD: 'Stablecoin de Práctica', pALT: 'Altcoin de Práctica' } as Record<AssetId, string>,
    total: 'Asignación Total:',
    ruleOk: 'Bien equilibrado. Ningún activo puede hundir este portafolio.',
    ruleConcentrated: 'Demasiado concentrado: {{name}} supera el 50%. Si cae 60%, tu portafolio sufre un golpe fuerte.',
    ruleStable: 'Mantén al menos 10% en la stablecoin como colchón para las caídas (y para comprar más cuando los precios bajan).',
    save: 'Guardar Portafolio y Completar',
    mustTotal: 'La asignación debe ser 100%',
    mustRule: 'Cumple la regla de diversificación',
  },
};

const PortfolioSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const c = useSimText(COPY);
  const [portfolio, setPortfolio] = useState<Record<AssetId, number>>({ pBTC: 25, pETH: 25, pUSD: 25, pALT: 25 });

  const total = useMemo(() => (Object.values(portfolio) as number[]).reduce((sum, val) => sum + val, 0), [portfolio]);

  const handleSliderChange = (asset: AssetId, value: number) => {
    setPortfolio(prev => ({ ...prev, [asset]: value }));
  };

  const normalizePortfolio = () => {
    const currentTotal = (Object.values(portfolio) as number[]).reduce((sum, val) => sum + val, 0);
    if (currentTotal === 0 || currentTotal === 100) return;
    const newPortfolio = {} as typeof portfolio;
    let runningTotal = 0;
    const assetKeys = Object.keys(portfolio) as AssetId[];
    assetKeys.forEach((key, index) => {
      if (index < assetKeys.length - 1) {
        const normalizedValue = Math.round((portfolio[key] / currentTotal) * 100);
        newPortfolio[key] = normalizedValue;
        runningTotal += normalizedValue;
      } else {
        newPortfolio[key] = 100 - runningTotal; // remainder keeps the total exactly 100
      }
    });
    setPortfolio(newPortfolio);
  };

  const concentrated = (Object.keys(portfolio) as AssetId[]).find(k => portfolio[k] > MAX_SINGLE_ASSET);
  const lowStable = portfolio.pUSD < MIN_STABLE;
  const rulesOk = !concentrated && !lowStable;
  const canFinish = total === 100 && rulesOk;

  const chartData = (Object.keys(portfolio) as AssetId[]).map(k => ({ name: c.names[k], value: portfolio[k], color: COLORS[k] }));

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">{c.intro}</p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          {(Object.keys(portfolio) as AssetId[]).map(key => (
            <div key={key} className="mb-4">
              <div className="flex justify-between mb-1">
                <label className="font-semibold text-white" htmlFor={`alloc-${key}`}>{c.names[key]}</label>
                <span className="text-brand-primary font-mono">{portfolio[key]}%</span>
              </div>
              <input
                id={`alloc-${key}`}
                type="range" min="0" max="100" value={portfolio[key]}
                onChange={e => handleSliderChange(key, parseInt(e.target.value))}
                onMouseUp={normalizePortfolio}
                onTouchEnd={normalizePortfolio}
                onKeyUp={normalizePortfolio}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
          <div className={`mt-4 text-center font-bold ${total === 100 ? 'text-brand-secondary' : 'text-red-500'}`}>
            {c.total} {total}%
          </div>
        </div>

        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {total === 100 && (
        <p className={`mt-6 flex items-start gap-2 justify-center text-sm max-w-xl mx-auto text-center ${rulesOk ? 'text-brand-secondary' : 'text-yellow-400'}`} role="status">
          {rulesOk ? <CheckCircleIcon className="h-5 w-5 flex-shrink-0" /> : <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />}
          <span>{rulesOk ? c.ruleOk : concentrated ? c.ruleConcentrated.replace('{{name}}', c.names[concentrated]) : c.ruleStable}</span>
        </p>
      )}

      <div className="text-center mt-6">
        <Button onClick={onComplete} disabled={!canFinish} variant="secondary">
          {canFinish ? c.save : total !== 100 ? c.mustTotal : c.mustRule}
        </Button>
      </div>
    </Card>
  );
};

export default PortfolioSim;
