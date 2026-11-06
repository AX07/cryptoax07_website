import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon, ExclamationTriangleIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';
import ScenarioQuiz, { Scenario } from './ScenarioQuiz';

type Choice = 'exact' | 'unlimited';
type Step = 'choose' | 'wallet' | 'processing' | 'hack' | 'missions';

const TokenApprovalSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('choose');
  const [choice, setChoice] = useState<Choice>('exact');
  const timer = useRef<number | undefined>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const confirm = () => {
    setStep('processing');
    timer.current = window.setTimeout(() => setStep('hack'), 2200);
  };

  const scenarios: Scenario[] = t('simsV2.approval.scenarios');
  const amountLabel = choice === 'exact' ? '1,000 pUSD' : t('simsV2.approval.unlimited');

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simsV2.approval.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">{t('simsV2.approval.intro')}</p>

      {step === 'choose' && (
        <div className="bg-brand-bg/50 p-6 rounded-lg border border-gray-700 text-center animate-fade-in max-w-md mx-auto">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">{t('simsV2.approval.step1')}</h3>
          <h4 className="text-xl font-semibold text-white mb-2">{t('simsV2.approval.dappTitle')}</h4>
          <p className="text-brand-text-secondary mb-5">{t('simsV2.approval.dappDesc')}</p>
          <p className="font-bold text-white mb-2">{t('simsV2.approval.amount')}</p>
          <div className="grid gap-3 mb-4" role="radiogroup" aria-label={t('simsV2.approval.amount')}>
            {(['exact', 'unlimited'] as Choice[]).map(c => (
              <button key={c} role="radio" aria-checked={choice === c} onClick={() => setChoice(c)}
                className={`px-4 py-3 rounded-lg border-2 text-left transition-colors ${choice === c ? 'border-brand-primary bg-brand-primary/10 text-white' : 'border-gray-600 text-brand-text-secondary hover:border-gray-500'}`}>
                {t(`simsV2.approval.${c}`)}
              </button>
            ))}
          </div>
          {choice === 'unlimited' && (
            <p className="flex items-start gap-2 text-xs text-yellow-400 mb-4 text-left"><ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />{t('simsV2.approval.unlimitedWarn')}</p>
          )}
          <Button onClick={() => setStep('wallet')}>{t('simsV2.approval.approveBtn')}</Button>
        </div>
      )}

      {step === 'wallet' && (
        <div className="text-center animate-fade-in max-w-md mx-auto">
          <h4 className="text-lg font-bold text-brand-primary mb-2">{t('simsV2.approval.walletTitle')}</h4>
          <p className="text-brand-text-secondary">{t('simsV2.approval.walletDesc')}</p>
          <div className="bg-brand-bg/50 p-4 rounded-lg border border-gray-700 my-4">
            <div className="flex justify-between mb-2"><span className="text-brand-text-secondary">{t('simsV2.approval.amountLabel')}</span><span className="font-mono text-white">{amountLabel}</span></div>
            <div className="flex justify-between"><span className="text-brand-text-secondary">{t('simsV2.approval.feeLabel')}</span><span className="font-mono text-white">0.005 pETH ($10.00)</span></div>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setStep('choose')} className="bg-red-600 hover:bg-red-500 text-white">{t('simsV2.approval.reject')}</Button>
            <Button onClick={confirm}>{t('simsV2.approval.confirm')}</Button>
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4" />
          <p className="text-lg text-white font-semibold">{t('simsV2.approval.processing')}</p>
        </div>
      )}

      {step === 'hack' && (
        <div className="text-center animate-fade-in max-w-md mx-auto">
          <p className="flex items-center justify-center gap-2 text-brand-secondary mb-5"><CheckCircleIcon className="h-5 w-5" />{t('simsV2.approval.depositDone')}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-text-secondary mb-3">{t('simsV2.approval.fastForward')}</p>
          <div className={`p-5 rounded-xl border-2 ${choice === 'unlimited' ? 'border-red-500 bg-red-500/10' : 'border-brand-secondary bg-brand-secondary/10'}`}>
            <h3 className="text-xl font-bold text-white mb-2">{t('simsV2.approval.hackTitle')}</h3>
            <p className="text-brand-text-secondary">{choice === 'unlimited' ? t('simsV2.approval.hackUnlimited') : t('simsV2.approval.hackExact')}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 items-center">
            <Button onClick={() => setStep('missions')} variant="secondary">{t('simsV2.approval.toMissions')}</Button>
            <button onClick={() => { setChoice(choice === 'exact' ? 'unlimited' : 'exact'); setStep('choose'); }} className="text-brand-text-secondary hover:text-white text-sm">{t('simsV2.approval.replay')}</button>
          </div>
        </div>
      )}

      {step === 'missions' && <ScenarioQuiz scenarios={scenarios} onDone={onComplete} />}
    </Card>
  );
};

export default TokenApprovalSim;
