import React from 'react';
import { Leaf, Droplet, Zap, Star } from 'lucide-react';

const stages = [
  {
    title: "DOUBLE\nLITCHI",
    description: "An exotic explosion. An intense recipe\nlychee reminiscent of the flavors of tropical Asia.",
    icon: Leaf
  },
  {
    title: "NATURAL\nENERGY",
    description: "Powered by natural caffeine and guarana.\nClean energy without the crash or jitters.",
    icon: Zap
  },
  {
    title: "ZERO\nBULLSHIT",
    description: "No artificial flavors. No synthetic colors.\nJust pure organic ingredients you can trust.",
    icon: Droplet
  },
  {
    title: "PURE\nREFRESH",
    description: "Lightly carbonated for the perfect crispness.\nYour ultimate thirst-quenching companion.",
    icon: Star
  }
];

export default function Hero({ activeStage = 0 }) {
  return (
    <section className="fixed inset-0 w-full h-full flex flex-col justify-center items-center pointer-events-none select-none z-40">
      
      {/* Central Ambient Product Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-[#ff3f5e]/30 blur-[150px] rounded-full pointer-events-none z-[2] mix-blend-screen"></div>

      {/* Corner Markers */}
      <div className="corner-marker corner-tl"></div>
      <div className="corner-marker corner-tr"></div>
      <div className="corner-marker corner-bl"></div>
      <div className="corner-marker corner-br"></div>

      {/* Left Sidebar Markers (VS, E, -, L, L) */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-12 text-brand-cream/30 text-[10px] tracking-widest font-sans font-bold">
        <span>VS</span>
        <span>E</span>
        <span>-</span>
        <span>L</span>
        <span>L</span>
      </div>

      {/* Right Sidebar Indicators / Markers */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-brand-cream/30 text-[10px] tracking-widest font-sans font-bold opacity-30 md:opacity-100">
        <span>L</span>
        <span>E</span>
        <span>-</span>
        <span>H</span>
        <span>I</span>
      </div>

      {/* Dynamic Content Container */}
      <div className="absolute inset-0 w-full h-full max-w-[1600px] mx-auto px-12 xl:px-24 flex items-center justify-between">
        
        {/* Left Side: Dynamic Text */}
        <div className="relative w-1/2 md:w-1/3 flex flex-col justify-center h-[300px]">
          {stages.map((stage, index) => (
            <div 
              key={index}
              className={`absolute top-1/2 -translate-y-1/2 left-0 w-full transition-all duration-700 ease-out ${
                activeStage === index 
                  ? 'opacity-100 translate-y-[-50%] scale-100 blur-none pointer-events-auto' 
                  : 'opacity-0 translate-y-[0%] scale-95 blur-sm pointer-events-none'
              }`}
            >
              <h1 className="hero-title font-heavy text-5xl md:text-7xl lg:text-8xl leading-[0.85] text-brand-accent italic mb-6">
                {stage.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h1>
              
              <div className="relative pl-4 border-l border-brand-cream/20">
                <p className="font-sans text-brand-cream/80 text-sm md:text-base leading-relaxed max-w-sm">
                  {stage.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Navigation Icons */}
        <div className="relative z-50 flex flex-col gap-6 pointer-events-auto mr-0 md:mr-16 lg:mr-24">
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            const isActive = activeStage === index;
            return (
              <div 
                key={index} 
                className="flex items-center justify-center relative cursor-pointer group"
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute right-full mr-4 flex gap-1 items-center">
                    <div className="w-1 h-1 bg-brand-cream rounded-full"></div>
                    <div className="w-1 h-1 bg-brand-cream rounded-full"></div>
                    <div className="w-1 h-1 bg-brand-cream rounded-full"></div>
                  </div>
                )}
                
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-full border border-brand-cream/30 flex items-center justify-center transition-all duration-500 ${
                  isActive 
                    ? 'bg-brand-cream/10 border-brand-cream scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-transparent group-hover:border-brand-cream/60 group-hover:scale-105'
                }`}>
                  <IconComponent 
                    size={isActive ? 22 : 18} 
                    className={`transition-all duration-500 ${
                      isActive ? 'text-brand-accent' : 'text-brand-cream/50 group-hover:text-brand-cream/80'
                    }`} 
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Huge Background Typography (ZERO BULLSHIT vibe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center pointer-events-none -z-10 opacity-[0.04]">
        <h2 className="font-heavy text-[16vw] leading-[0.8] tracking-tighter text-brand-cream whitespace-nowrap">ZERO</h2>
        <h2 className="font-heavy text-[16vw] leading-[0.8] tracking-tighter text-brand-cream whitespace-nowrap -mt-[2vw]">BULLSHIT</h2>
      </div>

    </section>
  );
}
