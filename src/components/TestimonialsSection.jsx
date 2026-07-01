import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Alex M.",
    role: "Fitness Coach",
    text: "Finally an energy drink that doesn't taste like battery acid. The strawberry flavor is incredibly fresh, and the caffeine hit is completely smooth.",
    rating: 5
  },
  {
    name: "Sarah J.",
    role: "Graphic Designer",
    text: "No crash. That's the biggest thing for me. I can sip this at 2 PM and not feel like a zombie by 5 PM. Plus the can design is gorgeous.",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Software Engineer",
    text: "I was skeptical about the hibiscus and basil, but it really balances out the sweetness. It tastes like a high-end mocktail that wakes you up.",
    rating: 5
  },
  {
    name: "Elena R.",
    role: "Yoga Instructor",
    text: "Love that it's just raw ingredients. You can literally taste the difference when there's no artificial syrup involved. My new go-to pre-workout.",
    rating: 5
  },
  {
    name: "David L.",
    role: "Pro Athlete",
    text: "Clean energy is hard to find. The fact that I know exactly what I'm putting in my body makes Organic Splash unmatched in the market.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;

      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          end: () => "+=" + (wrapper.scrollWidth - window.innerWidth), // Recalculated dynamically
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-transparent z-10 flex flex-col justify-center select-none">
      
      {/* Title */}
      <div className="absolute top-24 left-12 md:left-24 z-20 pointer-events-none">
        <h4 className="font-sans font-bold text-[10px] tracking-[0.2em] text-brand-green uppercase mb-3">
          Word on the Street / [03]
        </h4>
        <h2 className="text-5xl md:text-6xl font-heavy font-black italic uppercase leading-[0.9] tracking-tighter text-white">
          Real People.<br />Real Energy.
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollWrapperRef} 
        className="flex items-center gap-8 md:gap-12 px-[10vw] md:px-[30vw] pt-32 w-max"
      >
        {reviews.map((review, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 w-[320px] md:w-[480px] p-8 md:p-12 border-2 border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl flex flex-col gap-6"
          >
            {/* Stars */}
            <div className="flex gap-1 text-brand-green">
              {[...Array(review.rating)].map((_, j) => (
                <svg key={j} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>

            {/* Review Text */}
            <p className="font-sans text-white/90 text-lg md:text-xl leading-relaxed italic">
              "{review.text}"
            </p>

            {/* Author */}
            <div className="mt-4 border-t border-white/20 pt-6">
              <h4 className="font-sans font-bold text-white tracking-wide uppercase text-sm">{review.name}</h4>
              <p className="font-sans text-brand-green text-xs tracking-widest uppercase mt-1">{review.role}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
