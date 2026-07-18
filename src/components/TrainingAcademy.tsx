import React from 'react';
import { BookOpen, GraduationCap, ShieldAlert, Award, UserCheck, Flame, HeartHandshake, Eye } from 'lucide-react';

const academyModules = [
  {
    title: 'Physical Tactics & Unarmed Combat',
    description: 'Recruits undergo intensive drills in combat containment, defensive blocking, restraint maneuvers, and suspect apprehension without excessive force.',
    duration: 'Week 1 - Intensive Drill',
    icon: <ShieldAlert className="w-6 h-6 text-brand-lime" />,
  },
  {
    title: 'Disaster Containment & Fire Marshalling',
    description: 'Comprehensive training in emergency building evacuations, hazardous gas alerts, handling structural fire equipment, and rapid perimeter isolation.',
    duration: 'Week 2 - Practical Simulations',
    icon: <Flame className="w-6 h-6 text-brand-lime" />,
  },
  {
    title: 'Corporate Courtesy & Front-Desk Conduct',
    description: 'We emphasize that guards are the first face of your company. Recruits study public speaking, dispute de-escalation, visitor cataloging, and professional etiquette.',
    duration: 'Ongoing Professional Seminar',
    icon: <HeartHandshake className="w-6 h-6 text-brand-lime" />,
  },
  {
    title: 'Surveillance systems & Incident Logging',
    description: 'Training on active walkie-talkie communication, perimeter logging, surveillance camera feeds coordination, and writing detailed, objective incident reports.',
    duration: 'Week 3 - Command Integration',
    icon: <Eye className="w-6 h-6 text-brand-lime" />,
  },
];

export default function TrainingAcademy() {
  return (
    <section className="py-16 bg-white animate-fade-in" id="training-academy-view">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-brand-lime font-display font-bold text-sm uppercase tracking-widest block">
              Professional Development
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight leading-tight">
              Anti-Risk Academy: Shaping Vetted Recruits Into Premium Officers
            </h2>
            <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed">
              We do not hire raw security guards; we forge them. The Anti-Risk Security Training Academy is a licensed, high-standard boot camp where candidates undergo grueling physical and intellectual vetting before deployment.
            </p>
            <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed">
              Led by retired officers from the Nigerian Armed Forces and Security Services, our program guarantees that any officer on your site is disciplined, sharp, exceptionally courteous, and structurally prepared for any emergency threat.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-lime/10 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-display font-bold text-white mb-6 border-b border-white/10 pb-3 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-lime" />
              <span>Academy Stats</span>
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-3xl font-display font-black text-brand-lime block">14 Days</span>
                <span className="text-xs text-gray-400 uppercase font-sans tracking-wide">Intensive Camp Drill</span>
              </div>
              <div>
                <span className="text-3xl font-display font-black text-brand-lime block">100%</span>
                <span className="text-xs text-gray-400 uppercase font-sans tracking-wide">NSCDC Compliant</span>
              </div>
              <div>
                <span className="text-3xl font-display font-black text-brand-lime block">92%</span>
                <span className="text-xs text-gray-400 uppercase font-sans tracking-wide">Strict Rejection Rate</span>
              </div>
              <div>
                <span className="text-3xl font-display font-black text-brand-lime block">2,400+</span>
                <span className="text-xs text-gray-400 uppercase font-sans tracking-wide">Graduated Officers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-brand-navy tracking-tight mb-2">
              Our Core Training Syllabus
            </h3>
            <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
              Every officer must pass strict exams and practical performance audits in these four primary quadrants before they can don the Anti-Risk badge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academyModules.map((mod, idx) => (
              <div key={idx} className="bg-slate-50 border border-gray-150 p-6 md:p-8 rounded-sm hover:shadow-lg transition-all duration-300 group flex gap-5 items-start">
                <div className="w-12 h-12 bg-white rounded-sm border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-lime group-hover:text-white transition-colors">
                  {mod.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-brand-lime uppercase tracking-widest font-bold block mb-1">
                    {mod.duration}
                  </span>
                  <h4 className="text-lg font-display font-bold text-brand-navy mb-2 group-hover:text-brand-lime transition-colors">
                    {mod.title}
                  </h4>
                  <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Standards Banner */}
        <div className="bg-slate-50 border border-gray-250 p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-lg font-display font-extrabold text-brand-navy flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-lime" />
              <span>Are You Interested in Sponsoring Corporate Guards?</span>
            </h4>
            <p className="text-xs md:text-sm text-gray-500 font-sans leading-relaxed">
              We provide tailored security training camps for local estate watches, corporate internal security coordinators, or transport fleets. Contact our command center to discuss physical syllabus plans.
            </p>
          </div>
          <a
            href="tel:+2348057315673"
            className="bg-brand-navy text-white hover:bg-brand-lime hover:text-white px-6 py-3 rounded-sm font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap shadow-md text-center"
          >
            Inquire Corporate Training
          </a>
        </div>

      </div>
    </section>
  );
}
