import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to trigger navbar solid background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-8 md:px-16 flex items-center justify-between ${
      scrolled 
        ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg' 
        : 'bg-transparent'
    }`}>
      {/* Left: WE + Bars */}
      <div className="flex items-center gap-4 cursor-pointer hover:opacity-70 transition-opacity">
        <span className="font-sans font-bold text-xs tracking-widest text-brand-cream uppercase">WE</span>
        <div className="flex gap-[3px]">
          <div className="w-[3px] h-[12px] bg-brand-cream"></div>
          <div className="w-[3px] h-[12px] bg-brand-cream"></div>
          <div className="w-[3px] h-[12px] bg-brand-cream"></div>
        </div>
      </div>

      {/* Center: Brand Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <a href="#" className="hover:scale-105 transition-transform duration-300">
          <img src="/logo.svg" alt="Brand Logo" className="h-10 md:h-12 w-auto object-contain" />
        </a>
      </div>

      {/* Right: Menu + Contact Button */}
      <div className="flex items-center gap-8">
        
        {/* Menu (Dots + Text) */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity hidden sm:flex">
          <div className="grid grid-cols-2 gap-[3px]">
            <div className="w-1 h-1 bg-brand-cream rounded-full"></div>
            <div className="w-1 h-1 bg-brand-cream rounded-full"></div>
            <div className="w-1 h-1 bg-brand-cream rounded-full"></div>
            <div className="w-1 h-1 bg-brand-cream rounded-full"></div>
          </div>
          <span className="font-sans font-semibold text-[10px] tracking-widest text-brand-cream uppercase">
            MENU
          </span>
        </div>

        {/* Contact Button */}
        <button className="bg-brand-cream text-brand-bg px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-300">
          CONTACT
        </button>
      </div>
    </nav>
  );
}
