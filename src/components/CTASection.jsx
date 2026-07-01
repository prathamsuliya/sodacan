import React from 'react';

export default function CTASection() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center z-10 select-none bg-transparent">
      {/* Background Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#140105] to-transparent z-0 pointer-events-none opacity-80"></div>
      
      <div className="relative z-20 flex flex-col items-center max-w-4xl px-6 pointer-events-auto mt-[20vh]">
        <h4 className="font-sans font-bold text-[12px] tracking-[0.3em] text-brand-green uppercase mb-6">
          The Final Verdict / [04]
        </h4>
        
        <h2 className="text-6xl md:text-[7rem] font-heavy font-black italic uppercase leading-[0.85] tracking-tighter text-white mb-12" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
          Get Your<br/>Raw Energy.
        </h2>
        
        <button className="group relative px-12 py-5 bg-brand-green text-white font-heavy font-black italic tracking-widest uppercase text-xl md:text-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,63,94,0.6)] border-2 border-transparent hover:border-white/50">
          <span className="relative z-10">Shop Now</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
        </button>
      </div>
    </section>
  );
}
