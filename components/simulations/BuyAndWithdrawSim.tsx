import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';

const BTC_PRICE = 65000;
const SELF_CUSTODY_ADDRESS = "bc1qsupersecureaddress7xfkvy5l643lydnw9re59gtzzwf5mdq";

const BuyAndWithdrawSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
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
        setError(t('simulations.buyAndWithdraw.errorInsufficient'));
    }
  };

  const handleWithdraw = () => {
    if (withdrawAddress.trim() !== SELF_CUSTODY_ADDRESS) {
      setError(t('simulations.buyAndWithdraw.errorAddress'));
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
      setError(t('simulations.buyAndWithdraw.errorBtc'));
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
            <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-2 text-center text-brand-primary">{t('simulations.buyAndWithdraw.step1Title')}</h3>
                <p className="text-brand-text-secondary mb-4 text-center">{t('simulations.buyAndWithdraw.step1Desc')}</p>
                <Card className="p-4 bg-brand-surface">
                    <div className="flex justify-between text-lg mb-2">
                        <span className="text-white">{t('simulations.buyAndWithdraw.yourBalance')}</span>
                        <span className="font-mono font-bold text-brand-secondary">${exchangeBalance.usd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                        <span className="text-brand-text-secondary">{t('simulations.buyAndWithdraw.btcPrice')}</span>
                        <span className="font-mono text-white">${BTC_PRICE.toLocaleString()}</span>
                    </div>
                    <label className="block text-sm text-brand-text-secondary mb-1">{t('simulations.buyAndWithdraw.amountToSpend')}</label>
                    <input
                        type="number"
                        value={buyAmountUsd}
                        onChange={(e) => setBuyAmountUsd(e.target.value)}
                        className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono mb-2"
                    />
                    <p className="text-center text-brand-primary mb-4">{t('simulations.buyAndWithdraw.youWillGet')} {((parseFloat(buyAmountUsd) || 0) / BTC_PRICE).toFixed(8)} BTC</p>
                    {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}
                    <Button onClick={handleBuyCrypto} className="w-full">{t('simulations.buyAndWithdraw.buyButton')}</Button>
                </Card>
            </div>
        );
    case 2:
        return (
            <div className="text-center animate-fade-in">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                <p className="text-lg text-white font-semibold">{t('simulations.buyAndWithdraw.processingBuy')}</p>
            </div>
        );
    case 3:
        return (
            <div className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-2 text-center text-brand-primary">{t('simulations.buyAndWithdraw.step2Title')}</h3>
                <p className="text-brand-text-secondary mb-4 text-center">
                    {t('simulations.buyAndWithdraw.step2Desc')}
                </p>
                <Card className="p-4 bg-brand-bg/50 mb-4 text-sm">
                    <p className="font-semibold text-white mb-2">{t('simulations.buyAndWithdraw.yourWallet')}</p>
                    <p className="font-mono text-gray-300 break-all">{SELF_CUSTODY_ADDRESS}</p>
                    <button onClick={() => { setWithdrawAddress(SELF_CUSTODY_ADDRESS); navigator.clipboard.writeText(SELF_CUSTODY_ADDRESS); }} className="text-xs py-1 px-2 mt-2 bg-brand-surface hover:bg-gray-700 rounded">{t('simulations.buyAndWithdraw.copyAddress')}</button>
                </Card>
                <Card className="p-4 bg-brand-surface">
                    <div className="flex justify-between text-lg mb-4">
                        <span className="text-white">{t('simulations.buyAndWithdraw.exchangeBalance')}</span>
                        <span className="font-mono font-bold text-brand-secondary">{exchangeBalance.btc.toFixed(8)} BTC</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-brand-text-secondary mb-1">{t('simulations.buyAndWithdraw.withdrawalAddress')}</label>
                        <input
                            type="text"
                            value={withdrawAddress}
                            onChange={e => setWithdrawAddress(e.target.value)}
                            placeholder={t('simulations.buyAndWithdraw.placeholderAddress')}
                            className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono"
                        />
                    </div>
                     <div className="mb-4">
                        <label className="block text-sm text-brand-text-secondary mb-1">{t('simulations.buyAndWithdraw.amountToWithdraw')}</label>
                        <input
                            type="number"
                            value={withdrawAmountBtc}
                            onChange={e => setWithdrawAmountBtc(e.target.value)}
                            className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}
                    <Button onClick={handleWithdraw} className="w-full">{t('simulations.buyAndWithdraw.withdrawButton')}</Button>
                </Card>
            </div>
        );
      case 4:
        return (
            <div className="text-center animate-fade-in">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                <p className="text-lg text-white font-semibold">{t('simulations.buyAndWithdraw.processingWithdraw')}</p>
                <p className="text-brand-text-secondary">{t('simulations.buyAndWithdraw.confirming')}</p>
            </div>
        );
      case 5:
        return (
            <div className="text-center animate-fade-in">
                <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-secondary mb-2">{t('simulations.buyAndWithdraw.successTitle')}</h3>
                <p className="text-brand-text-secondary mb-6">
                    {t('simulations.buyAndWithdraw.successDesc')}
                </p>
                <Card className="p-4 bg-brand-bg/50 max-w-md mx-auto">
                    <p className="font-semibold text-white">{t('simulations.buyAndWithdraw.selfCustodyBalance')}</p>
                    <p className="font-mono text-lg text-brand-secondary">{selfCustodyWallet.btc.toFixed(8)} BTC</p>
                </Card>
                <Button onClick={onComplete} variant="secondary" className="mt-6">{t('finishLesson')}</Button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.buyAndWithdraw.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        {t('simulations.buyAndWithdraw.description')}
      </p>
      {renderContent()}
    </Card>
  );
};

export default BuyAndWithdrawSim;
