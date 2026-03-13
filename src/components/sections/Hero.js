'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero({ isHover }) {
  const container = useRef(null);
  const spotlightRef = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-line", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.5
    });

    const magneticBtns = gsap.utils.toArray('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });
  }, { scope: container });

  const handleMouseMove = (e) => {
    if(!container.current || !spotlightRef.current) return;
    const rect = container.current.getBoundingClientRect();
    const posX = e.clientX;
    const posY = e.clientY - rect.top;

    spotlightRef.current.style.setProperty('--x', `${posX}px`);
    spotlightRef.current.style.setProperty('--y', `${posY}px`);

    const xMove = (posX / window.innerWidth - 0.5) * 2;
    const yMove = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    gsap.utils.toArray('.parallax-layer').forEach(layer => {
      const speed = layer.getAttribute('data-speed') || 0.05;
      gsap.to(layer, {
        x: xMove * 100 * speed,
        y: yMove * 100 * speed,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  };

  return (
    <section ref={container} onMouseMove={handleMouseMove} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <video className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 mix-blend-screen scale-110 object-cover pointer-events-none" autoPlay loop muted playsInline>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-black-and-white-ink-in-water-237-large.mp4" type="video/mp4" />
      </video>
      
      <div ref={spotlightRef} className="hero-spotlight"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/80 to-dark z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      <div className="z-10 text-center px-4 max-w-5xl mt-12">
        <div className="line-wrapper mb-2">
          <h2 className="hero-line text-xl md:text-2xl font-light tracking-widest uppercase text-gray-400 parallax-layer" data-speed="0.02">I don't edit.</h2>
        </div>
        <div className="line-wrapper mb-6 glitch-wrapper">
          <h1 className="hero-line font-display text-4xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter glitch parallax-layer" data-text="I manipulate emotion." data-speed="0.05">I manipulate emotion.</h1>
        </div>
        <div className="line-wrapper mb-12">
          <p className="hero-line text-sm md:text-lg tracking-[0.2em] uppercase text-blood font-semibold parallax-layer" data-speed="0.03">Microdrama Promo Editor</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8 parallax-layer" data-speed="0.01">
          <button 
            onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)}
            className="magnetic-btn group relative px-8 py-4 border border-white/20 uppercase tracking-widest text-sm overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-dark transition-colors duration-300">Watch Showreel</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"></div>
          </button>
          <button 
            onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)}
            className="magnetic-btn group relative px-8 py-4 bg-blood text-white uppercase tracking-widest text-sm overflow-hidden"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0 mix-blend-difference"></div>
          </button>
        </div>
      </div>
    </section>
  );
}