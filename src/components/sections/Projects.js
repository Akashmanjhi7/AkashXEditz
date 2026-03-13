'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const works = [
  { img: "1536440136628-849c177e76a1", genre: "Emotional Betrayal", title: "Dhokha Aur Sach", hook: "0:02 Cold Open", cliff: "0:58" },
  { img: "1605806616949-1e87b487cb2a", genre: "Occult Suspense", title: "Shatani Shakti", hook: "0:01 Jump Cut", cliff: "1:12" },
  { img: "1478720568477-152d9b164e26", genre: "Adult Drama", title: "Broken Vows", hook: "0:03 Silent Stare", cliff: "0:45" }
];

export default function Projects({ isHover, fullHeight = true }) {
  const wrapperRef = useRef();
  const containerRef = useRef();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const totalScroll = containerRef.current.offsetWidth - window.innerWidth;
      gsap.to(containerRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        }
      });
    });
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} className={`projects-wrapper bg-dark overflow-hidden relative ${fullHeight ? 'h-screen' : ''}`}>
      <div ref={containerRef} className="projects-container flex w-fit h-screen items-center px-20">
        <div className="w-[100vw] md:w-[80vw] lg:w-[40vw] shrink-0 pr-20">
          <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter leading-none">
            Recent<br/><span className="text-blood">Trauma</span>
          </h2>
          <p className="mt-6 text-xl tracking-widest uppercase text-white/50">Projects that refused to be skipped.</p>
        </div>
        
        {works.map((proj, idx) => (
          <div 
            key={idx} 
            onMouseEnter={() => isHover(true)} 
            onMouseLeave={() => isHover(false)}
            className="project-card w-[70vw] md:w-[40vw] h-[60vh] shrink-0 mx-4 relative group cursor-pointer overflow-hidden rounded-md"
          >
            <img 
              src={`https://images.unsplash.com/photo-${proj.img}?q=80&w=1925&auto=format&fit=crop`} 
              alt={proj.title} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent p-8 flex flex-col justify-end">
              <p className="text-blood text-sm font-bold tracking-widest uppercase mb-2">{proj.genre}</p>
              <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-4">{proj.title}</h3>
              <div className="flex gap-4 text-xs font-mono text-white/60">
                <span><b className="text-white">Hook:</b> {proj.hook}</span>
                <span><b className="text-white">Cliffhanger:</b> {proj.cliff}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="w-[30vw] shrink-0"></div>
      </div>
    </section>
  );
}