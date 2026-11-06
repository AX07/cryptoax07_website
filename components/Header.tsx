import React, { useState, useEffect } from 'react';
import { View, type UserProgress, Page } from '../types';
import { ShieldCheckIcon, StarIcon, MenuIcon } from './icons/Icons';
import Button from './ui/Button';
import { useLanguage } from '../hooks/useLanguage';

interface HeaderProps {
  userProgress: UserProgress;
  onNavigate: (view: View) => void;
  onNavigatePage: (page: Page) => void;
  onStartLearning: () => void;
  onOpenBookingModal: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProgress, onNavigate, onNavigatePage, onStartLearning, onOpenBookingModal, onToggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-700/50 transition-all duration-300">
      <div className={`container mx-auto px-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-1' : 'py-3'}`}>
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigatePage('intro'); }}
          className="flex items-center"
        >
          <img 
            src="https://static.wixstatic.com/media/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png/v1/fill/w_958,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png" 
            alt="CryptoAX07 Tailored Education Logo"
            className={`w-auto transition-all duration-300 animate-pulse-slow ${isScrolled ? 'h-20' : 'h-28'}`}
          />
        </a>
        
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => onNavigate(View.Progress)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-brand-surface/50 transition-colors" 
              title={t('viewYourProgress')}
            >
              <StarIcon className="h-6 w-6 text-yellow-400" />
              <span className="font-semibold text-white">{userProgress.xp} XP</span>
            </button>
            <button 
              onClick={() => onNavigate(View.Progress)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-brand-surface/50 transition-colors"
              title={t('viewYourProgress')}
            >
              <ShieldCheckIcon className="h-6 w-6 text-brand-secondary" />
              <span className="font-semibold text-white">{userProgress.badges.length}</span>
            </button>
            <Button onClick={onOpenBookingModal} className="transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">
              {t('appHeader.bookACall')}
            </Button>
            <div className="relative">
              <button 
                onClick={onStartLearning}
                className="font-bold py-2 px-4 rounded-lg transition-all duration-200 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange"
              >
                {t('appHeader.startLearning')}
              </button>
              <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse-glow-orange z-10 whitespace-nowrap">
                {t('earnFiveUsd')}
              </div>
            </div>
          </div>

          {/* Mobile Right-Side Content (Progress Icons & Menu) */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => onNavigate(View.Progress)}
              className="p-2 rounded-lg hover:bg-brand-surface/50 transition-colors" 
              title={t('viewYourProgress')}
            >
              <StarIcon className="h-6 w-6 text-yellow-400" />
            </button>
            <button 
              onClick={() => onNavigate(View.Progress)}
              className="p-2 rounded-lg hover:bg-brand-surface/50 transition-colors"
              title={t('viewYourProgress')}
            >
              <ShieldCheckIcon className="h-6 w-6 text-brand-secondary" />
            </button>
            <button 
              onClick={onToggleSidebar} 
              className="p-2 rounded-md text-white hover:bg-brand-surface"
              aria-label="Toggle navigation sidebar"
            >
                <MenuIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);