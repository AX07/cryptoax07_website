import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const MOCK_PORTFOLIOS = {
  '0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6': {
    chain: 'Ethereum',
    assets: [
      { name: 'Ethereum', ticker: 'ETH', balance: 5.25, value: 18375 },
      { name: 'Chainlink', ticker: 'LINK', balance: 120.5, value: 1807.5 },
      { name: 'USD Coin', ticker: 'USDC', balance: 10500.0, value: 10500 },
    ],
  },
  'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq': {
    chain: 'Bitcoin',
    assets: [
      { name: 'Bitcoin', ticker: 'BTC', balance: 1.15, value: 74750 },
    ],
  },
};

type MockPortfolioKey = keyof typeof MOCK_PORTFOLIOS;

const PortfolioTrackerSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [address, setAddress] = useState<string>('');
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = () => {
    setIsLoading(true);
    setError(null);
    setPortfolio(null);

    setTimeout(() => {
      const foundPortfolio = MOCK_PORTFOLIOS[address as MockPortfolioKey];
      if (foundPortfolio) {
        setPortfolio(foundPortfolio);
      } else {
        setError('Address not found. Please use one of the mock addresses provided.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const totalValue = portfolio ? portfolio.assets.reduce((sum: number, asset: any) => sum + asset.value, 0) : 0;

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Portfolio Tracker Simulation</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
        Portfolio trackers are powerful tools that connect to public blockchain data to give you a complete overview of all the assets held in any wallet address. In this simulation, you will enter one of the mock public addresses provided to see how these trackers work, analyzing a wallet's holdings and total value without needing access to its private keys.
      </p>

      <div className="bg-brand-bg/50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 text-center">Mock Addresses</h3>
        <div className="space-y-2">
          {Object.keys(MOCK_PORTFOLIOS).map(mockAddress => (
            <div key={mockAddress} className="flex items-center justify-between text-sm">
              <span className="font-mono text-gray-300 break-all pr-4">{mockAddress}</span>
              <button
                onClick={() => setAddress(mockAddress)}
                className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold py-1 px-2 rounded text-xs transition-colors"
              >
                Use
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Enter or select a mock address"
          className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
        />
        <Button onClick={handleTrack} disabled={isLoading || !address} className="w-full md:w-auto">
          {isLoading ? 'Tracking...' : 'Track Portfolio'}
        </Button>
      </div>

      {isLoading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-brand-text-secondary">Fetching wallet data...</p>
        </div>
      )}

      {error && <p className="text-red-500 text-center font-bold">{error}</p>}

      {portfolio && (
        <div className="animate-fade-in">
          <div className="text-center mb-6 p-4 bg-brand-bg rounded-xl">
            <p className="text-brand-text-secondary text-sm">Total Portfolio Value</p>
            <p className="text-4xl font-bold text-white">${totalValue.toLocaleString()}</p>
            <p className="text-brand-primary font-semibold">{portfolio.chain} Network</p>
          </div>
          <div className="space-y-3">
            {portfolio.assets.map((asset: any) => (
              <Card key={asset.ticker} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-white">{asset.name} ({asset.ticker})</p>
                  <p className="text-sm text-brand-text-secondary">Balance: {asset.balance.toLocaleString()}</p>
                </div>
                <p className="text-lg font-mono font-semibold text-brand-secondary">${asset.value.toLocaleString()}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="text-center mt-8 border-t border-gray-700 pt-6">
        <Button onClick={onComplete} variant="secondary">
            Mark Lesson as Complete
        </Button>
      </div>
    </Card>
  );
};

export default PortfolioTrackerSim;