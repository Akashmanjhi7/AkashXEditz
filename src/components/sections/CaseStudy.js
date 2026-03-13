'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function CaseStudy() {
  const container = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if(pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = pathLength;
      pathRef.current.style.strokeDashoffset = pathLength;

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".breakdown-container",
          start: "top center",
        }
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-12 bg-[#08080a] relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-16 text-center">The Anatomy of a <span className="text-blood">Hook</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center breakdown-container">
          <div className="space-y-12">
            <div className="breakdown-item border-l border-blood pl-6">
              <h4 className="text-sm tracking-widest uppercase text-white/50 mb-2">01. The Problem</h4>
              <p className="text-xl">Slow pacing in first 5 seconds causing a 40% drop-off rate.</p>
            </div>
            <div className="breakdown-item border-l border-white/20 pl-6 transition-colors duration-300 hover:border-blood">
              <h4 className="text-sm tracking-widest uppercase text-white/50 mb-2">02. Cut Strategy</h4>
              <p className="text-xl">Removed establishing shot. Started in the middle of a scream. 3 subliminal flash cuts.</p>
            </div>
            <div className="breakdown-item border-l border-white/20 pl-6 transition-colors duration-300 hover:border-blood">
              <h4 className="text-sm tracking-widest uppercase text-white/50 mb-2">03. Sound Layering</h4>
              <p className="text-xl">Low-frequency heartbeat riser escalating into pure silence before the dialogue.</p>
            </div>
            <div className="breakdown-item border-l border-white/20 pl-6 transition-colors duration-300 hover:border-blood">
              <h4 className="text-sm tracking-widest uppercase text-white/50 mb-2">04. The Result</h4>
              <p className="text-xl font-bold text-white">Retention spiked to 82% at the 30-second mark.</p>
            </div>
          </div>

          <div className="relative h-64 md:h-96 w-full bg-dark/50 rounded-lg p-6 border border-white/5 flex flex-col justify-end">
            <h5 className="absolute top-6 left-6 font-mono text-sm text-white/50 uppercase">Audience Retention %</h5>
            <svg className="w-full h-full mt-10 overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
              <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
              <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
              <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
              
              <path d="M0,50 C10,40 20,45 30,30 C40,20 50,35 60,15 C70,25 80,5 100,0" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              <path ref={pathRef} d="M0,50 C5,10 10,5 20,8 C40,12 60,15 80,10 C90,8 95,2 100,0" fill="none" stroke="#8a0303" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="100" cy="0" r="1.5" fill="#8a0303" className="animate-pulse" />
            </svg>
            <div className="flex justify-between w-full mt-4 font-mono text-xs text-white/30">
              <span>0s</span>
              <span>15s</span>
              <span>30s (Cliffhanger)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}