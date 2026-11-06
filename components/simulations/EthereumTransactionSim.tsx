import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { KeyIcon, UserIcon, ServerIcon, CubeTransparentIcon, ShieldCheckIcon, LockClosedIcon, CheckCircleIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';

const EthereumTransactionSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('0.5');
  const [userBalance, setUserBalance] = useState(1.0);
  const [recipientBalance, setRecipientBalance] = useState(0.0);
  const [showQuiz, setShowQuiz] = useState(false);

  const userPubKey = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  const recipientPubKey = "0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6";

  const quizQuestions: QuizQuestion[] = [
    {
        question: "Instead of miners, what does Ethereum's Proof-of-Stake (PoS) system use to validate transactions?",
        options: [
            { text: "Validators", isCorrect: true },
            { text: "Oracles", isCorrect: false },
        ],
        explanation: "In PoS, validators are responsible for processing transactions and creating new blocks. They are chosen based on the amount of ETH they have 'staked'."
    },
    {
        question: "How are validators chosen to propose a new block in a Proof-of-Stake system?",
        options: [
            { text: "Based on who solves a complex puzzle first.", isCorrect: false },
            { text: "Randomly, often weighted by the amount of ETH they have 'staked'.", isCorrect: true },
        ],
        explanation: "Unlike PoW, there's no computational race. Validators are selected to create blocks based on their stake, which secures the network economically."
    },
    {
        question: "What is a major advantage of Proof-of-Stake (PoS) over Proof-of-Work (PoW)?",
        options: [
            { text: "It is more decentralized.", isCorrect: false },
            { text: "It uses significantly less energy.", isCorrect: true },
        ],
        explanation: "PoS is much more energy-efficient because it doesn't require vast amounts of computational power for mining, which is a major criticism of PoW."
    }
];

  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        setUserBalance(prev => prev - parseFloat(amount));
        setRecipientBalance(prev => prev + parseFloat(amount));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, amount]);

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        setStep(5);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const restart = () => {
    setStep(1);
    setAmount('0.5');
    setUserBalance(1.0);
    setRecipientBalance(0.0);
    setShowQuiz(false);
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">{t('simulations.btcTx.step1Title')}</h3>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <Card className="p-4 bg-brand-bg/50">
                <div className="flex items-center gap-3 mb-3"><UserIcon className="h-6 w-6 text-brand-secondary"/><h4 className="font-bold text-lg text-white">{t('simulations.btcTx.yourWallet')}</h4></div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><KeyIcon className="h-5 w-5 text-red-400"/> <span className="font-semibold">{t('simulations.btcTx.privateKey')}</span></div>
                  <div className="flex items-center gap-2"><KeyIcon className="h-5 w-5 text-green-400"/> <div><span className="font-semibold">{t('simulations.ethTx.publicAddress')}:</span><p className="font-mono text-xs break-all">{userPubKey}</p></div></div>
                  <p className="font-bold text-lg pt-2">{t('simulations.btcTx.balance')}: <span className="text-sky-300">{userBalance.toFixed(1)} ETH</span></p>
                </div>
              </Card>
              <Card className="p-4 bg-brand-bg/50">
                 <div className="flex items-center gap-3 mb-3"><UserIcon className="h-6 w-6 text-brand-text-secondary"/><h4 className="font-bold text-lg text-white">{t('simulations.btcTx.recipientWallet')}</h4></div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><KeyIcon className="h-5 w-5 text-green-400"/> <div><span className="font-semibold">{t('simulations.ethTx.publicAddress')}:</span><p className="font-mono text-xs break-all">{recipientPubKey}</p></div></div>
                  <p className="font-bold text-lg pt-2">{t('simulations.btcTx.balance')}: <span className="text-sky-300">{recipientBalance.toFixed(1)} ETH</span></p>
                </div>
              </Card>
            </div>
            <div className="text-center mt-6">
              <label className="block font-semibold mb-2">{t('simulations.btcTx.amountToSend')}</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-brand-bg border border-gray-600 rounded-lg p-2 text-center w-40 mb-4"/>
              <Button onClick={() => setStep(2)} disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > userBalance}>
                {t('simulations.btcTx.signButton')}
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.btcTx.step2Title')}</h3>
            <p className="text-brand-text-secondary mb-6">{t('simulations.btcTx.step2Desc')}</p>
            <div className="flex flex-col items-center gap-4">
               <Card className="p-4 bg-brand-bg/50 w-full max-w-sm">
                    <p className="font-mono text-sm">FROM: {userPubKey.substring(0,12)}...</p>
                    <p className="font-mono text-sm">TO: {recipientPubKey.substring(0,12)}...</p>
                    <p className="font-mono text-sm">AMOUNT: {amount} ETH</p>
               </Card>
               <LockClosedIcon className="h-8 w-8 text-red-400 animate-pulse" />
               <Card className="p-4 bg-brand-secondary/20 border-brand-secondary w-full max-w-sm">
                    <p className="font-bold text-brand-secondary">{t('simulations.btcTx.signed')}</p>
                    <p className="font-mono text-xs break-all text-green-300">{t('simulations.btcTx.signature')}: 0x123abc...789def...</p>
               </Card>
            </div>
             <Button onClick={() => setStep(3)} className="mt-8">{t('simulations.btcTx.broadcastButton')}</Button>
          </div>
        );
      case 3:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.btcTx.step3Title')}</h3>
            <p className="text-brand-text-secondary mb-6">{t('simulations.btcTx.step3Desc')}</p>
            <div className="flex justify-center items-center gap-8">
                <Card className="p-4 bg-brand-secondary/20"><p>{t('simulations.btcTx.yourTx')}</p></Card>
                <div className="text-5xl animate-fade-in-delayed">→</div>
                <div className="relative">
                    <CubeTransparentIcon className="h-32 w-32 text-brand-primary"/>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">{t('simulations.btcTx.mempool')}</div>
                </div>
            </div>
            <Button onClick={() => setStep(4)} className="mt-8">{t('simulations.btcTx.watchMiners')}</Button>
          </div>
        );
      case 4:
        return (
           <div className="text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.ethTx.step4Title')}</h3>
            <p className="text-brand-text-secondary mb-6">{t('simulations.ethTx.step4Desc')}</p>
            <div className="flex flex-col items-center gap-4">
                <ServerIcon className="h-16 w-16 text-gray-400" />
                <div className="flex items-center gap-2 font-bold text-lg text-brand-secondary animate-pulse">
                    <ShieldCheckIcon className="h-6 w-6"/>
                    <span>{t('simulations.ethTx.validating')}</span>
                    <ShieldCheckIcon className="h-6 w-6"/>
                </div>
                <p className="font-mono text-sm bg-brand-bg/50 p-2 rounded">{t('simulations.ethTx.validatorChosen')}: 0x987b...321a</p>
                <p className="text-sm">{t('simulations.ethTx.stake')}: 32 ETH</p>
            </div>
          </div>
        );
      case 5:
         return (
           <div className="animate-fade-in">
             {!showQuiz ? (
               <div className="text-center">
                 <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                 <h3 className="text-2xl font-semibold mb-4 text-brand-secondary">{t('simulations.ethTx.successTitle')}</h3>
                 <p className="text-brand-text-secondary mb-6">{t('simulations.ethTx.successDesc')}</p>
                 <div className="grid md:grid-cols-2 gap-6 items-start">
                   <Card className="p-4 bg-brand-bg/50">
                     <h4 className="font-bold text-lg text-white mb-2">{t('simulations.btcTx.yourWallet')}</h4>
                     <p className="font-bold text-lg">{t('simulations.btcTx.balance')}: <span className="text-sky-300 transition-all duration-500">{userBalance.toFixed(1)} ETH</span></p>
                   </Card>
                   <Card className="p-4 bg-brand-bg/50">
                     <h4 className="font-bold text-lg text-white mb-2">{t('simulations.btcTx.recipientWallet')}</h4>
                     <p className="font-bold text-lg">{t('simulations.btcTx.balance')}: <span className="text-sky-300 transition-all duration-500">{recipientBalance.toFixed(1)} ETH</span></p>
                   </Card>
                 </div>
                 <div className="flex justify-center gap-4 mt-8">
                   <Button onClick={restart} variant="primary">{t('simulations.btcTx.restart')}</Button>
                   <Button onClick={() => setShowQuiz(true)} variant="secondary">{t('takeQuiz')}</Button>
                 </div>
               </div>
             ) : (
                <Quiz questions={quizQuestions} onComplete={onComplete} />
             )}
           </div>
         );
      default:
        return null;
    }
  }

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.ethTx.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-3xl mx-auto">
        {t('simulations.ethTx.description')}
      </p>
      {renderStep()}
    </Card>
  );
};

export default EthereumTransactionSim;
