import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon } from '../icons/Icons';

const CORRECT_REFERENCE = "AX07-KJG8-442B";
const EXCHANGE_IBAN = "GB33BUKB20201555555555";

const FiatDepositSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [depositAmount, setDepositAmount] = useState('1000');
  const [referenceInput, setReferenceInput] = useState('');
  const [error, setError] = useState('');

  const handleDepositTransfer = () => {
    if (referenceInput.trim() !== CORRECT_REFERENCE) {
      setError("Incorrect reference code. The exchange won't know this deposit is yours!");
      return;
    }
    setError('');
    setStep(3); // Processing
    setTimeout(() => {
      setStep(4); // Success
    }, 2500);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in text-center">
            <h3 className="text-xl font-semibold mb-2 text-brand-primary">Step 1: Start Your Deposit</h3>
            <p className="text-brand-text-secondary mb-6">First, you need to send fiat currency from your bank account to the exchange.</p>
            <label className="block font-semibold mb-2">Amount to deposit (USD):</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="bg-brand-bg border border-gray-600 rounded-lg p-2 text-center w-40 mb-4"
            />
            <Button onClick={() => setStep(2)} disabled={!depositAmount || parseFloat(depositAmount) <= 0}>Get Deposit Instructions</Button>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-2 text-center text-brand-primary">Step 2: Make the Bank Transfer</h3>
            <p className="text-brand-text-secondary mb-4 text-center">Use your banking app to send money to the details below. The reference code is crucial.</p>
            <Card className="p-4 bg-brand-bg/50 mb-4">
              <p className="font-mono text-white break-all"><strong>IBAN:</strong> {EXCHANGE_IBAN}</p>
              <p className="font-mono text-brand-primary text-lg mt-2"><strong>Reference:</strong> {CORRECT_REFERENCE}</p>
            </Card>
            <Card className="p-4 bg-brand-surface">
                <label className="block text-sm text-brand-text-secondary mb-1">Enter Reference Code from your bank transfer:</label>
                <input
                  type="text"
                  value={referenceInput}
                  onChange={(e) => setReferenceInput(e.target.value)}
                  placeholder="Enter the reference code here"
                  className="w-full bg-brand-bg border border-gray-600 rounded-lg p-2 font-mono"
                />
                {error && <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>}
                <Button onClick={handleDepositTransfer} className="w-full mt-4">I Have Transferred The Funds</Button>
            </Card>
          </div>
        );
      case 3:
        return (
          <div className="text-center animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-white font-semibold">Processing Bank Transfer...</p>
            <p className="text-brand-text-secondary">This can take 1-3 business days in a real scenario.</p>
          </div>
        );
      case 4:
        return (
          <div className="text-center animate-fade-in">
            <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-secondary mb-2">Deposit Successful!</h3>
            <p className="text-brand-text-secondary mb-6">
                Your ${parseFloat(depositAmount).toLocaleString()} has arrived in your exchange account. You are now ready to buy crypto.
            </p>
            <Button onClick={onComplete} variant="secondary">Finish Lesson</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Deposit Fiat to Exchange</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        Learn how to transfer money from your bank to a crypto exchange, paying attention to critical details like reference codes.
      </p>
      {renderContent()}
    </Card>
  );
};

export default FiatDepositSim;