import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const WalletConnectionSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isConnected, setIsConnected] = useState(false);

  const fakeAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Vitalik Buterin's address for fun

  const connectWallet = () => {
    // Simulate the process of connecting
    setStep(2); // Show 'connecting' state
    setTimeout(() => {
      setStep(3); // Show confirmation
    }, 1500);
  };

  const approveConnection = () => {
    setStep(4); // Show 'connected' state
    setIsConnected(true);
    setTimeout(() => {
        onComplete();
    }, 2000);
  };

  const rejectConnection = () => {
    setStep(1);
    setIsConnected(false);
  };

  return (
    <Card className="max-w-xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Wallet Connection Simulation</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-xl mx-auto">
        Here, you'll practice connecting a wallet to a Decentralized App (DApp). You will walk through the connection and approval steps from a mock wallet. This is a vital security lesson, teaching you what permissions you grant and how to interact with the decentralized web safely.
      </p>
      
      <div className="bg-brand-bg/50 p-6 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Simulated DApp: UniSwap</h3>
          <span className={`px-3 py-1 text-sm font-bold rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
        </div>

        {step === 1 && (
          <div className="text-center">
            <p className="mb-4 text-brand-text-secondary">This DApp wants to connect to your wallet. This allows it to view your address and suggest transactions.</p>
            <Button onClick={connectWallet}>Connect Wallet</Button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <p className="mb-4 text-brand-text-secondary">Opening your wallet extension... Please review the connection request.</p>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-fade-in">
            <h4 className="text-lg font-bold text-brand-primary mb-2">Connection Request</h4>
            <p className="mb-1 text-brand-text-secondary">UniSwap wants to connect with your account:</p>
            <p className="font-mono text-sm bg-brand-bg px-2 py-1 rounded-md inline-block mb-4 break-all">{fakeAddress}</p>
            <p className="text-xs text-brand-text-secondary mb-4">This will allow UniSwap to:<br/>- View your wallet balance and activity<br/>- Request approval for transactions</p>
            <div className="flex justify-center gap-4">
              <Button onClick={rejectConnection} variant="accent" className="bg-red-600 hover:bg-red-500">Reject</Button>
              <Button onClick={approveConnection} variant="primary">Approve</Button>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="text-center animate-fade-in">
            <h4 className="text-lg font-bold text-brand-secondary mb-2">Connection Successful!</h4>
            <p className="mb-4 text-brand-text-secondary">Your wallet is now connected to UniSwap. You can now use the DApp's features.</p>
            <p className="text-xs text-brand-text-secondary">In a real DApp, you can disconnect from the wallet extension at any time.</p>
          </div>
        )}

      </div>
    </Card>
  );
};

export default WalletConnectionSim;