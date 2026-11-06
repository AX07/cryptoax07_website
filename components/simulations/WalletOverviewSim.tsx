import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CameraIcon } from '../icons/Icons';

type Chain = 'BTC' | 'ETH';
type View = 'overview' | 'send' | 'receive';

const INITIAL_WALLETS = {
  BTC: {
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    assets: [{ ticker: 'BTC', balance: 0.5, name: 'Bitcoin' }],
  },
  ETH: {
    address: '0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6',
    assets: [
      { ticker: 'ETH', balance: 2.1, name: 'Ethereum' },
      { ticker: 'pUSD', balance: 542.12, name: 'Practice USD' },
    ],
  },
};

const RECIPIENT_WALLETS = {
  BTC: { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
  ETH: { address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' },
};

const FEES = {
    BTC: 0.0001,
    ETH: 0.005,
}

// A simple component to generate a deterministic, fake QR code SVG
const RealisticQrCode: React.FC<{ address: string, size?: number }> = ({ address, size = 128 }) => {
    const seed = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const modules = 25; // Create a 25x25 grid
    const moduleSize = size / modules;
  
    const squares = [];
    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        // Simple deterministic "randomness"
        const isFilled = ((seed * (i + 1) * (j + 1)) % 17) > 8;
        if (isFilled) {
          squares.push(<rect key={`${i}-${j}`} x={i * moduleSize} y={j * moduleSize} width={moduleSize} height={moduleSize} fill="currentColor" />);
        }
      }
    }
  
    return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto text-white mb-4 rounded-lg">{squares}</svg>;
};


const WalletOverviewSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [chain, setChain] = useState<Chain>('ETH');
  const [view, setView] = useState<View>('overview');
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [wallets, setWallets] = useState(JSON.parse(JSON.stringify(INITIAL_WALLETS))); // Deep copy
  const [isScanning, setIsScanning] = useState(false);
  const [receiveStatus, setReceiveStatus] = useState<'idle' | 'pending' | 'complete'>('idle');

  const currentWallet = wallets[chain];
  const recipientWallet = RECIPIENT_WALLETS[chain];
  const networkFee = FEES[chain as keyof typeof FEES] || 0;

  const handleScanQrCode = () => {
    setIsScanning(true);
    setSendAddress(recipientWallet.address);
    setTimeout(() => setIsScanning(false), 200);
  };
  
  const handleSend = () => {
    const amount = parseFloat(sendAmount);
    if (!sendAddress || !amount || amount <= 0) {
      setFeedback({ type: 'error', message: 'Please fill in a valid address and amount.' });
      return;
    }

    const primaryAsset = currentWallet.assets[0];
    if (amount + networkFee > primaryAsset.balance) {
        setFeedback({ type: 'error', message: 'Insufficient funds for amount + network fee.' });
        return;
    }

    setFeedback({ type: 'info', message: `Sending transaction...` });

    setTimeout(() => {
        setWallets((prevWallets: any) => {
            const newWallets = JSON.parse(JSON.stringify(prevWallets));
            newWallets[chain].assets[0].balance -= (amount + networkFee);
            return newWallets;
        });
        setFeedback({ type: 'success', message: `Successfully sent ${sendAmount} ${primaryAsset.ticker}!` });
        setSendAddress('');
        setSendAmount('');
        setTimeout(() => setFeedback(null), 4000);
    }, 2500);
  };
  
  const handleReceive = () => {
    setReceiveStatus('pending');
    setFeedback({ type: 'info', message: `Mock Sender is preparing your transaction...` });
    
    setTimeout(() => {
      const receivedAmount = chain === 'BTC' ? 0.1 : 0.5;
      setWallets((prevWallets: any) => {
        const newWallets = JSON.parse(JSON.stringify(prevWallets));
        newWallets[chain].assets[0].balance += receivedAmount;
        return newWallets;
      });
      setReceiveStatus('complete');
      setFeedback({ type: 'success', message: `Success! You received ${receivedAmount} ${currentWallet.assets[0].ticker}.` });
    }, 3000);
  };

  useEffect(() => {
      // Reset states on chain change
      setView('overview');
      setFeedback(null);
      setReceiveStatus('idle');
  }, [chain]);


  const renderOverview = () => (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-2 text-white">Your Assets</h3>
       {feedback && view === 'overview' && (
          <p className={`text-sm text-center font-bold mb-4 p-2 rounded-lg ${feedback.type === 'success' ? 'bg-green-500/20 text-brand-secondary' : 'bg-red-500/20 text-red-500'}`}>
            {feedback.message}
          </p>
        )}
      <div className="bg-brand-bg/50 p-4 rounded-lg mb-4">
        <p className="text-sm text-brand-text-secondary">Your Public Address:</p>
        <p className="font-mono text-sm break-all text-white">{currentWallet.address}</p>
      </div>
      <div className="space-y-2 mb-6">
        {currentWallet.assets.map((asset: any) => (
          <div key={asset.ticker} className="flex justify-between items-center p-3 bg-brand-bg/50 rounded-lg">
            <span className="font-bold text-white">{asset.name} ({asset.ticker})</span>
            <span className="font-mono text-brand-secondary">{asset.balance.toFixed(4)}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => { setView('send'); setFeedback(null); }} className="w-full">Send</Button>
        <Button onClick={() => { setView('receive'); setFeedback(null); setReceiveStatus('idle'); }} variant="secondary" className="w-full">Receive</Button>
      </div>
    </div>
  );

  const renderSend = () => (
    <div className="animate-fade-in">
      <button onClick={() => setView('overview')} className="text-sm text-brand-primary mb-4">{'< Back to Overview'}</button>
      <h3 className="text-xl font-semibold mb-4 text-white">Send Funds</h3>
      
      {/* Recipient Info Card */}
      <Card className="p-4 mb-4 bg-brand-bg/50 relative">
         {isScanning && <div className="absolute inset-0 bg-white/80 animate-ping-once z-10"></div>}
         <h4 className="font-bold text-white text-sm mb-2">Mock Recipient</h4>
         <div className="flex gap-4 items-center">
            <RealisticQrCode address={recipientWallet.address} size={80} />
            <div>
                <p className="text-xs text-brand-text-secondary">Recipient Address:</p>
                <p className="font-mono text-xs break-all">{recipientWallet.address}</p>
            </div>
         </div>
      </Card>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary mb-1">Recipient's Address</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={sendAddress}
              onChange={e => setSendAddress(e.target.value)}
              placeholder={`Enter ${chain} address`}
              className="w-full bg-brand-bg border border-gray-600 rounded-l-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
            />
            <button onClick={handleScanQrCode} className="bg-gray-600 p-3 rounded-r-lg hover:bg-gray-500" title="Scan QR Code (Simulated)">
              <CameraIcon className="h-6 w-6 text-white"/>
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary mb-1">Amount ({currentWallet.assets[0].ticker})</label>
          <input 
            type="number" 
            value={sendAmount}
            onChange={e => setSendAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
          />
           <p className="text-xs text-brand-text-secondary mt-1">Network Fee: {networkFee.toFixed(4)} {currentWallet.assets[0].ticker}</p>
        </div>
        <Button onClick={handleSend} className="w-full">Confirm Send</Button>
        {feedback && (
          <p className={`text-sm text-center font-bold ${feedback.type === 'success' ? 'text-brand-secondary' : feedback.type === 'error' ? 'text-red-500' : 'text-yellow-400'}`}>
            {feedback.message}
          </p>
        )}
      </div>
    </div>
  );

  const renderReceive = () => (
    <div className="animate-fade-in">
        <button onClick={() => setView('overview')} className="text-sm text-brand-primary mb-4">{'< Back to Overview'}</button>
      <h3 className="text-xl font-semibold mb-4 text-white text-center">Receive Funds</h3>
      
      {/* Mock Sender */}
      <Card className="p-4 mb-4 text-center bg-brand-bg/50">
        <h4 className="font-bold text-white mb-2">Mock Sender</h4>
        {receiveStatus === 'idle' && (
            <>
            <p className="text-sm text-brand-text-secondary mb-3">Click below to simulate another user sending funds to you.</p>
            <Button onClick={handleReceive} variant="secondary">Share Address with Sender (Simulated)</Button>
            </>
        )}
        {receiveStatus === 'pending' && (
            <div className="flex items-center justify-center gap-2 text-yellow-400">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>
                <span>Receiving transaction...</span>
            </div>
        )}
        {receiveStatus === 'complete' && feedback && (
             <p className="font-bold text-brand-secondary">{feedback.message}</p>
        )}
      </Card>

      <div className="bg-brand-bg/80 p-4 rounded-lg text-center">
        <RealisticQrCode address={currentWallet.address}/>
        <p className="text-sm text-brand-text-secondary">Your {chain} Public Address:</p>
        <p className="font-mono text-sm break-all text-white mb-4">{currentWallet.address}</p>
        <Button onClick={() => navigator.clipboard.writeText(currentWallet.address)}>Copy Address</Button>
      </div>
    </div>
  );

  return (
    <Card className="max-w-xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Wallet Overview</h2>
      <p className="text-brand-text-secondary text-center mb-6 max-w-lg mx-auto">
        This simulation lets you interact with a mock multi-chain wallet, which is your primary tool for managing crypto. You will practice fundamental actions like sending funds to another address, receiving funds, switching between different blockchains (like Bitcoin and Ethereum), and checking your asset balances. Mastering these skills is essential for confidently managing your own crypto.
      </p>

      <div className="flex justify-center mb-6 bg-brand-surface p-1 rounded-lg">
        <button onClick={() => setChain('ETH')} className={`w-1/2 py-2 rounded-md font-bold transition-colors ${chain === 'ETH' ? 'bg-brand-primary text-brand-bg' : 'text-white'}`}>Ethereum</button>
        <button onClick={() => setChain('BTC')} className={`w-1/2 py-2 rounded-md font-bold transition-colors ${chain === 'BTC' ? 'bg-brand-primary text-brand-bg' : 'text-white'}`}>Bitcoin</button>
      </div>
      
      {view === 'overview' && renderOverview()}
      {view === 'send' && renderSend()}
      {view === 'receive' && renderReceive()}

      <div className="text-center mt-8 border-t border-gray-700 pt-6">
        <Button onClick={onComplete} variant="accent">
            Mark Lesson as Complete
        </Button>
      </div>
    </Card>
  );
};

export default WalletOverviewSim;