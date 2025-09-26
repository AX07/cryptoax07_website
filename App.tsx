import React, { useState, useCallback, useEffect } from 'react';
import { View, Simulation, UserProgress, Category, Page } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CategoryView from './components/CategoryView';
import ExpertHelp from './components/ExpertHelp';
import AiChatbot from './components/AiChatbot';
import Progress from './components/Progress';
import IntroPage from './components/IntroPage';
import AboutPage from './components/AboutPage';
import ResourcesPage from './components/ResourcesPage';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { GET_CATEGORIES, LEARNING_PATH } from './constants';
import { XMarkIcon } from './components/icons/Icons';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';

import SeedPhraseSim from './components/simulations/SeedPhraseSim';
import SwapSim from './components/simulations/SwapSim';
import InflationVisualizer from './components/simulations/InflationVisualizer';
import WalletConnectionSim from './components/simulations/WalletConnectionSim';
import KycSim from './components/simulations/KycSim';
import PortfolioSim from './components/simulations/PortfolioSim';
import TokenApprovalSim from './components/simulations/TokenApprovalSim';
import BitcoinTransactionSim from './components/simulations/BitcoinTransactionSim';
import EthereumTransactionSim from './components/simulations/EthereumTransactionSim';
import WalletOverviewSim from './components/simulations/WalletOverviewSim';
import PortfolioTrackerSim from './components/simulations/PortfolioTrackerSim';
import CandlestickChartSim from './components/simulations/CandlestickChartSim';
import CoinMarketExplorerSim from './components/simulations/CoinMarketExplorerSim';
import PasswordManagerSim from './components/simulations/PasswordManagerSim';
import LendingBorrowingSim from './components/simulations/LendingBorrowingSim';
import LiquidationRiskSim from './components/simulations/LiquidationRiskSim';
import FiatDepositSim from './components/simulations/FiatDepositSim';
import CryptoWithdrawSim from './components/simulations/CryptoWithdrawSim';
import SelfCustodySim from './components/simulations/SelfCustodySim';
import TwoFactorAuthSim from './components/simulations/TwoFactorAuthSim';
import BuyAndWithdrawSim from './components/simulations/BuyAndWithdrawSim';
import FractionalReserveSim from './components/simulations/FractionalReserveSim';
import AirdropSim from './components/simulations/AirdropSim';
import NftSim from './components/simulations/NftSim';
import Layer2Sim from './components/simulations/Layer2Sim';
import EmergencyFundSim from './components/simulations/EmergencyFundSim';
import DebtRepaymentSim from './components/simulations/DebtRepaymentSim';
import PerpetualFuturesSim from './components/simulations/PerpetualFuturesSim';
import ExpenseTrackingSim from './components/simulations/ExpenseTrackingSim';
import AssetsLiabilitiesSim from './components/simulations/AssetsLiabilitiesSim';
import Button from './components/ui/Button';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const CATEGORIES = GET_CATEGORIES(t);
  const allSimulations = CATEGORIES.flatMap(cat => cat.simulations);

  const [page, setPage] = useState<Page>('intro');
  const [view, setView] = useState<View>(View.Dashboard);
  const [learningPathStep, setLearningPathStep] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebarCollapsed') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const savedProgress = localStorage.getItem('userProgress');
      return savedProgress ? JSON.parse(savedProgress) : { xp: 0, badges: [], completedSimulations: [] };
    } catch (error) {
      console.error("Failed to parse user progress from localStorage", error);
      return { xp: 0, badges: [], completedSimulations: [] };
    }
  });
  
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeBookingModal();
            }
        };

        if (isBookingModalOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isBookingModalOpen]);

  const handleEnterApp = () => {
    setPage('app');
    setView(View.Dashboard);
  };

  const handleNavigatePage = (targetPage: Page) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };


  const completeSimulation = useCallback((simId: string, xpGained: number, badge?: string) => {
    setUserProgress(prev => {
      if (prev.completedSimulations.some(c => c.id === simId)) {
        return prev; // Already completed
      }
      return {
        xp: prev.xp + xpGained,
        badges: badge && !prev.badges.includes(badge) ? [...prev.badges, badge] : prev.badges,
        completedSimulations: [...prev.completedSimulations, { id: simId, completedAt: new Date().toISOString(), xpGained }],
      };
    });
    
    setTimeout(() => {
        const currentSimIndex = LEARNING_PATH.findIndex(id => id === simId);
        if (currentSimIndex !== -1 && currentSimIndex + 1 < LEARNING_PATH.length) {
            setLearningPathStep(currentSimIndex + 1);
        } else {
            setView(View.Dashboard);
        }
    }, 1500);
  }, []);
  
  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed(prev => {
        const newState = !prev;
        try {
          localStorage.setItem('sidebarCollapsed', String(newState));
        } catch (e) {
          console.error("Could not save sidebar state to localStorage", e);
        }
        return newState;
    });
  }, []);

  const startOrResumeLearningPath = () => {
    const nextStepIndex = LEARNING_PATH.findIndex(id => !userProgress.completedSimulations.some(s => s.id === id));
    setLearningPathStep(nextStepIndex === -1 ? 0 : nextStepIndex);
    setView(View.Simulation);
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setView(View.Category);
  };

  const handleSelectSimulation = (simulation: Simulation) => {
    handleSelectSimulationById(simulation.id);
  };

  const handleSelectSimulationById = useCallback((simulationId: string) => {
    const indexInPath = LEARNING_PATH.findIndex(id => id === simulationId);

    if (indexInPath !== -1) {
      setLearningPathStep(indexInPath);
      setView(View.Simulation);
    } else {
      console.warn(`Simulation with id "${simulationId}" not found in LEARNING_PATH.`);
    }
  }, []);

  const handleNavigate = (targetView: View) => {
    if (targetView === View.About) {
        setPage('about');
    } else if (targetView === View.Resources) {
        setPage('resources');
    } else {
        setPage('app');
        setView(targetView);
    }
  }

  const handleBack = () => {
    setView(View.Dashboard);
    setSelectedCategory(null);
  };

  const renderSimulation = (simulationId: string) => {
    if (!simulationId) return null;
    switch (simulationId) {
      case 'seed-phrase':
        return <SeedPhraseSim onComplete={() => completeSimulation('seed-phrase', 100, 'Seed Phrase Master')} />;
      case 'swap-tool':
        return <SwapSim onComplete={() => completeSimulation('swap-tool', 150, 'DeFi Swapper')} />;
      case 'inflation-visualizer':
        return <InflationVisualizer onComplete={() => completeSimulation('inflation-visualizer', 50, 'Inflation Aware')} />;
      case 'fractional-reserve':
        return <FractionalReserveSim onComplete={() => completeSimulation('fractional-reserve', 100, 'Money Multiplier')} />;
      case 'wallet-connection':
        return <WalletConnectionSim onComplete={() => completeSimulation('wallet-connection', 75, 'Wallet Connector')} />;
      case 'kyc-sim':
        return <KycSim onComplete={() => completeSimulation('kyc-sim', 75, 'Verified User')} />;
      case 'portfolio-sim':
        return <PortfolioSim onComplete={() => completeSimulation('portfolio-sim', 200, 'Portfolio Pro')} />;
      case 'token-approval':
        return <TokenApprovalSim onComplete={() => completeSimulation('token-approval', 125, 'Approval Guardian')} />;
      case 'bitcoin-transaction':
        return <BitcoinTransactionSim onComplete={() => completeSimulation('bitcoin-transaction', 250, 'BTC Transactor')} />;
      case 'ethereum-transaction':
        return <EthereumTransactionSim onComplete={() => completeSimulation('ethereum-transaction', 250, 'ETH Transactor')} />;
      case 'wallet-overview':
        return <WalletOverviewSim onComplete={() => completeSimulation('wallet-overview', 150, 'Wallet Manager')} />;
      case 'portfolio-tracker':
        return <PortfolioTrackerSim onComplete={() => completeSimulation('portfolio-tracker', 100, 'Asset Analyst')} />;
      case 'candlestick-chart':
        return <CandlestickChartSim onComplete={() => completeSimulation('candlestick-chart', 125, 'Chart Reader')} />;
      case 'coin-market-explorer':
        return <CoinMarketExplorerSim onComplete={() => completeSimulation('coin-market-explorer', 75, 'Market Observer')} />;
      case 'password-manager':
        return <PasswordManagerSim onComplete={() => completeSimulation('password-manager', 100, 'Security Savvy')} />;
      case 'lending-borrowing':
        return <LendingBorrowingSim onComplete={() => completeSimulation('lending-borrowing', 200, 'DeFi Banker')} />;
      case 'liquidation-risk':
        return <LiquidationRiskSim onComplete={() => completeSimulation('liquidation-risk', 150, 'Risk Manager')} />;
      case 'fiat-deposit':
        return <FiatDepositSim onComplete={() => completeSimulation('fiat-deposit', 75, 'Fiat Depositor')} />;
      case 'buy-and-withdraw':
        return <BuyAndWithdrawSim onComplete={() => completeSimulation('buy-and-withdraw', 125, 'Sovereign Owner')} />;
      case 'crypto-withdraw':
        return <CryptoWithdrawSim onComplete={() => completeSimulation('crypto-withdraw', 125, 'Fiat Withdrawer')} />;
      case 'self-custody':
        return <SelfCustodySim onComplete={() => completeSimulation('self-custody', 150, 'Self-Custody Champ')} />;
      case 'two-factor-auth':
        return <TwoFactorAuthSim onComplete={() => completeSimulation('two-factor-auth', 125, 'Security Guardian')} />;
      case 'airdrops-farming':
        return <AirdropSim onComplete={() => completeSimulation('airdrops-farming', 175, 'Yield Farmer')} />;
      case 'nft-explained':
        return <NftSim onComplete={() => completeSimulation('nft-explained', 150, 'NFT Explorer')} />;
      case 'layer-2-scaling':
        return <Layer2Sim onComplete={() => completeSimulation('layer-2-scaling', 200, 'Scale Specialist')} />;
      case 'emergency-fund':
        return <EmergencyFundSim onComplete={() => completeSimulation('emergency-fund', 150, 'Recession Proof')} />;
      case 'debt-repayment':
        return <DebtRepaymentSim onComplete={() => completeSimulation('debt-repayment', 175, 'Debt Slayer')} />;
      case 'perpetual-futures':
        return <PerpetualFuturesSim onComplete={() => completeSimulation('perpetual-futures', 250, 'Derivatives Trader')} />;
      case 'expense-tracking':
        return <ExpenseTrackingSim onComplete={() => completeSimulation('expense-tracking', 100, 'Budget Boss')} />;
      case 'assets-liabilities':
        return <AssetsLiabilitiesSim onComplete={() => completeSimulation('assets-liabilities', 125, 'Net Worth Ninja')} />;
      default:
        return <div className="text-center p-8">Simulation not found.</div>;
    }
  };
  
  const renderContent = () => {
    switch(view) {
      case View.Dashboard:
        return <Dashboard 
                onStartLearning={startOrResumeLearningPath} 
                onSelectCategory={handleSelectCategory}
                userProgress={userProgress} 
               />;
      case View.Category:
        if (!selectedCategory) {
          handleBack();
          return null;
        }
        return <CategoryView 
                  category={selectedCategory} 
                  onSelectSimulation={handleSelectSimulation}
                  onBack={handleBack}
                  userProgress={userProgress}
                />;
      case View.Simulation:
        if (learningPathStep >= LEARNING_PATH.length) {
            return (
                <div className="text-center animate-fade-in p-8">
                    <h2 className="text-4xl font-bold text-brand-secondary mb-4">{t('app.congratulations')}</h2>
                    <p className="text-lg text-brand-text-secondary mb-8">{t('app.pathComplete')}</p>
                    <Button onClick={handleBack}>{t('app.returnToDashboard')}</Button>
                </div>
            );
        }
        const currentSimId = LEARNING_PATH[learningPathStep];
        const currentSim = allSimulations.find(s => s.id === currentSimId);

        if (!currentSim) {
          return <div className="text-center p-8">{t('app.lessonNotFound')}</div>;
        }

        const pathProgress = Math.round(((learningPathStep) / LEARNING_PATH.length) * 100);

        return (
            <div className="animate-fade-in">
                <div className="mb-6 md:mb-8">
                    <button onClick={handleBack} className="text-brand-primary hover:underline text-sm mb-4">
                        &larr; {t('app.backToDashboard')}
                    </button>
                    <div className="bg-brand-surface p-4 rounded-xl border border-gray-700/50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                            {t('app.lesson')} {learningPathStep + 1} {t('app.of')} {LEARNING_PATH.length}: {currentSim.title}
                        </h3>
                        <span className="text-brand-secondary font-bold text-sm hidden md:block">{pathProgress}% {t('app.complete')}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-brand-secondary h-2.5 rounded-full transition-all duration-500" style={{ width: `${pathProgress}%` }}></div>
                      </div>
                    </div>
                </div>
                {renderSimulation(currentSim.id)}
            </div>
        );
      case View.ExpertHelp:
        return <ExpertHelp onBack={handleBack} />;
      case View.Progress:
        return <Progress userProgress={userProgress} onBack={handleBack} />;
      default:
        return <Dashboard 
                onStartLearning={startOrResumeLearningPath}
                onSelectCategory={handleSelectCategory}
                userProgress={userProgress}
               />;
    }
  };

  const renderPage = () => {
      let currentSimId: string | null = null;
      if (page === 'app' && view === View.Simulation && learningPathStep < LEARNING_PATH.length) {
          currentSimId = LEARNING_PATH[learningPathStep];
      }
      
      switch(page) {
        case 'intro':
            return <IntroPage onStart={handleEnterApp} onNavigatePage={handleNavigatePage} onOpenBookingModal={openBookingModal} />;
        case 'about':
            return <AboutPage onStart={handleEnterApp} onNavigatePage={handleNavigatePage} onOpenBookingModal={openBookingModal} />;
        case 'resources':
            return <ResourcesPage onStart={handleEnterApp} onNavigatePage={handleNavigatePage} onOpenBookingModal={openBookingModal} />;
        case 'app':
        default:
            return (
                <div className="min-h-screen bg-brand-bg flex">
                    <div className={`flex-1 flex flex-col transition-all duration-300 w-full md:w-auto ${isSidebarCollapsed ? 'md:mr-20' : 'md:mr-72'}`}>
                        <Header 
                            userProgress={userProgress} 
                            onNavigate={handleNavigate}
                            onNavigatePage={handleNavigatePage}
                            onStartLearning={startOrResumeLearningPath}
                            onOpenBookingModal={openBookingModal}
                            onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                        />
                        <main className="flex-grow container mx-auto px-4 py-8">
                            {renderContent()}
                        </main>
                        <Footer 
                            onStart={startOrResumeLearningPath}
                            onNavigatePage={handleNavigatePage}
                            onOpenBookingModal={openBookingModal}
                        />
                    </div>
                    <Sidebar
                        userProgress={userProgress}
                        onSelectSimulation={handleSelectSimulationById}
                        onNavigate={handleNavigate}
                        onNavigatePage={handleNavigatePage}
                        currentSimId={currentSimId}
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        isCollapsed={isSidebarCollapsed}
                        onToggleCollapse={toggleSidebarCollapse}
                    />
                    <AiChatbot onSelectSimulation={handleSelectSimulationById} />
                </div>
            );
      }
  }

  return (
    <>
      {renderPage()}
      {isBookingModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex justify-center items-center animate-fade-in" 
          onClick={closeBookingModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div 
            className="bg-slate-100 rounded-2xl shadow-2xl border border-gray-300 w-[95vw] max-w-4xl h-[90vh] relative animate-pop-in" 
            onClick={e => e.stopPropagation()}
          >
            <h2 id="booking-modal-title" className="sr-only">{t('app.bookAppointment')}</h2>
            <button 
              onClick={closeBookingModal} 
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 z-10 p-1 rounded-full bg-white/50 hover:bg-gray-200 transition-colors"
              aria-label="Close booking modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0167PaK4gkglb-8diXPCzvZM2sz4ZqKNiCernRxnmLAjpnjvllox8tT5hFTKojodg2nkjA4DPj?gv=true&bgcolor=%23ffffff"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-2xl"
              title="Book an Appointment with CryptoAX07"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => (
    <LanguageProvider>
        <AppContent />
    </LanguageProvider>
);

export default App;
