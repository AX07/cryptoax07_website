import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

// Mock data for the chart
const mockData = [
  { time: '10:00', ohlc: [100, 105, 98, 102] },
  { time: '11:00', ohlc: [102, 110, 101, 108] },
  { time: '12:00', ohlc: [108, 109, 100, 101] },
  { time: '13:00', ohlc: [101, 103, 95, 96] },
  { time: '14:00', ohlc: [96, 105, 95, 104] },
  { time: '15:00', ohlc: [104, 112, 103, 110] },
  { time: '16:00', ohlc: [110, 111, 105, 106] },
];

const Candlestick = (props: any) => {
  const { x, y, width, height, payload } = props;
  
  if (!payload || !payload.ohlc) return null;

  const { ohlc } = payload;
  const [open, high, low, close] = ohlc;

  if (height <= 0) {
    const pixelsPerUnit = 0; 
    const bodyY = y + (high - Math.max(open, close)) * pixelsPerUnit;
    return <rect x={x} y={bodyY} width={width} height={1} fill="#94A3B8" />;
  }

  const isBullish = close > open;
  const color = isBullish ? '#34D399' : '#F472B6';
  const pixelsPerUnit = height / (high - low);
  const wickX = x + width / 2;
  const bodyTopValue = Math.max(open, close);
  const bodyY = y + (high - bodyTopValue) * pixelsPerUnit;
  const bodyHeight = Math.abs(open - close) * pixelsPerUnit;

  return (
    <g stroke={color} fill={color} strokeWidth={1}>
      <line x1={wickX} y1={y} x2={wickX} y2={y + height} strokeWidth={2}/>
      <rect x={x} y={bodyY} width={width} height={Math.max(1, bodyHeight)} />
    </g>
  );
};

const CandlestickChartSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  
  const quizQuestions: QuizQuestion[] = [
    {
        question: "What does a green (bullish) candle typically indicate?",
        options: [
            { text: "The price closed lower than it opened.", isCorrect: false },
            { text: "The price closed higher than it opened.", isCorrect: true },
        ],
        explanation: "A green or 'bullish' candle signifies that the closing price was higher than the opening price for that period, indicating upward price movement."
    },
    {
        question: "What do the thin lines (wicks or shadows) above and below a candle's body represent?",
        options: [
            { text: "The amount of trading volume.", isCorrect: false },
            { text: "The highest and lowest prices reached during the period.", isCorrect: true },
        ],
        explanation: "Wicks show the full range of price movement. The top of the upper wick is the highest price, and the bottom of the lower wick is the lowest price."
    },
    {
        question: "If a candle's body is pink (bearish), it means...",
        options: [
            { text: "The opening price was lower than the closing price.", isCorrect: false },
            { text: "The closing price was lower than the opening price.", isCorrect: true },
        ],
        explanation: "A pink or 'bearish' candle indicates downward price movement, where the asset's price ended the period lower than where it started."
    }
];

  return (
    <Card className="max-w-6xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.candlestick.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-3xl mx-auto">
        {t('simulations.candlestick.description')}
      </p>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="h-96 w-full">
            <ResponsiveContainer>
                <BarChart data={mockData} barGap={-16}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="time" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} labelStyle={{ color: '#E2E8F0' }} formatter={(value, name, props) => {
                        const [o, h, l, c] = props.payload.ohlc;
                        return [`Open: ${o}, High: ${h}, Low: ${l}, Close: ${c}`, 'Price'];
                    }}/>
                    <Bar dataKey={(d) => [d.ohlc[2], d.ohlc[1]]} shape={<Candlestick />} />
                </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="space-y-4">
            <Card className="p-4 bg-brand-bg/50">
                <h3 className="text-xl font-bold text-white mb-2">{t('simulations.candlestick.anatomyTitle')}</h3>
                <div className="flex items-start gap-4">
                    <div className="text-center">
                        <div className="w-8 h-20 bg-brand-secondary mx-auto relative">
                            <div className="absolute top-[-20px] left-1/2 w-0.5 h-5 bg-brand-secondary"></div>
                            <div className="absolute bottom-[-20px] left-1/2 w-0.5 h-5 bg-brand-secondary"></div>
                        </div>
                        <span className="text-xs text-brand-secondary">{t('simulations.candlestick.bullish')}</span>
                    </div>
                    <div className="flex-1 space-y-2 text-sm">
                        <p><strong className="text-brand-primary">{t('simulations.candlestick.body')}</strong> {t('simulations.candlestick.bodyDesc')}</p>
                        <p><strong className="text-brand-primary">{t('simulations.candlestick.wick')}</strong> {t('simulations.candlestick.wickDesc')}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 mt-4">
                    <div className="text-center">
                        <div className="w-8 h-20 bg-brand-accent mx-auto relative">
                            <div className="absolute top-[-20px] left-1/2 w-0.5 h-5 bg-brand-accent"></div>
                            <div className="absolute bottom-[-20px] left-1/2 w-0.5 h-5 bg-brand-accent"></div>
                        </div>
                        <span className="text-xs text-brand-accent">{t('simulations.candlestick.bearish')}</span>
                    </div>
                    <div className="flex-1 space-y-2 text-sm">
                        <p>{t('simulations.candlestick.bearishDesc')}</p>
                    </div>
                </div>
            </Card>
        </div>
      </div>
      
      <Quiz questions={quizQuestions} onComplete={onComplete} />
    </Card>
  );
};

export default CandlestickChartSim;
