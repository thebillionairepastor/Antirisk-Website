import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Mail, MapPin, Phone, HelpCircle, Briefcase, FileText } from 'lucide-react';
import { Page } from '../types';
import { careersData } from '../data/careersData';

const recruitmentRequirements = [
  'Must be a Nigerian citizen by birth, aged between 21 and 35 years.',
  'Minimum qualification of Senior Secondary School Certificate (SSCE/WAEC/NECO).',
  'Height requirements: Male (minimum 1.72m / 5ft 8in), Female (minimum 1.65m / 5ft 5in).',
  'Must supply two verifiable, high-standing guarantors who accept absolute legal & financial indemnity.',
  'Must have absolute zero criminal records, undergo police vetting, and pass biometric screening.',
  'Must be physically and medically fit with excellent cardiovascular stamina and mental stability.',
];

interface CareersSectionProps {
  onSelectPosition: (pageKey: Page) => void;
}

export default function CareersSection({ onSelectPosition }: CareersSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    qualification: 'SSCE',
    guarantorName: '',
    guarantorPhone: '',
    coverMessage: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 bg-white animate-fade-in" id="careers-recruitment-view">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Open Divisions Section */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest block mb-1">Specialized Roles</span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-brand-navy uppercase">Open Security Divisions</h3>
            <p className="text-gray-500 font-sans text-xs md:text-sm mt-2">
              Explore physical benchmarks, specific duties, and monthly payouts for each specialized security division at Anti-Risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careersData.map((position) => (
              <div 
                key={position.pageKey} 
                className="bg-slate-50 border border-gray-150 p-6 rounded-sm flex flex-col justify-between hover:border-brand-lime transition-all duration-300 shadow-xs relative overflow-hidden group"
              >
                <div className="space-y-3">
                  <span className="text-[9px] font-display font-bold tracking-wider text-brand-lime bg-brand-navy px-2 py-1 uppercase rounded-xs">
                    {position.department.replace(" Division", "")}
                  </span>
                  <h4 className="text-sm font-display font-extrabold text-brand-navy group-hover:text-brand-lime transition-colors mt-2 uppercase">
                    {position.title}
                  </h4>
                  <p className="text-gray-500 font-sans text-[11px] line-clamp-3 leading-relaxed">
                    {position.summary}
                  </p>
                  
                  <div className="pt-2 space-y-1 text-xs text-gray-500 font-sans border-t border-gray-200/50">
                    <p className="flex items-center gap-1">
                      <strong className="text-gray-700">Salary:</strong> {position.salary.split(' / ')[0]}
                    </p>
                    <p className="flex items-center gap-1">
                      <strong className="text-gray-700">Regions:</strong> {position.location.split(', ')[0]} etc.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPosition(position.pageKey)}
                  className="mt-6 w-full py-2.5 bg-brand-navy hover:bg-brand-lime hover:text-brand-navy text-white font-display font-bold text-[10px] uppercase tracking-wider rounded-sm transition-all duration-300 cursor-pointer text-center"
                >
                  Apply & View Vetting
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-gray-200 my-16" />

        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Qualifications / Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-brand-lime font-display font-bold text-sm uppercase tracking-widest block">
              Join Our Force
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight leading-tight">
              Start Your Security Career With Anti-Risk Nigeria
            </h2>
            <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed">
              Are you highly disciplined, physically fit, and eager to secure lives and investments across Nigeria? Anti-Risk Security is constantly scouting for exceptional men and women to join our class-A guard force.
            </p>
            <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed">
              We offer highly competitive salaries, routine health checks, advanced military training boot camps, rapid career growth pathways, and a professional working environment built on extreme honor and integrity.
            </p>

            {/* Requirement Checklist */}
            <div className="bg-slate-50 border border-gray-150 p-6 md:p-8 rounded-sm space-y-4">
              <h3 className="text-lg font-display font-extrabold text-brand-navy flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-lime" />
                <span>Strict Guard Entry Criteria</span>
              </h3>
              <ul className="space-y-3">
                {recruitmentRequirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs md:text-sm text-gray-600 font-sans">
                    <span className="w-5 h-5 rounded-full bg-brand-lime/10 text-brand-lime font-extrabold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form / Right Column */}
          <div className="lg:col-span-6">
            {submitted ? (
              <div className="bg-slate-50 border border-gray-150 p-8 rounded-sm text-center shadow-xl animate-scale-up" id="recruitment-success-panel">
                <div className="w-16 h-16 bg-brand-lime/10 text-brand-lime rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-brand-navy mb-2">
                  Application Logged Successfully!
                </h3>
                <p className="text-gray-500 font-sans text-xs md:text-sm mb-6 leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your physical details and qualifications have been dispatched to our Guard Command and Recruitment Panel. 
                </p>
                <div className="bg-white border border-gray-200 p-4 rounded-sm text-left text-xs text-gray-600 space-y-1 mb-6">
                  <p className="font-display font-bold text-xs text-brand-navy uppercase mb-1">Assessed Requirements:</p>
                  <p>• Profile Name: <strong>{formData.fullName}</strong></p>
                  <p>• Declared Height: <strong>{formData.height} m</strong></p>
                  <p>• Guarantor: <strong>{formData.guarantorName} ({formData.guarantorPhone})</strong></p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      age: '',
                      height: '',
                      qualification: 'SSCE',
                      guarantorName: '',
                      guarantorPhone: '',
                      coverMessage: '',
                    });
                  }}
                  className="bg-brand-navy hover:bg-brand-lime hover:text-white text-white px-6 py-3 rounded-sm font-display font-bold text-sm tracking-wide transition-all duration-300 w-full cursor-pointer shadow-md"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-sm shadow-xl border border-white/5 relative">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <Briefcase className="w-5 h-5 text-brand-lime" />
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
                    Guard Recruitment Form
                  </h3>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chukwudi Yusuf Bello"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Phone (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0805 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Age & Height */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Age (21-35)
                      </label>
                      <input
                        type="number"
                        required
                        min="21"
                        max="35"
                        placeholder="Age"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Height (meters)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1.75"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Qualification
                      </label>
                      <select
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full bg-slate-800 border border-white/15 focus:border-brand-lime rounded-sm px-4 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="SSCE">SSCE / WAEC / NECO</option>
                        <option value="OND">OND / NCE</option>
                        <option value="HND">HND / B.Sc</option>
                        <option value="ExServiceman">Ex-Serviceman</option>
                      </select>
                    </div>
                  </div>

                  {/* Guarantor Details */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-sm space-y-3">
                    <h4 className="text-xs font-display font-bold text-brand-lime uppercase tracking-wider">
                      Primary Guarantor Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Guarantor Full Name"
                        value={formData.guarantorName}
                        onChange={(e) => setFormData({ ...formData, guarantorName: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-3 py-2 text-xs text-white outline-none transition-colors"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Guarantor Phone Number"
                        value={formData.guarantorPhone}
                        onChange={(e) => setFormData({ ...formData, guarantorPhone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-3 py-2 text-xs text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Short Message */}
                  <div>
                    <label className="block text-[11px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Short Statement of Purpose
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Why do you wish to join Anti-Risk Security?"
                      value={formData.coverMessage}
                      onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    ></textarea>
                  </div>

                  {/* Submit application */}
                  <button
                    type="submit"
                    className="w-full bg-brand-lime hover:bg-white text-white hover:text-brand-navy py-3.5 rounded-sm font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Submit Guard Application</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
