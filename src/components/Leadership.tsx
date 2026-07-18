import React, { useState } from 'react';
import { Shield, Eye, Heart, CheckCircle2, Award, ClipboardCheck, Users, X, BookOpen, Briefcase, FileText } from 'lucide-react';
import { TeamMember } from '../types';

interface ExpandedTeamMember extends TeamMember {
  detailedBio: string;
  achievements: string[];
  education: string[];
}

const leadershipList: ExpandedTeamMember[] = [
  {
    name: 'Major General R. A. Yusuf (Rtd.)',
    role: 'Managing Director / Chief Executive',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    bio: 'Over 30 years of highly decorated military command service in the Nigerian Armed Forces, specializing in counter-intelligence, risk mitigation, and national safety command operations.',
    detailedBio: 'Major General R. A. Yusuf (Rtd.) is a legendary figure in national security command with over three decades of highly decorated military service in the Nigerian Armed Forces. Throughout his distinguished career, he served in critical tactical positions, including General Officer Commanding (GOC) of elite divisions, where he successfully spearheaded multi-agency counter-insurgency and regional peace support operations. Following his retirement, he transitioned his strategic vision to private security, founding Anti-Risk with a determination to institutionalize military-grade precision, absolute procedural discipline, and high-integrity sentinel services within the private sector.',
    achievements: [
      'Recipient of the Forces Service Star (FSS) and Meritorious Service Star (MSS) medals.',
      'Successfully commanded peacekeeping forces under United Nations joint mandates.',
      'Pioneered corporate-military synergy frameworks for private industrial protection.',
      'Recognized national expert in defensive risk audit modeling and threat containment.'
    ],
    education: [
      'MSc in Strategic Studies - University of Ibadan',
      'Alumnus of the prestigious National Institute for Policy and Strategic Studies (NIPSS), Kuru',
      'Advanced Combat Tactics & Intelligence Command certification, UK Defence College'
    ]
  },
  {
    name: 'Mr. Sylvester Chukwuma',
    role: 'Head of Guard Operations & Intelligence',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
    bio: 'Former Deputy Superintendent of State Security Services (DSS) with extensive experience in corporate asset defenses, anti-kidnapping transit planning, and local tactical guard supervisor deployments.',
    detailedBio: 'Mr. Sylvester Chukwuma brings unparalleled civil-intelligence expertise to Anti-Risk, having spent 22 years of active duty as a Deputy Superintendent of the State Security Services (DSS). His operational expertise spans national counter-intelligence, close protection logistics, and tactical crisis negotiation. At Anti-Risk, Mr. Chukwuma directs our guard operations, establishing rigorous supervisor auditing procedures and managing our rapid-response networks. His strategic planning ensures that our clients receive proactive, preventive security instead of passive watchmanship.',
    achievements: [
      'Designed the VIP Escort and Rapid Alert protocols currently deployed across major West African corporate hubs.',
      'Over 20 years of crisis management, VIP extraction, and risk auditing across highly sensitive regions.',
      'Supervised the deployment of over 5,000 security sentinel personnel nationwide.',
      'Instructed over 100 tactical workshops in partnership with national law enforcement.'
    ],
    education: [
      'BSc in Criminology and Security Studies - University of Port Harcourt',
      'Advanced Intelligence Operative Training Diploma - DSS Training Academy',
      'International Security Management Certification - American Society for Industrial Security (ASIS)'
    ]
  },
  {
    name: 'Engr. Aisha Bello',
    role: 'Coordinator, Electronic Surveillance Systems',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    bio: 'Specialist in smart network security and CCTV integrations. Coordinates our Central control rooms and real-time electronic patrol verify mechanisms.',
    detailedBio: 'Engr. Aisha Bello is a vanguard of smart security and physical-digital risk integration. With a robust background in engineering and telecom networking, Aisha designs and maintains Anti-Risk’s modern central operations surveillance control room. She leads our highly competent engineering crew, installing smart artificial intelligence-powered CCTV monitors, automated biometric checkpoints, and digital hourly guard patrol clocks. Under her supervision, all sites have 24/7 technical telemetry feedback loops connecting directly with state security forces.',
    achievements: [
      'Spearheaded the integration of AI-powered facial recognition and perimeter line-crossing analytics for major oil depots.',
      'Designed and deployed the RFID cloud-based real-time patrol clocking system for client properties.',
      'Successfully installed and maintained electronic security frameworks for 40+ high-security commercial banks.',
      'Regular guest speaker on Technical Security & Remote Asset Monitoring conferences.'
    ],
    education: [
      'BEng in Telecommunications Engineering - Ahmadu Bello University, Zaria',
      'MSc in Computer and Cyber Security - University of Lagos',
      'Certified Information Systems Security Professional (CISSP)'
    ]
  },
];

const vettingSteps = [
  {
    title: '1. Biometric Fingerprint Registry Check',
    description: 'We run physical fingerprints through national police registries to confirm the candidate has absolute zero criminal records or active prosecutions.',
  },
  {
    title: '2. Legal Guarantor Bonds Verification',
    description: 'Every recruit must furnish two verifiable, high-standing guarantors (civil servants, community leaders, or property owners) who sign direct financial indemnity bonds.',
  },
  {
    title: '3. Rigorous Physical & Health Audit',
    description: 'Candidates pass strict cardiovascular fitness runs, drug screenings, medical checks, and coordination tests conducted by certified medical panels.',
  },
  {
    title: '4. Psychological Aptitude Assessment',
    description: 'Analytical and emotional intelligence tests ensure the guard stays calm, polite, and completely decisive under high-threat or crisis situations.',
  },
  {
    title: '5. Advanced Tactical Academy Training',
    description: 'A 2-week intensive boot camp on physical combat defense, fire containment, surveillance tracking, first aid, and customer-focused front-desk relations.',
  },
];export default function Leadership() {
  const [selectedLeader, setSelectedLeader] = useState<ExpandedTeamMember | null>(null);

  return (
    <section className="py-16 bg-white animate-fade-in" id="about-us-page-view">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* 1. CORPORATE PROFILE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest block">
              Corporate Profile
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-navy tracking-tight leading-tight">
              Anti-Risk Security: Formulated on Absolute Safety & Proactive Prevention
            </h2>
            <div className="space-y-4 font-sans text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Founded on the core philosophy that security is not a reactive event, but an active, continuous blanket, 
                <strong> Anti-Risk Security and Safety Services Provider</strong> has risen to become a class-A leader in Nigeria's private protection sector. 
                Our structures are optimized to secure corporate headquarters, industrial logistics depots, maritime vessels, estate enclosures, and elite executives.
              </p>
              <p>
                We recognize the unique socio-economic safety dynamics in regions like Lagos, Port Harcourt, and Abuja. 
                Therefore, we do not just source and supply standard watchmen. We design integrated plans combining physical sentinel 
                vigilance, unannounced supervisors checkups, GPS escort tracking, and automated surveillance command hubs.
              </p>
            </div>
          </div>

          {/* Core Values side panel */}
          <div className="lg:col-span-5 bg-slate-50 border border-gray-100 p-8 rounded-sm shadow-md space-y-6">
            <h3 className="text-xl font-display font-extrabold text-brand-navy border-b border-gray-200 pb-3">
              Our Vision, Mission & Values
            </h3>
            
            <div className="space-y-4">
              {/* Mission */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime flex-shrink-0">
                  <Shield className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-navy uppercase tracking-wide">Our Mission</h4>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    To safeguard our clients' investments and lives through meticulously vetted personnel, uncompromising discipline, and intelligent response mechanisms.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime flex-shrink-0">
                  <Eye className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-navy uppercase tracking-wide">Our Vision</h4>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    To remain the most trusted security sentinel in Nigeria, distinguished by our rapid-response capabilities and absolute integrity.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime flex-shrink-0">
                  <Heart className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-navy uppercase tracking-wide">Our Core Pillars</h4>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    Vigilance, Integrity, Rapid Deployments, Customer-First Courtesy, and Advanced Surveillance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. THE RIGOROUS VETTING PROCESS */}
        <div className="bg-slate-900 text-white rounded-lg p-8 md:p-12 mb-20 relative overflow-hidden" id="vetting-academy-panel">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-lime/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="w-12 h-12 bg-brand-lime/20 text-brand-lime rounded-full flex items-center justify-center mb-2">
                <ClipboardCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                Our 5-Step Guard Vetting Blueprint
              </h3>
              <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                We believe that a security guard is only as robust as the administrative processes behind them. That is why we enforce the strict recruitment checklist in the industry.
              </p>
              <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex items-center gap-3">
                <Award className="w-10 h-10 text-brand-lime flex-shrink-0" />
                <div>
                  <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Zero Compromise</h4>
                  <p className="text-[10px] text-gray-400 font-sans">92% of applicants are rejected at screening stages.</p>
                </div>
              </div>
            </div>

            {/* Vetting Steps Checklist */}
            <div className="lg:col-span-8 space-y-6">
              {vettingSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-brand-lime text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-white mb-1">
                      {step.title.substring(3)}
                    </h4>
                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. EXECUTIVE LEADERSHIP TEAM */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest">
              Executive Board
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-brand-navy tracking-tight mt-1 mb-3">
              Our Security Operations Leadership
            </h3>
            <p className="text-gray-500 font-sans text-xs leading-relaxed">
              Anti-Risk is steered by retired national security directors, military generals, and electronic defense coordinators with deep intelligence backgrounds.
            </p>
          </div>

          {/* Leaders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipList.map((leader, idx) => (
              <div key={idx} className="bg-slate-50 border border-gray-150 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between" id={`leader-${idx}`}>
                <div>
                  {/* Photo representation */}
                  <div className="w-full h-64 bg-slate-200 overflow-hidden relative group">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-brand-navy text-white text-[10px] font-display font-bold px-2 py-1 border border-white/10 rounded-sm">
                      Security Vetted Board
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-display font-extrabold text-brand-navy mb-0.5">
                      {leader.name}
                    </h4>
                    <p className="text-xs font-semibold text-brand-lime uppercase tracking-wider mb-4">
                      {leader.role}
                    </p>
                    <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed line-clamp-3">
                      {leader.bio}
                    </p>
                    
                    <button
                      onClick={() => setSelectedLeader(leader)}
                      className="mt-4 px-4 py-2 bg-brand-navy text-white hover:bg-brand-lime font-display font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>View Profile</span>
                    </button>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-100 border-t border-gray-150 flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                  <Users className="w-3.5 h-3.5 text-brand-lime" />
                  <span>Verified Director Profile</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILED PROFESSIONAL BIOGRAPHY MODAL */}
        {selectedLeader && (
          <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in" id="leader-modal" onClick={() => setSelectedLeader(null)}>
            <div className="bg-white rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scale-up border border-gray-100 flex flex-col" onClick={(e) => e.stopPropagation()}>
              
              {/* Header Close button */}
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-950 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo & Role Banner */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 p-6 md:p-8 border-b border-gray-100 items-center">
                <div className="md:col-span-4 w-32 h-32 md:w-full md:h-40 bg-slate-200 rounded-sm overflow-hidden shadow-md mx-auto md:mx-0">
                  <img
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="md:col-span-8 text-center md:text-left space-y-1">
                  <span className="bg-brand-lime/10 text-brand-lime text-[10px] font-display font-extrabold uppercase px-2 py-1 tracking-wider rounded-sm border border-brand-lime/20 inline-block">
                    Vetted Officer Board
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-extrabold text-brand-navy tracking-tight mt-1">
                    {selectedLeader.name}
                  </h3>
                  <p className="text-xs md:text-sm font-semibold text-brand-lime uppercase tracking-widest">
                    {selectedLeader.role}
                  </p>
                </div>
              </div>

              {/* Modal Core Bio Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-display font-extrabold text-brand-navy uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-lime" />
                    <span>Professional Biography</span>
                  </h4>
                  <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed">
                    {selectedLeader.detailedBio}
                  </p>
                </div>

                {/* Achievements List */}
                <div>
                  <h4 className="text-xs font-display font-extrabold text-brand-navy uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-brand-lime" />
                    <span>Command Career Achievements</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedLeader.achievements.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-lime flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="text-gray-600 font-sans text-xs md:text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credentials / Education */}
                <div>
                  <h4 className="text-xs font-display font-extrabold text-brand-navy uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-brand-lime" />
                    <span>Credentials & Education</span>
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-5 text-gray-500 font-sans text-xs md:text-sm">
                    {selectedLeader.education.map((item, index) => (
                      <li key={index} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Close Footer bar */}
              <div className="bg-slate-50 px-6 py-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="bg-brand-navy text-white hover:bg-brand-lime px-5 py-2.5 rounded-sm font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close Profile
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
