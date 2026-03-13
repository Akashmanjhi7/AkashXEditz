'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Contact({ isHover }) {
  const container = useRef(null);

  useGSAP(() => {
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

  return (
    <section ref={container} className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-[#3a0000] z-0 opacity-50 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/2">
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-6">Let's make them unable to scroll.</h2>
          <p className="text-white/60 mb-8 tracking-widest uppercase text-sm">Drop your project details below.</p>
          <a href="mailto:manjhiakash00@gmail.com" onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)} className="text-xl border-b border-blood pb-1 hover:text-blood transition-colors inline-block">manjhiakash00@gmail.com</a>
        </div>
        
        <div className="w-full md:w-1/2">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input type="text" placeholder="YOUR NAME" onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)} className="input-field font-mono text-sm uppercase" required />
            </div>
            <div>
              <input type="email" placeholder="EMAIL ADDRESS" onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)} className="input-field font-mono text-sm uppercase" required />
            </div>
            <div>
              <select defaultValue="" onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)} className="input-field font-mono text-sm uppercase appearance-none bg-transparent cursor-pointer">
                <option value="" disabled className="bg-dark text-white/50">PROJECT TYPE</option>
                <option value="promo" className="bg-dark">Show Promo</option>
                <option value="trailer" className="bg-dark">Full Trailer</option>
                <option value="reels" className="bg-dark">Micro-content / Reels</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="BUDGET RANGE" onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)} className="input-field font-mono text-sm uppercase" />
            </div>
            <button type="submit" onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)} className="magnetic-btn w-full py-4 bg-white text-dark font-bold tracking-widest uppercase text-sm hover:bg-blood hover:text-white transition-colors duration-300 mt-4">
              Initiate Sequence
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}