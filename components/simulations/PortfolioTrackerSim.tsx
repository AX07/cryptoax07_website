import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useSimText } from './useSimText';

interface MockAsset { name: string; ticker: string; balance: number; value: number }
interface MockPortfolio { chain: string; assets: MockAsset[] }

const MOCK_PORTFOLIOS: Record<string, MockPortfolio> = {
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
    assets: [{ name: 'Bitcoin', ticker: 'BTC', balance: 1.15, value: 74750 }],
  },
};

const COPY = {
  en: {
    title: 'Portfolio Tracker Simulation',
    intro: "Portfolio trackers are powerful tools that connect to public blockchain data to give you a complete overview of all the assets held in any wallet address. In this simulation, you will enter one of the mock public addresses provided to see how these trackers work, analyzing a wallet's holdings and total value without needing access to its private keys.",
    mock: 'Mock Addresses',
    use: 'Use',
    placeholder: 'Enter or select a mock address',
    track: 'Track Portfolio',
    tracking: 'Tracking...',
    fetching: 'Fetching wallet data...',
    notFound: 'Address not found. Please use one of the mock addresses provided.',
    total: 'Total Portfolio Value',
    network: 'Network',
    balance: 'Balance:',
    insight: 'Anyone can see this. Public addresses are transparent: never share an address you want to keep private from people you do not trust.',
    complete: 'Complete Lesson',
    needTrack: 'Track a portfolio first to complete the lesson',
  },
  es: {
    title: 'Simulación de Rastreador de Portafolio',
    intro: 'Los rastreadores de portafolio son herramientas poderosas que se conectan a datos públicos de la blockchain para darte un panorama completo de todos los activos de cualquier dirección de wallet. En esta simulación ingresarás una de las direcciones públicas de ejemplo para ver cómo funcionan, analizando las tenencias y el valor total de una wallet sin necesitar acceso a sus llaves privadas.',
    mock: 'Direcciones de Ejemplo',
    use: 'Usar',
    placeholder: 'Escribe o selecciona una dirección de ejemplo',
    track: 'Rastrear Portafolio',
    tracking: 'Rastreando...',
    fetching: 'Obteniendo datos de la wallet...',
    notFound: 'Dirección no encontrada. Usa una de las direcciones de ejemplo.',
    total: 'Valor Total del Portafolio',
    network: 'Red',
    balance: 'Saldo:',
    insight: 'Cualquiera puede ver esto. Las direcciones públicas son transparentes: no compartas una dirección que quieras mantener privada con personas en las que no confías.',
    complete: 'Completar Lección',
    needTrack: 'Rastrea un portafolio primero para completar la lección',
  },
};

const PortfolioTrackerSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const c = useSimText(COPY);
  const [address, setAddress] = useState('');
  const [portfolio, setPortfolio] = useState<MockPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<number | undefined>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleTrack = () => {
    setIsLoading(true);
    setError(false);
    setPortfolio(null);
    timer.current = window.setTimeout(() => {
      const found = MOCK_PORTFOLIOS[address.trim()];
      if (found) setPortfolio(found); else setError(true);
      setIsLoading(false);
    }, 1500);
  };

  const totalValue = portfolio ? portfolio.assets.reduce((sum, a) => sum + a.value, 0) : 0;

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{c.title}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">{c.intro}</p>

      <div className="bg-brand-bg/50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 text-center">{c.mock}</h3>
        <div className="space-y-2">
          {Object.keys(MOCK_PORTFOLIOS).map(mockAddress => (
            <div key={mockAddress} className="flex items-center justify-between text-sm">
              <span className="font-mono text-gray-300 break-all pr-4">{mockAddress}</span>
              <button onClick={() => setAddress(mockAddress)} className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold py-1 px-2 rounded text-xs transition-colors">{c.use}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder={c.placeholder}
          className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary" />
        <Button onClick={handleTrack} disabled={isLoading || !address} className="w-full md:w-auto">{isLoading ? c.tracking : c.track}</Button>
      </div>

      {isLoading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-brand-text-secondary">{c.fetching}</p>
        </div>
      )}

      {error && <p className="text-red-500 text-center font-bold">{c.notFound}</p>}

      {portfolio && (
        <div className="animate-fade-in">
          <div className="text-center mb-6 p-4 bg-brand-bg rounded-xl">
            <p className="text-brand-text-secondary text-sm">{c.total}</p>
            <p className="text-4xl font-bold text-white">${totalValue.toLocaleString()}</p>
            <p className="text-brand-primary font-semibold">{portfolio.chain} {c.network}</p>
          </div>
          <div className="space-y-3">
            {portfolio.assets.map(asset => (
              <Card key={asset.ticker} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold text-white">{asset.name} ({asset.ticker})</p>
                  <p className="text-sm text-brand-text-secondary">{c.balance} {asset.balance.toLocaleString()}</p>
                </div>
                <p className="text-lg font-mono font-semibold text-brand-secondary">${asset.value.toLocaleString()}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-brand-orange text-center">{c.insight}</p>
        </div>
      )}

      <div className="text-center mt-8 border-t border-gray-700 pt-6">
        <Button onClick={onComplete} disabled={!portfolio} variant="secondary">{portfolio ? c.complete : c.needTrack}</Button>
      </div>
    </Card>
  );
};

export default PortfolioTrackerSim;
