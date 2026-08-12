import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import WelcomeSection from './components/WelcomeSection';
import ServicesGrid from './components/ServicesGrid';
import InteractiveQuote from './components/InteractiveQuote';
import Testimonials from './components/Testimonials';
import Leadership from './components/Leadership';
import ContactForm from './components/ContactForm';
import TrainingAcademy from './components/TrainingAcademy';
import CareersSection from './components/CareersSection';
import Footer from './components/Footer';
import { ShieldAlert, BookOpen, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { servicesData } from './data/servicesData';
import ServiceDetailPage from './components/ServiceDetailPage';
import { careersData } from './data/careersData';
import CareerDetailPage from './components/CareerDetailPage';
import TrustedPartners from './components/TrustedPartners';
import SecurityBriefings from './components/SecurityBriefings';
import LiveChat from './components/LiveChat';
import RegionalHubs from './components/RegionalHubs';
import SecurityTipsToast from './components/SecurityTipsToast';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedService, setSelectedService] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.pageYOffset / totalScroll) * 100;
        setScrollProgress(currentProgress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleLearnMore = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // REUSABLE PAGE BREADCRUMB HEADER BANNER
  const PageHeaderBanner = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="relative w-full bg-brand-navy py-12 md:py-16 text-white overflow-hidden border-b-4 border-brand-lime" id="page-banner">
      {/* Abstract Grid background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute -bottom-10 right-10 w-48 h-48 bg-brand-lime/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 font-display text-xs font-bold text-brand-lime uppercase tracking-widest mb-2">
            <span className="cursor-pointer hover:underline" onClick={() => handleLearnMore('home')}>Home</span>
            <span>/</span>
            <span className="text-gray-300">{title}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
            {title}
          </h2>
        </div>
        <p className="text-xs md:text-sm text-gray-400 font-sans max-w-md md:text-right leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-800 font-sans selection:bg-brand-lime selection:text-brand-navy" id="app-container">
      
      {/* Slim Lime-Colored Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-brand-lime z-[99999] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      {/* Floating Success Alert Toast */}
      {successNotification && (
        <div className="fixed bottom-6 right-6 max-w-md bg-slate-900 border-l-4 border-brand-lime text-white p-5 rounded-sm shadow-2xl z-[99999] animate-slide-in-right flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-brand-lime text-slate-900 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</div>
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-wider text-brand-lime mb-1">Secured Notice</p>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">{successNotification}</p>
          </div>
          <button onClick={() => setSuccessNotification(null)} className="text-gray-400 hover:text-white cursor-pointer ml-auto font-bold text-xs">✕</button>
        </div>
      )}

      {/* SITE HEADER & TOP DIRECTORY */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSearch={handleSearch}
      />

      {/* RENDER DYNAMIC PAGES */}
      <main className="flex-grow">
        
        {/* A. HOME VIEW */}
        {currentPage === 'home' && (
          <div id="home-view" className="animate-fade-in">
            {/* 1. Carousel Slider */}
            <HeroSlider onLearnMore={handleLearnMore} />

            {/* 2. Welcome Intro Section */}
            <WelcomeSection onContactClick={handleLearnMore} />

            {/* 3. Interactive Quote / Risk tool */}
            <InteractiveQuote />

            {/* 4. Core Services summary list */}
            <ServicesGrid onServiceSelect={handleServiceSelect} onContactClick={handleLearnMore} />

            {/* 4.5 Trusted Partners scrolling marquee */}
            <TrustedPartners />

            {/* 4.8 Security Briefings using Gemini search grounding */}
            <SecurityBriefings />

            {/* 5. Client Testimonials */}
            <Testimonials />

            {/* 5.5 Interactive Regional Hubs */}
            <RegionalHubs />

            {/* 6. FAQ/Trust section */}
            <section className="py-16 bg-slate-900 text-white border-t border-white/5" id="trust-faqs">
              <div className="w-full max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest block">
                      Rapid Deployment
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                      Why Corporate Estates Insist on Anti-Risk Guards
                    </h3>
                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                      We understand that an estate or complex does not just need physical bodies at the gate—they need alert, highly respectful, and rigorously responsive officers who represent the estate's high standing.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-lime/10 text-brand-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="font-bold text-xs font-mono">24h</span>
                        </div>
                        <p className="text-xs text-gray-400 font-sans">
                          <strong>Active Command Center Monitoring:</strong> Instant direct emergency coordinates with state mobile security police escorts.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-lime/10 text-brand-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="font-bold text-xs font-mono">100</span>
                        </div>
                        <p className="text-xs text-gray-400 font-sans">
                          <strong>100% Vetted Indemnity Protection:</strong> Strict legal guarantees matching each deployed officer's files and background codes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white text-gray-800 p-6 md:p-8 rounded-md border border-gray-150 shadow-2xl space-y-4">
                    <h4 className="font-display font-extrabold text-brand-navy text-lg border-b pb-3 mb-2 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-brand-lime stroke-[2.5]" />
                      <span>Security Guard FAQs</span>
                    </h4>

                    <div className="space-y-4 text-xs md:text-sm" id="faq-accordions">
                      <div>
                        <h5 className="font-display font-bold text-brand-navy mb-1">How are guards monitored during night shift?</h5>
                        <p className="text-gray-500 font-sans leading-normal">
                          We mount RFID patrol logging tags around your site's perimeter. Guards must physically tap their tracking clocks hourly, which uploads real-time telemetry logs directly to our HQ.
                        </p>
                      </div>
                      <div className="border-t border-gray-100 my-3"></div>
                      <div>
                        <h5 className="font-display font-bold text-brand-navy mb-1">What happens in case of a distress signal?</h5>
                        <p className="text-gray-500 font-sans leading-normal">
                          Our personnel deploy panic transmitters. Triggering this sends instant site coordinate signals to our nearest armed quick-response supervisor squad, who arrives within minutes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* B. ABOUT US VIEW */}
        {currentPage === 'about' && (
          <div id="about-view" className="animate-fade-in">
            <PageHeaderBanner
              title="About Anti-Risk"
              subtitle="Nigeria's premier private protection sentinel, built on integrity, tactical recruitment vetting, and immediate emergency coordination."
            />
            <Leadership />
          </div>
        )}

        {/* C. SERVICES VIEW */}
        {currentPage === 'services' && (
          <div id="services-view" className="animate-fade-in">
            <PageHeaderBanner
              title="Our Services"
              subtitle="Uniformed guarding forces, executive armed escorts, biometric access controls, marine defensive vessel support, and corporate vulnerability consulting."
            />

            {/* Search filter overlay */}
            {searchQuery && (
              <div className="bg-slate-50 border-b border-gray-200 py-6" id="search-filter-banner">
                <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-brand-lime" />
                    <span className="font-sans text-xs md:text-sm text-gray-600">
                      Showing results matching: <strong className="text-brand-navy">"{searchQuery}"</strong>
                    </span>
                  </div>
                  <button
                    onClick={clearSearch}
                    className="text-xs font-display font-bold text-brand-navy hover:text-brand-lime transition-all cursor-pointer border border-gray-300 rounded-sm px-3 py-1.5 bg-white shadow-xs hover:border-brand-lime"
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            )}

            <ServicesGrid onServiceSelect={handleServiceSelect} onContactClick={handleLearnMore} />
            <InteractiveQuote />
          </div>
        )}

        {/* D. CONTACT US VIEW */}
        {currentPage === 'contact' && (
          <div id="contact-view" className="animate-fade-in">
            <PageHeaderBanner
              title="Contact Us"
              subtitle="Book a protective service, order tactical guard details, or query our regional command stations across Port Harcourt, Calabar, Oyo, and Abia."
            />
            <ContactForm initialService={selectedService} />
          </div>
        )}

        {/* E. GUARD TRAINING VIEW */}
        {currentPage === 'training' && (
          <div id="training-view" className="animate-fade-in">
            <PageHeaderBanner
              title="Guard Training Academy"
              subtitle="Our elite physical camp and rigorous cognitive vetting where recruits are trained in unarmed combat, courtesy, and crisis management."
            />
            <TrainingAcademy />
          </div>
        )}

        {/* F. CAREERS VIEW */}
        {currentPage === 'careers' && (
          <div id="careers-view" className="animate-fade-in">
            <PageHeaderBanner
              title="Careers & Recruitment"
              subtitle="View physical entry benchmarks and submit your official guard profile to join Anti-Risk's premier protection team."
            />
            <CareersSection onSelectPosition={handleLearnMore} />
          </div>
        )}

        {/* Dynamic Service Detail Pages */}
        {currentPage.startsWith('service_') && (() => {
          const matchingService = servicesData.find(s => s.pageKey === currentPage);
          if (matchingService) {
            return (
              <ServiceDetailPage
                service={matchingService}
                onBackToServices={() => handleLearnMore('services')}
                onSuccessSubmit={(msg) => {
                  setSuccessNotification(msg);
                  setTimeout(() => setSuccessNotification(null), 6000);
                  handleLearnMore('services');
                }}
              />
            );
          }
          return null;
        })()}

        {/* Dynamic Career Detail Pages */}
        {currentPage.startsWith('career_') && (() => {
          const matchingCareer = careersData.find(c => c.pageKey === currentPage);
          if (matchingCareer) {
            return (
              <CareerDetailPage
                position={matchingCareer}
                onBackToCareers={() => handleLearnMore('careers')}
                onSuccessSubmit={(msg) => {
                  setSuccessNotification(msg);
                  setTimeout(() => setSuccessNotification(null), 6000);
                  handleLearnMore('careers');
                }}
              />
            );
          }
          return null;
        })()}

      </main>

      {/* FOOTER & SOCIAL REFERENCES */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* FLOATING LIVE CHAT SUPPORT DESK */}
      <LiveChat setCurrentPage={setCurrentPage} />

      {/* PERIODIC DAILY SECURITY TIPS TOAST */}
      <SecurityTipsToast />

    </div>
  );
}
