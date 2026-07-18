import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase, 
  FileText, 
  UserCheck, 
  Mail, 
  Phone 
} from 'lucide-react';
import { Page } from '../types';
import { CareerPosition } from '../data/careersData';

interface CareerDetailPageProps {
  position: CareerPosition;
  onBackToCareers: () => void;
  onSuccessSubmit: (msg: string) => void;
}

export default function CareerDetailPage({ position, onBackToCareers, onSuccessSubmit }: CareerDetailPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    qualification: 'SSCE',
    guarantorName: '',
    guarantorPhone: '',
    coverMessage: `Hello, I am highly interested in applying for the "${position.title}" role at Anti-Risk Security. I possess the required discipline, physical fitness, and professional dedication to support your operations.`
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onSuccessSubmit(`Success! Your application for the ${position.title} role has been transmitted to our Security Recruitment Board.`);
    }, 1200);
  };

  return (
    <section className="bg-white min-h-screen animate-fade-in" id="career-detail-view-container">
      
      {/* 4K Hero Banner Section */}
      <div className="relative h-[35vh] min-h-[280px] bg-slate-950 flex items-end">
        {/* Dynamic Abstract Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/20" />
        
        {/* Banner content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 pb-10 z-10 text-white space-y-4">
          <button
            onClick={onBackToCareers}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-brand-lime hover:text-white backdrop-blur-md border border-white/10 rounded-sm font-display font-bold text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Careers</span>
          </button>

          <div className="space-y-2">
            <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{position.department}</span>
            </span>
            <h1 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight leading-tight max-w-3xl">
              {position.title}
            </h1>
            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">
              NIGERIA SECURITY COMMAND & RECRUITMENT CORPS
            </p>
          </div>
        </div>
      </div>

      {/* Core Split Body Layout */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Job Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Quick Stats Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-gray-150 rounded-sm">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-display font-bold text-gray-400 tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-lime" /> Location
                </span>
                <p className="text-xs font-bold text-brand-navy truncate">{position.location}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-display font-bold text-gray-400 tracking-wider flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-brand-lime" /> Est. Salary
                </span>
                <p className="text-xs font-bold text-brand-navy truncate">{position.salary}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-display font-bold text-gray-400 tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-lime" /> Job Type
                </span>
                <p className="text-xs font-bold text-brand-navy truncate">{position.type}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-display font-bold text-gray-400 tracking-wider flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-brand-lime" /> Department
                </span>
                <p className="text-xs font-bold text-brand-navy truncate">{position.department.replace(" Division", "")}</p>
              </div>
            </div>

            {/* Position Summary */}
            <div className="space-y-3">
              <h2 className="text-lg font-display font-extrabold text-brand-navy border-b border-gray-100 pb-2 flex items-center gap-2">
                <span>Role Overview</span>
              </h2>
              <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed">
                {position.summary}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-4">
              <h2 className="text-lg font-display font-extrabold text-brand-navy border-b border-gray-100 pb-2">
                Primary Duties & Responsibilities
              </h2>
              <ul className="space-y-3">
                {position.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs md:text-sm text-gray-600 font-sans">
                    <span className="w-5 h-5 rounded-full bg-brand-lime/10 text-brand-lime font-extrabold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entry Vetting Requirements */}
            <div className="bg-slate-50 border border-gray-150 p-6 md:p-8 rounded-sm space-y-4">
              <h3 className="text-sm font-display font-bold text-brand-navy uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-lime" />
                <span>Strict Vetting & Entry Requirements</span>
              </h3>
              <p className="text-gray-500 font-sans text-xs">
                To protect client assets and retain our NSCDC Grade-A license, all applicants must pass our background vetting parameters:
              </p>
              <ul className="space-y-2.5">
                {position.requirements.map((req, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-brand-lime mt-0.5 flex-shrink-0 stroke-[2.5]" />
                    <span className="text-gray-700 font-sans text-xs md:text-sm">
                      {req}
                    </span>
                  </div>
                ))}
              </ul>
            </div>

            {/* Career Benefits */}
            <div className="space-y-4">
              <h2 className="text-lg font-display font-extrabold text-brand-navy border-b border-gray-100 pb-2">
                What We Offer Our Personnel
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {position.benefits.map((benefit, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-gray-100 rounded-sm hover:border-brand-lime transition-all duration-300">
                    <span className="text-brand-navy font-display font-bold text-xs uppercase tracking-wider block mb-1">
                      {benefit}
                    </span>
                    <span className="text-gray-400 font-sans text-[10px]">
                      Fully standardized, verified, and administered immediately upon commissioning.
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Vetted Application Form */}
          <div className="lg:col-span-5">
            {submitted ? (
              <div className="bg-slate-50 border border-gray-150 p-8 rounded-sm text-center shadow-xl animate-scale-up" id="application-success-panel">
                <div className="w-16 h-16 bg-brand-lime/10 text-brand-lime rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-brand-navy mb-2">
                  Application Received!
                </h3>
                <p className="text-gray-500 font-sans text-xs md:text-sm mb-6 leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your recruitment file for the <strong>{position.title}</strong> role has been registered. Our security assessment board will evaluate your height, vetting requirements, and guarantor details within 48 business hours.
                </p>
                <div className="bg-white border border-gray-200 p-4 rounded-sm text-left text-xs text-gray-600 space-y-1.5 mb-6">
                  <p className="font-display font-bold text-xs text-brand-navy uppercase mb-1">Registered Specifications:</p>
                  <p>• Candidate: <strong>{formData.fullName}</strong></p>
                  <p>• Height Profile: <strong>{formData.height} m</strong></p>
                  <p>• Guarantor Ref: <strong>{formData.guarantorName}</strong></p>
                  <p>• Status: <strong className="text-emerald-600">Pending Police Vetting</strong></p>
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
                      coverMessage: `Hello, I am highly interested in applying for the "${position.title}" role at Anti-Risk Security. I possess the required discipline, physical fitness, and professional dedication to support your operations.`
                    });
                  }}
                  className="bg-brand-navy hover:bg-brand-lime hover:text-white text-white px-6 py-3 rounded-sm font-display font-bold text-xs tracking-wide transition-all duration-300 w-full cursor-pointer shadow-md"
                >
                  Apply For Another Division
                </button>
              </div>
            ) : (
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-sm shadow-xl border border-white/5 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-lime/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
                  <Briefcase className="w-5 h-5 text-brand-lime" />
                  <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Official Recruitment Intake
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10" id="career-application-form">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Full Legal Name *
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
                      <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Email Address *
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
                      <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Phone (WhatsApp) *
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

                  {/* Age & Height & Qualification */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Age (21-35) *
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
                      <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Height (m) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1.74"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Qualification *
                      </label>
                      <select
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full bg-slate-800 border border-white/15 focus:border-brand-lime rounded-sm px-3 py-2.5 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="SSCE">SSCE / WAEC</option>
                        <option value="OND">OND / NCE</option>
                        <option value="HND">HND / B.Sc</option>
                        <option value="ExServiceman">Ex-Serviceman</option>
                      </select>
                    </div>
                  </div>

                  {/* Guarantor Vetting */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-sm space-y-3">
                    <h4 className="text-[10px] font-display font-bold text-brand-lime uppercase tracking-wider">
                      Required Primary Guarantor
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
                        placeholder="Guarantor Phone"
                        value={formData.guarantorPhone}
                        onChange={(e) => setFormData({ ...formData, guarantorPhone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-3 py-2 text-xs text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Cover Statement */}
                  <div>
                    <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Statement of Purpose
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverMessage}
                      onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-brand-lime focus:bg-white/10 rounded-sm px-4 py-2.5 text-xs text-white outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-lime hover:bg-white text-white hover:text-brand-navy py-3.5 rounded-sm font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{submitting ? 'Vetting Credentials...' : `Submit Application`}</span>
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
