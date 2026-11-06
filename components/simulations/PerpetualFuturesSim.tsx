import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { ExclamationTriangleIcon } from '../icons/Icons';

const quizQuestions: QuizQuestion[] = [
    {
        question: "What is 'leverage' in futures trading?",
        options: [
            { text: "A fee paid to the exchange.", isCorrect: false },
            { text: "Borrowed capital to increase a position's size, amplifying potential profits and losses.", isCorrect: true },
        ],
        explanation: "Leverage allows you to control a large position with a smaller amount of your own capital (margin). While it can magnify gains, it also magnifies losses and increases risk."
    },
    {
        question: "What happens if the price reaches your 'liquidation price'?",
        options: [
            { text: "Your position is automatically closed at a loss to prevent further debt.", isCorrect: true },
            { text: "You earn a bonus from the exchange.", isCorrect: false },
        ],
        explanation: "Liquidation is a safety mechanism. The exchange forcibly closes your position when your losses approach the value of your collateral (margin) to ensure you can't lose more than you put in."
    },
    {
        question: "In a 'long' position, you make a profit if the price...",
        options: [
            { text: "Goes down.", isCorrect: false },
            { text: "Goes up.", isCorrect: true },
        ],
        explanation: "Going 'long' is a bet that the asset's price will increase. You profit if the price rises above your entry price."
    }
];

const PerpetualFuturesSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [difficulty, setDifficulty] = useState<'basic' | 'advanced' | null>(null);
    const [contractType, setContractType] = useState<'perpetual' | 'future'>('perpetual');
    const [position, setPosition] = useState<{ side: 'long' | 'short'; entryPrice: number; size: number; leverage: number; } | null>(null);
    const [currentPrice, setCurrentPrice] = useState(65000);
    const [leverage, setLeverage] = useState(5);
    const [size, setSize] = useState(0.1); // in BTC

    // Advanced mode state
    const [takeProfit, setTakeProfit] = useState('');
    const [stopLoss, setStopLoss] = useState('');
    const [fundingRate, setFundingRate] = useState(0.01);
    const [showQuiz, setShowQuiz] = useState(false);

    // Simulate price movement
    useEffect(() => {
        const priceInterval = setInterval(() => {
            setCurrentPrice(prev => {
                const change = (Math.random() - 0.5) * 500;
                return Math.max(20000, prev + change); // Prevent price going too low
            });
        }, 1000);

        const fundingInterval = setInterval(() => {
            setFundingRate((Math.random() - 0.5) * 0.02);
        }, 8000); // Funding rate changes periodically

        return () => {
            clearInterval(priceInterval);
            clearInterval(fundingInterval);
        };
    }, []);

    const handleOpenPosition = (side: 'long' | 'short') => {
        setPosition({ side, entryPrice: currentPrice, size, leverage });
    };

    const handleClosePosition = () => {
        setPosition(null);
        setTakeProfit('');
        setStopLoss('');
    };

    const collateral = position ? (position.size * position.entryPrice) / position.leverage : 0;
    const pnl = position ? (currentPrice - position.entryPrice) * position.size * (position.side === 'long' ? 1 : -1) : 0;
    const pnlPercent = position ? (pnl / collateral) * 100 : 0;
    
    let liquidationPrice = 0;
    if (position) {
        const liquidationThreshold = 1 / position.leverage;
        if (position.side === 'long') {
            liquidationPrice = position.entryPrice * (1 - liquidationThreshold);
        } else {
            liquidationPrice = position.entryPrice * (1 + liquidationThreshold);
        }
    }

    // Check for liquidation or TP/SL
    useEffect(() => {
        if (!position) return;
        const tpPrice = parseFloat(takeProfit);
        const slPrice = parseFloat(stopLoss);

        if ((position.side === 'long' && currentPrice <= liquidationPrice) || (position.side === 'short' && currentPrice >= liquidationPrice)) {
            alert(`LIQUIDATED! Your ${position.side} position was closed as the price hit $${currentPrice.toFixed(2)}.`);
            handleClosePosition();
        } else if (tpPrice && ((position.side === 'long' && currentPrice >= tpPrice) || (position.side === 'short' && currentPrice <= tpPrice))) {
            alert(`TAKE PROFIT HIT! Your ${position.side} position was closed at $${currentPrice.toFixed(2)}.`);
            handleClosePosition();
        } else if (slPrice && ((position.side === 'long' && currentPrice <= slPrice) || (position.side === 'short' && currentPrice >= slPrice))) {
            alert(`STOP LOSS HIT! Your ${position.side} position was closed at $${currentPrice.toFixed(2)}.`);
            handleClosePosition();
        }
    }, [currentPrice, position, liquidationPrice, takeProfit, stopLoss]);
    
    const renderSimulation = () => (
         <div className="grid lg:grid-cols-3 gap-6">
            {/* Control Panel */}
            <Card className="p-4 bg-brand-bg/50 lg:col-span-1">
                <h3 className="text-lg font-bold text-white mb-4">Trade Controls</h3>
                {difficulty === 'advanced' && (
                     <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Contract Type</label>
                        <select value={contractType} onChange={e => setContractType(e.target.value as any)} className="w-full bg-brand-bg p-2 rounded-md border border-gray-600">
                            <option value="perpetual">Perpetual</option>
                            <option value="future">Future (Expiry: 30 days)</option>
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Leverage: {leverage}x</label>
                    <input type="range" min="1" max="20" value={leverage} onChange={e => setLeverage(parseInt(e.target.value))} className="w-full"/>
                </div>
                 <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Size (BTC)</label>
                    <input type="number" step="0.01" value={size} onChange={e => setSize(parseFloat(e.target.value) || 0)} className="w-full bg-brand-bg p-2 rounded-md border border-gray-600"/>
                </div>
                {difficulty === 'advanced' && !position && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1">Take Profit</label>
                            <input type="number" value={takeProfit} onChange={e=>setTakeProfit(e.target.value)} placeholder="Price" className="w-full bg-brand-bg p-1 rounded-md border border-gray-600 text-sm"/>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1">Stop Loss</label>
                            <input type="number" value={stopLoss} onChange={e=>setStopLoss(e.target.value)} placeholder="Price" className="w-full bg-brand-bg p-1 rounded-md border border-gray-600 text-sm"/>
                        </div>
                    </div>
                )}
                {!position ? (
                    <div className="grid grid-cols-2 gap-2">
                        <Button onClick={() => handleOpenPosition('long')} variant="secondary">Long / Buy</Button>
                        <Button onClick={() => handleOpenPosition('short')} variant="accent" className="bg-red-600 hover:bg-red-500">Short / Sell</Button>
                    </div>
                ) : (
                    <Button onClick={handleClosePosition} className="w-full">Close Position</Button>
                )}
            </Card>

            {/* Position Info */}
            <Card className="p-4 bg-brand-surface lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">BTC/{contractType === 'perpetual' ? 'PERP' : 'FUT'}</h3>
                    <p className={`text-2xl font-mono font-bold ${currentPrice > (position?.entryPrice || currentPrice) ? 'text-brand-secondary' : 'text-red-400'}`}>
                        ${currentPrice.toFixed(2)}
                    </p>
                </div>

                {!position ? (
                    <div className="text-center p-8 text-brand-text-secondary">No open position.</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div><p className="text-sm text-brand-text-secondary">Side</p><p className={`font-bold text-lg ${position.side === 'long' ? 'text-brand-secondary' : 'text-red-400'}`}>{position.side.toUpperCase()}</p></div>
                        <div><p className="text-sm text-brand-text-secondary">Entry Price</p><p className="font-mono text-lg text-white">${position.entryPrice.toFixed(2)}</p></div>
                         <div><p className="text-sm text-brand-text-secondary">Collateral</p><p className="font-mono text-lg text-white">${collateral.toFixed(2)}</p></div>
                        <div className="col-span-full md:col-span-1"><p className="text-sm text-brand-text-secondary">PnL (USD)</p><p className={`font-mono text-lg ${pnl >= 0 ? 'text-brand-secondary' : 'text-red-400'}`}>${pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)</p></div>
                        {difficulty === 'advanced' && contractType === 'perpetual' && (
                             <div><p className="text-sm text-brand-text-secondary">Funding Rate</p><p className={`font-mono text-lg ${fundingRate >=0 ? 'text-brand-secondary':'text-red-400'}`}>{fundingRate.toFixed(4)}%</p></div>
                        )}
                        <div className="col-span-full md:col-span-auto flex items-center justify-center gap-2 p-2 bg-red-900/50 rounded-lg">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-400"/><p className="text-sm text-red-400">Liq. Price:</p><p className="font-mono font-bold text-red-400">${liquidationPrice.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
    
    return (
        <Card className="max-w-5xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">Perpetuals & Futures Contracts</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-3xl mx-auto">
                Learn about crypto derivatives. These financial contracts allow you to speculate on an asset's future price without owning it. Use leverage to amplify potential gains (and losses).
            </p>

            {!difficulty ? (
            <div className="text-center animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-4">Choose Your Difficulty</h3>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button onClick={() => setDifficulty('basic')} className="w-full md:w-auto">
                        <span className="font-bold">Basic Mode</span>
                        <p className="font-normal text-sm">Learn about leverage, PnL, and liquidation.</p>
                    </Button>
                    <Button onClick={() => setDifficulty('advanced')} variant="secondary" className="w-full md:w-auto">
                        <span className="font-bold">Advanced Mode</span>
                        <p className="font-normal text-sm">Explore funding rates, TP/SL, and contract types.</p>
                    </Button>
                </div>
            </div>
            ) : (
                <>
                    {renderSimulation()}
                    {difficulty && !showQuiz && (
                        <div className="text-center mt-8 border-t border-gray-700 pt-6">
                            <Button onClick={() => setShowQuiz(true)} variant="secondary" disabled={!position}>
                                {position ? 'Test Your Knowledge' : 'Open a position to unlock the quiz'}
                            </Button>
                        </div>
                    )}
                    {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
                </>
            )}
        </Card>
    );
};

export default PerpetualFuturesSim;