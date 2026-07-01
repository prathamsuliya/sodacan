import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden select-none">
      


      {/* Central Ambient Product Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-[#ff3f5e]/30 blur-[150px] rounded-full pointer-events-none z-[2] mix-blend-screen"></div>



      {/* Corner Markers */}
      <div className="corner-marker corner-tl"></div>
      <div className="corner-marker corner-tr"></div>
      <div className="corner-marker corner-bl"></div>
      <div className="corner-marker corner-br"></div>

      {/* Left Sidebar Markers */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-16 text-[10px] font-sans text-brand-cream/30 uppercase tracking-widest pointer-events-none z-10 hidden sm:flex">
        <span>VS</span>
        <span>E</span>
        <span>-</span>
      </div>

      {/* Main Massive Editorial Headline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-2" style={{ zIndex: 1 }}>
        
        <h1 className="font-heavy text-[26vw] md:text-[23vw] leading-[0.75] tracking-tighter text-white/10 uppercase w-full text-center">
          ZERO
        </h1>
        <h1 className="font-heavy text-[26vw] md:text-[23vw] leading-[0.75] tracking-tighter text-white/10 uppercase w-full text-center">
          BULLSHIT
        </h1>

      </div>
      
    </section>
  );
}
