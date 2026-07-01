import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Start animating when the section enters the bottom 20% of the screen
        end: "top 30%",   // Finish animating when it reaches 30% from the top
        scrub: 1,         // Links the animation directly to the scrollbar with a 1 second smooth catch-up
      }
    });

    tl.fromTo(leftRef.current, 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    )
    .fromTo(rightRef.current, 
      { opacity: 0, x: 100 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "<" // Start exactly at the same time as the left animation
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-between px-12 md:px-24 py-20 z-10 select-none overflow-hidden text-white bg-transparent">
      
      {/* Grid Layout Container */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-12 gap-8 items-center relative h-full">
        
        {/* LEFT COLUMN: INGREDIENTS FACTS TABLE */}
        <div ref={leftRef} className="col-span-12 md:col-span-5 lg:col-span-4 relative flex justify-start z-20">
          
          <div className="relative border-2 border-white/90 p-6 md:p-8 bg-brand-bg/50 backdrop-blur-sm w-full max-w-[420px]">
            {/* Corner Bracket Decor */}
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-4 border-l-4 border-white"></div>
            
            <h2 className="text-4xl md:text-[40px] font-heavy font-black italic tracking-tighter uppercase mb-2">
              Ingredients Facts
            </h2>
            
            {/* Table Headers */}
            <div className="border-t-[3px] border-white pt-2 pb-1 flex justify-between items-end font-sans font-bold text-[11px] tracking-widest uppercase">
              <span>Serving Size</span>
              <span>1 Can (355ML)</span>
            </div>
            
            <div className="border-t-[10px] border-white pt-3 pb-2 flex justify-between items-end">
              <span className="font-sans font-bold text-xs tracking-widest uppercase pb-1">Amount Per Serving</span>
              <span className="font-heavy font-black italic text-5xl leading-none text-brand-green">35</span>
            </div>
            
            <div className="border-t-2 border-white/50 pt-2 pb-4 flex justify-between items-end font-sans font-bold text-[10px] tracking-widest text-white/60">
              <span>Calories</span>
              <span>Real Fruit Energy</span>
            </div>

            {/* List Header */}
            <div className="border-t-[3px] border-white pt-2 pb-2 flex justify-between text-[9px] font-sans font-bold tracking-widest text-brand-green uppercase">
              <span>Active Botanicals</span>
              <span>% Daily Value</span>
            </div>

            {/* Rows */}
            <div className="space-y-3 pt-2 font-sans text-[10px] font-semibold tracking-wider text-white/90">
              
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-brand-green text-sm">✓</span>
                  <span>Cold-Pressed Strawberry Purée</span>
                </div>
                <div className="flex gap-4">
                  <span>15G</span>
                  <span className="text-brand-green">100%</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-brand-green text-sm">✓</span>
                  <span>Steeped Hibiscus Flower Tea</span>
                </div>
                <div className="flex gap-4">
                  <span>300ML</span>
                  <span className="text-brand-green">100%</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-brand-green text-sm">✓</span>
                  <span>Steam-Distilled Basil Essence</span>
                </div>
                <div className="flex gap-4">
                  <span>5ML</span>
                  <span className="text-brand-green">100%</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-2 text-white/40">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-xs">✕</span>
                  <span>Sugar Alcohols (Erythritol)</span>
                </div>
                <div className="flex gap-4">
                  <span>0G</span>
                  <span className="text-red-500">0%</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-2 text-white/40">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-xs">✕</span>
                  <span>Chemical Sweeteners (Stevia)</span>
                </div>
                <div className="flex gap-4">
                  <span>0G</span>
                  <span className="text-red-500">0%</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-white/20 pb-2 text-white/40">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-xs">✕</span>
                  <span>Synthetic Preservatives</span>
                </div>
                <div className="flex gap-4">
                  <span>0G</span>
                  <span className="text-red-500">0%</span>
                </div>
              </div>

            </div>

            {/* Disclaimer */}
            <p className="mt-4 text-[8px] leading-relaxed text-white/40 font-sans">
              * Percent Daily Values are based on 100% raw, unrefined botanical extractions. We squeeze actual soil-grown fruits and flowers. Laboratory syrups are banned from our recipe.
            </p>

          </div>
        </div>

        {/* MIDDLE COLUMN: Reserved for 3D Bottle */}
        <div className="col-span-12 md:col-span-2 lg:col-span-4 flex justify-center relative pointer-events-none">
           {/* Vertical Separator Text */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap text-[9px] tracking-[0.3em] font-bold text-white/30 mix-blend-overlay pointer-events-none hidden lg:block">
              01 / SPEC SHEET
           </div>
        </div>

        {/* RIGHT COLUMN: TEXT CONTENT */}
        <div ref={rightRef} className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col justify-end items-end text-right z-20 pl-0 lg:pl-12">
          
          <div className="mb-12">
            <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] text-brand-green uppercase mb-3">
              Product Profile / [01]
            </h4>
            <h2 className="text-5xl md:text-6xl font-heavy font-black italic uppercase leading-[0.9] tracking-tighter">
              Zero Chemicals.<br />Zero Nasties.
            </h2>
          </div>

          <div className="space-y-8 font-sans flex flex-col items-end">
            
            {/* Paragraph 1 */}
            <div className="max-w-md">
              <h3 className="text-brand-green font-bold text-sm tracking-widest uppercase mb-2">35 Real Calories</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                We don't use laboratory sugar substitutes or zero-calorie tricks. Our 35 calories come from actual, cold-pressed strawberries. It's clean fruit energy that digests naturally.
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="max-w-md">
              <h3 className="text-brand-green font-bold text-sm tracking-widest uppercase mb-2">No Chemical Stevia Or Erythritol</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Stevia, monk fruit extract, and chemical sugar alcohols (erythritol) leave a distinct metallic aftertaste. We ban them from our recipes. Our carbonated sparkler is sweet, crisp, and leaf-fresh.
              </p>
            </div>

            {/* Paragraph 3 */}
            <div className="max-w-md">
              <h3 className="text-brand-green font-bold text-sm tracking-widest uppercase mb-2">Dirt To Can Purity</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Every ingredient is tracked from local Oregon crop fields straight to our brewery. Certified organic, pesticide-free, and non-GMO verified. Real ingredients from the earth, unfiltered.
              </p>
            </div>

          </div>

          {/* Footer Labels */}
          <div className="mt-16 pt-6 border-t border-white/10 flex justify-between items-center text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase w-full max-w-md">
            <span>Spec Sheet ST-04</span>
            <span>USDA Organic Certified</span>
          </div>

        </div>

      </div>
    </section>
  );
}
