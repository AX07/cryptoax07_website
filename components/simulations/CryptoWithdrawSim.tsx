import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon } from '../icons/Icons';

const CryptoWithdrawSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selfCustodyBalance, setSelfCustodyBalance] = useState({ btc: 1.0 });
  const [exchangeBalance, setExchangeBalance] = useState({ btc: 0, usd: 0 });
  const [depositAmount, setDepositAmount] = useState(0.5);
  const [sellAmount, setSellAmount] = useState(0.5);
  const [userIban, setUserIban] = useState('');

  const btcPrice = 65000;
  const exchangeDepositAddress = "bc1qexchangeaddress7xfkvy5l643lydnw9re59gtzzwf5mdq";

  const handleDeposit = () => {
    if (depositAmount > 0 && depositAmount <= selfCustodyBalance.btc) {
      setStep(2); // Processing deposit
      setTimeout(() => {
        setSelfCustodyBalance(prev => ({ btc: prev.btc - depositAmount }));
        setExchangeBalance(prev => ({ ...prev, btc: prev.btc + depositAmount }));
        setStep(3); // Go to sell
      }, 2500);
    }
  };

  const handleSell = () => {
    if (sellAmount > 0 && sellAmount <= exchangeBalance.btc) {
      setStep(4); // Processing sell
      setTimeout(() => {
        setExchangeBalance(prev => ({
          btc: prev.btc - sellAmount,
          usd: prev.usd + sellAmount * btcPrice
        }));
        setStep(5); // Go to withdraw
      }, 1500);
    }
  };

  const handleWithdraw = () => {
    if (userIban) {
      setStep(6); // Processing withdrawal
      setTimeout(() => {
        setExchangeBalance(prev => ({ ...prev, usd: 0 }));
        setStep(7); // Success
      }, 2500);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">Step 1: Deposit From Self-Custody Wallet</h3>
            <p className="text-brand-text-secondary mb-6 text-center">It's safest to keep your crypto in your own wallet. To sell it on an exchange, you first need to deposit it there.</p>
            <Card className="p-6 bg-brand-bg/50">
              <div className="flex justify-between mb-4">
                <span>Self-Custody Balance:</span>
                <span className="font-mono font-bold text-white">{selfCustodyBalance.btc.toFixed(4)} BTC</span>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Exchange Deposit Address:</label>
                <p className="font-mono text-sm bg-brand-bg p-2 rounded break-all">{exchangeDepositAddress}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Amount of BTC to deposit:</label>
                <input
                  type="number"
                  value={depositAmount}
                  max={selfCustodyBalance.btc}
                  onChange={e => setDepositAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2"
                />
              </div>
              <Button onClick={handleDeposit} disabled={depositAmount <= 0 || depositAmount > selfCustodyBalance.btc} className="w-full">Deposit to Exchange</Button>
            </Card>
          </div>
        );
      case 2:
         return (
          <div className="text-center animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-white font-semibold">Confirming Deposit on Blockchain...</p>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">Step 2: Sell Crypto for Fiat</h3>
            <p className="text-brand-text-secondary mb-6 text-center">Your deposit is confirmed. Now, sell your crypto for a fiat currency (like USD) on the exchange.</p>
            <Card className="p-6 bg-brand-bg/50">
              <div className="flex justify-between mb-4">
                <span>Your BTC Balance:</span>
                <span className="font-mono font-bold text-white">{exchangeBalance.btc.toFixed(4)} BTC</span>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Amount of BTC to sell:</label>
                <input
                  type="number"
                  value={sellAmount}
                  max={exchangeBalance.btc}
                  onChange={e => setSellAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2"
                />
              </div>
              <p className="text-center text-lg font-semibold text-brand-primary mb-4">
                You will receive: ${(sellAmount * btcPrice).toLocaleString()}
              </p>
              <Button onClick={handleSell} disabled={sellAmount <= 0 || sellAmount > exchangeBalance.btc} className="w-full">Sell BTC</Button>
            </Card>
          </div>
        );
      case 4:
        return (
          <div className="text-center animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-white font-semibold">Executing Sell Order...</p>
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">Step 3: Withdraw Fiat to Bank</h3>
            <p className="text-brand-text-secondary mb-6 text-center">Now that you have USD, you can withdraw it to your personal bank account.</p>
            <Card className="p-6 bg-brand-bg/50">
              <h4 className="font-bold text-white mb-2">Withdrawal Details</h4>
              <div className="flex justify-between mb-4">
                <span>Amount to Withdraw:</span>
                <span className="font-mono font-bold text-white">${exchangeBalance.usd.toLocaleString()}</span>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Your Bank IBAN:</label>
                <input
                  type="text"
                  value={userIban}
                  onChange={e => setUserIban(e.target.value)}
                  placeholder="DE89 3704 0044 0532 0130 00"
                  className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono"
                />
              </div>
              <Button onClick={handleWithdraw} disabled={!userIban} className="w-full">Confirm Withdrawal</Button>
            </Card>
          </div>
        );
      case 6:
        return (
          <div className="text-center animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-white font-semibold">Sending Funds to Your Bank...</p>
          </div>
        );
      case 7:
        return (
          <div className="text-center animate-fade-in">
            <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-secondary mb-2">Withdrawal Complete!</h3>
            <p className="text-brand-text-secondary mb-6">The funds have been sent to your bank account. You successfully moved crypto from self-custody to your bank account.</p>
            <Button onClick={onComplete} variant="secondary">Finish Lesson</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Withdrawing Crypto to Fiat</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        Learn how to convert your crypto back into traditional currency and withdraw it securely to your bank account, starting from your self-custody wallet.
      </p>
      {renderContent()}
    </Card>
  );
};

export default CryptoWithdrawSim;