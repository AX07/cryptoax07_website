import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Simulation, UserProgress, Category, Page } from './types';
import Header from './components/Header';
import AiChatbot from './components/AiChatbot';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { GET_CATEGORIES, LEARNING_PATH } from './constants';
import { XMarkIcon } from './components/icons/Icons'; // Assuming this is used in the modal
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import Button from './components/ui/Button';

// Performance: Add a spinner for lazy-loading fallbacks
const Spinner: React.FC = () => (
    <div className="flex justify-center items-center h-full min-h-[300px] w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
    </div>
);

const Confetti = lazy(() => import('./components/ui/Confetti'));

const AppContent: React.FC = () => {
  const { t, language: lang, setLanguage } = useLanguage();
  const CATEGORIES = GET_CATEGORIES(t);
  const allSimulations = CATEGORIES.flatMap(cat => cat.simulations);

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

  const { lang: langFromParams } = useParams();
  useEffect(() => {
    const supportedLanguages = ['en', 'es', 'fr'];
    if (langFromParams && supportedLanguages.includes(langFromParams)) {
      setLanguage(langFromParams);
      document.documentElement.lang = langFromParams;
    }
  }, [langFromParams, setLanguage]);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);


  // SEO and Meta Tag Management
  const location = useLocation();
  const { simId, categoryId } = useParams();
  useEffect(() => {
    let title = 'CryptoAX07: Crypto Education Hub';
    let description = 'Master cryptocurrency with CryptoAX07. We offer crypto tailored education, one to one coaching, and interactive simulations. Learn about blockchain technology, digital assets, DeFi explained, and cryptocurrency trading basics in a safe, effective environment.';

    const path = location.pathname;

    if (path.endsWith('/about')) {
        title = t('aboutPage.metaTitle');
        description = t('aboutPage.metaDescription');
    } else if (path.endsWith('/resources')) {
        title = t('resourcesPage.metaTitle');
        description = t('resourcesPage.metaDescription');
    } else if (path.includes('/app')) {
        if (path.endsWith('/dashboard')) {
            title = 'Dashboard | CryptoAX07 App';
            description = 'Track your learning progress, earn badges, and explore interactive crypto simulations.';
        } else if (path.endsWith('/progress')) {
            title = 'My Progress | CryptoAX07 App';
            description = 'View your XP, earned badges, and completed lessons. Book a call with an expert to discuss your journey.';
        } else if (categoryId) {
            const category = CATEGORIES.find(c => c.id === categoryId);
            if (category) {
                title = `${category.title} | CryptoAX07 App`;
                description = `Explore simulations in the ${category.title} category: ${category.description}`;
            }
        } else if (simId) {
            const currentSim = allSimulations.find(s => s.id === simId);
            if (currentSim) {
                title = `${currentSim.title} | CryptoAX07 App`;
                description = `Interactive Simulation: ${currentSim.description}`;
            }
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
  }, [location.pathname, lang, simId, categoryId, allSimulations, t, CATEGORIES]);


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

  const navigate = useNavigate();
  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [navigate]);

  const handleSelectSimulationById = useCallback((simulationId: string) => {
    if (LEARNING_PATH.includes(simulationId)) {
      handleNavigate(`/${lang}/app/sim/${simulationId}`);
    } else {
      console.warn(`Simulation with id "${simulationId}" not found in LEARNING_PATH.`);
    }
  }, [lang, handleNavigate]);

  const handleEnterApp = useCallback(() => {
    handleNavigate(`/${lang}/app/dashboard`);
  }, [lang, handleNavigate]);

  const handleNavigatePage = useCallback((page: Page) => {
    if (page === 'intro') {
      handleNavigate(`/${lang}`);
    } else {
      handleNavigate(`/${lang}/${page}`);
    }
  }, [lang, handleNavigate]);

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
            handleNavigate(`/${lang}/app/dashboard`);
        }
    }, 1500);
  }, [handleNavigate, handleSelectSimulationById, lang]);

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
        handleNavigate(`/${lang}/app/dashboard`);
    }
  }, [userProgress.completedSimulations, handleSelectSimulationById, handleNavigate, lang]);

  const handleSelectCategory = (category: Category) => {
    handleNavigate(`/${lang}/app/category/${category.id}`);
  };

  const handleSelectSimulation = (simulation: Simulation) => {
    handleSelectSimulationById(simulation.id);
  };

  const handleBookingConfirmation = useCallback(() => {
    setUserProgress(prev => ({ ...prev, hasBookedCall: true }));
    closeBookingModal();
    handleNavigate(`/${lang}/app/progress`);
  }, [handleNavigate, lang]);

  const handleBack = () => {
    handleNavigate(`/${lang}/app/dashboard`);
  };

  return (
    <>
      {showConfetti && <Suspense fallback={null}><Confetti key={Date.now()} /></Suspense>}
      <Outlet context={{ userProgress, onNavigatePage, startOrResumeLearningPath, openBookingModal, isSidebarOpen, setIsSidebarOpen, isSidebarCollapsed, toggleSidebarCollapse, handleSelectSimulationById, handleSelectCategory, handleSelectSimulation, handleBack, completeSimulation, allSimulations }} />

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

export const AppLayout: React.FC<any> = ({
  userProgress, onNavigate, onNavigatePage, onStartLearning, onOpenBookingModal,
  isSidebarOpen, setIsSidebarOpen, isSidebarCollapsed, toggleSidebarCollapse, onSelectSimulationById
}) => {
  const location = useLocation();
  const { simId } = useParams();
  const isDashboardOrProgress = location.pathname.endsWith('/dashboard') || location.pathname.endsWith('/progress');

  return (
    <div className="min-h-screen bg-brand-bg flex">
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full md:w-auto ${isSidebarCollapsed ? 'md:mr-20' : 'md:mr-72'}`}>
        <Header 
          userProgress={userProgress} 
          onNavigate={onNavigate}
          onNavigatePage={onNavigatePage}
          onStartLearning={onStartLearning}
          onOpenBookingModal={onOpenBookingModal}
          onToggleSidebar={() => setIsSidebarOpen((prev: boolean) => !prev)}
        />
        <main className={`flex-grow ${isDashboardOrProgress ? 'dashboard-progress-bg' : ''}`}>
          <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
        <Footer 
          onStart={onStartLearning}
          onNavigatePage={onNavigatePage}
          onOpenBookingModal={onOpenBookingModal}
        />
      </div>
      <Sidebar
        userProgress={userProgress}
        onSelectSimulation={onSelectSimulationById}
        onNavigate={onNavigate}
        onNavigatePage={onNavigatePage}
        currentSimId={simId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />
      <AiChatbot onSelectSimulation={onSelectSimulationById} />
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
    <Analytics />
    <SpeedInsights />
  </LanguageProvider>
);

export default App;