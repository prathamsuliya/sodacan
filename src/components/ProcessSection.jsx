import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const bgTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      }
    });

    // Fade and slide in the left content
    tl.fromTo(leftContentRef.current, 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    )
    // Scale and fade the huge background text slightly
    .fromTo(bgTextRef.current,
      { opacity: 0, scale: 0.9, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power2.out" },
      "<"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-between px-12 md:px-24 py-20 z-10 select-none overflow-hidden text-white bg-transparent">
      
      {/* Background Huge Outline Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 right-[-5%] text-[35vw] font-heavy font-black italic uppercase leading-none pointer-events-none z-0"
        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.05)', color: 'transparent' }}
      >
        RAW
      </div>

      {/* Grid Layout Container */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-12 gap-8 items-center relative h-full">
        
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div ref={leftContentRef} className="col-span-12 md:col-span-6 lg:col-span-5 relative flex flex-col justify-center z-20">
          
          <div className="mb-8">
            <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] text-brand-green uppercase mb-3">
              The Process / [02]
            </h4>
            <h2 className="text-5xl md:text-6xl font-heavy font-black italic uppercase leading-[0.9] tracking-tighter">
              Unfiltered & Raw.
            </h2>
            <div className="w-full h-[1px] bg-white/20 mt-6"></div>
          </div>

          <div className="space-y-8 font-sans">
            
            {/* Point 01 */}
            <div className="flex items-start gap-6 border-b border-white/10 pb-6">
              <span className="text-brand-green font-heavy font-black italic text-4xl leading-none mt-1">01</span>
              <div>
                <h3 className="text-white font-heavy italic font-bold tracking-widest uppercase mb-2 text-xl">Smashed Strawberries</h3>
                <p className="text-white/60 text-[13px] leading-relaxed max-w-[380px]">
                  We don't do chemical 'strawberry flavor' drops. We smash real, organic strawberries harvested from family farms. It's thick, sweet, and messy—never filtered into clear, lifeless syrup.
                </p>
              </div>
            </div>

            {/* Point 02 */}
            <div className="flex items-start gap-6 border-b border-white/10 pb-6">
              <span className="text-brand-green font-heavy font-black italic text-4xl leading-none mt-1">02</span>
              <div>
                <h3 className="text-white font-heavy italic font-bold tracking-widest uppercase mb-2 text-xl">Sour Hibiscus Bite</h3>
                <p className="text-white/60 text-[13px] leading-relaxed max-w-[380px]">
                  Organic dried hibiscus calyces are steeped slow. This provides a deep red, floral layer and a sharp, wine-like sour bite that keeps the strawberry from tasting like sugary kid's juice.
                </p>
              </div>
            </div>

            {/* Point 03 */}
            <div className="flex items-start gap-6 border-b border-white/10 pb-6">
              <span className="text-brand-green font-heavy font-black italic text-4xl leading-none mt-1">03</span>
              <div>
                <h3 className="text-white font-heavy italic font-bold tracking-widest uppercase mb-2 text-xl">Fresh Basil Kick</h3>
                <p className="text-white/60 text-[13px] leading-relaxed max-w-[380px]">
                  Fresh greenhouse basil leaves are steam-distilled right at the brewery. This clean, peppery green oil adds a complex, refreshing herbal contrast that keeps you coming back.
                </p>
              </div>
            </div>

          </div>

          {/* Verification Box */}
          <div className="mt-8 border border-white/10 rounded-sm p-5 bg-white/5 backdrop-blur-sm flex items-center gap-4 max-w-[480px]">
             <div className="flex items-center justify-center bg-transparent border border-white/20 text-brand-green w-8 h-8 flex-shrink-0">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
             </div>
             <div>
               <h4 className="font-sans font-bold text-[11px] tracking-wider text-white uppercase mb-1">USDA Organic & Non-GMO Verified</h4>
               <p className="font-sans text-[9px] text-white/50 tracking-wide">
                 Grown in biodiverse soil, free of chemical pesticides and synthetic engineering.
               </p>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Reserved for 3D Bottle */}
        <div className="col-span-12 md:col-span-6 lg:col-span-7 flex justify-center relative pointer-events-none h-full">
           {/* Vertical Separator Text */}
           <div className="absolute left-[-2rem] top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap text-[9px] tracking-[0.3em] font-bold text-white/30 mix-blend-overlay pointer-events-none hidden lg:block">
              02 / RAW PROCESS
           </div>
        </div>

      </div>
    </section>
  );
}
