
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowPathIcon, CheckCircleIcon } from '../icons/Icons';

const TOKENS = {
  pETH: { name: 'Practice ETH', price: 2000, balance: 10 },
  pBTC: { name: 'Practice BTC', price: 30000, balance: 1 },
  pUSD: { name: 'Practice USD', price: 1, balance: 10000 },
  pDOG: { name: 'Practice DOG', price: 0.15, balance: 50000 },
};

type TokenId = keyof typeof TOKENS;

const SwapSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fromToken, setFromToken] = useState<TokenId>('pETH');
  const [toToken, setToToken] = useState<TokenId>('pUSD');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage] = useState(0.5); // 0.5%
  const [gasFee] = useState(15.50); // $15.50 gas fee
  const [balances] = useState(() => TOKENS);
  const [swapState, setSwapState] = useState<'idle' | 'swapping' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (fromAmount) {
      const fromPrice = balances[fromToken].price;
      const toPrice = balances[toToken].price;
      const calculatedToAmount = (parseFloat(fromAmount) * fromPrice) / toPrice;
      const slippageAmount = calculatedToAmount * (slippage / 100);
      const finalAmount = calculatedToAmount - slippageAmount;
      setToAmount(finalAmount > 0 ? finalAmount.toFixed(4) : '');
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken, slippage, balances]);

  const handleSwap = () => {
    const fromVal = parseFloat(fromAmount);
    if (fromVal > 0 && fromVal <= balances[fromToken].balance) {
      setSwapState('swapping');
      setTimeout(() => {
        setSwapState('success');
      }, 2000);
    } else {
       setSwapState('error');
    }
  };
  
  const resetSim = () => {
    setFromAmount('');
    setToAmount('');
    setSwapState('idle');
  }

  const flipTokens = () => {
    const tempFrom = fromToken;
    setFromToken(toToken);
    setToToken(tempFrom);
    setFromAmount(toAmount);
  };

  const fromVal = parseFloat(fromAmount) || 0;

  if (swapState === 'success') {
    return (
       <Card className="max-w-md mx-auto p-6 text-center animate-fade-in">
         <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
         <h2 className="text-2xl font-bold text-center mb-2 text-white">Swap Successful!</h2>
         <p className="text-brand-text-secondary mb-6">
            You have successfully swapped {fromAmount} {fromToken} for {toAmount} {toToken}.
         </p>
         <div className="flex flex-col gap-3">
            <Button onClick={onComplete} variant="secondary">Mark as Complete</Button>
            <button onClick={resetSim} className="text-brand-text-secondary hover:text-white text-sm">Perform another swap</button>
         </div>
       </Card>
    )
  }
  
  if (swapState === 'swapping') {
      return (
          <Card className="max-w-md mx-auto p-6 text-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
             <p className="text-lg text-white font-semibold">Processing Transaction...</p>
             <p className="text-brand-text-secondary">Your swap is being submitted to the network.</p>
          </Card>
      )
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Simulated Swap Tool</h2>
       <p className="text-brand-text-secondary text-center mb-6 max-w-md mx-auto">
        This simulation introduces you to Decentralized Exchanges (DEXs), where you trade crypto without a central intermediary. You will practice swapping tokens, which is essential for learning about exchange rates, slippage, and gas fees in a risk-free environment.
      </p>
      
      <div className="bg-brand-bg/50 p-4 rounded-lg mb-2">
        <label className="text-sm text-brand-text-secondary">You Pay</label>
        <div className="flex justify-between items-center mt-1">
          <input 
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            className="text-2xl bg-transparent w-full focus:outline-none text-white"
          />
          <select value={fromToken} onChange={e => setFromToken(e.target.value as TokenId)} className="bg-brand-surface p-2 rounded-lg text-white font-semibold">
            {Object.keys(balances).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="text-xs text-brand-text-secondary mt-1">
          Balance: {balances[fromToken].balance.toFixed(2)}
        </div>
      </div>
      
      <div className="text-center my-2">
        <button onClick={flipTokens} className="p-2 bg-brand-surface rounded-full hover:bg-gray-700">
            <ArrowPathIcon className="h-5 w-5 text-brand-primary"/>
        </button>
      </div>

      <div className="bg-brand-bg/50 p-4 rounded-lg mb-6">
        <label className="text-sm text-brand-text-secondary">You Receive (Estimated)</label>
        <div className="flex justify-between items-center mt-1">
          <input 
            type="number"
            value={toAmount}
            readOnly
            placeholder="0.0"
            className="text-2xl bg-transparent w-full focus:outline-none text-white"
          />
          <select value={toToken} onChange={e => setToToken(e.target.value as TokenId)} className="bg-brand-surface p-2 rounded-lg text-white font-semibold">
             {Object.keys(balances).filter(t => t !== fromToken).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
         <div className="text-xs text-brand-text-secondary mt-1">
          Balance: {balances[toToken].balance.toFixed(2)}
        </div>
      </div>

      {fromAmount && (
        <div className="text-sm text-brand-text-secondary space-y-2 mb-6">
          <div className="flex justify-between">
            <span>Rate</span>
            <span className="text-white font-mono">1 {fromToken} ≈ {(balances[fromToken].price / balances[toToken].price).toFixed(4)} {toToken}</span>
          </div>
          <div className="flex justify-between">
            <span>Slippage Tolerance</span>
            <span className="text-white font-mono">{slippage}%</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Gas Fee</span>
            <span className="text-white font-mono">${gasFee.toFixed(2)}</span>
          </div>
        </div>
      )}
        {swapState === 'error' && <p className="text-red-500 text-center mb-4 font-bold">Swap failed: Insufficient balance.</p>}
      <Button onClick={handleSwap} disabled={fromVal <= 0 || fromVal > balances[fromToken].balance} className="w-full">
        {fromVal > balances[fromToken].balance ? 'Insufficient Balance' : 'Swap'}
      </Button>
    </Card>
  );
};

export default SwapSim;
