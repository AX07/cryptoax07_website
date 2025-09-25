import React, { useState, useEffect } from 'react';
import { View, type UserProgress } from '../types';
import { ShieldCheckIcon, StarIcon, MenuIcon, XMarkIcon } from './icons/Icons';
import Button from './ui/Button';

interface HeaderProps {
  userProgress: UserProgress;
  onNavigate: (view: View) => void;
  onStartLearning: () => void;
  onOpenBookingModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProgress, onNavigate, onStartLearning, onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50 transition-all duration-300">
      <div className={`container mx-auto px-4 flex justify-between items-center transition-all duration-300 relative ${isScrolled ? 'py-1' : 'py-3'}`}>
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate(View.Dashboard); }}
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
              title="View Your Progress"
            >
              <StarIcon className="h-6 w-6 text-yellow-400" />
              <span className="font-semibold text-white">{userProgress.xp} XP</span>
            </button>
            <button 
              onClick={() => onNavigate(View.Progress)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-brand-surface/50 transition-colors"
              title="View Your Progress"
            >
              <ShieldCheckIcon className="h-6 w-6 text-brand-secondary" />
              <span className="font-semibold text-white">{userProgress.badges.length}</span>
            </button>
            <Button onClick={onOpenBookingModal} className="transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">
              Book a Call
            </Button>
            <button 
              onClick={onStartLearning}
              className="font-bold py-2 px-4 rounded-lg transition-all duration-200 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange"
            >
              Start Learning
            </button>
          </div>

          {/* Menu Button */}
          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-white hover:bg-brand-surface">
              {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:absolute md:top-full md:right-0 md:container md:mx-auto md:px-4 md:flex md:justify-end">
          <div className="animate-fade-in bg-brand-surface/95 backdrop-blur-sm border-t md:border border-gray-700/50 md:mt-2 md:w-64 md:rounded-lg shadow-lg">
              <nav className="container mx-auto px-4 py-4 flex flex-col items-center md:items-start md:p-4 gap-4">
                  <button onClick={() => { onNavigate(View.Dashboard); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Home</button>
                  <button onClick={() => { onNavigate(View.About); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">About</button>
                  <button onClick={() => { onNavigate(View.Resources); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Resources</button>
                  <button onClick={() => { onStartLearning(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Start Learning</button>
                  <button onClick={() => { onOpenBookingModal(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Book a Call</button>
                  <div className="flex md:flex-col md:items-start gap-6 md:gap-4 mt-2 border-t border-gray-700 w-full pt-4">
                    <button onClick={() => { onNavigate(View.Progress); setIsMenuOpen(false); }} className="flex items-center gap-2">
                      <StarIcon className="h-6 w-6 text-yellow-400" /> <span className="font-semibold text-white">{userProgress.xp} XP</span>
                    </button>
                    <button onClick={() => { onNavigate(View.Progress); setIsMenuOpen(false); }} className="flex items-center gap-2">
                      <ShieldCheckIcon className="h-6 w-6 text-brand-secondary" /> <span className="font-semibold text-white">{userProgress.badges.length}</span>
                    </button>
                  </div>
              </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;