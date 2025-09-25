import React, { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import { MenuIcon, XMarkIcon, CreditCardIcon, VideoCameraIcon, ChatBubbleBottomCenterTextIcon, PhoneIcon, CheckCircleIcon, BanknotesIcon, ShieldCheckIcon, LightBulbIcon } from './icons/Icons';
import { Page } from '../types';
import Footer from './Footer';

interface AboutPageProps {
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
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (element) {
                    observer.unobserve(element);
                }
            }
        }, { threshold: 0.1, ...options });

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return [ref, isVisible] as const;
};

const coaches = [
    {
        name: 'Alex Pintos Mollahan',
        bio: 'Alex began his crypto journey in 2017 while completing a degree in Chemistry in Spain. After working in Quality Assurance in the UK and studying programming in JavaScript and Solidity, he transitioned full-time into the crypto space. Now based in Portugal, Alex specializes in DeFi protocols like Aave, dYdX, and Uniswap, and has a passion for making complex crypto concepts simple and practical.',
        imageUrl: 'https://static.wixstatic.com/media/4a78c1_c4952822e0ce4f68a4afac3a3fdfa254~mv2.jpg/v1/fill/w_593,h_803,al_c,q_85,enc_avif,quality_auto/4a78c1_c4952822e0ce4f68a4afac3a3fdfa254~mv2.jpg'
    },
    {
        name: 'Maria Lopez',
        bio: 'Maria started her career in traditional finance before pivoting to blockchain in 2018. With experience in compliance, exchange onboarding, and financial education, she bridges the gap between the old and new financial systems. Maria focuses on helping beginners feel comfortable with wallets, exchanges, and secure transactions.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Daniel Weber',
        bio: 'Daniel, a former software developer, became fascinated with Ethereum smart contracts in 2017. He now teaches technical concepts like DeFi lending, liquidity pools, and staking in a way that’s clear and accessible for non-developers. His goal is to give clients the tools to use crypto confidently without needing a coding background.',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Sofia Marques',
        bio: 'With a background in education and tech, Sofia specializes in guiding clients through practical crypto use cases like payments, self-custody, and everyday applications. She focuses on building confidence step by step so users can move from “curious” to “crypto-native” at their own pace.',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

const AboutPage: React.FC<AboutPageProps> = ({ onStart, onNavigatePage, onOpenBookingModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [heroRef, heroIsVisible] = useScrollAnimation<HTMLElement>();
    const [teamSectionRef, teamSectionIsVisible] = useScrollAnimation<HTMLElement>();
    
    const [coachCard1Ref, coachCard1IsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const [coachCard2Ref, coachCard2IsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const [coachCard3Ref, coachCard3IsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const [coachCard4Ref, coachCard4IsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const coachRefs = [coachCard1Ref, coachCard2Ref, coachCard3Ref, coachCard4Ref];
    
    const [whySectionRef, whySectionIsVisible] = useScrollAnimation<HTMLElement>();
    const [whyPoint1Ref, whyPoint1IsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.4 });
    const [whyPoint2Ref, whyPoint2IsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.4 });
    const [whyPoint3Ref, whyPoint3IsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.4 });

    const [howItWorksRef, howItWorksIsVisible] = useScrollAnimation<HTMLElement>();
    const [howCard1Ref, howCard1IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [howCard2Ref, howCard2IsVisible] = useScrollAnimation<HTMLDivElement>();
    const [howCard3Ref, howCard3IsVisible] = useScrollAnimation<HTMLDivElement>();

    const [finalCtaRef, finalCtaIsVisible] = useScrollAnimation<HTMLElement>();


    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pageStyle = {
      backgroundImage: `
        linear-gradient(rgba(16, 20, 31, 0.92), rgba(16, 20, 31, 0.92)),
        url('https://static.wixstatic.com/media/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png/v1/fill/w_1156,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a78c1_f5dc609ad50b43bf9d0d51fe81e09497~mv2.png')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
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
                {/* Hero Section */}
                <section ref={heroRef} className={`py-20 md:py-32 text-center transition-all duration-700 ${heroIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    <div className="container mx-auto px-4">
                        <h1 className={`text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight transition-all duration-700 delay-200 ${heroIsVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}>
                             Learn from Experts Who Live and Breathe Crypto
                        </h1>
                        <p className={`mt-6 text-lg text-brand-text-secondary max-w-3xl mx-auto transition-all duration-700 delay-300 ${heroIsVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}>
                            Our team combines years of technical expertise, hands-on experience, and a passion for education to guide you through the world of cryptocurrency safely and confidently.
                        </p>
                        <div className={`mt-8 transition-all duration-700 delay-500 ${heroIsVisible ? 'animate-pop-in' : 'opacity-0'}`}>
                            <Button onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-lg py-3 px-8">
                                Meet the Team
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section ref={teamSectionRef} id="team-section" className={`py-16 md:py-24 bg-brand-surface`}>
                    <div className="container mx-auto px-4">
                        <h2 className={`text-3xl md:text-5xl font-bold text-white text-center mb-12 transition-all duration-700 ${teamSectionIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                           Meet Your Crypto Coaches
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coaches.map((coach, index) => (
                                <div key={index} ref={coachRefs[index]} className={`transition-all duration-500 ${coachRefs[index] && coachRefs[index][1] ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${index * 100}ms`}}>
                                    <Card className="p-0 text-center bg-brand-bg/50 group overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2">
                                        <div className="relative">
                                            <img src={coach.imageUrl} alt={`Photo of ${coach.name}`} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-transparent"></div>
                                            <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{coach.name}</h3>
                                        </div>
                                        <div className="p-6 flex-grow">
                                            <p className="text-sm text-brand-text-secondary text-left">{coach.bio}</p>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Why We Do It Section */}
                <section ref={whySectionRef} className={`py-16 md:py-24 transition-opacity duration-1000 ${whySectionIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why We Do It</h2>
                        <p className="max-w-3xl mx-auto text-lg text-brand-text-secondary mb-12">
                            CryptoAX07.com was created with a simple mission: to make crypto accessible, safe, and practical for everyone. We believe blockchain technology is as transformative as the internet—and learning how to use it should not feel overwhelming.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div ref={whyPoint1Ref} className={`transition-all duration-700 ${whyPoint1IsVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'}`}>
                                <Card className="p-8 h-full bg-brand-surface/50">
                                    <BanknotesIcon className="h-10 w-10 text-brand-secondary mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Promote Financial Freedom</h3>
                                    <p className="text-brand-text-secondary">We do it because traditional banking is changing, and crypto gives people control over their own financial future.</p>
                                </Card>
                            </div>
                             <div ref={whyPoint2Ref} className={`transition-all duration-700 delay-200 ${whyPoint2IsVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'}`}>
                                <Card className="p-8 h-full bg-brand-surface/50">
                                    <ShieldCheckIcon className="h-10 w-10 text-brand-secondary mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Remove Fear & Barriers</h3>
                                    <p className="text-brand-text-secondary">We do it because beginners often get stuck at their first wallet or exchange account—and we want to remove that fear.</p>
                                </Card>
                            </div>
                             <div ref={whyPoint3Ref} className={`transition-all duration-700 ${whyPoint3IsVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'}`}>
                                 <Card className="p-8 h-full bg-brand-surface/50">
                                    <LightBulbIcon className="h-10 w-10 text-brand-secondary mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Empower Through Understanding</h3>
                                    <p className="text-brand-text-secondary">We do it because tailored education ensures you don’t just follow instructions, but truly understand how to manage and grow your digital assets.</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* How Coaching Works */}
                <section ref={howItWorksRef} className={`py-16 md:py-24 bg-brand-surface transition-opacity duration-1000 ${howItWorksIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                     <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">How Coaching Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div ref={howCard1Ref} className={`transition-all duration-500 ${howCard1IsVisible ? 'animate-pop-in' : 'opacity-0'}`}>
                                <Card className="p-8 h-full bg-brand-bg/50 transition-all duration-300 hover:border-brand-primary border border-transparent hover:shadow-lg hover:shadow-brand-primary/20"><CreditCardIcon className="h-10 w-10 text-brand-primary mx-auto mb-4"/> <h3 className="text-xl font-bold text-white mb-2">Payment in Crypto</h3><p className="text-sm text-brand-text-secondary">All sessions are paid securely in cryptocurrency. We’ll guide you through the process if it’s your first time, making sure payments are simple and stress-free.</p></Card>
                            </div>
                            <div ref={howCard2Ref} className={`transition-all duration-500 delay-200 ${howCard2IsVisible ? 'animate-pop-in' : 'opacity-0'}`}>
                                <Card className="p-8 h-full bg-brand-bg/50 transition-all duration-300 hover:border-brand-primary border border-transparent hover:shadow-lg hover:shadow-brand-primary/20"><VideoCameraIcon className="h-10 w-10 text-brand-primary mx-auto mb-4"/> <h3 className="text-xl font-bold text-white mb-2">Session Recordings</h3><p className="text-sm text-brand-text-secondary">Every session is recorded so you can revisit the lessons anytime, ensuring you never miss a detail.</p></Card>
                            </div>
                             <div ref={howCard3Ref} className={`transition-all duration-500 delay-400 ${howCard3IsVisible ? 'animate-pop-in' : 'opacity-0'}`}>
                                <Card className="p-8 h-full bg-brand-bg/50 transition-all duration-300 hover:border-brand-primary border border-transparent hover:shadow-lg hover:shadow-brand-primary/20"><ChatBubbleBottomCenterTextIcon className="h-10 w-10 text-brand-primary mx-auto mb-4"/> <h3 className="text-xl font-bold text-white mb-2">Ongoing Support</h3><p className="text-sm text-brand-text-secondary">Our tailored coaching means you don’t have to “get it all right the first time.” If you’re not confident after a session, you’ll have continued access to your coach for questions and guidance.</p></Card>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Final CTA */}
                <section ref={finalCtaRef} className={`py-16 md:py-24 transition-opacity duration-1000 ${finalCtaIsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Your Crypto Journey Starts Here</h2>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                             <Button onClick={onOpenBookingModal} className="text-lg py-3 px-8 flex items-center gap-2 transition-transform duration-200 hover:scale-105 btn-glow-blue btn-blue-darken">
                                <PhoneIcon className="h-6 w-6"/>
                                Book a Call with a Coach
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
            <Footer 
                onStart={onStart}
                onNavigatePage={onNavigatePage}
                onOpenBookingModal={onOpenBookingModal}
            />
        </div>
    );
};

export default AboutPage;