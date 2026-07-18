import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';

const testimonialList: Testimonial[] = [
  {
    name: 'Engr. Wale Adeleke',
    company: 'Oakwood Heights Residents Association, Lekki',
    role: 'Facility Manager',
    content: 'We contracted Anti-Risk Security to manage the access control and perimeter patrols of our estate. Since they took over, the professionalism is outstanding. Supervisors perform random audits twice a night, and their patrol clock-in reports are delivered to us weekly.',
    rating: 5,
  },
  {
    name: 'Mrs. Chinyere Okafor',
    company: 'Prime Global Logistics Ltd, Port Harcourt',
    role: 'Head of Human Resources & Assets',
    content: 'The VIP armed escort services provided by Anti-Risk are exceptional. Our expatriate engineers travel between offshore terminals and residential quarters in complete safety. Convoys are highly disciplined and communications with their control room are seamless.',
    rating: 5,
  },
  {
    name: 'Alhaji Yusuf Ibrahim',
    company: 'Crown Plaza Corporate Towers, Victoria Island',
    role: 'Managing Director',
    content: 'Manned guarding for a busy corporate tower requires highly polished officers who understand customer service as well as security. Anti-Risk guards are extremely professional, always elegant, and completely vigilant with biometric access checks.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonialList.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonialList.length) % testimonialList.length);
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-b border-gray-100" id="testimonials-section">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight mt-1 mb-4">
            Trusted by Leaders & Gated Communities
          </h2>
          <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
            Read stories of how our physical guard forces, 24/7 supervisor checkups, and smart surveillance programs defend homes and multinational corporations.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="max-w-4xl mx-auto relative bg-white border border-gray-100 shadow-xl p-8 md:p-12 rounded-lg" id="testimonial-slider-box">
          <div className="absolute top-6 left-6 text-brand-lime/15">
            <Quote className="w-16 h-16 stroke-[1.5]" />
          </div>

          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-6 text-amber-400">
              {Array.from({ length: testimonialList[activeIdx].rating }).map((_, idx) => (
                <Star key={idx} className="w-5 h-5 fill-amber-400 stroke-none" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-gray-700 font-sans text-sm md:text-lg italic leading-relaxed mb-8 max-w-2xl">
              "{testimonialList[activeIdx].content}"
            </p>

            {/* Client Bio */}
            <div>
              <h4 className="font-display font-extrabold text-brand-navy text-base md:text-lg leading-tight mb-0.5">
                {testimonialList[activeIdx].name}
              </h4>
              <p className="font-sans text-xs font-semibold text-brand-lime uppercase tracking-wider mb-0.5">
                {testimonialList[activeIdx].role}
              </p>
              <p className="font-sans text-[10px] text-gray-400 font-medium">
                {testimonialList[activeIdx].company}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-brand-lime hover:bg-slate-50 flex items-center justify-center text-gray-500 hover:text-brand-lime transition-all cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-gray-400">
              {activeIdx + 1} / {testimonialList.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-brand-lime hover:bg-slate-50 flex items-center justify-center text-gray-500 hover:text-brand-lime transition-all cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
