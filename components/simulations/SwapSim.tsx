import React, { useState, useMemo, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';
import ScenarioQuiz, { Scenario } from './ScenarioQuiz';

// `depth` is the pool liquidity in USD on that token's side: small pools move the price a lot.
const TOKENS = {
  pETH: { name: 'Practice ETH', price: 2000, balance: 10, depth: 2_000_000 },
  pBTC: { name: 'Practice BTC', price: 30000, balance: 1, depth: 5_000_000 },
  pUSD: { name: 'Practice USD', price: 1, balance: 10000, depth: 20_000_000 },
  pDOG: { name: 'Practice DOG', price: 0.15, balance: 50000, depth: 50_000 },
};
type TokenId = keyof typeof TOKENS;
type Balances = Record<TokenId, number>;

const GAS_FEE = 15.5;
const SLIPPAGE_OPTIONS = [0.1, 0.5, 1, 5];

type Phase = 'swap' | 'processing' | 'success' | 'revert' | 'missions';

const fmt = (n: number) => (n >= 1000 ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : String(Number(n.toFixed(n < 1 ? 6 : 4))));

const SwapSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [fromToken, setFromToken] = useState<TokenId>('pETH');
  const [toToken, setToToken] = useState<TokenId>('pUSD');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [balances, setBalances] = useState<Balances>(() => ({
    pETH: TOKENS.pETH.balance, pBTC: TOKENS.pBTC.balance, pUSD: TOKENS.pUSD.balance, pDOG: TOKENS.pDOG.balance,
  }));
  const [phase, setPhase] = useState<Phase>('swap');
  const [result, setResult] = useState<{ from: string; to: string; impact: number; slip: number } | null>(null);
  const timer = useRef<number | undefined>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const fromVal = parseFloat(fromAmount) || 0;

  const quote = useMemo(() => {
    if (fromVal <= 0) return null;
    const tradeUsd = fromVal * TOKENS[fromToken].price;
    const impact = Math.min(50, (tradeUsd / TOKENS[toToken].depth) * 100);
    const receiveRaw = tradeUsd / TOKENS[toToken].price;
    const receive = receiveRaw * (1 - impact / 100);
    const minReceive = receive * (1 - slippage / 100);
    return { impact, receive, minReceive, tradeUsd };
  }, [fromVal, fromToken, toToken, slippage]);

  const insufficient = fromVal > balances[fromToken];

  const handleSwap = () => {
    if (!quote || insufficient) return;
    setPhase('processing');
    timer.current = window.setTimeout(() => {
      // The swap reverts when the price moves further than the tolerance the user set.
      if (quote.impact > slippage) {
        setResult({ from: '', to: '', impact: +quote.impact.toFixed(2), slip: slippage });
        setPhase('revert');
      } else {
        setBalances(b => ({ ...b, [fromToken]: b[fromToken] - fromVal, [toToken]: b[toToken] + quote.receive }));
        setResult({ from: `${fmt(fromVal)} ${fromToken}`, to: `${fmt(quote.receive)} ${toToken}`, impact: +quote.impact.toFixed(2), slip: slippage });
        setPhase('success');
      }
    }, 1600);
  };

  const reset = () => { setFromAmount(''); setPhase('swap'); setResult(null); };

  const flip = () => { setFromToken(toToken); setToToken(fromToken); setFromAmount(''); };

  const onFromChange = (id: TokenId) => {
    setFromToken(id);
    if (id === toToken) setToToken(id === 'pUSD' ? 'pETH' : 'pUSD');
  };

  const scenarios: Scenario[] = t('simsV2.swap.scenarios');

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simsV2.swap.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">{t('simsV2.swap.intro')}</p>

      {phase === 'missions' ? (
        <ScenarioQuiz scenarios={scenarios} onDone={onComplete} />
      ) : phase === 'processing' ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4" />
          <p className="text-lg text-white font-semibold">{t('simsV2.swap.processing')}</p>
          <p className="text-brand-text-secondary">{t('simsV2.swap.processingDesc')}</p>
        </div>
      ) : phase === 'success' && result ? (
        <div className="text-center animate-fade-in max-w-md mx-auto">
          <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white">{t('simsV2.swap.successTitle')}</h3>
          <p className="text-brand-text-secondary mt-2">{t('simsV2.swap.successDesc', { from: result.from, to: result.to })}</p>
          <p className="text-sm text-brand-text-secondary mt-2">{t('simsV2.swap.priceImpact')}: <span className="font-mono text-white">{result.impact}%</span> · {t('simsV2.swap.gasFee')}: <span className="font-mono text-white">${GAS_FEE.toFixed(2)}</span></p>
          <div className="mt-6 flex flex-col gap-3 items-center">
            <Button onClick={() => setPhase('missions')} variant="secondary">{t('simsV2.swap.toMissions')}</Button>
            <button onClick={reset} className="text-brand-text-secondary hover:text-white text-sm">{t('simsV2.swap.another')}</button>
          </div>
        </div>
      ) : phase === 'revert' && result ? (
        <div className="text-center animate-fade-in max-w-md mx-auto">
          <XCircleIcon className="h-16 w-16 text-red-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white">{t('simsV2.swap.revertTitle')}</h3>
          <p className="text-brand-text-secondary mt-2">{t('simsV2.swap.revertDesc', { impact: result.impact, slip: result.slip, gas: `$${GAS_FEE.toFixed(2)}` })}</p>
          <div className="mt-6 flex flex-col gap-3 items-center">
            <Button onClick={reset}>{t('simsV2.swap.another')}</Button>
            <button onClick={() => setPhase('missions')} className="text-brand-text-secondary hover:text-white text-sm">{t('simsV2.swap.toMissions')}</button>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-3">{t('simsV2.swap.step1')}</h3>

          <div className="bg-brand-bg/50 p-4 rounded-lg mb-2">
            <label className="text-sm text-brand-text-secondary" htmlFor="swap-from">{t('simsV2.swap.youPay')}</label>
            <div className="flex justify-between items-center mt-1 gap-2">
              <input id="swap-from" type="number" min="0" value={fromAmount} onChange={e => setFromAmount(e.target.value)} placeholder="0.0" className="text-2xl bg-transparent w-full focus:outline-none text-white" />
              <select aria-label={t('simsV2.swap.youPay')} value={fromToken} onChange={e => onFromChange(e.target.value as TokenId)} className="bg-brand-surface p-2 rounded-lg text-white font-semibold">
                {(Object.keys(TOKENS) as TokenId[]).map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            </div>
            <div className="text-xs text-brand-text-secondary mt-1 flex justify-between">
              <span>{t('simsV2.swap.balance')}: {fmt(balances[fromToken])}</span>
              <button className="text-brand-primary hover:underline" onClick={() => setFromAmount(String(balances[fromToken]))}>MAX</button>
            </div>
          </div>

          <div className="text-center my-2">
            <button onClick={flip} aria-label="Flip tokens" className="p-2 bg-brand-surface rounded-full hover:bg-gray-700"><ArrowPathIcon className="h-5 w-5 text-brand-primary" /></button>
          </div>

          <div className="bg-brand-bg/50 p-4 rounded-lg mb-5">
            <label className="text-sm text-brand-text-secondary">{t('simsV2.swap.youReceive')}</label>
            <div className="flex justify-between items-center mt-1 gap-2">
              <input readOnly value={quote ? fmt(quote.receive) : ''} placeholder="0.0" className="text-2xl bg-transparent w-full focus:outline-none text-white" />
              <select aria-label={t('simsV2.swap.youReceive')} value={toToken} onChange={e => setToToken(e.target.value as TokenId)} className="bg-brand-surface p-2 rounded-lg text-white font-semibold">
                {(Object.keys(TOKENS) as TokenId[]).filter(id => id !== fromToken).map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            </div>
            <div className="text-xs text-brand-text-secondary mt-1">{t('simsV2.swap.balance')}: {fmt(balances[toToken])}</div>
          </div>

          <div className="mb-5">
            <p className="text-sm font-semibold text-white">{t('simsV2.swap.slippage')}</p>
            <p className="text-xs text-brand-text-secondary mb-2">{t('simsV2.swap.slippageHint')}</p>
            <div className="flex gap-2" role="group" aria-label={t('simsV2.swap.slippage')}>
              {SLIPPAGE_OPTIONS.map(v => (
                <button key={v} onClick={() => setSlippage(v)} aria-pressed={slippage === v} className={`flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition-colors ${slippage === v ? 'border-brand-primary bg-brand-primary/10 text-white' : 'border-gray-700 text-brand-text-secondary hover:border-gray-500'}`}>{v}%</button>
              ))}
            </div>
          </div>

          {quote && (
            <div className="text-sm text-brand-text-secondary space-y-2 mb-4 animate-fade-in">
              <div className="flex justify-between"><span>{t('simsV2.swap.rate')}</span><span className="text-white font-mono">1 {fromToken} ≈ {fmt(TOKENS[fromToken].price / TOKENS[toToken].price)} {toToken}</span></div>
              <div className="flex justify-between"><span>{t('simsV2.swap.priceImpact')}</span><span className={`font-mono ${quote.impact > 1 ? 'text-red-400' : 'text-white'}`}>{quote.impact.toFixed(2)}%</span></div>
              <div className="flex justify-between"><span>{t('simsV2.swap.minReceived')}</span><span className="text-white font-mono">{fmt(quote.minReceive)} {toToken}</span></div>
              <div className="flex justify-between"><span>{t('simsV2.swap.gasFee')}</span><span className="text-white font-mono">${GAS_FEE.toFixed(2)}</span></div>
            </div>
          )}

          {quote && quote.impact > 1 && (
            <p className="flex items-start gap-2 text-sm text-yellow-400 mb-3"><ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />{t('simsV2.swap.warnImpact')}</p>
          )}
          {slippage >= 5 && (
            <p className="flex items-start gap-2 text-sm text-yellow-400 mb-3"><ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />{t('simsV2.swap.warnSlip')}</p>
          )}

          <Button onClick={handleSwap} disabled={fromVal <= 0 || insufficient} className="w-full">
            {insufficient ? t('simsV2.swap.insufficient') : t('simsV2.swap.swapButton')}
          </Button>
          <p className="mt-3 text-xs text-brand-text-secondary text-center">{t('simsV2.swap.hint')}</p>
        </div>
      )}
    </Card>
  );
};

export default SwapSim;
