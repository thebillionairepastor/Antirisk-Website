import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, ShieldCheck, Cpu, ArrowRight, Phone, MessageSquare, Mail, MapPin } from 'lucide-react';
import { Page } from '../types';
import { ExtendedSecurityService } from '../data/servicesData';

interface ServiceDetailPageProps {
  service: ExtendedSecurityService;
  onBackToServices: () => void;
  onSuccessSubmit: (msg: string) => void;
}

export default function ServiceDetailPage({ service, onBackToServices, onSuccessSubmit }: ServiceDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    message: `Hello Anti-Risk team, I am interested in requesting your specialized "${service.title}" services. Please get in touch with me as soon as possible.`
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSuccessSubmit(`Thank you! Your inquiry for ${service.title} has been received. Our operations team will call you within 15 minutes.`);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        message: `Hello Anti-Risk team, I am interested in requesting your specialized "${service.title}" services. Please get in touch with me as soon as possible.`
      });
    }, 1200);
  };

  return (
    <section className="bg-white min-h-screen animate-fade-in" id="service-detail-view-container">
      
      {/* Dynamic 4K Hero Banner */}
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden flex items-end">
        <img 
          src={service.gallery && service.gallery[activeImageIndex] ? service.gallery[activeImageIndex] : service.image} 
          alt={service.title} 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transform scale-102 hover:scale-100 transition-all duration-[2000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/10"></div>
        
        {/* Gallery Switcher if available */}
        {service.gallery && service.gallery.length > 1 && (
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md p-2 rounded-sm border border-white/20">
            <span className="text-[10px] font-display font-bold text-white uppercase tracking-wider px-1">
              Real Company Photos:
            </span>
            {service.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`px-2.5 py-1 rounded-xs text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  activeImageIndex === idx 
                    ? 'bg-brand-lime text-white shadow-sm' 
                    : 'bg-white/20 text-white hover:bg-white/40'
                }`}
              >
                Photo {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Banner content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 pb-12 z-10 text-white space-y-4">
          <button
            onClick={onBackToServices}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-brand-lime hover:text-white backdrop-blur-md border border-white/10 rounded-sm font-display font-bold text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </button>

          <div className="space-y-2">
            <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Anti-Risk Protective Service Division</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-tight max-w-3xl">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Core Split Body Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Extensive Details */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Extended Biography */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-brand-navy border-b border-gray-100 pb-3">
                Operations & Deployment Overview
              </h2>
              <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed whitespace-pre-line">
                {service.longBio}
              </p>
              <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed">
                Our deployments align with standards set by the Nigerian Security and Civil Defence Corps (NSCDC) and global risk containment frameworks. When you engage our {service.title} teams, our intelligence team conducts an initial, free-of-charge site hazard map audit before static guards or electronic layouts are commissioned.
              </p>
            </div>

            {/* Core Capability Checklist */}
            <div className="bg-slate-50 border border-gray-100 p-8 rounded-sm space-y-5 shadow-xs">
              <h3 className="text-base font-display font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-lime" />
                <span>Division Service Capabilities</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-brand-lime mt-0.5 flex-shrink-0 stroke-[2.5]" />
                    <span className="text-gray-700 font-sans text-xs md:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Technology Stack Deployed */}
            <div className="space-y-4">
              <h3 className="text-lg font-display font-extrabold text-brand-navy flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-lime" />
                <span>Advanced Security Equipment & Tech Stack</span>
              </h3>
              <p className="text-gray-500 font-sans text-xs md:text-sm">
                To stay ahead of threat actors, our physical operations are reinforced by specialized tactical hardware and secure network layers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.technologyUsed.map((tech, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-gray-100 rounded-sm hover:border-brand-lime transition-all duration-300">
                    <span className="text-brand-navy font-display font-bold text-xs uppercase tracking-wider block mb-1">
                      {tech}
                    </span>
                    <span className="text-gray-400 font-sans text-[10px]">
                      Fully maintained, enterprise vetted, and actively deployed.
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Callback & Threat Assessment request card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-md p-8 md:p-10 shadow-xl space-y-6 relative border border-white/5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-lime/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-2 relative z-10">
              <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest block">
                Rapid Intake
              </span>
              <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight">
                Request Service & Quote
              </h3>
              <p className="text-gray-400 font-sans text-xs leading-relaxed">
                Submit the form below, and our duty superintendent will reach out to schedule your deployment setup or physical facility walkthrough.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10" id="service-callback-form">
              <div>
                <label className="block font-display font-semibold text-[10px] uppercase tracking-wider text-gray-300 mb-1.5">
                  Full Name / Organisation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="e.g. Alhaji Ibrahim / Zenith Logistics"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-lime transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display font-semibold text-[10px] uppercase tracking-wider text-gray-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="e.g. +234 805..."
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-lime transition-all"
                  />
                </div>
                <div>
                  <label className="block font-display font-semibold text-[10px] uppercase tracking-wider text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="e.g. client@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-lime transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-display font-semibold text-[10px] uppercase tracking-wider text-gray-300 mb-1.5">
                  Primary Site Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Ikeja, Lagos / Port Harcourt"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-lime transition-all"
                />
              </div>

              <div>
                <label className="block font-display font-semibold text-[10px] uppercase tracking-wider text-gray-300 mb-1.5">
                  Requirement Specifications
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-lime transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-brand-lime hover:bg-brand-lime-hover text-white font-display font-extrabold text-xs uppercase tracking-wider rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {submitting ? (
                  <span>Securing Transmission...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-white/10 pt-6 mt-4 text-xs space-y-3 font-sans text-gray-300 relative z-10">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-lime flex-shrink-0" />
                <a href="tel:+2348057315673" className="hover:text-brand-lime transition-colors">
                  +234 805 731 5673
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-lime flex-shrink-0" />
                <a href="mailto:info@antiriskng.com" className="hover:text-brand-lime transition-colors">
                  info@antiriskng.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-lime flex-shrink-0" />
                <span>Corporate HQ: 19, Sinari Daranijo Street, Victoria Island, Lagos, Nigeria.</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
