const fs = require('fs');
const path = require('path');

const folders = [
  'src/app',
  'src/app/works',
  'src/app/strategy',
  'src/components/ui',
  'src/components/sections',
];

const files = [
  // --- 1. GLOBALS CSS ---
  {
    path: 'src/app/globals.css',
    content: `@import "tailwindcss";

@theme {
  --color-dark: #0b0b0f;
  --color-blood: #8a0303;
  --color-accent: #e5e5e5;
}

:root {
  --x: 50%;
  --y: 50%;
}

body {
  background-color: #0b0b0f;
  color: #e5e5e5;
  overflow-x: hidden;
  cursor: none;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.font-display {
  font-family: 'Syncopate', sans-serif;
}

.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0b0b0f;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 red;
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim 3s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 blue;
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(10px, 9999px, 86px, 0); }
  20% { clip: rect(41px, 9999px, 8px, 0); }
  40% { clip: rect(89px, 9999px, 73px, 0); }
  60% { clip: rect(12px, 9999px, 99px, 0); }
  80% { clip: rect(66px, 9999px, 34px, 0); }
  100% { clip: rect(5px, 9999px, 55px, 0); }
}

.input-field {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  color: white;
  padding: 10px 0;
  width: 100%;
  outline: none;
  transition: border-color 0.3s ease;
}
.input-field:focus {
  border-bottom: 1px solid white;
}

.hero-spotlight {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(circle 600px at var(--x, 50%) var(--y, 50%), rgba(138, 3, 3, 0.15), transparent 80%);
  z-index: 1;
  transition: opacity 0.3s ease;
}
`
  },
  // --- 2. LAYOUT ---
  {
    path: 'src/app/layout.js',
    content: `import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Akash Manjhi | Suspense Engineer',
  description: 'Specializing in high-retention video editing for micro-dramas, thrillers, and psychological trailers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}`
  },
  // --- 3. UI COMPONENTS ---
  {
    path: 'src/components/ui/SmoothScroll.js',
    content: `'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // Refresh scrolltrigger after assets load
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}`
  },
  {
    path: 'src/components/ui/CustomCursor.js',
    content: `'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor({ isHovering }) {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      gsap.to(dotRef.current, { left: clientX, top: clientY, duration: 0 });
      outlineRef.current.animate({ left: \`\${clientX}px\`, top: \`\${clientY}px\` }, { duration: 500, fill: "forwards" });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div 
        ref={outlineRef} 
        className={\`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 \${
          isHovering ? 'w-16 h-16 bg-white/10 border-transparent' : 'w-10 h-10 border border-white/50 bg-transparent'
        }\`} 
      />
    </>
  );
}`
  },
  {
    path: 'src/components/ui/Navbar.js',
    content: `'use client';
import Link from 'next/link';

export default function Navbar({ onMenuToggle, isHover }) {
  return (
    <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
      <Link href="/" className="font-display font-bold tracking-widest text-sm uppercase">AM.</Link>
      <button 
        onClick={onMenuToggle}
        onMouseEnter={() => isHover(true)} 
        onMouseLeave={() => isHover(false)}
        className="font-sans text-sm tracking-widest uppercase hover:text-blood transition-colors"
      >
        Menu
      </button>
    </nav>
  );
}`
  },
  {
    path: 'src/components/ui/Footer.js',
    content: `export default function Footer() {
  return (
    <footer className="py-12 text-center border-t border-white/5 bg-dark relative z-10">
      <p className="font-display uppercase tracking-[0.3em] text-white/30 text-xs md:text-sm">
        Suspense is engineered. <span className="text-blood">Not edited.</span>
      </p>
      <p className="mt-4 font-mono text-[10px] text-white/20 uppercase tracking-widest">© 2026 Akash Manjhi. All rights reserved.</p>
    </footer>
  );
}`
  },
  // --- 4. SECTIONS ---
  {
    path: 'src/components/sections/Hero.js',
    content: `'use client';
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

    spotlightRef.current.style.setProperty('--x', \`\${posX}px\`);
    spotlightRef.current.style.setProperty('--y', \`\${posY}px\`);

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
}`
  },
  {
    path: 'src/components/sections/Showreel.js',
    content: `'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function Showreel({ isHover }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.scroll-word').forEach((word) => {
      gsap.to(word, {
        color: word.classList.contains('text-blood') ? '#8a0303' : '#ffffff',
        scrollTrigger: {
          trigger: '.showreel-container',
          start: "bottom center",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-12 bg-dark relative z-10 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-display text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter mb-12 opacity-20">Selected Suspense</h2>
        
        <div 
          onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)}
          className="relative w-full aspect-video bg-black rounded-sm overflow-hidden group cursor-pointer mb-24 showreel-container"
        >
          <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" alt="Showreel Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-8 justify-center items-center text-3xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter">
          <span className="scroll-word text-white/10">Hook.</span>
          <span className="scroll-word text-white/10">Emotion.</span>
          <span className="scroll-word text-white/10">Tension.</span>
          <span className="scroll-word text-white/10">Release.</span>
          <span className="scroll-word text-blood">Cliffhanger.</span>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    path: 'src/components/sections/Philosophy.js',
    content: `'use client';
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
}`
  },
  {
    path: 'src/components/sections/Projects.js',
    content: `'use client';
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
          end: () => \`+=\${totalScroll}\`,
          invalidateOnRefresh: true,
        }
      });
    });
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} className={\`projects-wrapper bg-dark overflow-hidden relative \${fullHeight ? 'h-screen' : ''}\`}>
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
              src={\`https://images.unsplash.com/photo-\${proj.img}?q=80&w=1925&auto=format&fit=crop\`} 
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
}`
  },
  {
    path: 'src/components/sections/CaseStudy.js',
    content: `'use client';
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
}`
  },
  {
    path: 'src/components/sections/Metrics.js',
    content: `'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function Metrics() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const counters = gsap.utils.toArray('.counter');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
          let obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
              if(target % 1 !== 0) {
                counter.innerText = obj.val.toFixed(1);
              } else {
                counter.innerText = Math.floor(obj.val);
              }
            }
          });
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 bg-dark border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
        <div>
          <div className="font-display text-6xl md:text-8xl font-bold text-blood flex items-center justify-center md:justify-start">
            +<span className="counter" data-target="78">0</span>%
          </div>
          <p className="text-sm tracking-widest uppercase text-white/50 mt-2">Avg. Retention Boost</p>
        </div>
        <div>
          <div className="font-display text-6xl md:text-8xl font-bold text-white flex items-center justify-center md:justify-start">
            +<span className="counter" data-target="2.3">0</span>M
          </div>
          <p className="text-sm tracking-widest uppercase text-white/50 mt-2">Views Generated</p>
        </div>
        <div>
          <div className="font-display text-6xl md:text-8xl font-bold text-white flex items-center justify-center md:justify-start">
            <span className="counter" data-target="20">0</span>+
          </div>
          <p className="text-sm tracking-widest uppercase text-white/50 mt-2">Promos Engineered</p>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    path: 'src/components/sections/Interactive.js',
    content: `'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const strategies = {
  thriller: {
    30: \`<span class="text-blood font-bold">0:00 - 0:03:</span> Violent jump cut to breathing in the dark. No context.<br><br><span class="text-white">0:03 - 0:25:</span> Fast montage synced to a ticking clock. Overlapping chaotic dialogue.<br><br><span class="text-white/50">0:25 - 0:30:</span> Dead silence. "I know what you did." Smash cut to black.\`,
    60: \`<span class="text-blood font-bold">0:00 - 0:05:</span> A calm, unsettling lie told directly to camera.<br><br><span class="text-white">0:05 - 0:45:</span> Gradual build of discordant strings. Visuals contradict the opening lie. Subliminal flash cuts of the crime.<br><br><span class="text-white/50">0:45 - 0:60:</span> Hard stop. Sound drops. A knock on the door. Cut.\`,
    90: \`<span class="text-blood font-bold">0:00 - 0:10:</span> Long, continuous tracking shot. Deep bass drone. Establish the stakes immediately.<br><br><span class="text-white">0:10 - 0:75:</span> Three-act escalation. Fake resolution at 0:60, followed by the actual twist reveal.<br><br><span class="text-white/50">0:75 - 0:90:</span> The protagonist realizes they are trapped. A scream cut off by the title card.\`
  },
  romance: {
    30: \`<span class="text-blood font-bold">0:00 - 0:03:</span> A tear falling. Sound of a slap or breaking glass reversed.<br><br><span class="text-white">0:03 - 0:25:</span> Intimate, extreme close-ups. Whispered, toxic dialogue over slow, heavy breathing audio.<br><br><span class="text-white/50">0:25 - 0:30:</span> "I hate that I love you." Eye contact. Blackout.\`,
    60: \`<span class="text-blood font-bold">0:00 - 0:07:</span> Happy memory playback, glitching into a dark reality.<br><br><span class="text-white">0:07 - 0:50:</span> The push and pull. Fast cuts of passion mixed with slow-motion scenes of betrayal. Emotional piano fades to a low synth pulse.<br><br><span class="text-white/50">0:50 - 0:60:</span> One character walking away. The other holding a secret. Fade out.\`,
    90: \`<span class="text-blood font-bold">0:00 - 0:15:</span> Establishing the perfect lie. Bright colors, soft music.<br><br><span class="text-white">0:15 - 0:70:</span> The unraveling. Music shifts to minor keys. Dialogue overlaps focusing on gaslighting and doubt. The visual palette darkens.<br><br><span class="text-white/50">0:70 - 0:90:</span> The ultimate betrayal revealed, but with a twist. The victim smiles. Title.\`
  },
  horror: {
    30: \`<span class="text-blood font-bold">0:00 - 0:02:</span> Pure silence. A static frame of an empty hallway.<br><br><span class="text-white">0:02 - 0:28:</span> Rapid, disorienting barrage of disturbing imagery. Deafening static and shrieks.<br><br><span class="text-white/50">0:28 - 0:30:</span> Normalcy returns abruptly. Someone whispers behind you. End.\`,
    60: \`<span class="text-blood font-bold">0:00 - 0:10:</span> A seemingly innocent question asked in the dark. No answer.<br><br><span class="text-white">0:10 - 0:50:</span> Sound design leads the visual. We hear the monster/threat before we see it. Extreme tight framing so the viewer feels claustrophobic.<br><br><span class="text-white/50">0:50 - 0:60:</span> The protagonist turns around. The camera pans the other way. Jump scare frame for 1 frame. Black.\`,
    90: \`<span class="text-blood font-bold">0:00 - 0:20:</span> Establishing psychological dread. Uncanny valley imagery. Something is slightly off.<br><br><span class="text-white">0:20 - 0:80:</span> Descent into madness. The rules of physics/reality break down in the edit. Loops, reversed shots, subliminal text.<br><br><span class="text-white/50">0:80 - 0:90:</span> A realization that the threat isn't outside, it's inside. A final horrifying gaze into the lens.\`
  }
};

export default function Interactive({ isHover }) {
  const [genre, setGenre] = useState('thriller');
  const [duration, setDuration] = useState('30');
  const textRef = useRef(null);

  useEffect(() => {
    if(textRef.current) {
      gsap.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }, [genre, duration]);

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050507] relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-6">Build Your Own <span className="text-blood">Suspense</span></h2>
        <p className="text-white/50 mb-12">Select your parameters. See how I'd engineer the cut.</p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <select 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
            onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)}
            className="bg-transparent border border-white/20 text-white p-4 outline-none cursor-pointer uppercase tracking-widest text-sm appearance-none text-center"
          >
            <option value="thriller" className="bg-dark">Thriller</option>
            <option value="romance" className="bg-dark">Dark Romance</option>
            <option value="horror" className="bg-dark">Psychological Horror</option>
          </select>
          
          <select 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)}
            className="bg-transparent border border-white/20 text-white p-4 outline-none cursor-pointer uppercase tracking-widest text-sm appearance-none text-center"
          >
            <option value="30" className="bg-dark">30 Seconds</option>
            <option value="60" className="bg-dark">60 Seconds</option>
            <option value="90" className="bg-dark">90 Seconds</option>
          </select>
        </div>

        <div className="bg-dark/80 border border-white/10 p-8 rounded-lg text-left min-h-[200px] relative overflow-hidden">
          <div ref={textRef} className="relative z-10 text-lg leading-relaxed font-light" dangerouslySetInnerHTML={{__html: strategies[genre][duration]}}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] to-transparent opacity-50 z-0"></div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    path: 'src/components/sections/Contact.js',
    content: `'use client';
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
          <a href="mailto:hello@akashmanjhi.com" onMouseEnter={() => isHover(true)} onMouseLeave={() => isHover(false)} className="text-xl border-b border-blood pb-1 hover:text-blood transition-colors inline-block">hello@akashmanjhi.com</a>
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
}`
  },
  // --- 5. PAGES ---
  {
    path: 'src/app/page.js',
    content: `'use client';
import { useState } from 'react';
import Link from 'next/link';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Navbar from '@/components/ui/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import Footer from '@/components/ui/Footer';

// Sections
import Hero from '@/components/sections/Hero';
import Showreel from '@/components/sections/Showreel';
import Philosophy from '@/components/sections/Philosophy';
import Projects from '@/components/sections/Projects';
import CaseStudy from '@/components/sections/CaseStudy';
import Metrics from '@/components/sections/Metrics';
import Interactive from '@/components/sections/Interactive';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative">
        <CustomCursor isHovering={isHovering} />
        <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} isHover={setIsHovering} />
        
        {/* Fullscreen Menu */}
        <div className={\`fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center transition-all duration-700 \${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}\`}>
           <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-10 text-xs tracking-widest uppercase text-white/50">[ Close ]</button>
           <div className="flex flex-col gap-8 text-center">
              {['Works', 'Strategy'].map((item) => (
                <Link key={item} href={\`/\${item.toLowerCase()}\`} onClick={() => setMenuOpen(false)} className="font-display text-5xl uppercase hover:text-red-600 transition-colors">{item}</Link>
              ))}
           </div>
        </div>

        {/* All Modular Sections */}
        <Hero isHover={setIsHovering} />
        <Showreel isHover={setIsHovering} />
        <Philosophy />
        <Projects isHover={setIsHovering} />
        <CaseStudy />
        <Metrics />
        <Interactive isHover={setIsHovering} />
        <Contact isHover={setIsHovering} />
        <Footer />
        
      </main>
    </SmoothScroll>
  );
}`
  },
  {
    path: 'src/app/works/page.js',
    content: `'use client';
import { useState } from 'react';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Navbar from '@/components/ui/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import Footer from '@/components/ui/Footer';
import Projects from '@/components/sections/Projects';

export default function WorksPage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative pt-20">
        <CustomCursor isHovering={isHovering} />
        <Navbar onMenuToggle={() => {}} isHover={setIsHovering} />
        
        <Projects isHover={setIsHovering} />

        <section className="py-32 px-6 bg-[#08080a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl uppercase mb-12">Technical <span className="text-red-700">Breakdown</span></h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-8 border border-white/5 bg-black/40">
                <h4 className="text-red-600 font-bold mb-4 uppercase text-xs tracking-widest">Color Grading</h4>
                <p className="text-sm text-white/60">Using high-contrast LUTs to emphasize the psychological weight of every frame.</p>
              </div>
              <div className="p-8 border border-white/5 bg-black/40">
                <h4 className="text-red-600 font-bold mb-4 uppercase text-xs tracking-widest">Sound Design</h4>
                <p className="text-sm text-white/60">Custom Risers and Hits layered to ensure the audience never feels safe.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}`
  },
  {
    path: 'src/app/strategy/page.js',
    content: `'use client';
import { useState } from 'react';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Navbar from '@/components/ui/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import Footer from '@/components/ui/Footer';
import Interactive from '@/components/sections/Interactive';

export default function StrategyPage() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative pt-20">
        <CustomCursor isHovering={isHovering} />
        <Navbar onMenuToggle={() => {}} isHover={setIsHovering} />
        
        <Interactive isHover={setIsHovering} />

        <section className="py-32 px-6 bg-dark border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl uppercase mb-12 text-center">The Psychology of <span className="text-red-700">The Cut</span></h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
               <p>Visual retention is not about showing everything; it\\'s about withholding information at the right moment. By cutting a scene 2 frames before the expected resolution, we create a cognitive itch that the viewer must scratch.</p>
               <p>This "Open Loop" technique is what keeps viewers scrolling for more. We call it Emotional Architecture.</p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}`
  }
];

// Execute script
console.log('Starting project migration to Modular Structure...');

folders.forEach(function(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log('Created folder: ' + folder);
  }
});

files.forEach(function(file) {
  fs.writeFileSync(file.path, file.content);
  console.log('Created file: ' + file.path);
});

console.log('\\nMigration Complete, Bhai!');
console.log('Run: npm run dev');