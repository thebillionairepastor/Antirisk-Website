import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Sliders, Calculator, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';

export default function InteractiveQuote() {
  const [propertyType, setPropertyType] = useState('office');
  const [sizeRange, setSizeRange] = useState('medium');
  const [gatesCount, setGatesCount] = useState(2);
  const [threatLevel, setThreatLevel] = useState('medium');
  const [extraServices, setExtraServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });

  // Custom risk & guard logic
  const handleExtraToggle = (id: string) => {
    setExtraServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCalculation = () => {
    let baseGuards = 2;
    let riskFactor = 40;

    // Property base
    if (propertyType === 'industrial') {
      baseGuards = 4;
      riskFactor = 60;
    } else if (propertyType === 'estate') {
      baseGuards = 3;
      riskFactor = 50;
    } else if (propertyType === 'retail') {
      baseGuards = 2;
      riskFactor = 45;
    } else if (propertyType === 'vip') {
      baseGuards = 3;
      riskFactor = 70;
    }

    // Size multiplier
    if (sizeRange === 'large') {
      baseGuards += 2;
      riskFactor += 15;
    } else if (sizeRange === 'small') {
      baseGuards = Math.max(1, baseGuards - 1);
      riskFactor -= 10;
    }

    // Gates
    baseGuards += Math.floor(gatesCount / 2);
    riskFactor += gatesCount * 5;

    // Threat level
    if (threatLevel === 'high') {
      baseGuards += 2;
      riskFactor += 20;
    } else if (threatLevel === 'low') {
      baseGuards = Math.max(1, baseGuards - 1);
      riskFactor -= 15;
    }

    // Caps
    riskFactor = Math.max(15, Math.min(95, riskFactor));

    return {
      recommendedGuards: baseGuards,
      riskRating: riskFactor,
      patrolClocks: extraServices.includes('clocks'),
      armedSupervisors: extraServices.includes('audits'),
      cctvSupport: extraServices.includes('cctv'),
    };
  };

  const calc = getCalculation();

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactInfo.name && contactInfo.email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 bg-brand-navy text-white relative overflow-hidden" id="interactive-quote-calculator">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest">
            Security Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-1 mb-4">
            Interactive Guard & Risk Assessor
          </h2>
          <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
            Specify your asset profile below to calculate recommended guard strength, active hazard scales, and recommended tech add-ons in real-time.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-xl mx-auto bg-white text-gray-800 p-8 rounded-md text-center border border-gray-100 shadow-2xl animate-scale-up" id="quote-success-banner">
            <div className="w-16 h-16 bg-brand-lime/10 text-brand-lime rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-brand-navy tracking-tight mb-2">
              Calculation Lodged Successfully!
            </h3>
            <p className="text-gray-500 font-sans text-xs md:text-sm mb-6 leading-relaxed">
              Thank you, <strong>{contactInfo.name}</strong>. An Anti-Risk Operations Commander has received your specifications and will draft a customized security proposal. We will email you at <strong>{contactInfo.email}</strong> or call you shortly.
            </p>
            <div className="bg-slate-50 border border-gray-100 p-4 rounded-sm text-left mb-6">
              <p className="font-display font-bold text-xs text-brand-navy uppercase tracking-wide mb-2">Logged Audit Specs:</p>
              <ul className="text-xs font-sans text-gray-600 space-y-1">
                <li>• Recommended Uniformed Guards: <strong>{calc.recommendedGuards} Officers</strong></li>
                <li>• Estimated Site Hazard Scale: <strong>{calc.riskRating}% (Medium-Vigilant)</strong></li>
                <li>• Property Category: <strong>{propertyType.toUpperCase()}</strong></li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setContactInfo({ name: '', email: '', phone: '' });
              }}
              className="bg-brand-navy hover:bg-brand-lime hover:text-white text-white px-6 py-3 rounded-sm font-display font-bold text-sm tracking-wide transition-all duration-300 w-full cursor-pointer"
            >
              Recalculate Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Input Form Column (7) */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-xs border border-white/10 p-6 md:p-8 rounded-md">
              <div className="flex items-center gap-3 mb-6">
                <Sliders className="w-5 h-5 text-brand-lime" />
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
                  Site Configurations
                </h3>
              </div>

              <div className="space-y-6">
                {/* Property Type */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase text-gray-300 tracking-wider mb-2">
                    Property Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'office', label: 'Corporate Office' },
                      { id: 'estate', label: 'Gated Estate' },
                      { id: 'industrial', label: 'Industrial Yard' },
                      { id: 'vip', label: 'VIP Residence' },
                      { id: 'retail', label: 'Retail Complex' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPropertyType(opt.id)}
                        className={`py-2.5 px-3 rounded-sm text-xs font-semibold font-display tracking-wide text-center border transition-all cursor-pointer ${
                          propertyType === opt.id
                            ? 'bg-brand-lime text-white border-brand-lime font-bold shadow-md'
                            : 'bg-white/5 text-white border-white/15 hover:bg-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Physical Dimensions and Gates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-display font-bold uppercase text-gray-300 tracking-wider mb-2">
                      Property Boundaries Size
                    </label>
                    <div className="flex bg-white/5 border border-white/15 rounded-sm p-1">
                      {[
                        { id: 'small', label: 'Small (<500 sqm)' },
                        { id: 'medium', label: 'Medium' },
                        { id: 'large', label: 'Large (>5,000 sqm)' },
                      ].map((sz) => (
                        <button
                          key={sz.id}
                          type="button"
                          onClick={() => setSizeRange(sz.id)}
                          className={`flex-1 py-1.5 rounded-xs text-center text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            sizeRange === sz.id
                              ? 'bg-brand-lime text-white font-extrabold'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-display font-bold uppercase text-gray-300 tracking-wider mb-2">
                      Active Access Gates: <span className="text-brand-lime">{gatesCount} Gates</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={gatesCount}
                      onChange={(e) => setGatesCount(parseInt(e.target.value))}
                      className="w-full accent-brand-lime bg-white/15 rounded-sm h-1 cursor-pointer mt-3"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                      <span>1 Gate</span>
                      <span>5 Gates</span>
                      <span>10 Gates</span>
                    </div>
                  </div>
                </div>

                {/* Threat Environment Level */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase text-gray-300 tracking-wider mb-2">
                    Surrounding Threat Profile (Local Area)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'low', label: 'Standard Safety (Low)' },
                      { id: 'medium', label: 'Vigilant Check (Medium)' },
                      { id: 'high', label: 'Hostile/High Risk (High)' },
                    ].map((th) => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => setThreatLevel(th.id)}
                        className={`py-2.5 px-2 rounded-sm text-xs font-semibold text-center border transition-all cursor-pointer ${
                          threatLevel === th.id
                            ? th.id === 'high'
                              ? 'bg-rose-500 text-white border-rose-500 font-bold shadow-md'
                              : 'bg-brand-lime text-white border-brand-lime font-bold shadow-md'
                            : 'bg-white/5 text-white border-white/15 hover:bg-white/10'
                        }`}
                      >
                        {th.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional System Upgrades */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase text-gray-300 tracking-wider mb-2">
                    Additional System Integration Add-ons
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'cctv', label: 'CCTV Feeds Monitor' },
                      { id: 'clocks', label: 'Supervisor Guard Clocking' },
                      { id: 'audits', label: 'Armed Quick Supervisor' },
                    ].map((ext) => (
                      <button
                        key={ext.id}
                        type="button"
                        onClick={() => handleExtraToggle(ext.id)}
                        className={`py-2.5 px-3 rounded-sm text-xs font-semibold text-left border flex items-center justify-between transition-all cursor-pointer ${
                          extraServices.includes(ext.id)
                            ? 'bg-brand-lime text-white border-brand-lime font-bold shadow-md'
                            : 'bg-white/5 text-white border-white/15 hover:bg-white/10'
                        }`}
                      >
                        <span>{ext.label}</span>
                        {extraServices.includes(ext.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column (5) */}
            <div className="lg:col-span-5 bg-white text-gray-800 p-6 md:p-8 rounded-md shadow-2xl flex flex-col justify-between border border-gray-100">
              
              {/* Calculated Outputs */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <Calculator className="w-5 h-5 text-brand-lime stroke-[2.5]" />
                  <h3 className="text-lg font-display font-extrabold text-brand-navy uppercase tracking-wider">
                    Assessor Report
                  </h3>
                </div>

                {/* Guard Count Indicator */}
                <div className="bg-slate-50 p-6 rounded-sm text-center mb-6 border border-slate-100">
                  <span className="text-[11px] font-display font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    Recommended Guard Strength
                  </span>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <UserCheck className="w-6 h-6 text-brand-lime stroke-[2.5]" />
                    <span className="text-4xl md:text-5xl font-display font-black text-brand-navy tracking-tight">
                      {calc.recommendedGuards}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-gray-500 font-semibold uppercase">
                    Uniformed Security Officers
                  </span>
                </div>

                {/* Risk Rating Meter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-display font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                    <span>Active Hazard Scale</span>
                    <span className={calc.riskRating > 60 ? 'text-rose-500' : 'text-brand-lime'}>
                      {calc.riskRating}% {calc.riskRating > 60 ? '(High Vigilance)' : '(Vigilant)'}
                    </span>
                  </div>
                  {/* Gauge bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${calc.riskRating}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        calc.riskRating > 70
                          ? 'bg-rose-500'
                          : calc.riskRating > 45
                          ? 'bg-amber-400'
                          : 'bg-brand-lime'
                      }`}
                    ></div>
                  </div>
                  {calc.riskRating > 65 && (
                    <div className="flex items-start gap-1.5 mt-2 text-rose-500 font-sans text-[10px] font-semibold leading-normal uppercase">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Recommended 24/7 supervisor armed sweeps due to threat profile.</span>
                    </div>
                  )}
                </div>

                {/* Solutions Checklist */}
                <div className="space-y-2 mb-8">
                  <p className="text-[10px] font-display font-bold text-gray-400 uppercase tracking-wider mb-2">Recommended Setup:</p>
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-sans font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-lime stroke-[2.5]" />
                    <span>Fingerprint background-screened guards</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700 font-sans font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-lime stroke-[2.5]" />
                    <span>2-way radio command check-ins (hourly)</span>
                  </div>
                  {calc.patrolClocks && (
                    <div className="flex items-center gap-2 text-xs text-gray-700 font-sans font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-lime stroke-[2.5]" />
                      <span>Integrated patrol clock verify systems</span>
                    </div>
                  )}
                  {calc.cctvSupport && (
                    <div className="flex items-center gap-2 text-xs text-gray-700 font-sans font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-lime stroke-[2.5]" />
                      <span>Remote control room CCTV streaming feed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Secure Booking Form */}
              <form onSubmit={handleQuoteSubmit} className="space-y-3 pt-4 border-t border-gray-100">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="w-full bg-slate-50 border border-gray-200 focus:border-brand-lime focus:bg-white rounded-sm px-4 py-2.5 font-sans text-xs outline-none transition-colors"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-200 focus:border-brand-lime focus:bg-white rounded-sm px-4 py-2.5 font-sans text-xs outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (WhatsApp)"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-200 focus:border-brand-lime focus:bg-white rounded-sm px-4 py-2.5 font-sans text-xs outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-navy hover:bg-brand-lime hover:text-white text-white py-3 rounded-sm font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
                >
                  Send Specs to Operations Commander
                </button>
              </form>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
