'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function Philosophy() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.phil-line').forEach(line => {
      gsap.from(line, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col md:flex-row items-center border-t border-white/5">
      <div className="w-full md:w-1/2 p-6 md:p-20 z-10">
        <div className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tighter leading-[1.1]">
          <div className="line-wrapper overflow-hidden"><p className="phil-line text-white/40">Every 3 seconds,</p></div>
          <div className="line-wrapper overflow-hidden"><p className="phil-line text-white">something must change.</p></div>
          <br/>
          <div className="line-wrapper overflow-hidden"><p className="phil-line text-blood">Attention is war.</p></div>
          <br/>
          <div className="line-wrapper overflow-hidden"><p className="phil-line text-white/40">If they blink,</p></div>
          <div className="line-wrapper overflow-hidden"><p className="phil-line text-white">you lose.</p></div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full absolute right-0 top-0 overflow-hidden opacity-20 md:opacity-50 pointer-events-none">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-mysterious-smoke-in-dark-room-4105-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent"></div>
      </div>
    </section>
  );
}