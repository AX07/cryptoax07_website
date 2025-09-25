
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CheckCircleIcon } from '../icons/Icons';

const TokenApprovalSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [approvalAmount, setApprovalAmount] = useState('1000'); // '1000' or 'unlimited'
  const [isProcessing, setIsProcessing] = useState(false);

  const fakeGasFee = "0.005 pETH ($10.00)";

  const handleApprove = () => {
    setStep(2); // Move to wallet confirmation step
  };
  
  const confirmApproval = () => {
    setIsProcessing(true);
    setStep(3); // Show processing state
    setTimeout(() => {
        setIsProcessing(false);
        setStep(4); // Show success state
    }, 2000);
  };
  
  const rejectApproval = () => {
    setStep(1); // Go back to initial state
  };

  return (
    <Card className="max-w-xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Token Approval Simulation</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        This is a critical security lesson. Before a DApp can use your tokens (e.g., for a swap or staking), you must first grant it permission. This "approval" transaction tells the smart contract how much of your token it's allowed to spend on your behalf. Here, you'll practice this process safely.
      </p>

      {/* Step 1: DApp UI */}
      {step === 1 && (
        <div className="bg-brand-bg/50 p-6 rounded-lg border border-gray-700 text-center animate-fade-in">
          <h3 className="text-xl font-semibold text-white mb-2">Simulated DApp: YieldFarm</h3>
          <p className="text-brand-text-secondary mb-4">To deposit pUSD into the farm, you must first approve the YieldFarm contract to spend your pUSD.</p>
          
          <div className="mb-6">
            <label className="font-bold text-white block mb-2">Approval Amount</label>
            <div className="flex justify-center gap-4">
              <button onClick={() => setApprovalAmount('1000')} className={`px-4 py-2 rounded-lg border-2 ${approvalAmount === '1000' ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-600'}`}>
                1,000 pUSD
              </button>
              <button onClick={() => setApprovalAmount('unlimited')} className={`px-4 py-2 rounded-lg border-2 ${approvalAmount === 'unlimited' ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-600'}`}>
                Unlimited
              </button>
            </div>
            {approvalAmount === 'unlimited' && (
                 <p className="text-xs text-yellow-400 mt-2">Warning: Unlimited approvals are convenient but can be risky if the DApp's contract is ever exploited.</p>
            )}
          </div>
          <Button onClick={handleApprove}>Approve pUSD</Button>
        </div>
      )}
      
      {/* Step 2: Wallet Confirmation */}
      {step === 2 && (
        <div className="text-center animate-fade-in">
          <h4 className="text-lg font-bold text-brand-primary mb-2">Grant Permission</h4>
          <p className="mb-1 text-brand-text-secondary">YieldFarm is requesting permission to access your pUSD.</p>
          <div className="bg-brand-bg/50 p-4 rounded-lg border border-gray-700 my-4">
             <div className="flex justify-between items-center mb-2">
                <span className="text-brand-text-secondary">Amount</span>
                <span className="font-mono text-white">{approvalAmount === '1000' ? '1,000 pUSD' : 'Unlimited pUSD'}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-brand-text-secondary">Estimated Gas Fee</span>
                <span className="font-mono text-white">{fakeGasFee}</span>
             </div>
          </div>
          <p className="text-xs text-brand-text-secondary mb-4">By clicking Approve, you allow this DApp to spend your tokens up to the specified amount. You will be asked to sign another transaction to actually deposit them.</p>
          <div className="flex justify-center gap-4">
            <Button onClick={rejectApproval} variant="accent" className="bg-red-600 hover:bg-red-500">Reject</Button>
            <Button onClick={confirmApproval} variant="primary">Approve</Button>
          </div>
        </div>
      )}

      {/* Step 3: Processing */}
      {step === 3 && (
        <div className="text-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
           <p className="text-lg text-white font-semibold">Processing Approval...</p>
           <p className="text-brand-text-secondary">Your transaction is being confirmed on the blockchain.</p>
        </div>
      )}
      
      {/* Step 4: Success */}
      {step === 4 && (
        <div className="text-center animate-fade-in">
            <CheckCircleIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-brand-secondary mb-2">Approval Successful!</h4>
            <p className="mb-6 text-brand-text-secondary">The YieldFarm DApp is now approved to spend {approvalAmount === '1000' ? '1,000' : 'an unlimited amount of your'} pUSD. You can now proceed with depositing.</p>
            <Button onClick={onComplete} variant="secondary">Mark as Complete</Button>
        </div>
      )}
    </Card>
  );
};

export default TokenApprovalSim;
