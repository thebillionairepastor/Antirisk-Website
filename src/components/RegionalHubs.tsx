import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Search, 
  Copy, 
  Check, 
  ShieldCheck, 
  Building, 
  Navigation, 
  Activity, 
  Award,
  ChevronRight,
  Send,
  PhoneCall
} from 'lucide-react';

interface Station {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  commander: string;
  fleetCount: number;
  guardCount: number;
  specialization: string;
  coordinates: { x: number; y: number }; // SVG map coordinates
  status: 'Operational' | 'Alert' | 'Deploying';
}

const stations: Station[] = [
  {
    id: 'lagos',
    name: 'Lagos Headquarters & Command Center',
    city: 'Lagos',
    region: 'South-West Sector',
    address: 'Plot 15, Alhaji Hussein Street, Ikeja, Lagos State, Nigeria.',
    phone: '+234 805 731 5673',
    email: 'lagos.ops@antiriskng.com',
    hours: '8:00 AM - 6:00 PM (Mon-Sat)',
    commander: 'Commander Samuel Adebayo',
    fleetCount: 24,
    guardCount: 150,
    specialization: 'Maritime Security Logistics, Executive Escorts, Vulnerability Consulting',
    coordinates: { x: 120, y: 210 },
    status: 'Operational'
  },
  {
    id: 'abuja',
    name: 'Abuja Federal Capital Territory Command',
    city: 'Abuja',
    region: 'North-Central Sector',
    address: 'Suite 4A, Garki II Commercial Plaza, Area 11, Garki, Abuja, Nigeria.',
    phone: '+234 802 112 4432',
    email: 'abuja.ops@antiriskng.com',
    hours: '8:30 AM - 5:30 PM (Mon-Fri)',
    commander: 'Superintendent Ibrahim Yusuf',
    fleetCount: 12,
    guardCount: 80,
    specialization: 'Diplomatic Convoy Protection, VIP Close Protection, Embassy Audits',
    coordinates: { x: 250, y: 120 },
    status: 'Operational'
  },
  {
    id: 'calabar',
    name: 'Calabar South-South Regional Command',
    city: 'Calabar',
    region: 'South-South Sector',
    address: 'Suite 12, Ndidem Usang Iso Road, Calabar, Cross River State, Nigeria.',
    phone: '+234 805 731 5680',
    email: 'calabar.ops@antiriskng.com',
    hours: '8:00 AM - 5:00 PM (Mon-Fri)',
    commander: 'Captain Effiong Edet',
    fleetCount: 8,
    guardCount: 50,
    specialization: 'Inland Waterway Security, Offshore Vessel Protection, Port Logistics',
    coordinates: { x: 320, y: 240 },
    status: 'Operational'
  },
  {
    id: 'oyo',
    name: 'Oyo Western Command Sector Office',
    city: 'Oyo',
    region: 'Western Sector',
    address: 'Sector 3, Ring Road Industrial Estate, Ibadan, Oyo State, Nigeria.',
    phone: '+234 802 112 4435',
    email: 'oyo.ops@antiriskng.com',
    hours: '8:00 AM - 5:30 PM (Mon-Fri)',
    commander: 'Assistant Commander Segun Ojo',
    fleetCount: 10,
    guardCount: 65,
    specialization: 'Industrial Complex Guarding, Agricultural Perimeter Defense, Patrols',
    coordinates: { x: 135, y: 195 },
    status: 'Operational'
  },
  {
    id: 'abia',
    name: 'Abia Eastern Region Command Hub',
    city: 'Abia',
    region: 'South-East Sector',
    address: 'Aba-Owerri Road Express Sector, Aba, Abia State, Nigeria.',
    phone: '+234 809 334 7768',
    email: 'abia.ops@antiriskng.com',
    hours: '8:00 AM - 5:00 PM (Mon-Sat)',
    commander: 'Commander Kenneth Nwachukwu',
    fleetCount: 14,
    guardCount: 90,
    specialization: 'Commercial Center Protection, High-Value Asset Transit, Escort Logistics',
    coordinates: { x: 290, y: 220 },
    status: 'Operational'
  }
];

export default function RegionalHubs() {
  const [activeStationId, setActiveStationId] = useState<string>('lagos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Quick request state
  const [dispatchName, setDispatchName] = useState('');
  const [dispatchPhone, setDispatchPhone] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredStations = stations.filter(station => 
    station.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStation = stations.find(s => s.id === activeStationId) || stations[0];

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dispatchName && dispatchPhone) {
      setDispatchSuccess(true);
      setTimeout(() => {
        setDispatchSuccess(false);
        setDispatchName('');
        setDispatchPhone('');
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-gray-150 relative overflow-hidden" id="regional-hubs-interactive">
      <div className="absolute inset-0 bg-slate-50/50 -z-10" />
      
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-lime font-display font-bold text-xs uppercase tracking-widest block mb-1">
            Tactical Network
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-brand-navy uppercase">
            Interactive Regional Hubs
          </h2>
          <p className="text-gray-500 font-sans text-xs md:text-sm mt-3 leading-relaxed">
            Anti-Risk maintains active response centers, vetted rapid patrol units, and emergency communication desks across key commerce regions in Nigeria. Select a station to access direct local contacts.
          </p>
        </div>

        {/* Directory Search & Filters */}
        <div className="w-full max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search station (e.g. Lagos, Abuja, Abia...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-gray-200 focus:border-brand-lime rounded-sm outline-none font-sans text-xs md:text-sm text-brand-navy shadow-xs placeholder:text-gray-400 transition-colors"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3 w-5 h-5 text-gray-400 hover:text-brand-navy text-[10px] font-bold font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: STATS & MAP VISUALIZATION (7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* INTERACTIVE SVG MAP */}
            <div className="bg-slate-900 text-white rounded-sm border border-slate-800 p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-display font-bold text-brand-lime bg-white/5 border border-white/10 px-2 py-1 rounded-xs uppercase tracking-widest">
                  Live Network Map
                </span>
              </div>
              
              <div className="flex justify-center items-center py-6">
                <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center">
                  <svg viewBox="0 0 500 350" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Nigeria Path Simulation */}
                    <path
                      d="M 50 150 C 70 80, 150 40, 250 50 C 350 40, 420 80, 450 120 C 470 170, 440 250, 380 280 C 310 320, 250 300, 200 290 C 120 280, 70 240, 50 180 Z"
                      fill="#111c30"
                      stroke="#1e2d4a"
                      strokeWidth="2"
                    />

                    {/* Laser Connections from selected/all */}
                    {stations.map(station => (
                      <line
                        key={`line-${station.id}`}
                        x1={stations[0].coordinates.x} // Connected to Lagos HQ
                        y1={stations[0].coordinates.y}
                        x2={station.coordinates.x}
                        y2={station.coordinates.y}
                        stroke={activeStationId === station.id ? '#8cc63f' : '#1e2d4a'}
                        strokeWidth={activeStationId === station.id ? '2' : '0.5'}
                        strokeDasharray={activeStationId === station.id ? 'none' : '4 4'}
                        className="transition-all duration-500"
                      />
                    ))}

                    {/* Network Coordinates */}
                    {stations.map(station => {
                      const isActive = activeStationId === station.id;
                      return (
                        <g 
                          key={station.id} 
                          className="cursor-pointer group"
                          onClick={() => setActiveStationId(station.id)}
                        >
                          {/* Outer pulse */}
                          <circle 
                            cx={station.coordinates.x} 
                            cy={station.coordinates.y} 
                            r={isActive ? 16 : 8} 
                            fill={isActive ? '#8cc63f' : '#dc2626'} 
                            fillOpacity={isActive ? '0.2' : '0.1'} 
                            className={isActive ? 'animate-ping' : ''}
                            style={{ transformOrigin: `${station.coordinates.x}px ${station.coordinates.y}px` }}
                          />
                          <circle 
                            cx={station.coordinates.x} 
                            cy={station.coordinates.y} 
                            r={isActive ? 8 : 5} 
                            fill={isActive ? '#8cc63f' : '#4b5563'} 
                            className="group-hover:scale-125 transition-transform duration-300"
                            style={{ transformOrigin: `${station.coordinates.x}px ${station.coordinates.y}px` }}
                          />
                          <circle 
                            cx={station.coordinates.x} 
                            cy={station.coordinates.y} 
                            r="2" 
                            fill="#ffffff" 
                          />
                          {/* Label */}
                          <text 
                            x={station.coordinates.x} 
                            y={station.coordinates.y - (isActive ? 14 : 10)} 
                            textAnchor="middle" 
                            className={`text-[9px] font-display font-extrabold select-none transition-colors duration-300 ${
                              isActive ? 'fill-brand-lime font-black' : 'fill-gray-400 font-semibold'
                            }`}
                          >
                            {station.city.toUpperCase()}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Selection info strip */}
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-lime animate-pulse" />
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    HQ Link: <span className="text-white font-bold">{selectedStation.city} Center</span>
                  </span>
                </div>
                <div className="text-[10px] font-mono text-gray-500">
                  Latitude & Longitude verified for Immediate dispatch
                </div>
              </div>
            </div>

            {/* QUICK STATS FOR SELECTED HUB */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-gray-150 p-4 rounded-sm">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">Commander in Charge</span>
                <p className="text-xs md:text-sm font-display font-extrabold text-brand-navy">{selectedStation.commander}</p>
              </div>
              <div className="bg-slate-50 border border-gray-150 p-4 rounded-sm">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">Tactical Force Capacity</span>
                <p className="text-xs md:text-sm font-display font-extrabold text-brand-navy">{selectedStation.guardCount}+ Vetted Officers</p>
              </div>
              <div className="bg-slate-50 border border-gray-150 p-4 rounded-sm">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">Active Response Fleet</span>
                <p className="text-xs md:text-sm font-display font-extrabold text-brand-navy">{selectedStation.fleetCount} Patrol Units</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: HUB SELECTOR & CONTACT DIRECTORY (5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* HUB CARDS LIST */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                Active Tactical Locations ({filteredStations.length})
              </span>
              
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {filteredStations.map((station) => {
                  const isActive = activeStationId === station.id;
                  return (
                    <button
                      key={station.id}
                      onClick={() => setActiveStationId(station.id)}
                      className={`w-full text-left p-3 rounded-sm border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isActive 
                          ? 'bg-brand-navy text-white border-brand-lime' 
                          : 'bg-white text-gray-800 border-gray-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive ? 'bg-brand-lime text-brand-navy' : 'bg-slate-100 text-brand-navy'
                        }`}>
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-xs md:text-sm tracking-wide">
                            {station.city} Office
                          </p>
                          <p className={`text-[10px] font-sans ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                            {station.region}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-xs ${
                          isActive ? 'bg-brand-lime/15 text-brand-lime' : 'bg-green-100 text-green-700'
                        }`}>
                          Active
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-brand-lime' : 'text-gray-400'}`} />
                      </div>
                    </button>
                  );
                })}

                {filteredStations.length === 0 && (
                  <div className="text-center py-8 bg-slate-50 border border-dashed rounded-sm">
                    <p className="text-xs text-gray-500">No active stations match your search.</p>
                  </div>
                )}
              </div>
            </div>

            {/* SELECTED HUB DETAIL BOX */}
            <div className="bg-slate-900 text-white rounded-sm border border-slate-800 p-6 shadow-md space-y-5 relative">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <span className="text-[9px] font-display font-bold text-brand-lime uppercase tracking-widest">
                    Selected Command Point
                  </span>
                  <h3 className="text-sm md:text-base font-display font-extrabold text-white uppercase tracking-wider mt-0.5">
                    {selectedStation.name}
                  </h3>
                </div>
                <div className="bg-brand-lime/10 text-brand-lime px-2 py-0.5 rounded-xs text-[9px] font-mono uppercase font-bold tracking-wider">
                  Secure Hub
                </div>
              </div>

              {/* Station Specifics */}
              <div className="space-y-4 text-xs">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-lime flex-shrink-0 mt-0.5" />
                  <div className="flex-grow space-y-1">
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      {selectedStation.address}
                    </p>
                    <button
                      onClick={() => handleCopy(selectedStation.address, selectedStation.id)}
                      className="text-[10px] font-display font-bold text-brand-lime hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === selectedStation.id ? (
                        <>
                          <Check className="w-3 h-3 text-brand-lime" />
                          <span>Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Address Details</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Direct Hotline */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-lime flex-shrink-0" />
                  <a 
                    href={`tel:${selectedStation.phone.replace(/\s+/g, '')}`} 
                    className="font-sans text-xs text-gray-300 hover:text-brand-lime transition-colors"
                  >
                    Direct: <strong className="text-white underline">{selectedStation.phone}</strong>
                  </a>
                </div>

                {/* Operational Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-lime flex-shrink-0" />
                  <a 
                    href={`mailto:${selectedStation.email}`} 
                    className="font-sans text-xs text-gray-300 hover:text-brand-lime transition-colors"
                  >
                    Ops Dispatch: <span className="text-white underline">{selectedStation.email}</span>
                  </a>
                </div>

                {/* Operations Hours */}
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-lime flex-shrink-0" />
                  <span className="font-sans text-xs text-gray-300">
                    Sentry Desk Hours: <strong className="text-white">{selectedStation.hours}</strong>
                  </span>
                </div>

                {/* Services Specialization */}
                <div className="bg-white/5 border border-white/5 p-3.5 rounded-sm space-y-1.5">
                  <span className="text-[10px] font-display font-bold text-brand-lime uppercase tracking-widest flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    Specialized Capability
                  </span>
                  <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                    {selectedStation.specialization}
                  </p>
                </div>
              </div>
            </div>

            {/* HUB DIRECT DISPATCH MINI-FORM */}
            <div className="bg-white border border-gray-200 p-5 rounded-sm shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
                <div className="w-7 h-7 rounded-full bg-brand-lime/10 text-brand-lime flex items-center justify-center">
                  <Navigation className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs md:text-sm text-brand-navy uppercase tracking-wider">
                    Quick Dispatch Request
                  </h4>
                  <p className="text-[10px] text-gray-400 font-sans">
                    Secure alert to our <strong className="text-brand-navy">{selectedStation.city}</strong> station
                  </p>
                </div>
              </div>

              {dispatchSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-sm text-center space-y-2">
                  <p className="font-display font-bold text-xs uppercase tracking-wider text-green-700">Request Sent Successfully</p>
                  <p className="text-[11px] font-sans">
                    The {selectedStation.city} field dispatcher has been alerted. We will call you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDispatchSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={dispatchName}
                      onChange={(e) => setDispatchName(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-brand-lime rounded-xs px-3 py-2.5 font-sans text-xs outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number"
                      value={dispatchPhone}
                      onChange={(e) => setDispatchPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-brand-lime rounded-xs px-3 py-2.5 font-sans text-xs outline-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-brand-navy hover:bg-brand-lime text-white hover:text-brand-navy py-2.5 rounded-sm font-display font-bold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Signal Dispatch Desk</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
