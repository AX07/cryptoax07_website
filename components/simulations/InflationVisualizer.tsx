import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

// Simplified historical data for visualization purposes
const data = [
  { year: '2010', usdValue: 100, btcValue: 100, ethValue: 0 },
  { year: '2011', usdValue: 96.9, btcValue: 600, ethValue: 0 },
  { year: '2012', usdValue: 94.9, btcValue: 1300, ethValue: 0 },
  { year: '2013', usdValue: 93.5, btcValue: 75500, ethValue: 0 },
  { year: '2014', usdValue: 92.0, btcValue: 31400, ethValue: 0 },
  { year: '2015', usdValue: 91.9, btcValue: 43000, ethValue: 0 },
  { year: '2016', usdValue: 90.7, btcValue: 96000, ethValue: 800 },
  { year: '2017', usdValue: 88.8, btcValue: 1388000, ethValue: 73000 },
  { year: '2018', usdValue: 86.7, btcValue: 374000, ethValue: 13000 },
  { year: '2019', usdValue: 85.2, btcValue: 719000, ethValue: 12900 },
  { year: '2020', usdValue: 84.1, btcValue: 2900000, ethValue: 73000 },
  { year: '2021', usdValue: 79.2, btcValue: 4660000, ethValue: 368000 },
  { year: '2022', usdValue: 73.3, btcValue: 1660000, ethValue: 120000 },
  { year: '2023', usdValue: 70.9, btcValue: 4300000, ethValue: 230000 },
  { year: '2024', usdValue: 68.5, btcValue: 6500000, ethValue: 350000 },
];

const quizQuestions: QuizQuestion[] = [
    {
        question: "According to the chart, what happens to the 'Purchasing Power of $100' over time?",
        options: [
            { text: "It increases", isCorrect: false },
            { text: "It decreases", isCorrect: true },
        ],
        explanation: "The chart shows a steady decline in the purchasing power of the US Dollar, which is a result of inflation."
    },
    {
        question: "What is the primary economic principle that causes the value of fiat currency, like the USD, to decrease over time?",
        options: [
            { text: "Deflation", isCorrect: false },
            { text: "Inflation", isCorrect: true },
        ],
        explanation: "Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling."
    },
    {
        question: "This simplified, historical chart suggests which asset might serve as a better long-term store of value against inflation?",
        options: [
            { text: "Holding US Dollars", isCorrect: false },
            { text: "Holding Bitcoin", isCorrect: true },
        ],
        explanation: "Historically, Bitcoin's value has grown significantly, while the dollar's purchasing power has decreased. Note: Past performance is not indicative of future results."
    }
]

const formatYAxis = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
};

const CustomTooltip: React.FC<any> = ({ active, payload, label, t }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-surface p-4 border border-gray-700 rounded-lg shadow-lg">
        <p className="font-bold text-white">{`${t('simulations.inflation.tooltipYear')}: ${label}`}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {`${p.name}: ${formatYAxis(p.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const InflationVisualizer: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useLanguage();
    const [logScale, setLogScale] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);

  return (
    <Card className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.inflation.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
        {t('simulations.inflation.description')}
      </p>
      
      <div className="h-96 w-full mb-6">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="year" stroke="#94A3B8" />
            <YAxis 
                stroke="#94A3B8"
                tickFormatter={formatYAxis}
                scale={logScale ? 'log' : 'linear'}
                domain={logScale ? [1, 'auto'] : [0, 'auto']}
                allowDataOverflow={true}
            />
            <Tooltip content={<CustomTooltip t={t} />} />
            <Legend wrapperStyle={{ color: '#E2E8F0' }} />
            <Line type="monotone" name={t('simulations.inflation.powerOf100')} dataKey="usdValue" stroke="#F472B6" strokeWidth={2} dot={false} />
            <Line type="monotone" name={t('simulations.inflation.inBitcoin')} dataKey="btcValue" stroke="#38BDF8" strokeWidth={2} dot={false} />
            <Line type="monotone" name={t('simulations.inflation.inEthereum')} dataKey="ethValue" stroke="#34D399" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button onClick={() => setLogScale(!logScale)}>
          {t('simulations.inflation.logScaleButton', { scale: logScale ? t('simulations.inflation.linear') : t('simulations.inflation.log') })}
        </Button>
        {!showQuiz &&
            <Button onClick={() => setShowQuiz(true)} variant="secondary">
              {t('simulations.inflation.quizButton')}
            </Button>
        }
      </div>
       <p className="text-xs text-brand-text-secondary text-center mt-4">
        {t('simulations.inflation.disclaimer')}
      </p>

      {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
    </Card>
  );
};

export default InflationVisualizer;
