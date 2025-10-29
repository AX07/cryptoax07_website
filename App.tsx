import React, { useState, useCallback, useEffect, Suspense, lazy, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { View, Simulation, UserProgress, Category, Page } from './types';
import Header from './components/Header';
import AiChatbot from './components/AiChatbot';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { GET_CATEGORIES, LEARNING_PATH } from './constants';
import { XMarkIcon } from './components/icons/Icons';
import { LanguageProvider, useLanguage, Language } from './hooks/useLanguage';
import Button from './components/ui/Button';

// Performance: Add a spinner for lazy-loading fallbacks
const Spinner: React.FC = () => (
    <div className="flex justify-center items-center h-full min-h-[300px] w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
    </div>
);

// Performance: Lazy-load components to code-split the application
const Dashboard = lazy(() => import('./components/Dashboard'));
const CategoryView = lazy(() => import('./components/CategoryView'));
const ExpertHelp = lazy(() => import('./components/ExpertHelp'));
const Progress = lazy(() => import('./components/Progress'));
const IntroPage = lazy(() => import('./components/IntroPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ResourcesPage = lazy(() => import('./components/ResourcesPage'));
const Confetti = lazy(() => import('./components/ui/Confetti'));

// Performance: Lazy-load all simulation components
const simulationComponents = {
  'seed-phrase': lazy(() => import('./components/simulations/SeedPhraseSim')),
  'swap-tool': lazy(() => import('./components/simulations/SwapSim')),
  'inflation-visualizer': lazy(() => import('./components/simulations/InflationVisualizer')),
  'wallet-connection': lazy(() => import('./components/simulations/WalletConnectionSim')),
  'kyc-sim': lazy(() => import('./components/simulations/KycSim')),
  'portfolio-sim': lazy(() => import('./components/simulations/PortfolioSim')),
  'token-approval': lazy(() => import('./components/simulations/TokenApprovalSim')),
  'bitcoin-transaction': lazy(() => import('./components/simulations/BitcoinTransactionSim')),
  'ethereum-transaction': lazy(() => import('./components/simulations/EthereumTransactionSim')),
  'wallet-overview': lazy(() => import('./components/simulations/WalletOverviewSim')),
  'portfolio-tracker': lazy(() => import('./components/simulations/PortfolioTrackerSim')),
  'candlestick-chart': lazy(() => import('./components/simulations/CandlestickChartSim')),
  'coin-market-explorer': lazy(() => import('./components/simulations/CoinMarketExplorerSim')),
  'password-manager': lazy(() => import('./components/simulations/PasswordManagerSim')),
  'lending-borrowing': lazy(() => import('./components/simulations/LendingBorrowingSim')),
  'liquidation-risk': lazy(() => import('./components/simulations/LiquidationRiskSim')),
  'fiat-deposit': lazy(() => import('./components/simulations/FiatDepositSim')),
  'buy-and-withdraw': lazy(() => import('./components/simulations/BuyAndWithdrawSim')),
  'crypto-withdraw': lazy(() => import('./components/simulations/CryptoWithdrawSim')),
  'self-custody': lazy(() => import('./components/simulations/SelfCustodySim')),
  'two-factor-auth': lazy(() => import('./components/simulations/TwoFactorAuthSim')),
  'airdrops-farming': lazy(() => import('./components/simulations/AirdropSim')),
  'nft-explained': lazy(() => import('./components/simulations/NftSim')),
  'layer-2-scaling': lazy(() => import('./components/simulations/Layer2Sim')),
  'emergency-fund': lazy(() => import('./components/simulations/EmergencyFundSim')),
  'debt-repayment': lazy(() => import('./components/simulations/DebtRepaymentSim')),
  'perpetual-futures': lazy(() => import('./components/simulations/PerpetualFuturesSim')),
  'expense-tracking': lazy(() => import('./components/simulations/ExpenseTrackingSim')),
  'assets-liabilities': lazy(() => import('./components/simulations/AssetsLiabilitiesSim')),
  'fractional-reserve': lazy(() => import('./components/simulations/FractionalReserveSim')),
};

const AppContent: React.FC = () => {
  const { t, language } = useLanguage();
  const CATEGORIES = useMemo(() => GET_CATEGORIES(t), [t]);
  const allSimulations = CATEGORIES.flatMap(cat => cat.simulations);

  const [page, setPage] = useState<Page>('intro');
  const [view, setView] = useState<View>(View.Dashboard);
  const [learningPathStep, setLearningPathStep] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
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
      return savedProgress ? JSON.parse(savedProgress) : { xp: 0, badges: [], completedSimulations: [], hasBookedCall: false };
    } catch (error) {
      console.error("Failed to parse user progress from localStorage", error);
      return { xp: 0, badges: [], completedSimulations: [], hasBookedCall: false };
    }
  });
  
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const updateUrl = useCallback((p?: string, id?: string) => {
      let path = `/${language}`;
      if (p && p !== 'intro') {
          path += `/${p}`;
          if (id) {
              path += `/${id}`;
          }
      }
  
      if (window.location.pathname !== path) {
          window.history.pushState({}, '', path);
      }
  }, [language]);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

    useEffect(() => {
    let title = 'CryptoAX07: Crypto Education Hub';
    let description = 'Master cryptocurrency with CryptoAX07. We offer crypto tailored education, one to one coaching, and interactive simulations. Learn about blockchain technology, digital assets, DeFi explained, and cryptocurrency trading basics in a safe, effective environment.';

    const currentSim = (page === 'app' && view === View.Simulation && learningPathStep < LEARNING_PATH.length) 
      ? allSimulations.find(s => s.id === LEARNING_PATH[learningPathStep])
      : null;

    if (page === 'about') {
        title = t('aboutPage.metaTitle');
        description = t('aboutPage.metaDescription');
    } else if (page === 'resources') {
        title = t('resourcesPage.metaTitle');
        description = t('resourcesPage.metaDescription');
    } else if (page === 'app') {
        if (view === View.Dashboard) {
            title = 'Dashboard | CryptoAX07 App';
            description = 'Track your learning progress, earn badges, and explore interactive crypto simulations.';
        } else if (view === View.Progress) {
            title = 'My Progress | CryptoAX07 App';
            description = 'View your XP, earned badges, and completed lessons. Book a call with an expert to discuss your journey.';
        } else if (view === View.Category && selectedCategory) {
            title = `${selectedCategory.title} | CryptoAX07 App`;
            description = `Explore simulations in the ${selectedCategory.title} category: ${selectedCategory.description}`;
        } else if (view === View.Simulation && currentSim) {
            title = `${currentSim.title} | CryptoAX07 App`;
            description = `Interactive Simulation: ${currentSim.description}`;
        }
    }

    document.title = title;
    
    const updateMetaTag = (selector: string, content: string) => {
        const element = document.querySelector(selector) as HTMLMetaElement | null;
        if (element) {
            element.content = content;
        }
    };

    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);

  }, [page, view, selectedCategory, learningPathStep, allSimulations, t]);


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
    
  const handleNavigatePage = useCallback((targetPage: Page) => {
    if (targetPage === 'intro') {
        updateUrl();
    } else {
        updateUrl(targetPage);
    }
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [updateUrl]);

  const handleSelectSimulationById = useCallback((simulationId: string) => {
    const indexInPath = LEARNING_PATH.findIndex(id => id === simulationId);

    if (indexInPath !== -1) {
      setLearningPathStep(indexInPath);
      setView(View.Simulation);
      updateUrl('sim', simulationId);
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      console.warn(`Simulation with id "${simulationId}" not found in LEARNING_PATH.`);
    }
  }, [updateUrl]);
  
  const handleNavigate = useCallback((targetView: View) => {
      if (targetView === View.About) {
          handleNavigatePage('about');
      } else if (targetView === View.Resources) {
          handleNavigatePage('resources');
      } else {
          setPage('app');
          setView(targetView);
          if (targetView === View.Dashboard) {
              updateUrl('dashboard');
          } else if (targetView === View.Progress) {
              updateUrl('progress');
          }
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
  }, [handleNavigatePage, updateUrl]);

  const handleEnterApp = useCallback(() => {
    handleNavigate(View.Dashboard);
  }, [handleNavigate]);

  useEffect(() => {
    const handleUrlChange = () => {
        const parts = window.location.pathname.split('/').filter(Boolean);
        // parts[0] is lang, handled by useLanguage hook.
        const p = parts[1];
        const id = parts[2];

        if (p === 'about' || p === 'resources') {
            setPage(p);
        } else if (p === 'dashboard' || p === 'progress' || p === 'category' || p === 'sim') {
            setPage('app');
            if (p === 'dashboard') {
              setView(View.Dashboard);
            } else if (p === 'progress') {
              setView(View.Progress);
            } else if (p === 'category') {
              if (id) {
                const category = CATEGORIES.find(c => c.id === id);
                if (category) {
                  setSelectedCategory(category);
                  setView(View.Category);
                } else {
                  handleNavigate(View.Dashboard);
                }
              } else {
                handleNavigate(View.Dashboard);
              }
            } else if (p === 'sim') {
              if (id) {
                handleSelectSimulationById(id);
              } else {
                handleNavigate(View.Dashboard);
              }
            }
        } else if (!p) {
            setPage('intro');
            if (parts.length === 0) {
                // Root URL, redirect to language-specific intro page
                window.history.replaceState({}, '', `/${language}`);
            }
        }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [CATEGORIES, handleNavigate, handleSelectSimulationById, language]);

  const completeSimulation = useCallback((simId: string, xpGained: number, badge?: string) => {
    setUserProgress(prev => {
      if (prev.completedSimulations.some(c => c.id === simId)) {
        return prev; // Already completed
      }
      return {
        ...prev,
        xp: prev.xp + xpGained,
        badges: badge && !prev.badges.includes(badge) ? [...prev.badges, badge] : prev.badges,
        completedSimulations: [...prev.completedSimulations, { id: simId, completedAt: new Date().toISOString(), xpGained }],
      };
    });
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    setTimeout(() => {
        const currentSimIndex = LEARNING_PATH.findIndex(id => id === simId);
        if (currentSimIndex !== -1 && currentSimIndex + 1 < LEARNING_PATH.length) {
            const nextSimId = LEARNING_PATH[currentSimIndex + 1];
            handleSelectSimulationById(nextSimId);
        } else {
            handleNavigate(View.Dashboard);
        }
    }, 1500);
  }, [handleNavigate, handleSelectSimulationById]);
  
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

  const startOrResumeLearningPath = useCallback(() => {
    const nextStepIndex = LEARNING_PATH.findIndex(id => !userProgress.completedSimulations.some(s => s.id === id));
    const stepIndex = nextStepIndex === -1 ? 0 : nextStepIndex;
    const simId = LEARNING_PATH[stepIndex];
    if (simId) {
        handleSelectSimulationById(simId);
    } else {
        handleNavigate(View.Dashboard);
    }
  }, [userProgress.completedSimulations, handleSelectSimulationById, handleNavigate]);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setView(View.Category);
    updateUrl('category', category.id);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [updateUrl]);

  const handleSelectSimulation = (simulation: Simulation) => {
    handleSelectSimulationById(simulation.id);
  };

  const handleBookingConfirmation = useCallback(() => {
    setUserProgress(prev => ({ ...prev, hasBookedCall: true }));
    closeBookingModal();
    handleNavigate(View.Progress);
  }, [handleNavigate]);

  const handleBack = () => {
    handleNavigate(View.Dashboard);
  };

  const renderSimulation = (simulationId: string) => {
    if (!simulationId) return null;
    
    const SimComponent = simulationComponents[simulationId as keyof typeof simulationComponents];
    if (!SimComponent) {
        return <div className="text-center p-8">Simulation not found.</div>;
    }

    const completionHandlers: { [key: string]: () => void } = {
        'seed-phrase': () => completeSimulation('seed-phrase', 100, 'Seed Phrase Master'),
        'swap-tool': () => completeSimulation('swap-tool', 150, 'DeFi Swapper'),
        'inflation-visualizer': () => completeSimulation('inflation-visualizer', 50, 'Inflation Aware'),
        'fractional-reserve': () => completeSimulation('fractional-reserve', 100, 'Money Multiplier'),
        'wallet-connection': () => completeSimulation('wallet-connection', 75, 'Wallet Connector'),
        'kyc-sim': () => completeSimulation('kyc-sim', 75, 'Verified User'),
        'portfolio-sim': () => completeSimulation('portfolio-sim', 200, 'Portfolio Pro'),
        'token-approval': () => completeSimulation('token-approval', 125, 'Approval Guardian'),
        'bitcoin-transaction': () => completeSimulation('bitcoin-transaction', 250, 'BTC Transactor'),
        'ethereum-transaction': () => completeSimulation('ethereum-transaction', 250, 'ETH Transactor'),
        'wallet-overview': () => completeSimulation('wallet-overview', 150, 'Wallet Manager'),
        'portfolio-tracker': () => completeSimulation('portfolio-tracker', 100, 'Asset Analyst'),
        'candlestick-chart': () => completeSimulation('candlestick-chart', 125, 'Chart Reader'),
        'coin-market-explorer': () => completeSimulation('coin-market-explorer', 75, 'Market Observer'),
        'password-manager': () => completeSimulation('password-manager', 100, 'Security Savvy'),
        'lending-borrowing': () => completeSimulation('lending-borrowing', 200, 'DeFi Banker'),
        'liquidation-risk': () => completeSimulation('liquidation-risk', 150, 'Risk Manager'),
        'fiat-deposit': () => completeSimulation('fiat-deposit', 75, 'Fiat Depositor'),
        'buy-and-withdraw': () => completeSimulation('buy-and-withdraw', 125, 'Sovereign Owner'),
        'crypto-withdraw': () => completeSimulation('crypto-withdraw', 125, 'Fiat Withdrawer'),
        'self-custody': () => completeSimulation('self-custody', 150, 'Self-Custody Champ'),
        'two-factor-auth': () => completeSimulation('two-factor-auth', 125, 'Security Guardian'),
        'airdrops-farming': () => completeSimulation('airdrops-farming', 175, 'Yield Farmer'),
        'nft-explained': () => completeSimulation('nft-explained', 150, 'NFT Explorer'),
        'layer-2-scaling': () => completeSimulation('layer-2-scaling', 200, 'Scale Specialist'),
        'emergency-fund': () => completeSimulation('emergency-fund', 150, 'Recession Proof'),
        'debt-repayment': () => completeSimulation('debt-repayment', 175, 'Debt Slayer'),
        'perpetual-futures': () => completeSimulation('perpetual-futures', 250, 'Derivatives Trader'),
        'expense-tracking': () => completeSimulation('expense-tracking', 100, 'Budget Boss'),
        'assets-liabilities': () => completeSimulation('assets-liabilities', 125, 'Net Worth Ninja'),
    };

    return <SimComponent onComplete={completionHandlers[simulationId]} />;
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
                <Suspense fallback={<Spinner />}>
                    {renderSimulation(currentSim.id)}
                </Suspense>
            </div>
        );
      case View.ExpertHelp:
        return <ExpertHelp onBack={handleBack} />;
      case View.Progress:
        return <Progress userProgress={userProgress} onBack={handleBack} onOpenBookingModal={openBookingModal} onContinueLearning={startOrResumeLearningPath} />;
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
      
      const pageContent = () => {
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
                                <Suspense fallback={<Spinner />}>
                                    {renderContent()}
                                </Suspense>
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
      return <Suspense fallback={<Spinner />}>{pageContent()}</Suspense>;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {showConfetti && <Suspense fallback={null}><Confetti /></Suspense>}
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
            className="bg-brand-surface rounded-2xl shadow-2xl border border-gray-700/50 w-[95vw] max-w-4xl h-[90vh] relative animate-pop-in flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
            <h2 id="booking-modal-title" className="sr-only">{t('app.bookAppointment')}</h2>
            <button 
              onClick={closeBookingModal} 
              className="absolute top-3 right-3 text-gray-400 hover:text-white z-10 p-1 rounded-full bg-brand-surface/50 hover:bg-brand-bg transition-colors"
              aria-label="Close booking modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="flex-grow rounded-t-2xl overflow-hidden bg-white">
                <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0167PaK4gkglb-8diXPCzvZM2sz4ZqKNiCernRxnmLAjpnjvllox8tT5hFTKojodg2nkjA4DPj?gv=true"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book an Appointment with CryptoAX07"
                ></iframe>
            </div>
             <div className="p-4 bg-brand-bg rounded-b-2xl border-t border-gray-700 text-center">
                <Button onClick={handleBookingConfirmation} variant="secondary">
                    {t('app.iveBooked')}
                </Button>
            </div>
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