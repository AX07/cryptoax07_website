import React, { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import { MenuIcon, XMarkIcon, PhoneIcon, CheckCircleIcon, TwitterIcon, YouTubeIcon, DiscordIcon, InstagramIcon, LinkedInIcon, TelegramIcon, WhatsappIcon, NewspaperIcon, Squares2X2Icon } from './icons/Icons';
import { Page } from '../types';
import { RESOURCES_DATA, ResourceItem } from '../constants/resourcesData';

interface ResourcesPageProps {
  onStart: () => void;
  onNavigatePage: (page: Page) => void;
  onOpenBookingModal: () => void;
}

const useScrollAnimation = <T extends Element>(options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<T>(null);
    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1, ...options });
        if (element) observer.observe(element);
        return () => { if (element) observer.unobserve(element); };
    }, [options]);
    return [ref, isVisible] as const;
};

const ResourceCard: React.FC<{ item: ResourceItem }> = ({ item }) => (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <Card className="p-4 h-full bg-brand-bg/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-primary/50 flex items-center gap-4">
            <img src={item.logoUrl} alt={`${item.name} logo`} className="h-12 w-12 object-contain flex-shrink-0 bg-white/10 rounded-full p-1" />
            <div>
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-xs text-brand-text-secondary">{item.description}</p>
            </div>
        </Card>
    </a>
);

const ResourcesPage: React.FC<ResourcesPageProps> = ({ onStart, onNavigatePage, onOpenBookingModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        
        const observerOptions = { rootMargin: '-20% 0px -80% 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, observerOptions);

        Object.values(sectionRefs.current).forEach(section => {
            if (section) observer.observe(section);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            Object.values(sectionRefs.current).forEach(section => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const scrollToSection = (id: string) => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const socialLinks = [
      { href: "https://x.com/Ax07Crypto", label: "X/Twitter", Icon: TwitterIcon },
      { href: "https://www.youtube.com/@CryptoAX07", label: "YouTube", Icon: YouTubeIcon },
      { href: "https://linktr.ee/ax07", label: "Discord", Icon: DiscordIcon },
      { href: "https://www.instagram.com/cryptoax07/", label: "Instagram", Icon: InstagramIcon },
      { href: "https://www.linkedin.com/company/cryptoax07", label: "LinkedIn", Icon: LinkedInIcon },
      { href: "https://t.me/CryptoAx07", label: "Telegram", Icon: TelegramIcon },
      { href: "https://wa.me/qr/VW746BCARY44C1", label: "Whatsapp", Icon: WhatsappIcon },
    ];
    
    const pageStyle = {
      backgroundImage: `linear-gradient(rgba(16, 20, 31, 0.95), rgba(16, 20, 31, 0.95)), url('https://static.wixstatic.com/media/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png/v1/fill/w_1156,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png')`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
    };
    
    return (
        <div style={pageStyle} className="text-brand-text font-sans selection:bg-brand-primary/20">
            {/* Header */}
            <header className={`bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50 transition-all duration-300`}>
                <div className={`container mx-auto px-4 flex justify-between items-center transition-all duration-300 relative ${isScrolled ? 'py-1' : 'py-3'}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigatePage('intro'); }} className="flex items-center">
                        <img src="https://static.wixstatic.com/media/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png/v1/fill/w_958,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png" alt="CryptoAX07 Logo" className={`w-auto transition-all duration-300 ${isScrolled ? 'h-20' : 'h-28'}`} />
                    </a>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <Button onClick={onOpenBookingModal} className="transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">Book a Call</Button>
                            <button onClick={onStart} className="font-bold py-2 px-4 rounded-lg transition-all duration-200 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange">Start Learning</button>
                        </div>
                        <div className="relative">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-white hover:bg-brand-surface">
                                {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:absolute md:top-full md:right-0 md:container md:mx-auto md:px-4 md:flex md:justify-end">
                        <div className="animate-fade-in bg-brand-surface/95 backdrop-blur-sm border-t md:border border-gray-700/50 md:mt-2 md:w-64 md:rounded-lg shadow-lg">
                            <nav className="container mx-auto px-4 py-4 flex flex-col items-center md:items-start md:p-4 gap-4">
                                <button onClick={() => { onNavigatePage('intro'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Home</button>
                                <button onClick={() => { onNavigatePage('about'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">About</button>
                                <button onClick={() => { onNavigatePage('resources'); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Resources</button>
                                <button onClick={() => { onStart(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Start Learning</button>
                                <button onClick={() => { onOpenBookingModal(); setIsMenuOpen(false); }} className="font-semibold text-white hover:text-brand-primary w-full text-left">Book a Call</button>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main>
                {/* Hero */}
                <section className="py-16 md:py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">Your Crypto Resource Center</h1>
                    <p className="mt-4 text-lg text-brand-text-secondary max-w-3xl mx-auto">All the tools, platforms, and guides you need to navigate the world of cryptocurrency—curated in one place.</p>
                </section>
                
                {/* Sticky Nav */}
                <nav className="sticky top-[88px] bg-brand-surface/80 backdrop-blur-md z-40 border-y border-gray-700/50">
                    <div className="container mx-auto px-4 overflow-x-auto">
                        <div className="flex justify-center items-center gap-2 md:gap-4">
                           {RESOURCES_DATA.map(({ id, title, Icon }) => (
                                <button key={id} onClick={() => scrollToSection(id)} className={`flex-shrink-0 px-3 py-3 md:px-4 text-sm md:text-base font-semibold border-b-2 transition-colors duration-200 flex items-center gap-2 ${activeSection === id ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-secondary hover:text-white'}`}>
                                    <Icon className="h-5 w-5 hidden sm:block" />
                                    {title}
                                </button>
                           ))}
                        </div>
                    </div>
                </nav>

                {/* Sections */}
                {RESOURCES_DATA.map(({ id, headline, items }) => (
                    <section key={id} id={id} ref={el => { sectionRefs.current[id] = el }} className="py-16 container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">{headline}</h2>
                        {id === 'blog' ? (
                             <p className="text-center text-brand-text-secondary">Blog coming soon! Stay tuned for articles and guides.</p>
                        ) : id === 'tracker' ? (
                            <div className="text-center">
                                <p className="text-center text-brand-text-secondary mb-4">Stay on top of your crypto and fiat finances with our simple tracker tool.</p>
                                <Button onClick={() => onNavigatePage('app')}>Launch Tracker</Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {items.map(item => <ResourceCard key={item.name} item={item} />)}
                            </div>
                        )}
                    </section>
                ))}

                 {/* Final CTA */}
                <section className="py-16 md:py-24 bg-brand-surface/50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Crypto Journey?</h2>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button onClick={onOpenBookingModal} className="text-lg py-3 px-8 flex items-center gap-2 transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">
                                <PhoneIcon className="h-6 w-6"/> Book a Call with a Coach
                            </Button>
                            <button onClick={onStart} className="font-bold py-3 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center gap-2 bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white hover:scale-105 btn-glow-orange">
                                <CheckCircleIcon className="h-6 w-6"/>
                                Start Learning with the App
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 bg-brand-surface border-t border-gray-700/50">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-16">
                        <div className="flex flex-col items-center md:items-start">
                            <p className="font-semibold text-white mb-4">Follow Us</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                                {socialLinks.map(({ href, label, Icon }) => ( <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-text-secondary hover:text-brand-primary transition-colors" aria-label={`Follow us on ${label}`}><Icon className="h-6 w-6" /></a> ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                             <p className="font-semibold text-white mb-4">Navigation</p>
                             <nav className="flex flex-col items-center md:items-start gap-2 text-brand-text-secondary">
                                <button onClick={() => onNavigatePage('intro')} className="hover:text-brand-primary transition-colors text-left">Home</button>
                                <button onClick={() => onNavigatePage('about')} className="hover:text-brand-primary transition-colors text-left">About</button>
                                <button onClick={() => onNavigatePage('resources')} className="hover:text-brand-primary transition-colors text-left">Resources</button>
                                <button onClick={onStart} className="hover:text-brand-primary transition-colors text-left">Start Learning</button>
                                <button onClick={onOpenBookingModal} className="hover:text-brand-primary transition-colors">Book a Call</button>
                            </nav>
                        </div>
                    </div>
                    <a href="https://www.cryptoax07.com" target="_blank" rel="noopener noreferrer" className="inline-block"><img src="https://static.wixstatic.com/media/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png/v1/fill/w_958,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png" alt="CryptoAX07 Logo" className="h-28 w-auto" /></a>
                </div>
            </footer>
        </div>
    );
};

export default ResourcesPage;