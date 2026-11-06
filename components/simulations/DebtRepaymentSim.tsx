import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../hooks/useLanguage';

const DebtRepaymentSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useLanguage();
    const [showQuiz, setShowQuiz] = useState(false);

    const debt = 5000;
    const monthlyPayment = 200;
    const ccApr = 25;
    const defiApr = 8;

    const quizQuestions: QuizQuestion[] = [
        {
            question: "What is the main advantage of using a lower-APR DeFi loan to pay off a high-APR credit card debt?",
            options: [
                { text: "It's a more complex process.", isCorrect: false },
                { text: "You pay significantly less in total interest over the life of the loan.", isCorrect: true },
            ],
            explanation: "By refinancing to a lower interest rate, more of your monthly payment goes towards the principal balance, helping you pay off the debt faster and cheaper."
        },
        {
            question: "What is the primary risk of using a crypto-collateralized loan to pay off debt?",
            options: [
                { text: "The interest rate might change.", isCorrect: false },
                { text: "If your collateral's value drops, you could be liquidated (lose your collateral).", isCorrect: true },
            ],
            explanation: "DeFi loans require collateral. If the value of your crypto collateral falls below a certain threshold, the protocol will sell it to cover your loan, meaning you could lose your assets."
        }
    ];

    const calculateLoanData = (principal: number, apr: number, payment: number) => {
        let balance = principal;
        let month = 0;
        const data = [{ month: 0, balance: principal, interestPaid: 0 }];
        let totalInterest = 0;

        while (balance > 0 && month < 60) {
            month++;
            const interest = (balance * (apr / 100)) / 12;
            totalInterest += interest;
            const principalPaid = payment - interest;
            balance -= principalPaid;
            
            if (balance < 0) balance = 0;

            data.push({ month, balance: parseFloat(balance.toFixed(2)), interestPaid: parseFloat(totalInterest.toFixed(2)) });
        }
        return data;
    };
    
    const ccData = calculateLoanData(debt, ccApr, monthlyPayment);
    const defiData = calculateLoanData(debt, defiApr, monthlyPayment);
    
    const ccPayoff = ccData[ccData.length-1];
    const defiPayoff = defiData[defiData.length-1];

    const chartData = Array.from({length: Math.max(ccData.length, defiData.length)}, (_, i) => ({
        month: i,
        ccBalance: ccData[i]?.balance,
        defiBalance: defiData[i]?.balance
    }));

    return (
        <Card className="max-w-5xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.debtRepayment.title')}</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-3xl mx-auto">
                {t('simulations.debtRepayment.description')}
            </p>
            
            <p className="text-center mb-6" dangerouslySetInnerHTML={{ __html: t('simulations.debtRepayment.scenario', { debt: `<strong>$${debt}</strong>`, monthlyPayment: `<strong>$${monthlyPayment}</strong>` }) }}></p>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Credit Card */}
                <Card className="p-6 bg-brand-bg/50 border-red-500/50">
                    <h3 className="text-xl font-bold text-white">{t('simulations.debtRepayment.option1')}</h3>
                    <p className="text-2xl font-bold text-red-400">{ccApr}% APR</p>
                    <div className="mt-4 space-y-2">
                        <p><strong>{t('simulations.debtRepayment.timeToPayOff')}</strong> {ccPayoff.month} {t('simulations.debtRepayment.months')}</p>
                        <p><strong>{t('simulations.debtRepayment.totalInterest')}</strong> <span className="font-bold">${ccPayoff.interestPaid.toLocaleString()}</span></p>
                    </div>
                </Card>
                {/* DeFi Loan */}
                <Card className="p-6 bg-brand-bg/50 border-brand-secondary/50">
                    <h3 className="text-xl font-bold text-white">{t('simulations.debtRepayment.option2')}</h3>
                    <p className="text-2xl font-bold text-brand-secondary">{defiApr}% APR</p>
                     <div className="mt-4 space-y-2">
                        <p><strong>{t('simulations.debtRepayment.timeToPayOff')}</strong> {defiPayoff.month} {t('simulations.debtRepayment.months')}</p>
                        <p><strong>{t('simulations.debtRepayment.totalInterest')}</strong> <span className="font-bold">${defiPayoff.interestPaid.toLocaleString()}</span></p>
                    </div>
                </Card>
            </div>

            <div className="h-80 w-full mb-4">
                <h3 className="text-lg font-semibold text-center text-white mb-2">{t('simulations.debtRepayment.chartTitle')}</h3>
                <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="month" stroke="#94A3B8" label={{ value: t('simulations.debtRepayment.chartXLabel'), position: 'insideBottom', offset: -5 }}/>
                        <YAxis stroke="#94A3B8" tickFormatter={(v) => `$${v}`}/>
                        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }}/>
                        <Legend />
                        <Line type="monotone" name={t('simulations.debtRepayment.chartCC')} dataKey="ccBalance" stroke="#F472B6" strokeWidth={2} dot={false} />
                        <Line type="monotone" name={t('simulations.debtRepayment.chartDeFi')} dataKey="defiBalance" stroke="#34D399" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
             <p className="text-xs text-brand-text-secondary text-center">{t('simulations.debtRepayment.disclaimer')}</p>
            
            {!showQuiz && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">
                        {t('simulations.debtRepayment.quizButton')}
                    </Button>
                </div>
            )}

            {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
        </Card>
    );
};

export default DebtRepaymentSim;
