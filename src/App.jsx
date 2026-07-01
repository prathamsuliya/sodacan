import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesScrollSection from './components/FeaturesScrollSection';
import StatsSection from './components/StatsSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// 3D Canvas Layer
import BottleCanvas from './components/BottleCanvas';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Shared ref for 3D bottle targets
  // Initial state maps to Hero Section: centered, angled, large scale
  const targetProps = useRef({
    x: 0,
    y: -0.5,
    z: 0.2,
    rx: 0.25,
    ry: -0.65,
    rz: -0.22,
    scale: 1.15
  });

  // Shared ref for mouse coordinates (normalized -1 to 1) for parallax
  const mouseProps = useRef({ x: 0, y: 0 });

  // Ref for the global scroll progress bar
  const progressBarRef = useRef(null);

  // 1. Initialize Lenis Smooth Scroll & Sync with GSAP Ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      smoothWheel: true,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis raf loop to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing to keep scroll animations responsive
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ScrollTrigger.update);
    };
  }, []);

  // 2. Track mouse movement for subtle interactive tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseProps.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Setup GSAP ScrollTrigger timeline to drive 3D Bottle transforms
  useEffect(() => {
    const current = targetProps.current;

    // A single timeline scrubbed over the entire page height
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-layout",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // smooth scrub duration for elastic damp effect
      }
    });

    // Define Keyframes per Section Transitions (Total 4 scroll steps for the features)
    tl
      // Step 1: Hero -> Feature 1 (Moves slightly right, scales up, rotates)
      .to(current, {
        x: 0.2,
        y: -0.2,
        z: 0.1,
        rx: 0,
        ry: Math.PI * 2 - 0.2,
        rz: 0.1,
        scale: 1.4,
        duration: 1,
        ease: "power1.inOut"
      })
      // Step 2: Feature 1 -> Feature 2 (Rotates to show back)
      .to(current, {
        x: 0.2,
        y: -0.2,
        z: 0.1,
        rx: 0.1,
        ry: Math.PI * 2 - 2.5,
        rz: -0.05,
        scale: 1.4,
        duration: 1.33,
        ease: "power1.inOut"
      })
      // Step 3: Feature 2 -> Feature 3 (Rotates to show side)
      .to(current, {
        x: 0.2,
        y: -0.2,
        z: 0.1,
        rx: 0.05,
        ry: Math.PI * 2 - 4.5,
        rz: 0.05,
        scale: 1.4,
        duration: 1.33,
        ease: "power1.inOut"
      })
      // Step 4: Feature 3 -> Feature 4 (Rotates to show front again)
      .to(current, {
        x: 0.2,
        y: -0.2,
        z: 0.1,
        rx: 0,
        ry: Math.PI * 2 - 0.65, // ~5.63
        rz: 0,
        scale: 1.4,
        duration: 1.33,
        ease: "power1.inOut"
      })
      // Step 5: Feature 4 -> Stats Section
      // Moves left slightly, rotates to show the side profile between the text columns
      .to(current, {
        x: 0,
        y: -0.1,
        z: 0.15,
        rx: 0.05,
        ry: Math.PI * 2 + 1.2,
        rz: -0.05,
        scale: 1.15,
        duration: 1,
        ease: "power1.inOut"
      })
      // Step 6: Stats Section -> Process Section
      // Moves to the right side, rotates to show a different angle
      .to(current, {
        x: 0.9,
        y: -0.2,
        z: 0.2,
        rx: 0.15,
        ry: Math.PI * 3.5,
        rz: 0,
        scale: 1.3,
        duration: 1,
        ease: "power1.inOut"
      })
      // Step 7: Process -> Testimonials
      // Moves left, out of the way for the horizontal scrolling cards
      .to(current, {
        x: -0.8,
        y: 0,
        z: -0.5,
        rx: 0.05,
        ry: Math.PI * 4,
        rz: -0.1,
        scale: 0.9,
        duration: 1,
        ease: "power1.inOut"
      })
      // Step 8: DURING Testimonials (Pinned section)
      // Rotates slowly in place while the user scrolls horizontally through reviews
      .to(current, {
        x: -0.8,
        y: 0,
        z: -0.5,
        rx: 0.05,
        ry: Math.PI * 6, // 1 full spin during the long scroll
        rz: -0.1,
        scale: 0.9,
        duration: 2, // Matches the pinned horizontal scroll distance
        ease: "none"
      })
      // Step 9: Testimonials -> CTA
      // Flies directly to the center, huge scale, final hero presentation!
      .to(current, {
        x: 0,
        y: -0.4, // Push up slightly so it doesn't overlap the Shop Now button
        z: 0.5,
        rx: 0.1,
        ry: Math.PI * 6.5,
        rz: 0.05,
        scale: 1.7,
        duration: 1,
        ease: "power1.inOut"
      });

    // Global Scroll Progress Bar Animation
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-layout",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      }
    });

    // 4. Staggered slide/fade-in animations for all editorial headers and cards
    const animatedElements = document.querySelectorAll(
      'section h2, section p, section span, .hairline-border, section li, section form, .grid-item-reveal'
    );
    
    animatedElements.forEach((el) => {
      // Don't animate the absolute navbar header items, the lines, or very small badges
      if (el.closest('nav') || el.classList.contains('noise-overlay') || el.classList.contains('grid-line-guide')) return;

      gsap.fromTo(el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%", // triggers slightly earlier for smooth entry
            toggleActions: "play none none reverse", // play on scroll down, reverse on scroll up
          }
        }
      );
    });

    return () => {
      // Clean up triggers on hot-reload/unmount
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div id="scroll-layout" className="relative w-full min-h-screen bg-brand-bg select-none">
      {/* Website Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
        <div 
          ref={progressBarRef}
          className="w-full h-full bg-[#ff3f5e] rounded-r-full origin-left"
          style={{ transform: 'scaleX(0)', boxShadow: '0 0 20px 4px rgba(255,63,94,0.7)' }}
        ></div>
      </div>

      {/* Cinematic vintage paper noise overlay */}
      <div className="noise-overlay" />

      {/* Global Cinematic Background System */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Layer 1 - Flowing Base Gradient */}
        <div className="cinematic-base-gradient"></div>

        {/* Layer 2 - Soft Radial Glows */}
        <div className="cinematic-layer layer-glows">
          <div className="glow-blob deep-red"></div>
          <div className="glow-blob deep-red-2"></div>
          <div className="glow-blob vibrant-pink"></div>
          <div className="glow-blob vibrant-pink-2"></div>
          <div className="glow-blob soft-red"></div>
          <div className="glow-blob soft-red-2"></div>
        </div>

        {/* Layer 3 - Volumetric Light Beams */}
        <div className="cinematic-layer layer-beams">
          <div className="volumetric-beam beam-left"></div>
          <div className="volumetric-beam beam-right"></div>
          <div className="volumetric-beam beam-3"></div>
          <div className="volumetric-beam beam-4"></div>
          <div className="light-streak streak-1"></div>
          <div className="light-streak streak-2"></div>
          <div className="light-streak streak-3"></div>
        </div>

        {/* Layer 4 - Floating Haze & Clouds */}
        <div className="cinematic-layer layer-haze">
          <div className="haze-cloud cloud-1"></div>
          <div className="haze-cloud cloud-2"></div>
          <div className="haze-cloud cloud-3"></div>
          <div className="haze-cloud cloud-4"></div>
        </div>

        {/* Layer 5 - Vignette & Grain */}
        <div className="cinematic-vignette"></div>

        {/* Layer 6 - Front Glow / Bloom */}
        <div className="front-bloom-highlight"></div>
      </div>

      {/* Structural Visual Grid Guides (Newspaper/Magazine Layout Blueprint) */}
      <div className="fixed inset-0 pointer-events-none z-1 flex justify-between px-6 md:px-12 select-none">
        <div className="grid-line-guide w-[1px] h-full bg-brand-cream/5" />
        <div className="grid-line-guide w-[1px] h-full bg-brand-cream/5 hidden md:block" />
        <div className="grid-line-guide w-[1px] h-full bg-brand-cream/5 hidden md:block" />
        <div className="grid-line-guide w-[1px] h-full bg-brand-cream/5" />
      </div>

      {/* R3F Fixed Canvas Layer containing the 3D bottle */}
      <BottleCanvas targetProps={targetProps} mouseProps={mouseProps} />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Editorial Content Sections */}
      <div className="relative w-full">
        <Hero />
        <FeaturesScrollSection />
        <StatsSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </div>

      <Footer />
    </div>
  );
}
