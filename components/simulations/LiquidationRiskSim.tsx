import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ExclamationTriangleIcon, CheckCircleIcon } from '../icons/Icons';
import { useSimText } from './useSimText';

// Challenge: survive a crash to $2,000 while still borrowing something useful
const CRASH_PRICE = 2000;
const MIN_BORROW = 2000;

const COPY = {
  en: {
    title: 'Liquidation Risk Calculator',
    intro: "When you borrow in DeFi, you must maintain a safe collateral level. If your collateral's value drops too low, the protocol can sell it to repay your loan. Use this tool to see that risk, then pass the challenge below.",
    collateralAmount: 'Collateral Amount (ETH)',
    collateralPrice: 'Collateral Price (ETH Price in USD)',
    borrowed: 'Borrowed Amount (pUSD)',
    health: 'Health Factor',
    veryHigh: 'Very High Risk', medium: 'Medium Risk', safe: 'Safe',
    liqPrice: 'Liquidation Price',
    liqDesc: 'If the price of ETH drops to this level, your collateral will be sold to repay your loan.',
    avoidTitle: 'How to avoid liquidation?',
    avoid1: '1. Repay part of your loan.',
    avoid2: '2. Deposit more collateral.',
    avoidNote: 'Both actions will increase your health factor and lower your liquidation price.',
    challengeTitle: 'Challenge',
    challenge: 'A crash is coming. Set your position so that ETH can fall to ${{crash}} without liquidating you, while you still borrow at least ${{min}}.',
    passed: 'Challenge passed: your position survives a ${{crash}} ETH crash.',
    failedLiq: 'Not yet: you would be liquidated at ${{price}}. Borrow less or add collateral.',
    failedBorrow: 'Too safe to be useful: borrow at least ${{min}}.',
    complete: 'Complete Lesson',
  },
  es: {
    title: 'Calculadora de Riesgo de Liquidación',
    intro: 'Cuando pides prestado en DeFi, debes mantener un nivel seguro de colateral. Si el valor de tu colateral cae demasiado, el protocolo puede venderlo para pagar tu préstamo. Usa esta herramienta para ver ese riesgo y luego supera el reto de abajo.',
    collateralAmount: 'Cantidad de Colateral (ETH)',
    collateralPrice: 'Precio del Colateral (precio de ETH en USD)',
    borrowed: 'Monto Prestado (pUSD)',
    health: 'Factor de Salud',
    veryHigh: 'Riesgo Muy Alto', medium: 'Riesgo Medio', safe: 'Seguro',
    liqPrice: 'Precio de Liquidación',
    liqDesc: 'Si el precio de ETH cae a este nivel, tu colateral se venderá para pagar tu préstamo.',
    avoidTitle: '¿Cómo evitar la liquidación?',
    avoid1: '1. Paga una parte de tu préstamo.',
    avoid2: '2. Deposita más colateral.',
    avoidNote: 'Ambas acciones aumentan tu factor de salud y bajan tu precio de liquidación.',
    challengeTitle: 'Reto',
    challenge: 'Viene una caída. Configura tu posición para que ETH pueda bajar a ${{crash}} sin liquidarte, pidiendo prestado al menos ${{min}}.',
    passed: 'Reto superado: tu posición sobrevive a una caída de ETH a ${{crash}}.',
    failedLiq: 'Aún no: te liquidarían a ${{price}}. Pide menos prestado o añade colateral.',
    failedBorrow: 'Demasiado seguro para ser útil: pide prestado al menos ${{min}}.',
    complete: 'Completar Lección',
  },
};

const fill = (s: string, vals: Record<string, string | number>) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vals[k]));

const LiquidationRiskSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const c = useSimText(COPY);
  const [collateralAmount, setCollateralAmount] = useState(2); // ETH
  const [collateralPrice, setCollateralPrice] = useState(3500); // Price of ETH
  const [borrowedAmount, setBorrowedAmount] = useState(4000); // pUSD
  const liquidationThreshold = 0.85;

  const collateralValue = collateralAmount * collateralPrice;
  const healthFactor = useMemo(() => (borrowedAmount === 0 ? Infinity : (collateralValue * liquidationThreshold) / borrowedAmount), [collateralValue, borrowedAmount]);
  const liquidationPrice = useMemo(() => (collateralAmount === 0 ? 0 : borrowedAmount / (collateralAmount * liquidationThreshold)), [borrowedAmount, collateralAmount]);

  const info = healthFactor <= 1.1
    ? { text: 'text-red-500', bg: 'bg-red-500', label: c.veryHigh }
    : healthFactor <= 1.5
      ? { text: 'text-yellow-500', bg: 'bg-yellow-500', label: c.medium }
      : { text: 'text-green-500', bg: 'bg-green-500', label: c.safe };
  const healthPercentage = Math.min(healthFactor - 1, 1) * 100;

  const survives = borrowedAmount > 0 && liquidationPrice <= CRASH_PRICE;
  const borrowsEnough = borrowedAmount >= MIN_BORROW;
  const passed = survives && borrowsEnough;
  const challengeMsg = passed
    ? fill(c.passed, { crash: CRASH_PRICE })
    : !survives
      ? fill(c.failedLiq, { price: liquidationPrice.toFixed(0) })
      : fill(c.failedBorrow, { min: MIN_BORROW });

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">{c.intro}</p>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <Card className="p-4 bg-brand-bg/50">
            <label className="block font-semibold text-white mb-1" htmlFor="liq-col">{c.collateralAmount}</label>
            <input id="liq-col" type="number" min="0" value={collateralAmount} onChange={e => setCollateralAmount(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2" />
          </Card>
          <Card className="p-4 bg-brand-bg/50">
            <label className="block font-semibold text-white mb-1" htmlFor="liq-price">{c.collateralPrice}</label>
            <input id="liq-price" type="range" min="1000" max="6000" step="50" value={collateralPrice} onChange={e => setCollateralPrice(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center font-mono text-lg text-brand-primary mt-1">${collateralPrice}</div>
          </Card>
          <Card className="p-4 bg-brand-bg/50">
            <label className="block font-semibold text-white mb-1" htmlFor="liq-borrow">{c.borrowed}</label>
            <input id="liq-borrow" type="range" min="0" max={Math.max(100, Math.floor(collateralValue * 0.8))} step="100" value={borrowedAmount} onChange={e => setBorrowedAmount(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center font-mono text-lg text-brand-primary mt-1">${borrowedAmount}</div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 text-center bg-brand-surface">
            <p className="text-sm font-semibold text-brand-text-secondary uppercase">{c.health}</p>
            <p className={`text-5xl font-bold my-2 ${info.text}`}>{isFinite(healthFactor) ? healthFactor.toFixed(2) : '∞'}</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className={`h-4 rounded-full transition-all duration-300 ${info.bg}`} style={{ width: `${isFinite(healthFactor) ? Math.max(0, healthPercentage) : 100}%` }}></div>
            </div>
            <p className={`mt-2 font-semibold ${info.text}`}>{info.label}</p>
          </Card>

          <Card className="p-6 text-center bg-brand-surface">
            <div className="flex items-center justify-center gap-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
              <p className="text-sm font-semibold text-brand-text-secondary uppercase">{c.liqPrice}</p>
            </div>
            <p className="text-3xl font-bold my-2 text-red-400">${liquidationPrice > 0 ? liquidationPrice.toFixed(2) : 'N/A'}</p>
            <p className="text-xs text-brand-text-secondary">{c.liqDesc}</p>
          </Card>
          <p className="text-sm text-brand-text-secondary p-2">
            <strong>{c.avoidTitle}</strong><br />{c.avoid1}<br />{c.avoid2}<br />{c.avoidNote}
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">{c.challengeTitle}</p>
        <p className="text-white mt-1 max-w-xl mx-auto">{fill(c.challenge, { crash: CRASH_PRICE, min: MIN_BORROW })}</p>
        <p className={`mt-3 flex items-center justify-center gap-2 text-sm ${passed ? 'text-brand-secondary' : 'text-yellow-400'}`} role="status">
          {passed ? <CheckCircleIcon className="h-5 w-5" /> : <ExclamationTriangleIcon className="h-5 w-5" />}{challengeMsg}
        </p>
        <Button onClick={onComplete} disabled={!passed} variant="secondary" className="mt-5">{c.complete}</Button>
      </div>
    </Card>
  );
};

export default LiquidationRiskSim;
