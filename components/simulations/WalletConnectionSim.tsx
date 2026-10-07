
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import SimulationIntro from '../ui/SimulationIntro';
import { useLanguage } from '../../hooks/useLanguage';

const WalletConnectionSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const fakeAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Vitalik Buterin's address for fun

  const connectWallet = () => {
    // Simulate the process of connecting
    setStep(2); // Show 'connecting' state
    setTimeout(() => {
      setStep(3); // Show confirmation
    }, 1500);
  };

  const approveConnection = () => {
    setStep(4); // Show 'connected' state
    setIsConnected(true);
    setTimeout(() => {
        onComplete();
    }, 2000);
  };

  const rejectConnection = () => {
    setStep(1);
    setIsConnected(false);
  };

  return (
    <Card className="max-w-xl mx-auto p-6 md:p-8">
      {step === 0 ? (
        <SimulationIntro
          title={t('simulations.walletConnection.title')}
          description={t('simulations.walletConnection.description')}
          objectives={t('simulations.walletConnection.objectives')}
          onStart={() => setStep(1)}
        />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.walletConnection.title')}</h2>
          <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto hidden md:block">
            {t('simulations.walletConnection.description')}
          </p>
          
          <div className="bg-brand-bg/50 p-6 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">{t('simulations.walletConnection.dapp')}: UniSwap</h3>
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {isConnected ? t('simulations.walletConnection.connected') : t('simulations.walletConnection.notConnected')}
              </span>
            </div>

            {step === 1 && (
              <div className="text-center animate-fade-in">
                <p className="mb-4 text-brand-text-secondary">{t('simulations.walletConnection.step1Desc')}</p>
                <Button onClick={connectWallet}>{t('simulations.walletConnection.connectButton')}</Button>
              </div>
            )}

            {step === 2 && (
              <div className="text-center animate-fade-in">
                <p className="mb-4 text-brand-text-secondary">{t('simulations.walletConnection.step2Desc')}</p>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center animate-fade-in">
                <h4 className="text-lg font-bold text-brand-primary mb-2">{t('simulations.walletConnection.step3Title')}</h4>
                <p className="mb-1 text-brand-text-secondary">{t('simulations.walletConnection.step3Desc', { dappName: 'UniSwap' })}</p>
                <p className="font-mono text-sm bg-brand-bg px-2 py-1 rounded-md inline-block mb-4 break-all">{fakeAddress}</p>
                <p className="text-xs text-brand-text-secondary mb-4" dangerouslySetInnerHTML={{ __html: t('simulations.walletConnection.step3Permissions', { dappName: 'UniSwap' }) }}></p>
                <div className="flex justify-center gap-4">
                  <Button onClick={rejectConnection} variant="accent" className="bg-red-600 hover:bg-red-500">{t('simulations.walletConnection.reject')}</Button>
                  <Button onClick={approveConnection} variant="primary">{t('simulations.walletConnection.approve')}</Button>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="text-center animate-fade-in">
                <h4 className="text-lg font-bold text-brand-secondary mb-2">{t('simulations.walletConnection.step4Title')}</h4>
                <p className="mb-4 text-brand-text-secondary">{t('simulations.walletConnection.step4Desc', { dappName: 'UniSwap' })}</p>
                <p className="text-xs text-brand-text-secondary">{t('simulations.walletConnection.step4Tip')}</p>
              </div>
            )}

          </div>
        </>
      )}
    </Card>
  );
};

export default WalletConnectionSim;
