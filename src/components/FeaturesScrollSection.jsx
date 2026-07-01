import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    badge: "ARTIFICIAL FLAVORS",
    title: "DOUBLE\nLITCHI",
    desc: "An exotic explosion. An intense recipe lychee reminiscent of the flavors of tropical Asia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  {
    id: 2,
    badge: "SYNTHETIC CAFFEINE",
    title: "PURE\nCAFFEINE",
    desc: "Clean energy boost. Sourced from natural guarana for a smooth lift without the crash.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.866 8.21 8.21 0 003.001 2.479z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    )
  },
  {
    id: 3,
    badge: "11G DE SUCRES",
    title: "MOINS\nDE SUCRE",
    desc: "A less sweet energy drink, with exclusively cane sugar, chosen for its plant origin and its character in the mouth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
  },
  {
    id: 4,
    badge: "FATIGUE & CRASH",
    title: "VITAMIN\nB COMPLEX",
    desc: "Essential recovery. Fortified with complex vitamins to keep you focused all day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  }
];

export default function FeaturesScrollSection() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    let activeIndex = 0;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // self.progress goes from 0 to 1 over the scroll distance.
        // We have 4 features.
        // 0.00 - 0.25 -> index 0
        // 0.25 - 0.50 -> index 1
        // 0.50 - 0.75 -> index 2
        // 0.75 - 1.00 -> index 3
        const index = Math.min(
          features.length - 1,
          Math.floor(self.progress * features.length)
        );
        
        if (index !== activeIndex) {
          activeIndex = index;
          activate(index);
        }
      }
    });

    function activate(index) {
      features.forEach((_, i) => {
        const textEl = textRefs.current[i];
        const iconEl = iconRefs.current[i];
        
        if (i === index) {
          gsap.to(textEl, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: true });
          gsap.to(iconEl, { 
            opacity: 1, 
            scale: 1.15, 
            borderColor: "var(--brand-accent)", 
            color: "white", 
            backgroundColor: "transparent", 
            boxShadow: "0 0 15px var(--brand-accent), inset 0 0 10px var(--brand-accent)",
            duration: 0.3 
          });
        } else {
          // If the element is before the active index, push it up, otherwise push it down
          const yOffset = i < index ? -30 : 30;
          gsap.to(textEl, { opacity: 0, y: yOffset, duration: 0.5, ease: "power2.out", overwrite: true });
          gsap.to(iconEl, { 
            opacity: 0.3, 
            scale: 1, 
            borderColor: "rgba(255,255,255,0.2)", 
            color: "white", 
            backgroundColor: "transparent", 
            boxShadow: "none",
            duration: 0.3 
          });
        }
      });
    }

    // Initialize first feature active state immediately
    activate(0);

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      {/* Sticky Container for the UI overlays */}
      <div className="sticky top-0 left-0 w-full h-screen flex justify-between items-center px-12 md:px-24 pointer-events-none z-20">
        
        {/* Left Side: Text Content */}
        <div className="relative w-[40%] flex flex-col justify-center h-full pl-0 md:pl-12">
          {features.map((f, i) => (
            <div 
              key={f.id} 
              className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none"
            >
              <div
                ref={el => textRefs.current[i] = el}
                className="w-full opacity-0 flex flex-col items-start"
                style={{ transform: 'translateY(30px)' }}
              >
              
              {/* Crossed-out Badge */}
              <div className="flex items-center bg-white text-black mb-4 pr-3 pl-1 py-1 space-x-2 shadow-lg">
                <div className="flex items-center justify-center bg-brand-green text-white w-5 h-5 cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="font-sans font-bold text-[10px] tracking-widest line-through decoration-1 decoration-black/50">
                  {f.badge}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-heavy font-black italic tracking-tighter text-white leading-[0.9] mb-5 whitespace-pre-line" style={{ textShadow: '2px 2px 20px rgba(0,0,0,0.5)' }}>
                {f.title}
              </h2>
              
              {/* Clean Description */}
              <p className="font-sans text-white/90 text-sm md:text-[15px] leading-relaxed tracking-wide max-w-[320px]">
                {f.desc}
              </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Icon Navigation */}
        <div className="relative flex flex-col gap-14 justify-center items-center pointer-events-auto mr-4 md:mr-16">
          {features.map((f, i) => (
            <div className="relative flex flex-col items-center" key={f.id}>
              <div 
                ref={el => iconRefs.current[i] = el}
                className="w-12 h-12 rounded-full border border-white/20 flex justify-center items-center text-white cursor-pointer transition-all duration-300 bg-brand-bg/50 backdrop-blur-sm"
                onClick={() => {
                  window.scrollTo({
                    top: containerRef.current.offsetTop + (i * window.innerHeight),
                    behavior: 'smooth'
                  });
                }}
              >
                {f.icon}
              </div>
              
              {/* Small discrete dots below icon */}
              {i < features.length - 1 && (
                <div className="absolute top-[120%] flex flex-col gap-2 pt-2 pb-1">
                  <div className="w-[4px] h-[4px] rounded-full bg-white/20"></div>
                  <div className="w-[4px] h-[4px] rounded-full bg-white/20"></div>
                  <div className="w-[4px] h-[4px] rounded-full bg-white/20"></div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
