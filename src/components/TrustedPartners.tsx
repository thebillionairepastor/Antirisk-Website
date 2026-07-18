import React from 'react';
import { 
  Shield, 
  Building, 
  Building2, 
  Cpu, 
  Globe, 
  Server, 
  Layers, 
  Briefcase 
} from 'lucide-react';

interface Partner {
  name: string;
  industry: string;
  icon: React.ComponentType<{ className?: string }>;
}

const partners: Partner[] = [
  { name: 'Apex Logistics', industry: 'Global Transport', icon: Globe },
  { name: 'Vanguard Holdings', industry: 'Financial Assets', icon: Shield },
  { name: 'Centurion Bank', industry: 'High-Value Finance', icon: Building },
  { name: 'Summit Medical', industry: 'Biotech & Health', icon: Layers },
  { name: 'Elysium Residential', industry: 'Luxury Estates', icon: Building2 },
  { name: 'Prism Tech Labs', industry: 'Data Centers', icon: Server },
  { name: 'Oracle Energy', industry: 'Infrastructure', icon: Cpu },
  { name: 'Frontier Group', industry: 'Maritime Logistics', icon: Briefcase },
];

export default function TrustedPartners() {
  // Duplicate the list of partners to ensure a seamless infinite loop
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section id="trusted-partners-section" className="py-16 bg-slate-50 border-y border-gray-200 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 mb-8 text-center">
        <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest block mb-2">
          Corporate Relations
        </span>
        <h3 className="text-2xl md:text-3xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">
          Securing Industry Pioneers
        </h3>
        <p className="text-gray-500 font-sans text-xs md:text-sm max-w-xl mx-auto mt-2">
          From high-frequency trade centers to luxury estates, our elite personnel and installations safeguard leading operations nationwide.
        </p>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden py-4 bg-white border-y border-gray-100 select-none">
        {/* Left & Right Gradients for Fade Effect */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Inner */}
        <div className="animate-marquee gap-8 md:gap-12 flex items-center pr-8 md:pr-12">
          {marqueeItems.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 px-5 py-3.5 rounded-sm transition-all duration-300 group cursor-pointer flex-shrink-0"
              >
                <div className="w-9 h-9 rounded bg-brand-navy text-brand-lime flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <IconComponent className="w-4 h-4 transition-colors group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="font-display font-extrabold text-xs text-brand-navy tracking-tight uppercase group-hover:text-brand-lime transition-colors">
                    {partner.name}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono font-medium tracking-wide">
                    {partner.industry}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
