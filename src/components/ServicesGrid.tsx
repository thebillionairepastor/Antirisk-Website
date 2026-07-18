import React, { useState } from 'react';
import { Shield, ShieldAlert, Video, Calendar, Anchor, GraduationCap, CheckCircle, ArrowRight, X, Phone, Dog, Key, ClipboardCheck, ArrowUpRight } from 'lucide-react';
import { Page } from '../types';
import { servicesData, ExtendedSecurityService } from '../data/servicesData';

interface ServicesGridProps {
  onServiceSelect?: (serviceTitle: string) => void;
  onContactClick: (page: Page) => void;
}

export default function ServicesGrid({ onServiceSelect, onContactClick }: ServicesGridProps) {
  const [activeModal, setActiveModal] = useState<ExtendedSecurityService | null>(null);

  const getIconComponent = (iconName: string) => {
    const classes = "w-8 h-8 text-inherit";
    switch (iconName) {
      case 'shield':
        return <Shield className={classes} />;
      case 'escort':
        return <ShieldAlert className={classes} />;
      case 'cctv':
        return <Video className={classes} />;
      case 'dog':
        return <Dog className={classes} />;
      case 'key':
        return <Key className={classes} />;
      case 'graduation-cap':
        return <GraduationCap className={classes} />;
      case 'clipboard-check':
        return <ClipboardCheck className={classes} />;
      case 'anchor':
        return <Anchor className={classes} />;
      default:
        return <Shield className={classes} />;
    }
  };

  const handleBookService = (serviceTitle: string) => {
    if (onServiceSelect) {
      onServiceSelect(serviceTitle);
    }
    setActiveModal(null);
    onContactClick('contact');
  };

  const handleGoToDetailedPage = (pageKey: Page) => {
    setActiveModal(null);
    onContactClick(pageKey);
  };

  return (
    <section className="py-16 bg-white animate-fade-in" id="services-grid-section">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-lime font-display font-bold text-sm uppercase tracking-wider">
            Premium Offerings
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight mt-1 mb-4">
            Our Core Security & Safety Services
          </h2>
          <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
            From certified general duty sentinels to armed convoys, advanced AI-surveillance, and tactical K-9 squads, we deliver robust protective umbrella setups. Click any card to explore full features.
          </p>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveModal(service)}
              className="bg-slate-50 border border-gray-100 hover:border-brand-lime hover:bg-white p-6 rounded-sm shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Image Preview */}
                <div className="w-full h-36 rounded-sm overflow-hidden mb-5 bg-slate-100 relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-brand-lime shadow-sm group-hover:bg-brand-lime group-hover:text-white transition-colors duration-300">
                    {getIconComponent(service.icon)}
                  </div>
                </div>

                <h3 className="text-base font-display font-extrabold text-brand-navy mb-2 group-hover:text-brand-lime transition-colors leading-snug line-clamp-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 font-sans text-xs leading-relaxed mb-6 line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              {/* Read details trigger line */}
              <div className="flex items-center gap-1 text-brand-navy font-display font-bold text-[11px] uppercase tracking-wider group-hover:text-brand-lime transition-colors">
                <span>Explore Features</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE DETAIL MODAL */}
        {activeModal && (
          <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in" id="service-modal" onClick={() => setActiveModal(null)}>
            <div className="bg-white rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scale-up border border-gray-100 flex flex-col" onClick={(e) => e.stopPropagation()}>
              
              {/* Close Button */}
              <button
                id="close-service-modal"
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Banner Area with Image */}
              <div className="h-48 relative overflow-hidden flex items-end">
                <img 
                  src={activeModal.image} 
                  alt={activeModal.title} 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                <div className="relative p-6 text-white flex items-center gap-4 w-full">
                  <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-md flex items-center justify-center text-brand-lime flex-shrink-0 border border-white/20">
                    {getIconComponent(activeModal.icon)}
                  </div>
                  <div>
                    <span className="text-brand-lime font-display font-bold text-[10px] uppercase tracking-widest block">
                      Sentinel Operations
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight mt-0.5 leading-tight">
                      {activeModal.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">
                <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed">
                  {activeModal.longDescription}
                </p>

                <div>
                  <h4 className="text-xs font-display font-extrabold text-brand-navy uppercase tracking-wider mb-3">
                    Premium Capabilities Included:
                  </h4>
                  {/* Features Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {activeModal.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-lime flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="text-gray-700 font-sans text-xs">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => handleGoToDetailedPage(activeModal.pageKey)}
                    className="w-full sm:w-auto bg-brand-lime text-white hover:bg-brand-navy hover:text-white px-5 py-2.5 rounded-sm font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <span>View Dedicated Page</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleBookService(activeModal.title)}
                    className="w-full sm:w-auto border border-brand-navy hover:bg-brand-navy hover:text-white px-5 py-2.5 rounded-sm font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 text-center text-brand-navy"
                  >
                    Request Callback
                  </button>
                  <a
                    href="tel:+2348057315673"
                    className="w-full sm:w-auto border border-gray-200 hover:bg-slate-50 px-5 py-2.5 rounded-sm font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 text-center text-gray-700 flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-lime" />
                    <span>Call Helpline</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
