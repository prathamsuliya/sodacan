import React from 'react';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0a0002] py-16 px-12 md:px-24 z-30 border-t border-brand-green/20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        
        {/* Logo */}
        <div className="text-4xl font-display font-bold italic tracking-wide text-white flex items-center">
          Organic<span className="text-2xl ml-2 text-brand-green">Splash</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[11px] font-sans font-bold tracking-widest uppercase text-white/60">
          <a href="#" className="hover:text-brand-green transition-colors">Shop</a>
          <a href="#" className="hover:text-brand-green transition-colors">Story</a>
          <a href="#" className="hover:text-brand-green transition-colors">Process</a>
          <a href="#" className="hover:text-brand-green transition-colors">Ingredients</a>
          <a href="#" className="hover:text-brand-green transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-[9px] font-sans text-white/40 tracking-wider">
          © 2026 ORGANIC SPLASH. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
}
