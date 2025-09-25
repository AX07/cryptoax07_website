import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';

const quizQuestions: QuizQuestion[] = [
    {
        question: "What is the primary purpose of a Layer 2 scaling solution?",
        options: [
            { text: "To increase the security of the main blockchain (Layer 1).", isCorrect: false },
            { text: "To make transactions faster and cheaper by processing them off the main chain.", isCorrect: true },
        ],
        explanation: "Layer 2 solutions are built 'on top of' Layer 1 to handle transactions more efficiently, reducing congestion and fees on the main network."
    },
    {
        question: "How do Layer 2 solutions (like Optimistic Rollups) typically work?",
        options: [
            { text: "They bundle many transactions together off-chain and post a compressed summary to Layer 1.", isCorrect: true },
            { text: "They use more powerful computers to mine blocks faster.", isCorrect: false },
        ],
        explanation: "Rollups 'roll up' multiple transactions into a single batch, which is processed off-chain. Only a small piece of data is then submitted to the main chain, saving a lot of space and cost."
    },
    {
        question: "Based on the simulation, what is the main benefit for a user when using a Layer 2 network?",
        options: [
            { text: "Higher transaction fees but better security.", isCorrect: false },
            { text: "Significantly lower transaction fees and faster confirmation times.", isCorrect: true },
        ],
        explanation: "The simulation demonstrates that Layer 2 networks offer a much better user experience with drastically reduced gas fees and near-instant transactions."
    }
];

const Layer2Sim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [l1Status, setL1Status] = useState<'idle' | 'pending' | 'confirmed'>('idle');
    const [l2Status, setL2Status] = useState<'idle' | 'pending' | 'confirmed'>('idle');
    const [showQuiz, setShowQuiz] = useState(false);

    const handleTransaction = (layer: 'l1' | 'l2') => {
        if (layer === 'l1') {
            setL1Status('pending');
            setTimeout(() => setL1Status('confirmed'), 4000); // L1 is slow
        } else {
            setL2Status('pending');
            setTimeout(() => setL2Status('confirmed'), 500); // L2 is fast
        }
    };
    
    const renderStatus = (status: 'idle' | 'pending' | 'confirmed') => {
        if (status === 'pending') return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>;
        if (status === 'confirmed') return <span className="font-bold text-brand-secondary">Confirmed</span>;
        return <span className="text-brand-text-secondary">Awaiting Tx</span>;
    };

    return (
        <Card className="max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">Layer 2 Scaling Solutions</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
                Ethereum can be slow and expensive. Layer 2 (L2) solutions are separate blockchains built on top of Ethereum to make transactions faster and cheaper. This simulation compares a transaction on Layer 1 (mainnet) vs. a Layer 2 network.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Layer 1 */}
                <Card className="p-6 bg-brand-bg/50 border-red-500/50">
                    <h3 className="text-xl font-bold text-white mb-2">Layer 1 (Ethereum Mainnet)</h3>
                    <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between"><span>Gas Fee:</span><span className="font-mono text-white">$25.50</span></div>
                        <div className="flex justify-between"><span>Time:</span><span className="font-mono text-white">~13 seconds</span></div>
                         <div className="flex justify-between"><span>Status:</span>{renderStatus(l1Status)}</div>
                    </div>
                    <Button onClick={() => handleTransaction('l1')} disabled={l1Status !== 'idle'} className="w-full" variant="accent">Send 0.01 ETH on L1</Button>
                </Card>

                {/* Layer 2 */}
                <Card className="p-6 bg-brand-bg/50 border-brand-secondary/50">
                    <h3 className="text-xl font-bold text-white mb-2">Layer 2 (e.g., Optimism)</h3>
                    <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between"><span>Gas Fee:</span><span className="font-mono text-white">$0.05</span></div>
                        <div className="flex justify-between"><span>Time:</span><span className="font-mono text-white">~1 second</span></div>
                         <div className="flex justify-between"><span>Status:</span>{renderStatus(l2Status)}</div>
                    </div>
                    <Button onClick={() => handleTransaction('l2')} disabled={l2Status !== 'idle'} className="w-full" variant="secondary">Send 0.01 ETH on L2</Button>
                </Card>
            </div>

            {!showQuiz && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">Take Quiz</Button>
                </div>
            )}

            {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
        </Card>
    );
};

export default Layer2Sim;
