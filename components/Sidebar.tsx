import React, { useState } from 'react';
import { GET_CATEGORIES } from '../constants';
import { UserProgress, View, Page } from '../types';
import { CheckCircleIcon, ChevronDownIcon, HomeIcon, ChartBarSquareIcon, InformationCircleIcon, BookOpenIcon, ChevronDoubleRightIcon } from './icons/Icons';
import { useLanguage } from '../hooks/useLanguage';

interface SidebarProps {
  userProgress: UserProgress;
  onSelectSimulation: (simulationId: string) => void;
  onNavigate: (view: View) => void;
  onNavigatePage: (page: Page) => void;
  currentSimId: string | null;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userProgress, onSelectSimulation, onNavigate, onNavigatePage, currentSimId, isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const CATEGORIES = GET_CATEGORIES(t);

  const [openCategory, setOpenCategory] = useState<string | null>(() => {
    if (currentSimId) {
        const category = CATEGORIES.find(c => c.simulations.some(s => s.id === currentSimId));
        return category ? category.id : null;
    }
    return null;
  });

  const completedSimIds = new Set(userProgress.completedSimulations.map(s => s.id));

  const handleCategoryClick = (categoryId: string) => {
    if (isCollapsed) return;
    setOpenCategory(prev => (prev === categoryId ? null : categoryId));
  };

  const handleSimClick = (simId: string) => {
    onSelectSimulation(simId);
    onClose();
  };
  
  const handleNavClick = (view: View) => {
      onNavigate(view);
      onClose();
  }

  const handlePageNavClick = (page: Page) => {
    onNavigatePage(page);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <aside className={`fixed top-0 right-0 h-full bg-brand-surface border-l border-gray-700/50 z-50 transform transition-all duration-300 ease-in-out md:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${isCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center h-[92px] flex-shrink-0">
          <h2 className={`text-xl font-bold text-white whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>{t('navigation')}</h2>
        </div>
        <nav className="p-2 flex-grow overflow-y-auto">
          <ul className="space-y-2">
            <li>
                {isCollapsed ? (
                    <button
                        onClick={toggleLanguage}
                        className="w-full flex justify-center p-3 rounded-lg"
                        title={t(language === 'en' ? 'header.switchToSpanish' : 'header.switchToEnglish')}
                    >
                        <div className="bg-brand-primary text-brand-bg font-bold text-sm rounded-md px-2 py-1">
                            {language.toUpperCase()}
                        </div>
                    </button>
                ) : (
                    <div className="flex items-center gap-1 p-2 rounded-lg bg-brand-bg mx-2" role="group" aria-label="Language selection">
                        <button
                            className={`flex-1 text-center px-2 py-1 text-sm font-bold rounded-md transition-colors ${language === 'en' ? 'bg-brand-primary text-brand-bg' : 'text-brand-text-secondary hover:bg-brand-surface'}`}
                            onClick={() => { if (language !== 'en') toggleLanguage(); }}
                            aria-pressed={language === 'en'}
                        >
                            EN
                        </button>
                        <button
                            className={`flex-1 text-center px-2 py-1 text-sm font-bold rounded-md transition-colors ${language === 'es' ? 'bg-brand-primary text-brand-bg' : 'text-brand-text-secondary hover:bg-brand-surface'}`}
                            onClick={() => { if (language !== 'es') toggleLanguage(); }}
                            aria-pressed={language === 'es'}
                        >
                            ES
                        </button>
                    </div>
                )}
            </li>

            <li className="pb-2 border-b border-gray-700/50 mb-2">
                <span className={`px-2 text-xs font-bold text-gray-500 uppercase whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{t('sidebar.website')}</span>
            </li>
             <li>
              <button onClick={() => handlePageNavClick('intro')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-brand-text-secondary hover:bg-brand-bg hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={t('home')}>
                <HomeIcon className="h-6 w-6 flex-shrink-0" />
                <span className={`font-semibold whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{t('home')}</span>
              </button>
            </li>
             <li>
              <button onClick={() => handlePageNavClick('about')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-brand-text-secondary hover:bg-brand-bg hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={t('about')}>
                <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
                <span className={`font-semibold whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{t('about')}</span>
              </button>
            </li>
             <li>
              <button onClick={() => handlePageNavClick('resources')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-brand-text-secondary hover:bg-brand-bg hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={t('resources')}>
                <BookOpenIcon className="h-6 w-6 flex-shrink-0" />
                <span className={`font-semibold whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{t('resources')}</span>
              </button>
            </li>

            <li className="pt-2 border-t border-gray-700/50 mt-2">
              <span className={`px-2 text-xs font-bold text-gray-500 uppercase whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{t('sidebar.learningApp')}</span>
            </li>

            <li>
              <button onClick={() => handleNavClick(View.Dashboard)} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-brand-text-secondary hover:bg-brand-bg hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={t('sidebar.dashboard')}>
                <HomeIcon className="h-6 w-6 flex-shrink-0" />
                <span className={`font-semibold whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{t('sidebar.dashboard')}</span>
              </button>
            </li>
             <li>
              <button onClick={() => handleNavClick(View.Progress)} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-brand-text-secondary hover:bg-brand-bg hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={t('sidebar.myProgress')}>
                <ChartBarSquareIcon className="h-6 w-6 flex-shrink-0" />
                <span className={`font-semibold whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{t('sidebar.myProgress')}</span>
              </button>
            </li>

            <li className="pt-2 border-t border-gray-700/50 mt-2">
              <span className={`px-2 text-xs font-bold text-gray-500 uppercase whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{t('sidebar.categories')}</span>
            </li>

            {CATEGORIES.map(category => (
              <li key={category.id}>
                <button onClick={() => handleCategoryClick(category.id)} className={`w-full flex justify-between items-center p-3 rounded-lg text-left text-brand-text-secondary hover:bg-brand-bg hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`} title={category.title}>
                  <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <category.icon className="h-6 w-6 flex-shrink-0" />
                    <span className={`font-semibold whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{category.title}</span>
                  </div>
                  {!isCollapsed && (
                    <ChevronDownIcon className={`h-5 w-5 transition-transform flex-shrink-0 ${openCategory === category.id ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {!isCollapsed && openCategory === category.id && (
                  <ul className="pl-6 mt-1 space-y-1 border-l-2 border-gray-700 ml-4 animate-fade-in">
                    {category.simulations.map(sim => (
                      <li key={sim.id}>
                        <button 
                            onClick={() => handleSimClick(sim.id)} 
                            className={`w-full text-left p-2 text-sm rounded-md transition-colors flex items-center gap-2 ${currentSimId === sim.id ? 'bg-brand-primary text-brand-bg font-bold' : 'text-brand-text-secondary hover:bg-brand-bg hover:text-white'}`}
                        >
                            {completedSimIds.has(sim.id) ? (
                                <CheckCircleIcon className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                            ) : (
                                <div className="w-4 h-4 flex-shrink-0 border-2 border-gray-500 rounded-full"></div>
                            )}
                            <span>{sim.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-2 border-t border-gray-700/50 flex-shrink-0">
             <button onClick={onToggleCollapse} className={`w-full hidden md:flex items-center p-3 rounded-lg text-left text-brand-text-secondary hover:bg-brand-bg hover:text-white transition-colors ${isCollapsed ? 'justify-center' : 'justify-start'}`} aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}>
                <ChevronDoubleRightIcon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                <span className={`font-semibold whitespace-nowrap text-sm ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>{t('sidebar.collapse')}</span>
             </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;