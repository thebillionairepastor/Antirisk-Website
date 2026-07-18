import React, { useState } from 'react';
import { PhoneCall, Clock, Mail, Search, Menu, X, ChevronDown, Share2, Facebook, Twitter, Linkedin, HelpCircle } from 'lucide-react';
import { Page } from '../types';
import Logo from './Logo';
import { servicesData } from '../data/servicesData';
import { careersData } from '../data/careersData';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

export default function Header({ currentPage, setCurrentPage, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [careersDropdownOpen, setCareersDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Home', value: 'home' as Page },
    { label: 'About Us', value: 'about' as Page },
    { label: 'Our Services', value: 'services' as Page, hasDropdown: true },
    { label: 'Guard Training', value: 'training' as Page },
    { label: 'Careers', value: 'careers' as Page, hasDropdown: true },
    { label: 'Contact Us', value: 'contact' as Page },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCareersDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="w-full bg-white relative z-50 shadow-sm" id="site-header">
      {/* 1. TOP INFO BAR */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center justify-between">
          <Logo variant="dark" className="cursor-pointer" onClick={() => handleNavClick('home')} />
          
          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Info Blocks (Hotline, Hours, Email) */}
        <div className="hidden md:flex flex-row items-center gap-6 xl:gap-8">
          {/* Hotline */}
          <a href="tel:+2348057315673" className="flex items-start gap-3 group" id="info-hotline">
            <div className="w-10 h-10 bg-brand-lime/10 rounded-full flex items-center justify-center text-brand-lime group-hover:bg-brand-lime group-hover:text-white transition-all duration-300">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Hotline Number</p>
              <p className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-brand-lime transition-colors">
                +234 805 731 5673
              </p>
            </div>
          </a>

          {/* Office Hours */}
          <div className="flex items-start gap-3" id="info-hours">
            <div className="w-10 h-10 bg-brand-lime/10 rounded-full flex items-center justify-center text-brand-lime">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Office Hours</p>
              <p className="text-sm font-bold text-gray-800 tracking-tight">
                8:00-6:00 <span className="text-xs text-gray-500 font-medium">{"{Mon-Sat}"}</span>
              </p>
            </div>
          </div>

          {/* Email Us */}
          <a href="mailto:info@antiriskng.com" className="flex items-start gap-3 group" id="info-email">
            <div className="w-10 h-10 bg-brand-lime/10 rounded-full flex items-center justify-center text-brand-lime group-hover:bg-brand-lime group-hover:text-white transition-all duration-300">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Email Us</p>
              <p className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-brand-lime transition-colors">
                info@antiriskng.com
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* 2. SLANTED NAVIGATION BAR (Desktop Only) */}
      <div className="hidden md:block w-full bg-transparent border-t border-gray-100" id="desktop-navbar">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-stretch">
          {/* Left Social Area (White background, slanted on right) */}
          <div className="bg-white py-2 pr-6 flex items-center gap-2 nav-diagonal-right border-r border-gray-50 z-10">
            <div className="w-8 h-8 rounded-full bg-brand-lime text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <Share2 className="w-4 h-4" />
            </div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-lime hover:border-brand-lime flex items-center justify-center transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-lime hover:border-brand-lime flex items-center justify-center cursor-pointer transition-all">
              <span className="text-xs font-bold font-sans">G+</span>
            </div>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-lime hover:border-brand-lime flex items-center justify-center transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-lime hover:border-brand-lime flex items-center justify-center transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Right Menu Area (Lime background, slanted on left - non-clipping for children dropdowns) */}
          <div className="flex-1 text-white flex items-stretch justify-between pl-6 py-0 -ml-4 relative">
            {/* Background Slant (Uses clip-path but doesn't wrap the children) */}
            <div className="absolute inset-0 bg-brand-lime nav-diagonal-left z-0 pointer-events-none" />
            
            {/* Interactive Nav Content Layer */}
            <div className="relative z-10 flex-1 flex items-stretch justify-between">
              {/* Nav Links */}
              <nav className="flex items-stretch">
                {navItems.map((item) => {
                  if (item.hasDropdown) {
                    const isServices = item.value === 'services';
                    const isOpen = isServices ? servicesDropdownOpen : careersDropdownOpen;
                    const setOpen = isServices ? setServicesDropdownOpen : setCareersDropdownOpen;
                    const dataList = isServices ? servicesData : careersData;
                    const isCurrentActive = isServices 
                      ? (currentPage === 'services' || currentPage.startsWith('service_'))
                      : (currentPage === 'careers' || currentPage.startsWith('career_'));

                    return (
                      <div
                        key={item.value}
                        className="relative flex items-center h-full"
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        id={`${item.value}-desktop-dropdown-container`}
                      >
                        <button
                          onClick={() => {
                            handleNavClick(item.value);
                          }}
                          className={`px-5 py-4 h-full font-display font-bold tracking-wide text-sm flex items-center gap-1 transition-all duration-300 cursor-pointer relative ${
                            isCurrentActive
                              ? 'text-white font-extrabold'
                              : 'hover:bg-black/10 text-white/95 hover:text-white'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          {isCurrentActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-1 bg-white"></span>
                          )}
                        </button>

                        {/* Dropdown menu matching attached image exactly */}
                        {isOpen && (
                          <div className="absolute top-full left-0 w-80 bg-white shadow-2xl border border-gray-200 flex flex-col py-1 z-50 max-h-[85vh] overflow-y-auto animate-fade-in" id={`${item.value}-desktop-dropdown`}>
                            {/* "All" Link at the top for complete accessibility */}
                            <button
                              onClick={() => handleNavClick(item.value)}
                              className="px-5 py-3 text-left text-xs font-bold text-brand-navy uppercase tracking-wider hover:bg-slate-50 hover:text-brand-lime transition-all border-b border-dashed border-gray-200"
                            >
                              {isServices ? 'All Security Services' : 'All Careers & Recruitment'}
                            </button>
                            {dataList.map((dataItem: any) => {
                              const isActive = currentPage === dataItem.pageKey;
                              return (
                                <button
                                  key={dataItem.pageKey}
                                  onClick={() => handleNavClick(dataItem.pageKey)}
                                  className={`px-5 py-4 text-left font-sans text-[13px] font-semibold transition-all duration-200 flex items-center justify-between border-b border-dashed border-gray-200 last:border-0 hover:bg-slate-50 cursor-pointer leading-normal ${
                                    isActive 
                                      ? 'text-brand-lime font-bold' 
                                      : 'text-gray-800 hover:text-brand-lime'
                                  }`}
                                >
                                  <span>{dataItem.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.value}
                      onClick={() => handleNavClick(item.value)}
                      className={`px-5 py-4 font-display font-bold tracking-wide text-sm transition-all duration-300 cursor-pointer relative ${
                        currentPage === item.value
                          ? 'text-white font-extrabold'
                          : 'hover:bg-black/10 text-white/95 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {currentPage === item.value && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-white"></span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Right Search Action */}
              <div className="flex items-center pr-6">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-1 bg-white/20 rounded-md px-2 py-1">
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-white placeholder-white/60 outline-none text-xs w-40"
                      autoFocus
                    />
                    <button type="submit" className="text-white hover:text-brand-lime">
                      <Search className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => setSearchOpen(false)} className="text-white/60 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </form>
                ) : (
                  <button
                    id="search-button"
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-white hover:text-brand-lime hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER (Responsive Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end md:hidden animate-fade-in" id="mobile-drawer">
          {/* Backdrop Closer */}
          <div className="absolute inset-0" onClick={() => setMobileMenuOpen(false)}></div>
          
          {/* Drawer Body */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col p-6 z-10 animate-slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <Logo variant="dark" className="scale-90 origin-left" />
              <button
                id="close-mobile-menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-2.5 text-base font-bold font-display mb-8 max-h-[50vh] overflow-y-auto pr-1" id="mobile-navigation-links">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  const isServices = item.value === 'services';
                  const isCurrentActive = isServices 
                    ? (currentPage === 'services' || currentPage.startsWith('service_'))
                    : (currentPage === 'careers' || currentPage.startsWith('career_'));
                  const dataList = isServices ? servicesData : careersData;

                  return (
                    <div key={item.value} className="flex flex-col gap-1">
                      <button
                        onClick={() => handleNavClick(item.value)}
                        className={`text-left py-2 px-4 rounded-md transition-all flex items-center justify-between cursor-pointer w-full ${
                          isCurrentActive
                            ? 'bg-brand-navy text-white font-extrabold'
                            : 'hover:bg-gray-50 text-gray-800 font-semibold'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      </button>
                      <div className="pl-4 flex flex-col gap-1.5 border-l-2 border-brand-lime/30 py-1 ml-4 mt-1">
                        <button
                          onClick={() => handleNavClick(item.value)}
                          className="text-left py-1 text-xs font-bold text-brand-lime uppercase tracking-wide hover:text-brand-navy cursor-pointer"
                        >
                          {isServices ? 'All Security Services' : 'All Careers & Recruitment'}
                        </button>
                        {dataList.map((dataItem: any) => (
                          <button
                            key={dataItem.pageKey}
                            onClick={() => handleNavClick(dataItem.pageKey)}
                            className={`text-left py-1 text-[13px] font-sans font-medium hover:text-brand-lime cursor-pointer ${
                              currentPage === dataItem.pageKey ? 'text-brand-lime font-bold' : 'text-gray-500'
                            }`}
                          >
                            {dataItem.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return (
                  <button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`text-left py-2.5 px-4 rounded-md transition-all cursor-pointer ${
                      currentPage === item.value
                        ? 'bg-brand-lime text-white'
                        : 'hover:bg-gray-50 text-gray-800 font-semibold'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Info Elements */}
            <div className="border-t border-gray-100 pt-6 mt-auto flex flex-col gap-4 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-brand-lime" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Hotline Number</p>
                  <a href="tel:+2348057315673" className="font-bold text-gray-800 text-sm hover:text-brand-lime transition-colors">
                    +234 805 731 5673
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-lime" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Office Hours</p>
                  <p className="font-bold text-gray-800">8:00-6:00 (Mon-Sat)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-lime" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Email Us</p>
                  <a href="mailto:info@antiriskng.com" className="font-bold text-gray-800 hover:text-brand-lime transition-colors">
                    info@antiriskng.com
                  </a>
                </div>
              </div>

              {/* Mobile Social Area */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 font-medium mr-2">Share on:</span>
                <a href="https://facebook.com" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-lime hover:border-brand-lime transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-lime hover:border-brand-lime transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-lime hover:border-brand-lime transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
