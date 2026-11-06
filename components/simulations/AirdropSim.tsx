import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

const AirdropSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'airdrop' | 'farming'>('airdrop');
    const [showQuiz, setShowQuiz] = useState(false);
    
    // Airdrop state
    const [address, setAddress] = useState('0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6');
    const [airdropStatus, setAirdropStatus] = useState<'idle' | 'checking' | 'eligible' | 'claimed'>('idle');
    
    // Farming state
    const [stakedAmount, setStakedAmount] = useState(0);
    const [rewards, setRewards] = useState(0);

    const quizQuestions: QuizQuestion[] = [
        {
            question: "What is a crypto airdrop?",
            options: [
                { text: "A loan from a DeFi protocol.", isCorrect: false },
                { text: "A free distribution of tokens, often to reward early users.", isCorrect: true },
            ],
            explanation: "Airdrops are a marketing strategy used by crypto projects to distribute their tokens to a wide audience and reward early adopters."
        },
        {
            question: "What is 'yield farming'?",
            options: [
                { text: "Buying and holding a token for a long time.", isCorrect: false },
                { text: "Providing liquidity to a DeFi protocol to earn rewards.", isCorrect: true },
            ],
            explanation: "Yield farming involves staking or lending crypto assets in a DeFi protocol to generate high returns or rewards in the form of additional cryptocurrency."
        },
        {
            question: "Why would a protocol offer yield farming rewards?",
            options: [
                { text: "To attract users and liquidity, which is essential for the protocol to function.", isCorrect: true },
                { text: "To reduce the total supply of their token.", isCorrect: false },
            ],
            explanation: "Protocols need liquidity to facilitate swaps and lending. They incentivize users to provide this liquidity by offering them rewards (yield)."
        }
    ];

    useEffect(() => {
        if (stakedAmount > 0) {
            const interval = setInterval(() => {
                setRewards(prev => prev + (stakedAmount * 0.0001)); // Simulate reward accrual
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [stakedAmount]);

    const handleCheckAirdrop = () => {
        setAirdropStatus('checking');
        setTimeout(() => setAirdropStatus('eligible'), 1500);
    };

    const handleClaimAirdrop = () => {
        setAirdropStatus('claimed');
    };
    
    const handleStake = () => {
        setStakedAmount(500); // Simulate staking $500
    };

    return (
        <Card className="max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.airdrops.title')}</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
                {t('simulations.airdrops.description')}
            </p>

            <div className="flex mb-6 border-b border-gray-700">
                <button onClick={() => setActiveTab('airdrop')} className={`px-4 py-2 font-semibold ${activeTab === 'airdrop' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`}>
                    {t('simulations.airdrops.airdropChecker')}
                </button>
                <button onClick={() => setActiveTab('farming')} className={`px-4 py-2 font-semibold ${activeTab === 'farming' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-secondary'}`}>
                    {t('simulations.airdrops.yieldFarming')}
                </button>
            </div>

            {activeTab === 'airdrop' && (
                <div className="animate-fade-in text-center">
                    <p className="text-brand-text-secondary mb-4">{t('simulations.airdrops.airdropDesc')}</p>
                    <input
                        type="text"
                        value={address}
                        readOnly
                        className="w-full max-w-md bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono text-center mb-4"
                    />
                    {airdropStatus === 'idle' && <Button onClick={handleCheckAirdrop}>{t('simulations.airdrops.checkButton')}</Button>}
                    {airdropStatus === 'checking' && <p className="text-yellow-400 font-semibold">{t('simulations.airdrops.checking')}</p>}
                    {airdropStatus === 'eligible' && (
                        <Card className="p-4 bg-brand-secondary/10 border-brand-secondary animate-fade-in">
                            <h3 className="text-xl font-bold text-brand-secondary">{t('simulations.airdrops.eligibleTitle')}</h3>
                            <p>{t('simulations.airdrops.eligibleDesc')}</p>
                            <Button onClick={handleClaimAirdrop} variant="secondary" className="mt-4">{t('simulations.airdrops.claimButton')}</Button>
                        </Card>
                    )}
                    {airdropStatus === 'claimed' && <p className="font-bold text-brand-secondary">{t('simulations.airdrops.claimedMessage')}</p>}
                </div>
            )}
            
            {activeTab === 'farming' && (
                <div className="animate-fade-in text-center">
                     <p className="text-brand-text-secondary mb-4">{t('simulations.airdrops.farmingDesc')}</p>
                     <Card className="p-6 bg-brand-bg/50">
                        {stakedAmount === 0 ? (
                            <>
                             <p className="text-lg">{t('simulations.airdrops.yourBalance')} 1000 pUSD</p>
                             <Button onClick={handleStake} className="mt-4">{t('simulations.airdrops.stakeButton')}</Button>
                            </>
                        ) : (
                            <>
                             <div className="flex justify-between items-center">
                                <p>{t('simulations.airdrops.staked')}</p>
                                <p className="font-mono text-lg font-bold text-white">$500.00</p>
                             </div>
                              <div className="flex justify-between items-center mt-2">
                                <p>{t('simulations.airdrops.rewardsEarned')}</p>
                                <p className="font-mono text-lg font-bold text-brand-secondary">{rewards.toFixed(4)} FARM</p>
                             </div>
                            </>
                        )}
                     </Card>
                </div>
            )}

            {!showQuiz && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">{t('simulations.airdrops.quizButton')}</Button>
                </div>
            )}

            {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
        </Card>
    );
};

export default AirdropSim;
