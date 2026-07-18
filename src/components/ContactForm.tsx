import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Clock, Send, ShieldAlert, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
}

export default function ContactForm({ initialService = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    urgency: 'medium',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeBranch, setActiveBranch] = useState('lagos');

  const branches = [
    {
      id: 'lagos',
      name: 'Lagos Headquarters',
      shortLabel: 'Lagos (HQ)',
      address: 'Plot 15, Alhaji Hussein Street, Ikeja, Lagos State, Nigeria.',
      phone: '+234 805 731 5673',
      email: 'lagos.ops@antiriskng.com',
      hours: '8:00 AM - 6:00 PM (Mon-Sat)',
    },
    {
      id: 'abuja',
      name: 'Abuja Regional Branch',
      shortLabel: 'Abuja',
      address: 'Suite 4A, Garki II Commercial Plaza, Area 11, Garki, Abuja, Nigeria.',
      phone: '+234 802 112 4432',
      email: 'abuja.ops@antiriskng.com',
      hours: '8:30 AM - 5:30 PM (Mon-Fri)',
    },
    {
      id: 'ph',
      name: 'Port Harcourt Maritime Terminal',
      shortLabel: 'Port Harcourt',
      address: 'Block B, Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria.',
      phone: '+234 809 334 7765',
      email: 'ph.ops@antiriskng.com',
      hours: '8:00 AM - 5:00 PM (Mon-Sat)',
    },
    {
      id: 'calabar',
      name: 'Calabar South-South Command',
      shortLabel: 'Calabar',
      address: 'Suite 12, Ndidem Usang Iso Road, Calabar, Cross River State, Nigeria.',
      phone: '+234 805 731 5680',
      email: 'calabar.ops@antiriskng.com',
      hours: '8:00 AM - 5:00 PM (Mon-Fri)',
    },
    {
      id: 'oyo',
      name: 'Oyo Western Sector Office',
      shortLabel: 'Oyo',
      address: 'Sector 3, Ring Road Industrial Estate, Ibadan, Oyo State, Nigeria.',
      phone: '+234 802 112 4435',
      email: 'oyo.ops@antiriskng.com',
      hours: '8:00 AM - 5:30 PM (Mon-Fri)',
    },
    {
      id: 'abia',
      name: 'Abia Eastern Region Command',
      shortLabel: 'Abia',
      address: 'Aba-Owerri Road Express Sector, Aba, Abia State, Nigeria.',
      phone: '+234 809 334 7768',
      email: 'abia.ops@antiriskng.com',
      hours: '8:00 AM - 5:00 PM (Mon-Sat)',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const selectedBranch = branches.find((b) => b.id === activeBranch) || branches[0];

  return (
    <section className="py-16 bg-white" id="contact-us-page-section">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Contact Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-lime font-display font-bold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight mt-1 mb-4">
            Contact Anti-Risk Command Centers
          </h2>
          <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
            Need emergency guards, a maritime escort plan, or corporate security audits? Fill out the secure dispatch form below or contact any of our regional headquarters directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* 1. DISPATCH ENQUIRY FORM (7) */}
          <div className="lg:col-span-7 bg-slate-50 border border-gray-100 p-8 rounded-sm shadow-xs flex flex-col justify-between">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12" id="dispatch-success">
                <div className="w-16 h-16 bg-brand-lime/10 text-brand-lime rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-brand-navy tracking-tight mb-2">
                  Enquiry Dispatched Successfully!
                </h3>
                <p className="text-gray-500 font-sans text-xs md:text-sm mb-6 leading-relaxed max-w-md">
                  Thank you, <strong>{formData.name}</strong>. Your request regarding <strong>{formData.service || 'Security Operations'}</strong> has been securely logged on our server. An operations commander will reach out within the next 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      service: '',
                      urgency: 'medium',
                      message: '',
                    });
                  }}
                  className="bg-brand-navy hover:bg-brand-lime hover:text-white text-white px-6 py-3 rounded-sm font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  Send Another Dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-gray-200">
                  <ShieldAlert className="w-5 h-5 text-brand-lime stroke-[2.5]" />
                  <h3 className="text-lg font-display font-extrabold text-brand-navy uppercase tracking-wider">
                    Secure Dispatch Request
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-display font-bold uppercase text-gray-500 tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Chief Chidi Opara"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-brand-lime rounded-sm px-4 py-3 font-sans text-xs outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-display font-bold uppercase text-gray-500 tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-brand-lime rounded-sm px-4 py-3 font-sans text-xs outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-display font-bold uppercase text-gray-500 tracking-wider mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., +234 805 731 5673"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-brand-lime rounded-sm px-4 py-3 font-sans text-xs outline-none transition-colors"
                    />
                  </div>

                  {/* Service type selection */}
                  <div>
                    <label className="block text-[11px] font-display font-bold uppercase text-gray-500 tracking-wider mb-2">
                      Preferred Security Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-brand-lime rounded-sm px-4 py-3 font-sans text-xs outline-none transition-colors"
                    >
                      <option value="">-- Choose Option --</option>
                      <option value="Manned Guard Force">Manned Guard Force</option>
                      <option value="VIP Escort Protection">VIP Escort & Close Protection</option>
                      <option value="Electronic Surveillance">Electronic Surveillance (CCTV)</option>
                      <option value="Event Security Management">Event Security Management</option>
                      <option value="Maritime Security Logistics">Maritime Security Logistics</option>
                      <option value="Consultancy & Risk Audit">Consultancy & Risk Audit</option>
                    </select>
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-[11px] font-display font-bold uppercase text-gray-500 tracking-wider mb-2">
                    Security Requirement Urgency
                  </label>
                  <div className="flex bg-white border border-gray-200 rounded-sm p-1">
                    {[
                      { id: 'low', label: 'General Inquiry' },
                      { id: 'medium', label: 'Within 30 Days' },
                      { id: 'high', label: 'Immediate deployment' },
                    ].map((urg) => (
                      <button
                        key={urg.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: urg.id })}
                        className={`flex-1 py-2 text-center text-[10px] font-bold uppercase rounded-xs transition-all cursor-pointer ${
                          formData.urgency === urg.id
                            ? urg.id === 'high'
                              ? 'bg-rose-500 text-white font-extrabold'
                              : 'bg-brand-lime text-white font-extrabold'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {urg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-display font-bold uppercase text-gray-500 tracking-wider mb-2">
                    Description of Security Needs *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your facility location, size, and guard count requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-gray-200 focus:border-brand-lime rounded-sm px-4 py-3 font-sans text-xs outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-navy hover:bg-brand-lime hover:text-white text-white py-3.5 rounded-sm font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Dispatch Enquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* 2. REGIONAL OFFICES DIRECTORY (5) */}
          <div className="lg:col-span-5 bg-brand-navy text-white p-8 rounded-sm shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-lime/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-display font-extrabold uppercase tracking-wider text-brand-lime mb-6">
                Regional Hubs
              </h3>

              {/* Branch Selector Tabs */}
              <div className="flex border-b border-white/10 mb-8 pb-1 overflow-x-auto gap-4 scrollbar-none">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveBranch(b.id)}
                    className={`pb-3 text-center text-xs font-bold font-display tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                      activeBranch === b.id
                        ? 'border-brand-lime text-brand-lime'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {b.shortLabel}
                  </button>
                ))}
              </div>

              {/* Branch Information */}
              <div className="space-y-6 text-sm" id="branch-info-panel">
                <h4 className="text-lg font-display font-extrabold text-white">
                  {selectedBranch.name}
                </h4>

                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-xs md:text-sm leading-relaxed">{selectedBranch.address}</p>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <PhoneCall className="w-5 h-5 text-brand-lime flex-shrink-0" />
                  <a href={`tel:${selectedBranch.phone.replace(/\s+/g, '')}`} className="font-sans text-xs md:text-sm hover:text-brand-lime transition-colors">
                    {selectedBranch.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-brand-lime flex-shrink-0" />
                  <a href={`mailto:${selectedBranch.email}`} className="font-sans text-xs md:text-sm hover:text-brand-lime transition-colors">
                    {selectedBranch.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-brand-lime flex-shrink-0" />
                  <span className="font-sans text-xs md:text-sm">{selectedBranch.hours}</span>
                </div>
              </div>
            </div>

            {/* Quick Helpline Call Card */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-sm relative z-10 mt-8">
              <p className="text-[10px] font-display font-bold text-brand-lime uppercase tracking-widest mb-1">
                Emergency Hotline (24/7 Dispatch)
              </p>
              <a href="tel:+2348057315673" className="text-xl md:text-2xl font-display font-black text-white hover:text-brand-lime transition-colors">
                +234 805 731 5673
              </a>
            </div>

          </div>
        </div>

        {/* 3. CUSTOM INTERACTIVE SVG NIGERIA NETWORK MAP */}
        <div className="bg-slate-50 border border-gray-200/60 rounded-sm p-6 md:p-8" id="branch-interactive-map-area">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xl font-display font-extrabold text-brand-navy leading-tight">
                Our Operational Coverage
              </h3>
              <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed">
                Anti-Risk maintains active deployment desks, mobile supervisors, and rapid patrol vehicles stationed across key business regions in Nigeria. 
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="w-2.5 h-2.5 bg-brand-lime rounded-full inline-block animate-pulse"></span>
                  <span>Active Deployment Region</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="w-2.5 h-2.5 bg-brand-navy rounded-full inline-block"></span>
                  <span>Future Expansion Desk</span>
                </div>
              </div>
            </div>

            {/* Creative interactive visual network SVG map of Nigeria */}
            <div className="lg:col-span-8 flex justify-center">
              <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-lg p-4 shadow-md flex items-center justify-center">
                <svg viewBox="0 0 500 350" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stylized Nigeria Map Outline */}
                  <path
                    d="M 50 150 C 70 80, 150 40, 250 50 C 350 40, 420 80, 450 120 C 470 170, 440 250, 380 280 C 310 320, 250 300, 200 290 C 120 280, 70 240, 50 180 Z"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="3.5"
                    strokeDasharray="4 4"
                  />
                  {/* Major rivers stylization (Niger and Benue confluence representing Nigeria) */}
                  <path
                    d="M 50 160 Q 150 180, 210 210 Q 250 220, 310 240 M 210 210 Q 250 150, 400 80"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Operational Network Lines */}
                  <g stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6">
                    <line x1="120" y1="210" x2="250" y2="120" /> {/* Lagos - Abuja */}
                    <line x1="250" y1="120" x2="280" y2="240" /> {/* Abuja - PH */}
                    <line x1="120" y1="210" x2="280" y2="240" /> {/* Lagos - PH */}
                    <line x1="120" y1="210" x2="135" y2="195" /> {/* Lagos - Oyo */}
                    <line x1="280" y1="240" x2="290" y2="220" /> {/* PH - Abia */}
                    <line x1="280" y1="240" x2="320" y2="240" /> {/* PH - Calabar */}
                    <line x1="250" y1="120" x2="290" y2="220" /> {/* Abuja - Abia */}
                    <line x1="250" y1="120" x2="320" y2="240" /> {/* Abuja - Calabar */}
                  </g>

                  {/* BRANCH 1: LAGOS (Active) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setActiveBranch('lagos')}
                  >
                    <circle cx="120" cy="210" r="14" fill="#dc2626" fillOpacity="0.15" />
                    <circle cx="120" cy="210" r="7" fill="#dc2626" className="group-hover:scale-125 transition-transform" />
                    <circle cx="120" cy="210" r="3" fill="#ffffff" />
                    <text x="120" y="235" textAnchor="middle" className="text-[10px] font-display font-extrabold fill-brand-navy">
                      LAGOS (HQ)
                    </text>
                  </g>

                  {/* BRANCH 2: ABUJA (Active) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setActiveBranch('abuja')}
                  >
                    <circle cx="250" cy="120" r="14" fill="#dc2626" fillOpacity="0.15" />
                    <circle cx="250" cy="120" r="7" fill="#dc2626" className="group-hover:scale-125 transition-transform" />
                    <circle cx="250" cy="120" r="3" fill="#ffffff" />
                    <text x="250" y="100" textAnchor="middle" className="text-[10px] font-display font-extrabold fill-brand-navy">
                      ABUJA HUB
                    </text>
                  </g>

                  {/* BRANCH 3: PORT HARCOURT (Active) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setActiveBranch('ph')}
                  >
                    <circle cx="280" cy="240" r="14" fill="#dc2626" fillOpacity="0.15" />
                    <circle cx="280" cy="240" r="7" fill="#dc2626" className="group-hover:scale-125 transition-transform" />
                    <circle cx="280" cy="240" r="3" fill="#ffffff" />
                    <text x="280" y="265" textAnchor="middle" className="text-[10px] font-display font-extrabold fill-brand-navy">
                      PORT HARCOURT
                    </text>
                  </g>

                  {/* BRANCH 4: CALABAR (Active) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setActiveBranch('calabar')}
                  >
                    <circle cx="320" cy="240" r="14" fill="#dc2626" fillOpacity="0.15" />
                    <circle cx="320" cy="240" r="7" fill="#dc2626" className="group-hover:scale-125 transition-transform" />
                    <circle cx="320" cy="240" r="3" fill="#ffffff" />
                    <text x="348" y="244" textAnchor="middle" className="text-[10px] font-display font-extrabold fill-brand-navy">
                      CALABAR
                    </text>
                  </g>

                  {/* BRANCH 5: OYO (Active) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setActiveBranch('oyo')}
                  >
                    <circle cx="135" cy="195" r="14" fill="#dc2626" fillOpacity="0.15" />
                    <circle cx="135" cy="195" r="7" fill="#dc2626" className="group-hover:scale-125 transition-transform" />
                    <circle cx="135" cy="195" r="3" fill="#ffffff" />
                    <text x="135" y="175" textAnchor="middle" className="text-[10px] font-display font-extrabold fill-brand-navy">
                      OYO
                    </text>
                  </g>

                  {/* BRANCH 6: ABIA (Active) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setActiveBranch('abia')}
                  >
                    <circle cx="290" cy="220" r="14" fill="#dc2626" fillOpacity="0.15" />
                    <circle cx="290" cy="220" r="7" fill="#dc2626" className="group-hover:scale-125 transition-transform" />
                    <circle cx="290" cy="220" r="3" fill="#ffffff" />
                    <text x="290" y="200" textAnchor="middle" className="text-[10px] font-display font-extrabold fill-brand-navy">
                      ABIA
                    </text>
                  </g>

                  {/* Kano Hub (Prospect/Expansion desk) */}
                  <g className="opacity-45">
                    <circle cx="310" cy="70" r="5" fill="#0a1128" />
                    <text x="310" y="55" textAnchor="middle" className="text-[9px] font-display font-bold fill-gray-400 uppercase">
                      Kano Desk
                    </text>
                  </g>
                </svg>
                
                {/* Float Card Indicator */}
                <div className="absolute top-4 right-4 bg-brand-navy text-white px-3 py-1.5 rounded-sm border border-white/10 text-[9px] font-display font-bold tracking-wider uppercase">
                  Click markers to view office contacts
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
