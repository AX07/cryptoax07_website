import React from 'react';
import Card from '../ui/Card';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { FireIcon, CpuChipIcon, CheckCircleIcon, XMarkIcon } from '../icons/Icons';

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which type of wallet is considered more vulnerable to online attacks like hacking and malware?",
    options: [
      { text: "Hot Wallet", isCorrect: true },
      { text: "Cold Wallet", isCorrect: false },
    ],
    explanation: "Hot wallets are connected to the internet, which makes them more accessible but also more vulnerable to online threats."
  },
  {
    question: "What is the primary advantage of a cold wallet?",
    options: [
      { text: "Convenience for daily transactions", isCorrect: false },
      { text: "Maximum security because it's offline", isCorrect: true },
    ],
    explanation: "Cold wallets store your private keys offline, providing the best protection against hacking and online theft."
  },
  {
    question: "For storing a large amount of crypto long-term (HODLing), which wallet is generally recommended?",
    options: [
      { text: "Hot Wallet", isCorrect: false },
      { text: "Cold Wallet", isCorrect: true },
    ],
    explanation: "A cold wallet is like a vault, ideal for securing large amounts of crypto that you don't need to access frequently."
  },
   {
    question: "'Not your keys, not your coins' is a phrase that emphasizes the importance of...",
    options: [
      { text: "Using a centralized exchange for storage", isCorrect: false },
      { text: "Self-custody, where you control your private keys", isCorrect: true },
    ],
    explanation: "This phrase is a reminder that if you don't control your private keys, you don't truly own your cryptocurrency."
  }
];

const SelfCustodySim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Self-Custody: Hot vs. Cold Wallets</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
        "Not your keys, not your coins." Self-custody means you are in full control of your private keys and your crypto. This simulation explains the two main types of self-custody wallets.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Hot Wallet */}
        <Card className="p-6 bg-brand-bg/50 border-orange-400/50">
          <div className="flex items-center gap-4 mb-4">
            <FireIcon className="h-10 w-10 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Hot Wallets</h3>
          </div>
          <p className="text-sm text-brand-text-secondary mb-4">Software wallets that are connected to the internet (e.g., browser extensions, mobile apps).</p>
          
          <h4 className="font-semibold text-brand-primary mb-2">Pros:</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-0.5" />
              <span><strong>Convenient:</strong> Quick and easy to use for daily transactions, swapping, and interacting with DApps.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-0.5" />
              <span><strong>Accessible:</strong> Can be used on multiple devices like phones and computers.</span>
            </li>
          </ul>

          <h4 className="font-semibold text-red-400 mb-2">Cons:</h4>
           <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <XMarkIcon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span><strong>Vulnerable:</strong> Because they are always online, they are more susceptible to hacking, malware, and phishing attacks.</span>
            </li>
          </ul>
           <p className="text-xs text-brand-text-secondary mt-4 p-2 bg-brand-bg rounded-lg"><strong>Best for:</strong> Small amounts of crypto for frequent use, like a spending wallet.</p>
        </Card>

        {/* Cold Wallet */}
        <Card className="p-6 bg-brand-bg/50 border-sky-400/50">
          <div className="flex items-center gap-4 mb-4">
            <CpuChipIcon className="h-10 w-10 text-sky-400" />
            <h3 className="text-2xl font-bold text-white">Cold Wallets</h3>
          </div>
          <p className="text-sm text-brand-text-secondary mb-4">Physical hardware devices that store your private keys completely offline.</p>
          
          <h4 className="font-semibold text-brand-primary mb-2">Pros:</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-0.5" />
              <span><strong>Maximum Security:</strong> Keys are never exposed to the internet, offering the best protection against online threats.</span>
            </li>
             <li className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-0.5" />
              <span><strong>Peace of Mind:</strong> Ideal for long-term holding ("HODLing") of significant amounts.</span>
            </li>
          </ul>

          <h4 className="font-semibold text-red-400 mb-2">Cons:</h4>
           <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <XMarkIcon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span><strong>Less Convenient:</strong> Requires physical access to the device to sign and approve transactions.</span>
            </li>
          </ul>
          <p className="text-xs text-brand-text-secondary mt-4 p-2 bg-brand-bg rounded-lg"><strong>Best for:</strong> The majority of your crypto assets, acting as a secure savings vault.</p>
        </Card>
      </div>

      <Quiz questions={quizQuestions} onComplete={onComplete} />
    </Card>
  );
};

export default SelfCustodySim;