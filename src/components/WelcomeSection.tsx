import React from 'react';
import { Shield, ShieldCheck, Zap, Users, Award, Eye, ClipboardCheck } from 'lucide-react';
import { Page } from '../types';

interface WelcomeSectionProps {
  onContactClick: (page: Page) => void;
}

export default function WelcomeSection({ onContactClick }: WelcomeSectionProps) {
  const stats = [
    { value: '15+', label: 'Years of Excellence', icon: <Award className="w-5 h-5 text-brand-lime" /> },
    { value: '1,200+', label: 'Active Guard Force', icon: <Users className="w-5 h-5 text-brand-lime" /> },
    { value: '150+', label: 'Corporate Partners', icon: <ShieldCheck className="w-5 h-5 text-brand-lime" /> },
    { value: '24/7', label: 'Surveillance & Support', icon: <Eye className="w-5 h-5 text-brand-lime" /> },
  ];

  const features = [
    {
      title: '100% Vetted Personnel',
      description: 'Every security officer goes through rigorous fingerprinting, police history tracking, and direct guarantor vetting.',
      icon: <ClipboardCheck className="w-6 h-6 text-brand-lime" />,
    },
    {
      title: 'Tactical Defensive Drills',
      description: 'Routine physical training in combat containment, fire safety, crisis evacuation, and professional customer relations.',
      icon: <Shield className="w-6 h-6 text-brand-lime" />,
    },
    {
      title: 'Rapid Response Patrols',
      description: 'Armed mobile security squads standby 24/7, ready to coordinate with local law enforcement and secure your assets.',
      icon: <Zap className="w-6 h-6 text-brand-lime" />,
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-gray-100" id="welcome-section">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Main Header / Intro text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-brand-lime font-display font-extrabold text-sm uppercase tracking-widest block mb-2">
              Welcome to Anti-Risk Security
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight leading-tight mb-6">
              Providing Superior Security & Safety Solutions Across Nigeria
            </h2>
            <div className="space-y-4 font-sans text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Anti-Risk Security and Safety Services Provider is a premier, fully licensed private security firm built on 
                <strong> integrity, extreme vigilance, and uncompromised safety</strong>. We specialize in physical manned guarding, 
                VIP transit protection, event security, and high-tech electronic surveillance to defend your most valuable investments.
              </p>
              <p>
                Our philosophy is simple: we insist on the best. This means utilizing highly disciplined security officers, 
                rigorous administrative vetting, and smart patrol tracking systems. Whether securing corporate skyscrapers, 
                residential estates, industrial maritime yards, or high-profile individuals, our teams are fully prepared 
                to deter, detect, and neutralize threats.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => onContactClick('contact')}
                className="bg-brand-navy text-white hover:bg-brand-lime hover:text-white px-6 py-3 rounded-sm font-display font-bold text-sm tracking-wide transition-all duration-300 shadow-md cursor-pointer"
              >
                Request a Guard Today
              </button>
              <button
                onClick={() => onContactClick('services')}
                className="bg-white border border-gray-300 text-gray-700 hover:text-brand-lime hover:border-brand-lime px-6 py-3 rounded-sm font-display font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* Image box representing real company photos */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="relative overflow-hidden rounded-sm border border-gray-200 shadow-xl group">
              <img
                src="/src/assets/images/security_guards_parade_1786474226648.jpg"
                alt="Anti-Risk Security Parade and HQ Flag"
                className="w-full h-[240px] md:h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-gray-100 p-3 rounded-sm shadow-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-lime flex items-center justify-center text-white flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-brand-navy uppercase tracking-wide">Official Anti-Risk HQ</h4>
                    <p className="text-[10px] font-sans text-gray-500">Parade Ground & Flag Stand Inspection</p>
                  </div>
                </div>
                <span className="bg-brand-navy text-white text-[9px] font-mono px-2 py-0.5 rounded-xs font-semibold uppercase tracking-wider">Verified</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-sm border border-gray-200 shadow-xl group">
              <img
                src="/src/assets/images/guards_lineup_hero_1786457870663.jpg"
                alt="Anti-Risk Security Guards Lineup in Uniform"
                className="w-full h-[200px] md:h-[220px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 bg-brand-navy/95 backdrop-blur-md border border-brand-navy p-3 rounded-sm shadow-lg flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded-full bg-brand-lime flex items-center justify-center text-white flex-shrink-0">
                  <Users className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white uppercase tracking-wide">Class-A Guard Force</h4>
                  <p className="text-[10px] font-sans text-gray-300">Operational Personnel & Sentinel Division</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Business Statistics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-gray-200/60 p-6 md:p-8 rounded-sm shadow-md mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 border-r last:border-r-0 border-gray-100 max-lg:odd:border-r-0">
              <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <span className="text-2xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight block mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-gray-500 font-sans tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div key={index} className="bg-white border border-gray-200/80 p-6 hover:shadow-lg transition-all duration-300 flex flex-col group">
              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-lime group-hover:bg-brand-lime group-hover:text-white transition-all duration-300 mb-4 shadow-xs">
                {feat.icon}
              </div>
              <h3 className="text-lg font-display font-bold text-brand-navy mb-2 group-hover:text-brand-lime transition-colors">
                {feat.title}
              </h3>
              <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
