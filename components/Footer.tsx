import React from 'react';
import { Page } from '../types';
import { TwitterIcon, YouTubeIcon, DiscordIcon, InstagramIcon, LinkedInIcon, TelegramIcon, WhatsappIcon } from './icons/Icons';

interface FooterProps {
  onStart: () => void;
  onNavigatePage: (page: Page) => void;
  onOpenBookingModal: () => void;
}

const socialLinks = [
  { href: "https://x.com/Ax07Crypto", label: "X/Twitter", Icon: TwitterIcon },
  { href: "https://www.youtube.com/@CryptoAX07", label: "YouTube", Icon: YouTubeIcon },
  { href: "https://linktr.ee/ax07", label: "Discord", Icon: DiscordIcon },
  { href: "https://www.instagram.com/cryptoax07/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.linkedin.com/company/cryptoax07", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://t.me/CryptoAx07", label: "Telegram", Icon: TelegramIcon },
  { href: "https://wa.me/qr/VW746BCARY44C1", label: "Whatsapp", Icon: WhatsappIcon },
];

const Footer: React.FC<FooterProps> = ({ onStart, onNavigatePage, onOpenBookingModal }) => {
  return (
    <footer className="py-12 bg-brand-surface border-t border-gray-700/50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side: Nav & Social Links */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-16">
          {/* Navigation Links */}
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
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold text-white mb-4">Follow Us</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-text-secondary hover:text-brand-primary transition-colors" aria-label={`Follow us on ${label}`}>
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Logo and Disclaimer */}
        <div className="flex flex-col items-center text-center">
          <a href="https://www.cryptoax07.com" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
            <img 
              src="https://static.wixstatic.com/media/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png/v1/fill/w_958,h_360,al_c,lg_1,q_85,enc_avif,quality_auto/4a78c1_0ce55f39403f46ccbe0ef5e7f6c799f3~mv2.png" 
              alt="CryptoAX07 Logo"
              className="h-28 w-auto"
            />
          </a>
          <div className="max-w-md">
              <p className="text-brand-text-secondary mb-4 text-sm">
              Join seasoned experts with over seven years of experience in the cryptocurrency and blockchain space and learn how take advantage of this technology that is revolutionizing the world.
              </p>
              <p className="text-xs text-gray-500">
              None of the content can be considered financial advice, it is intended for educational purposes only.
              </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;