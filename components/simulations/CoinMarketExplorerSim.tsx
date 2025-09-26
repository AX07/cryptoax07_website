import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

const mockCoins = [
  { rank: 1, name: 'Bitcoin', ticker: 'BTC', price: 65432.1, change24h: 2.5, marketCap: 1.29e12 },
  { rank: 2, name: 'Ethereum', ticker: 'ETH', price: 3501.45, change24h: 4.1, marketCap: 420.6e9 },
  { rank: 3, name: 'Tether', ticker: 'USDT', price: 1.00, change24h: -0.1, marketCap: 112.5e9 },
  { rank: 4, name: 'BNB', ticker: 'BNB', price: 580.76, change24h: 1.8, marketCap: 85.7e9 },
  { rank: 5, name: 'Solana', ticker: 'SOL', price: 172.33, change24h: -3.2, marketCap: 77.4e9 },
  { rank: 6, name: 'USD Coin', ticker: 'USDC', price: 1.00, change24h: 0.0, marketCap: 33.9e9 },
  { rank: 7, name: 'XRP', ticker: 'XRP', price: 0.52, change24h: 0.5, marketCap: 28.9e9 },
  { rank: 8, name: 'Dogecoin', ticker: 'DOGE', price: 0.16, change24h: 7.8, marketCap: 23.1e9 },
  { rank: 9, name: 'Cardano', ticker: 'ADA', price: 0.45, change24h: -1.5, marketCap: 16.1e9 },
  { rank: 10, name: 'Avalanche', ticker: 'AVAX', price: 36.87, change24h: 2.2, marketCap: 14.5e9 },
];

const quizQuestions: QuizQuestion[] = [
    {
        question: "What does 'Market Cap' represent?",
        options: [
            { text: "The number of coins traded in a day.", isCorrect: false },
            { text: "The total value of all circulating coins (Price x Supply).", isCorrect: true },
        ],
        explanation: "Market Cap is a key metric used to gauge the relative size and value of a cryptocurrency."
    },
    {
        question: "If Solana's '24h %' is red and shows -3.2%, what happened?",
        options: [
            { text: "Its price went up by 3.2% in the last 24 hours.", isCorrect: false },
            { text: "Its price went down by 3.2% in the last 24 hours.", isCorrect: true },
        ],
        explanation: "The '24h %' shows the price change over the last day. Red or a negative sign indicates a price decrease."
    },
    {
        question: "According to the data provided, which coin has the largest Market Cap?",
        options: [
            { text: "Ethereum", isCorrect: false },
            { text: "Bitcoin", isCorrect: true },
        ],
        explanation: "Bitcoin is ranked #1, indicating it has the highest market capitalization among all the listed cryptocurrencies."
    }
];

const formatCurrency = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

const CoinMarketExplorerSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [showQuiz, setShowQuiz] = useState(false);
  return (
    <Card className="max-w-6xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.marketExplorer.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-3xl mx-auto">
        {t('simulations.marketExplorer.description')}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-brand-text-secondary uppercase bg-brand-bg/50">
            <tr>
              <th scope="col" className="px-6 py-3">{t('simulations.marketExplorer.rank')}</th>
              <th scope="col" className="px-6 py-3">{t('simulations.marketExplorer.name')}</th>
              <th scope="col" className="px-6 py-3">{t('simulations.marketExplorer.price')}</th>
              <th scope="col" className="px-6 py-3">{t('simulations.marketExplorer.change24h')}</th>
              <th scope="col" className="px-6 py-3">{t('simulations.marketExplorer.marketCap')}</th>
            </tr>
          </thead>
          <tbody>
            {mockCoins.map(coin => (
              <tr key={coin.ticker} className="border-b border-gray-700 hover:bg-brand-surface/50">
                <td className="px-6 py-4">{coin.rank}</td>
                <th scope="row" className="px-6 py-4 font-bold text-white whitespace-nowrap">
                  {coin.name} <span className="text-brand-text-secondary font-normal">{coin.ticker}</span>
                </th>
                <td className="px-6 py-4 font-mono text-white">${coin.price.toLocaleString()}</td>
                <td className={`px-6 py-4 font-semibold ${coin.change24h >= 0 ? 'text-brand-secondary' : 'text-red-400'}`}>
                  {coin.change24h >= 0 ? '▲' : '▼'} {coin.change24h.toFixed(1)}%
                </td>
                <td className="px-6 py-4 font-mono text-white">{formatCurrency(coin.marketCap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <p className="text-xs text-brand-text-secondary text-center mt-4">
        <strong>{t('simulations.marketExplorer.marketCap')}</strong> = {t('simulations.marketExplorer.marketCapDesc')}
      </p>

      {!showQuiz && (
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <Button onClick={() => setShowQuiz(true)} variant="secondary">
            {t('takeQuiz')}
          </Button>
        </div>
      )}

      {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
    </Card>
  );
};

export default CoinMarketExplorerSim;
