import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon } from '../icons/Icons';

const BTC_PRICE = 65000;
const SELF_CUSTODY_ADDRESS = "bc1qsupersecureaddress7xfkvy5l643lydnw9re59gtzzwf5mdq";

const BuyAndWithdrawSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [exchangeBalance, setExchangeBalance] = useState({ usd: 1000, btc: 0 });
  const [selfCustodyWallet, setSelfCustodyWallet] = useState({ btc: 0 });

  // Buy state
  const [buyAmountUsd, setBuyAmountUsd] = useState('1000');

  // Withdraw state
  const [withdrawAmountBtc, setWithdrawAmountBtc] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');

  const [error, setError] = useState('');

  const handleBuyCrypto = () => {
    const amount = parseFloat(buyAmountUsd);
    if (amount > 0 && amount <= exchangeBalance.usd) {
        setError('');
        setStep(2); // Processing
        setTimeout(() => {
            const btcBought = amount / BTC_PRICE;
            setExchangeBalance(prev => ({
                usd: prev.usd - amount,
                btc: prev.btc + btcBought
            }));
            setWithdrawAmountBtc(btcBought.toFixed(8)); // Pre-fill withdraw amount
            setStep(3); // Move to Withdraw Step
        }, 2000);
    } else {
        setError('Insufficient USD balance to make this purchase.');
    }
  };

  const handleWithdraw = () => {
    if (withdrawAddress.trim() !== SELF_CUSTODY_ADDRESS) {
      setError("The withdrawal address is incorrect. Please use the provided self-custody address.");
      return;
    }
    const amount = parseFloat(withdrawAmountBtc);
    if (amount > 0 && amount <= exchangeBalance.btc) {
      setError('');
      setStep(4); // Processing withdrawal
      setTimeout(() => {
        setExchangeBalance(prev => ({ ...prev, btc: prev.btc - amount }));
        setSelfCustodyWallet(prev => ({ btc: prev.btc + amount }));
        setStep(5); // Final success
      }, 2500);
    } else {
      setError('Insufficient BTC balance for this withdrawal.');
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
            <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-2 text-center text-brand-primary">Step 1 of 2: Buy Crypto</h3>
                <p className="text-brand-text-secondary mb-4 text-center">You have a fiat balance on the exchange. Now use it to buy Bitcoin.</p>
                <Card className="p-4 bg-brand-surface">
                    <div className="flex justify-between text-lg mb-2">
                        <span className="text-white">Your Balance:</span>
                        <span className="font-mono font-bold text-brand-secondary">${exchangeBalance.usd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                        <span className="text-brand-text-secondary">BTC Price:</span>
                        <span className="font-mono text-white">${BTC_PRICE.toLocaleString()}</span>
                    </div>
                    <label className="block text-sm text-brand-text-secondary mb-1">Amount to spend (USD):</label>
                    <input
                        type="number"
                        value={buyAmountUsd}
                        onChange={(e) => setBuyAmountUsd(e.target.value)}
                        className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono mb-2"
                    />
                    <p className="text-center text-brand-primary mb-4">You will get: {((parseFloat(buyAmountUsd) || 0) / BTC_PRICE).toFixed(8)} BTC</p>
                    {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}
                    <Button onClick={handleBuyCrypto} className="w-full">Buy Bitcoin</Button>
                </Card>
            </div>
        );
    case 2:
        return (
            <div className="text-center animate-fade-in">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                <p className="text-lg text-white font-semibold">Executing Buy Order...</p>
            </div>
        );
    case 3:
        return (
            <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-2 text-center text-brand-primary">Step 2 of 2: Withdraw to Self-Custody</h3>
                <p className="text-brand-text-secondary mb-4 text-center">
                    Purchase complete! For security, never leave crypto on an exchange. Withdraw it to your own wallet where you control the keys.
                </p>
                <Card className="p-4 bg-brand-bg/50 mb-4 text-sm">
                    <p className="font-semibold text-white mb-2">Your Self-Custody Wallet:</p>
                    <p className="font-mono text-gray-300 break-all">{SELF_CUSTODY_ADDRESS}</p>
                    <button onClick={() => { setWithdrawAddress(SELF_CUSTODY_ADDRESS); navigator.clipboard.writeText(SELF_CUSTODY_ADDRESS); }} className="text-xs py-1 px-2 mt-2 bg-brand-surface hover:bg-gray-700 rounded">Copy Address</button>
                </Card>
                <Card className="p-4 bg-brand-surface">
                    <div className="flex justify-between text-lg mb-4">
                        <span className="text-white">Exchange Balance:</span>
                        <span className="font-mono font-bold text-brand-secondary">{exchangeBalance.btc.toFixed(8)} BTC</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-brand-text-secondary mb-1">Withdrawal Address:</label>
                        <input
                            type="text"
                            value={withdrawAddress}
                            onChange={e => setWithdrawAddress(e.target.value)}
                            placeholder="Paste your self-custody address here"
                            className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono"
                        />
                    </div>
                     <div className="mb-4">
                        <label className="block text-sm text-brand-text-secondary mb-1">Amount to withdraw (BTC):</label>
                        <input
                            type="number"
                            value={withdrawAmountBtc}
                            onChange={e => setWithdrawAmountBtc(e.target.value)}
                            className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}
                    <Button onClick={handleWithdraw} className="w-full">Withdraw BTC</Button>
                </Card>
            </div>
        );
      case 4:
        return (
            <div className="text-center animate-fade-in">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                <p className="text-lg text-white font-semibold">Processing Withdrawal...</p>
                <p className="text-brand-text-secondary">Confirming on the blockchain.</p>
            </div>
        );
      case 5:
        return (
            <div className="text-center animate-fade-in">
                <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-secondary mb-2">Success!</h3>
                <p className="text-brand-text-secondary mb-6">
                    You've successfully purchased crypto and withdrawn it to your secure self-custody wallet. Your funds are now safe!
                </p>
                <Card className="p-4 bg-brand-bg/50 max-w-md mx-auto">
                    <p className="font-semibold text-white">Self-Custody Wallet Balance:</p>
                    <p className="font-mono text-lg text-brand-secondary">{selfCustodyWallet.btc.toFixed(8)} BTC</p>
                </Card>
                <Button onClick={onComplete} variant="secondary" className="mt-6">Finish Lesson</Button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Buy & Withdraw Crypto</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        Practice buying crypto on an exchange and immediately withdrawing it to your own self-custody wallet for maximum security.
      </p>
      {renderContent()}
    </Card>
  );
};

export default BuyAndWithdrawSim;