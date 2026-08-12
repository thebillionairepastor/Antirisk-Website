import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Slide, Page } from '../types';

interface HeroSliderProps {
  onLearnMore: (page: Page) => void;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/src/assets/images/security_guards_parade_1786474226648.jpg', // Official Anti-Risk Security parade with flag & vehicles
    tagline: 'We insist on',
    titlePrefix: 'The best of ',
    titleHighlighted: 'the best',
    description: 'Only the best hands and brains in the industry with years of rigorous protection experience.',
  },
  {
    id: 2,
    image: '/src/assets/images/guards_lineup_hero_1786457870663.jpg', // Official Anti-Risk squad lineup at Operational HQ
    tagline: 'Manned Security Force',
    titlePrefix: 'Disciplined ',
    titleHighlighted: 'Security Officers',
    description: '100% police-vetted, impeccably uniformed sentinels safeguarding high-value corporate & industrial sites.',
  },
  {
    id: 3,
    image: '/src/assets/images/vip_security_escort_1784299328559.jpg', // secure professionals in dark suits
    tagline: 'VIP Close Protection',
    titlePrefix: 'Elite Armed ',
    titleHighlighted: 'Escort services',
    description: 'Secure logistical transit, defensive convoys, and highly trained executive bodyguards.',
  },
  {
    id: 4,
    image: '/src/assets/images/smart_surveillance_center_1784299347627.jpg', // surveillance cctv monitoring screens
    tagline: 'Smart Surveillance',
    titlePrefix: 'Integrated Tech ',
    titleHighlighted: 'Solutions',
    description: 'Advanced AI CCTV monitoring, biometric access control, and 24/7 central control rooms.',
  },
  {
    id: 5,
    image: '/src/assets/images/k9_unit_patrol_1784299580956.jpg', // K9 patrol unit
    tagline: 'K9 Guard Dog Force',
    titlePrefix: 'Elite Canine ',
    titleHighlighted: 'Patrol unit',
    description: 'Highly trained security dogs and expert handlers for residential, corporate, and event protection.',
  },
];

export default function HeroSlider({ onLearnMore }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[320px] md:h-[500px] lg:h-[600px] bg-slate-900 overflow-hidden" id="hero-slider">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Slide Image */}
          <img
            src={slides[currentIndex].image}
            alt="Anti-Risk Security Personnel"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient darken overlay for high-contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20 md:from-black/75 md:to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Content & Interface Elements */}
      <div className="absolute inset-0 w-full h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between pointer-events-none">
          
          {/* LEFT CHEVRON NAVIGATION (Exactly like the red circle arrow on the left) */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-lime text-white hover:bg-brand-navy hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer shadow-md"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* CENTRAL CONTENT CARD (Overlaid) */}
          <div className="flex-1 max-w-xl md:max-w-2xl px-4 md:px-12 pointer-events-auto">
            {/* Tagline Container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-3 bg-brand-navy border-r-4 border-brand-lime px-4 py-1.5 shadow-lg"
            >
              <span className="text-white font-sans text-xs md:text-sm font-semibold tracking-wider uppercase">
                {slides[currentIndex].tagline}
              </span>
            </motion.div>

            {/* Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight mb-4"
            >
              {slides[currentIndex].titlePrefix}
              <span className="text-brand-lime">
                {slides[currentIndex].titleHighlighted}
              </span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-xs md:text-lg text-gray-200 font-sans tracking-wide font-normal max-w-lg mb-6 leading-relaxed shadow-sm drop-shadow-sm"
            >
              {slides[currentIndex].description}
            </motion.p>

            {/* Interactive Call to Action button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <button
                onClick={() => onLearnMore('about')}
                className="group inline-flex items-center gap-4 bg-brand-lime text-white hover:bg-brand-navy hover:text-white px-5 py-2.5 md:px-6 md:py-3.5 font-display font-bold text-xs md:text-sm tracking-wide uppercase transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-0.5"
                id="cta-learn-more"
              >
                <span>Get to know us</span>
                <span className="w-6 h-6 md:w-7 md:h-7 bg-white text-brand-lime rounded-full flex items-center justify-center group-hover:bg-brand-lime group-hover:text-white transition-colors duration-300">
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT CHEVRON NAVIGATION */}
          <button
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-lime text-white hover:bg-brand-navy hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer shadow-md"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-brand-lime' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
