import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Clock, Facebook, Twitter, Linkedin, Send, ShieldCheck } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsEmail('');
    }
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-white/5 relative z-40" id="site-footer">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Brand details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="light" className="scale-95 origin-left cursor-pointer" onClick={() => handleNavClick('home')} />
            <p className="text-gray-400 font-sans text-xs md:text-sm leading-relaxed max-w-sm">
              Anti-Risk Security is Nigeria's most trusted class-A security firm. We deploy highly trained, police-vetted guard forces, tactical armed escorts, and state-of-the-art electronic surveillance to secure your world.
            </p>
            
            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-brand-lime hover:border-brand-lime hover:bg-white/10 flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-brand-lime hover:border-brand-lime hover:bg-white/10 flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-brand-lime hover:border-brand-lime hover:bg-white/10 flex items-center justify-center transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-brand-lime hover:border-brand-lime hover:bg-white/10 flex items-center justify-center cursor-pointer">
                <span className="text-[10px] font-bold font-sans">G+</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-brand-lime mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 font-sans text-xs md:text-sm text-gray-400">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Corporate Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Security Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('training')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Guard Training Academy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('careers')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Recruitment & Careers
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-brand-lime mb-6">
              Our Security Services
            </h4>
            <ul className="space-y-3 font-sans text-xs md:text-sm text-gray-400">
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Manned Guard Force
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  VIP Escort & Convoy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Electronic Alarm & CCTV
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Maritime Security Sea Protection
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Event Crowd Control
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-brand-lime transition-colors cursor-pointer text-left">
                  Vulnerability Audits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-sm font-display font-bold uppercase tracking-wider text-brand-lime mb-6">
                Vigilance Newsletter
              </h4>
              
              {newsletterSubscribed ? (
                <div className="bg-white/5 border border-brand-lime/20 p-3 rounded-sm flex items-center gap-2 text-xs text-brand-lime">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Subscribed to Safety Briefs!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsSubmit} className="flex bg-white/5 border border-white/10 rounded-sm overflow-hidden p-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none text-xs text-white placeholder-gray-500 px-3 py-2 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-brand-lime hover:bg-white text-white hover:text-brand-navy p-2 rounded-xs transition-all cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Coordinates */}
            <div className="space-y-3 font-sans text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-lime flex-shrink-0 mt-0.5" />
                <span>Plot 15, Alhaji Hussein Street, Ikeja, Lagos, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-brand-lime flex-shrink-0" />
                <a href="tel:+2348057315673" className="hover:text-brand-lime transition-all">+234 805 731 5673</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-lime flex-shrink-0" />
                <a href="mailto:info@antiriskng.com" className="hover:text-brand-lime transition-all">info@antiriskng.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-500 font-sans">
          <p>© 2026 Anti-Risk Security and Safety Services Provider. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-brand-lime transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-brand-lime transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-lime transition-colors cursor-pointer">Security Certifications</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
