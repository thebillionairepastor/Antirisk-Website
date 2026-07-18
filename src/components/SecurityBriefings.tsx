import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ExternalLink, 
  Globe, 
  RefreshCw, 
  Calendar, 
  Newspaper,
  Radio
} from 'lucide-react';

interface BriefingItem {
  title: string;
  summary: string;
  date: string;
  sourceUrl: string;
  sourceName: string;
}

export default function SecurityBriefings() {
  const [briefings, setBriefings] = useState<BriefingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceInfo, setSourceInfo] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchBriefings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/security-briefings');
      if (!response.ok) {
        throw new Error('Failed to retrieve intelligence feed.');
      }
      const data = await response.json();
      setBriefings(data.briefings || []);
      setSourceInfo(data.source || 'Intelligence Database');
      
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err: any) {
      console.error(err);
      setError('System temporarily unable to refresh security bulletins.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefings();
  }, []);

  return (
    <section id="security-briefings-section" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Dynamic Background Grid Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-brand-lime font-mono font-bold text-xs uppercase tracking-widest">
                LIVE INTEL FEED
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-none">
              Nigeria Security Briefings
            </h2>
            <p className="text-slate-400 font-sans text-xs md:text-sm max-w-xl mt-3">
              Real-time situational intelligence and regional risk assessments powered by Gemini search-grounding technology to support your corporate logistic safety.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider hidden sm:inline-block">
                Last Sync: {lastUpdated} ({sourceInfo})
              </span>
            )}
            <button
              onClick={fetchBriefings}
              disabled={loading}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-brand-lime/50 text-white hover:text-brand-lime px-4 py-2 text-xs font-bold font-mono tracking-wider rounded-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              RE-SYNC
            </button>
          </div>
        </div>

        {/* Dynamic Loading, Error, or Grid State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="bg-slate-900/50 border border-slate-900 p-6 rounded-sm h-[260px] flex flex-col justify-between animate-pulse"
              >
                <div>
                  <div className="h-4 bg-slate-800 w-1/4 rounded mb-4" />
                  <div className="h-6 bg-slate-800 w-3/4 rounded mb-3" />
                  <div className="h-4 bg-slate-800 w-full rounded mb-2" />
                  <div className="h-4 bg-slate-800 w-5/6 rounded" />
                </div>
                <div className="h-8 bg-slate-800 w-1/3 rounded-sm" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-slate-900/40 border border-red-950 p-8 rounded-sm text-center max-w-2xl mx-auto">
            <ShieldAlert className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="font-display font-extrabold text-sm uppercase tracking-wide text-red-400">
              Intelligence Stream Blocked
            </p>
            <p className="text-xs text-slate-400 font-sans mt-2 mb-4">
              {error}
            </p>
            <button
              onClick={fetchBriefings}
              className="px-4 py-2 text-xs font-bold bg-slate-800 border border-slate-700 hover:border-brand-lime text-white rounded-sm transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {briefings.map((brief, index) => (
              <div 
                key={index}
                className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-900 hover:border-slate-800 p-6 rounded-sm flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-brand-lime/10 text-brand-lime font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-brand-lime/20">
                      {brief.sourceName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {brief.date}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-extrabold text-[15px] leading-snug tracking-tight text-white group-hover:text-brand-lime transition-colors line-clamp-2 mb-3">
                    {brief.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed line-clamp-3">
                    {brief.summary}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Sitrep Verified
                  </span>
                  <a
                    href={brief.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-lime hover:text-white text-[11px] font-mono font-bold tracking-wider transition-colors uppercase group-pointer"
                  >
                    READ SOURCE
                    <ExternalLink className="w-3 h-3 text-brand-lime transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Source ground accreditation notice */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 bg-slate-900/20 py-2.5 px-4 rounded border border-slate-900/50 max-w-lg mx-auto">
          <Newspaper className="w-3.5 h-3.5 text-brand-lime" />
          <span>Verified via Google Search Grounding to ensure accuracy.</span>
        </div>
      </div>
    </section>
  );
}
