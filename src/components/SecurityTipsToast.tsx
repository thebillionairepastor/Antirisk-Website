import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Lightbulb, 
  ChevronRight, 
  ChevronLeft, 
  Pause, 
  Play, 
  X, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Database
} from 'lucide-react';
import { SecurityTip, securityTipsDatabase } from '../data/securityTipsData';

const ROTATION_INTERVAL = 12000; // 12 seconds per tip

export default function SecurityTipsToast() {
  const [tips, setTips] = useState<SecurityTip[]>(securityTipsDatabase);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [progress, setProgress] = useState(0);
  const [dataSource, setDataSource] = useState<string>('Internal Database');

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch tips from internal API on mount
  useEffect(() => {
    async function fetchTips() {
      try {
        const response = await fetch('/api/security-tips');
        if (response.ok) {
          const data = await response.json();
          if (data.tips && Array.isArray(data.tips) && data.tips.length > 0) {
            setTips(data.tips);
            if (data.source) {
              setDataSource(data.source);
            }
          }
        }
      } catch (err) {
        console.log('Using local security tips dataset fallback');
      }
    }
    fetchTips();
  }, []);

  // Handle auto-rotation and progress bar
  useEffect(() => {
    if (isPaused || isHovered || isDismissed || showCatalogModal || tips.length === 0) {
      setProgress(0);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 100;
    const totalSteps = ROTATION_INTERVAL / stepMs;
    let currentStep = 0;

    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      currentStep += 1;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= totalSteps) {
        setCurrentIndex((prev) => (prev + 1) % tips.length);
        currentStep = 0;
        setProgress(0);
      }
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, isHovered, isDismissed, showCatalogModal, tips.length]);

  const currentTip = tips[currentIndex] || tips[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length);
    setProgress(0);
  };

  const handleCopy = () => {
    if (!currentTip) return;
    const textToCopy = `[Anti-Risk Security Tip ${currentTip.code}] - ${currentTip.title}\nCategory: ${currentTip.category}\n\nTip: ${currentTip.tip}\n\nActionable Step: ${currentTip.actionable}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Categories for catalog modal
  const categories = ['All', ...Array.from(new Set(tips.map((t) => t.category)))];
  const filteredCatalog = selectedCategory === 'All' 
    ? tips 
    : tips.filter((t) => t.category === selectedCategory);

  return (
    <>
      {/* 1. DISMISSED / MINIMIZED FLOATING RE-OPEN BADGE */}
      {isDismissed && (
        <button
          onClick={() => setIsDismissed(false)}
          className="fixed bottom-6 left-6 z-[9990] bg-brand-navy hover:bg-slate-900 text-white px-3.5 py-2 rounded-full shadow-2xl border border-brand-lime/40 flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
          title="Click to view Daily Security Tip"
          id="security-tip-minimized-btn"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-lime"></span>
          </span>
          <ShieldAlert className="w-4 h-4 text-brand-lime group-hover:rotate-12 transition-transform" />
          <span className="font-display font-bold text-xs uppercase tracking-wider text-gray-200">
            Daily Security Tip
          </span>
          <span className="bg-brand-lime/20 text-brand-lime text-[10px] font-mono px-1.5 py-0.5 rounded-xs font-bold">
            {currentIndex + 1}/{tips.length}
          </span>
        </button>
      )}

      {/* 2. EXPANDED TOAST NOTIFICATION CARD */}
      {!isDismissed && currentTip && (
        <div
          className="fixed bottom-6 left-6 z-[9990] w-[calc(100vw-3rem)] sm:w-[410px] bg-slate-950/95 backdrop-blur-md border border-slate-800 hover:border-brand-lime/50 rounded-md shadow-2xl overflow-hidden transition-all duration-300 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="security-tip-toast-card"
        >
          {/* Subtle animated lime gradient accent on top */}
          <div className="h-1 bg-gradient-to-r from-brand-lime/20 via-brand-lime to-emerald-400 w-full relative">
            {/* Countdown progress line */}
            {!isPaused && !isHovered && (
              <div 
                className="h-full bg-brand-lime transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(204,255,0,0.8)]"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>

          <div className="p-4 sm:p-5">
            {/* Header / Meta Bar */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-xs bg-brand-lime/15 text-brand-lime font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </span>
                <span className="font-display font-extrabold text-[11px] uppercase tracking-wider text-brand-lime">
                  Daily Security Tip
                </span>
                <span className="bg-slate-800 text-gray-300 font-mono text-[10px] px-1.5 py-0.5 rounded-xs border border-slate-700">
                  {currentTip.code}
                </span>
              </div>

              {/* Controls Header */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                    isPaused ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={isPaused ? 'Resume auto-rotation' : 'Pause timer'}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xs transition-colors cursor-pointer"
                  title="Minimize tip notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category Pill & Severity */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-display font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded-xs border border-slate-800">
                {currentTip.category}
              </span>
              {currentTip.severity === 'critical' && (
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider bg-red-950/60 border border-red-800/60 px-1.5 py-0.5 rounded-xs">
                  Critical
                </span>
              )}
              {currentTip.severity === 'high' && (
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded-xs">
                  High Priority
                </span>
              )}
            </div>

            {/* Tip Title & Description */}
            <h4 className="font-display font-bold text-sm text-white mb-1.5 leading-snug flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-brand-lime flex-shrink-0" />
              <span>{currentTip.title}</span>
            </h4>

            <p className="text-xs text-gray-300 font-sans leading-relaxed mb-3">
              {currentTip.tip}
            </p>

            {/* Actionable Box */}
            <div className="bg-slate-900/90 border-l-2 border-brand-lime p-2.5 rounded-r-xs mb-3.5 text-xs text-gray-200">
              <span className="font-display font-bold text-[10px] uppercase tracking-wider text-brand-lime block mb-0.5">
                Key Actionable Step:
              </span>
              <p className="text-[11px] text-gray-300 leading-normal">
                {currentTip.actionable}
              </p>
            </div>

            {/* Bottom Footer Actions & Stepper */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-brand-lime transition-colors cursor-pointer py-1 px-1.5 rounded-xs hover:bg-slate-800"
                  title="Copy tip text"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-brand-lime" />
                      <span className="text-brand-lime font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowCatalogModal(true)}
                  className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-brand-lime transition-colors cursor-pointer py-1 px-1.5 rounded-xs hover:bg-slate-800"
                  title="Open Database Tip Catalog"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>All Tips ({tips.length})</span>
                </button>
              </div>

              {/* Stepper buttons */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono text-gray-500 mr-1">
                  {currentIndex + 1} / {tips.length}
                </span>
                <button
                  onClick={handlePrev}
                  className="p-1 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xs transition-colors cursor-pointer"
                  title="Previous Security Tip"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xs transition-colors cursor-pointer"
                  title="Next Security Tip"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. DATABASE SECURITY TIPS FULL CATALOG MODAL */}
      {showCatalogModal && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-md shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden text-white">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-lime/10 text-brand-lime rounded-xs">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight flex items-center gap-2">
                    <span>Internal Security Tips Database</span>
                    <span className="text-xs bg-brand-lime/20 text-brand-lime font-mono px-2 py-0.5 rounded-xs">
                      {tips.length} Verified Entries
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 font-sans">
                    Actionable protective protocols & tactical safety guidance curated by Anti-Risk Commanders.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCatalogModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-xs transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="p-4 border-b border-slate-800/80 bg-slate-900/90 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs text-gray-400 font-display font-bold uppercase tracking-wider flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-brand-lime" />
                Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xs text-xs font-display font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-lime text-brand-navy shadow-xs'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Modal List Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-grow divide-y divide-slate-800/60">
              {filteredCatalog.map((item, idx) => (
                <div key={item.id} className="pt-4 first:pt-0 group">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded-xs border border-brand-lime/20">
                        {item.code}
                      </span>
                      <span className="text-xs font-display font-bold text-gray-300">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        const tipIdx = tips.findIndex(t => t.id === item.id);
                        if (tipIdx !== -1) {
                          setCurrentIndex(tipIdx);
                          setIsDismissed(false);
                          setShowCatalogModal(false);
                        }
                      }}
                      className="text-xs text-brand-lime hover:underline font-display font-bold flex items-center gap-1 cursor-pointer opacity-80 group-hover:opacity-100"
                    >
                      <span>Display Toast</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <h4 className="font-display font-extrabold text-sm text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-2">
                    {item.tip}
                  </p>

                  <div className="bg-slate-950 p-2.5 rounded-xs border-l-2 border-brand-lime text-xs">
                    <span className="text-[10px] font-display font-bold text-brand-lime uppercase block mb-0.5">
                      Actionable Step:
                    </span>
                    <span className="text-gray-300">{item.actionable}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-gray-400">
              <span>Source: <strong className="text-gray-200">{dataSource}</strong></span>
              <button
                onClick={() => setShowCatalogModal(false)}
                className="px-4 py-1.5 bg-brand-lime text-brand-navy font-display font-bold rounded-xs hover:bg-lime-400 transition-colors cursor-pointer"
              >
                Close Catalog
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
