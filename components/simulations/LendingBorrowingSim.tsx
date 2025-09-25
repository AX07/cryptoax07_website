import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

// --- Constants ---
const ETH_PRICE = 3500;
const ETH_SUPPLY_APY = 2.5;
const PUSD_BORROW_APR = 3.5;
const ETH_LTV = 0.8; // 80% Loan-to-Value

const LendingBorrowingSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [wallet, setWallet] = useState({ eth: 2, pUsd: 1000 });
  const [protocol, setProtocol] = useState({ suppliedEth: 0, borrowedPUsd: 0 });
  const [depositAmount, setDepositAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit', 'borrow', or 'repay'
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState<'basic' | 'advanced' | null>(null);

  const suppliedValue = protocol.suppliedEth * ETH_PRICE;
  const borrowedValue = protocol.borrowedPUsd;
  const borrowingPower = suppliedValue * ETH_LTV;
  const healthFactor = useMemo(() => {
    if (borrowedValue === 0) return Infinity;
    return (suppliedValue * ETH_LTV) / borrowedValue;
  }, [suppliedValue, borrowedValue]);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0 && amount <= wallet.eth) {
      setWallet(prev => ({ ...prev, eth: prev.eth - amount }));
      setProtocol(prev => ({ ...prev, suppliedEth: prev.suppliedEth + amount }));
      setFeedback(`Successfully deposited ${amount} ETH.`);
      setDepositAmount('');
    } else {
      setFeedback('Invalid amount or insufficient balance.');
    }
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleBorrow = () => {
    const amount = parseFloat(borrowAmount);
    const availableToBorrow = borrowingPower - borrowedValue;
    if (amount > 0 && amount <= availableToBorrow) {
      setWallet(prev => ({ ...prev, pUsd: prev.pUsd + amount }));
      setProtocol(prev => ({ ...prev, borrowedPUsd: prev.borrowedPUsd + amount }));
      setFeedback(`Successfully borrowed ${amount} pUSD.`);
      setBorrowAmount('');
    } else {
      setFeedback('Invalid amount or exceeds borrowing power.');
    }
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleRepay = () => {
    const amount = parseFloat(repayAmount);
    if(amount > 0 && amount <= wallet.pUsd && amount <= protocol.borrowedPUsd) {
        setWallet(prev => ({ ...prev, pUsd: prev.pUsd - amount }));
        setProtocol(prev => ({ ...prev, borrowedPUsd: prev.borrowedPUsd - amount }));
        setFeedback(`Successfully repaid ${amount} pUSD.`);
        setRepayAmount('');
    } else {
        setFeedback('Invalid amount or insufficient funds for repayment.');
    }
    setTimeout(() => setFeedback(''), 3000);
  }

  const getHealthColor = () => {
    if (healthFactor <= 1.1) return 'text-red-500';
    if (healthFactor <= 1.5) return 'text-yellow-400';
    return 'text-brand-secondary';
  };
  
  const renderSimulation = () => (
    <div className="grid lg:grid-cols-2 gap-8">
    {/* Left Panel: Protocol Interaction */}
    <div className="bg-brand-bg/50 p-6 rounded-lg">
      <div className="flex mb-4 border-b border-gray-700">
        <button onClick={() => setActiveTab('deposit')} className={`px-4 py-2 font-semibold ${activeTab === 'deposit' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`}>
          Deposit
        </button>
        <button onClick={() => setActiveTab('borrow')} className={`px-4 py-2 font-semibold ${activeTab === 'borrow' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`} disabled={protocol.suppliedEth === 0}>
          Borrow
        </button>
        {difficulty === 'advanced' && (
             <button onClick={() => setActiveTab('repay')} className={`px-4 py-2 font-semibold ${activeTab === 'repay' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`} disabled={protocol.borrowedPUsd === 0}>
              Repay
            </button>
        )}
      </div>

      {activeTab === 'deposit' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-2">Deposit ETH</h3>
          <p className="text-sm text-brand-text-secondary mb-4">Earn interest by supplying your assets to the protocol.</p>
          <div className="flex justify-between text-sm mb-2">
            <span>Wallet Balance:</span>
            <span className="font-mono">{wallet.eth.toFixed(4)} ETH</span>
          </div>
          <input
            type="number"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 mb-4 focus:ring-brand-primary focus:border-brand-primary"
          />
          <Button onClick={handleDeposit} className="w-full">Deposit</Button>
        </div>
      )}

      {activeTab === 'borrow' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-2">Borrow pUSD</h3>
          <p className="text-sm text-brand-text-secondary mb-4">Borrow against your collateral. You can use this loan for anything you want.</p>
          <div className="flex justify-between text-sm mb-2">
            <span>Available to Borrow:</span>
            <span className="font-mono">${(borrowingPower - borrowedValue).toFixed(2)}</span>
          </div>
          <input
            type="number"
            value={borrowAmount}
            onChange={e => setBorrowAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 mb-4 focus:ring-brand-primary focus:border-brand-primary"
          />
          <Button onClick={handleBorrow} className="w-full">Borrow</Button>
        </div>
      )}

      {activeTab === 'repay' && difficulty === 'advanced' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-2">Repay pUSD</h3>
          <p className="text-sm text-brand-text-secondary mb-4">Repaying your loan increases your health factor and frees up your collateral.</p>
          <div className="flex justify-between text-sm mb-2"><span>Wallet Balance:</span><span className="font-mono">{wallet.pUsd.toFixed(2)} pUSD</span></div>
          <div className="flex justify-between text-sm mb-2"><span>Amount Owed:</span><span className="font-mono">{protocol.borrowedPUsd.toFixed(2)} pUSD</span></div>
          <input type="number" value={repayAmount} onChange={e => setRepayAmount(e.target.value)} placeholder="0.0" className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 mb-4 focus:ring-brand-primary focus:border-brand-primary" />
          <Button onClick={handleRepay} className="w-full">Repay</Button>
        </div>
      )}

      {feedback && <p className="text-center text-sm mt-4 font-semibold text-brand-primary animate-fade-in">{feedback}</p>}
    </div>

    {/* Right Panel: Position Overview */}
    <div className="space-y-4">
      <Card className="p-4 bg-brand-bg/50">
        <h4 className="font-bold text-lg text-white mb-2">Your Position</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Supplied:</span><span className="font-mono text-white">{protocol.suppliedEth.toFixed(4)} ETH (${suppliedValue.toFixed(2)})</span></div>
          <div className="flex justify-between"><span>Supply APY:</span><span className="font-mono text-brand-secondary">{ETH_SUPPLY_APY}%</span></div>
          <div className="flex justify-between border-t border-gray-700/50 pt-2 mt-2"><span>Borrowed:</span><span className="font-mono text-white">{protocol.borrowedPUsd.toFixed(2)} pUSD</span></div>
          <div className="flex justify-between"><span>Borrow APR:</span><span className="font-mono text-red-400">{PUSD_BORROW_APR}%</span></div>
        </div>
      </Card>
      <Card className="p-4 bg-brand-bg/50">
        <h4 className="font-bold text-lg text-white mb-2">Risk Analysis</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Borrowing Power:</span><span className="font-mono text-white">${borrowingPower.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Loan-to-Value (LTV):</span><span className="font-mono text-white">{ETH_LTV * 100}%</span></div>
          <div className="flex justify-between items-center">
            <span>Health Factor:</span>
            <span className={`font-mono font-bold text-lg ${getHealthColor()}`}>
              {isFinite(healthFactor) ? healthFactor.toFixed(2) : '∞'}
            </span>
          </div>
           <p className="text-xs text-brand-text-secondary pt-2">Your health factor represents the safety of your loan. If it drops to 1.0, your collateral is at risk of being liquidated to repay your debt.</p>
        </div>
      </Card>
    </div>
  </div>
  );

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Lending & Borrowing Simulation</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
        Decentralized Finance (DeFi) offers banking services without traditional banks. You'll supply assets to earn interest and use them as collateral to borrow other assets.
      </p>

      {!difficulty ? (
        <div className="text-center animate-fade-in">
          <h3 className="text-xl font-semibold text-white mb-4">Choose Your Difficulty</h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={() => setDifficulty('basic')} className="w-full md:w-auto">
              <span className="font-bold">Basic Mode</span>
              <p className="font-normal text-sm">Learn the core concepts of depositing and borrowing.</p>
            </Button>
            <Button onClick={() => setDifficulty('advanced')} variant="secondary" className="w-full md:w-auto">
              <span className="font-bold">Advanced Mode</span>
              <p className="font-normal text-sm">Explore more features like repaying loans.</p>
            </Button>
          </div>
        </div>
      ) : (
        renderSimulation()
      )}

       <div className="text-center mt-8 border-t border-gray-700 pt-6">
        <Button onClick={onComplete} variant="accent" disabled={!difficulty}>
          Mark Lesson as Complete
        </Button>
      </div>
    </Card>
  );
};

export default LendingBorrowingSim;