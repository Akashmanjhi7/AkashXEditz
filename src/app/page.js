'use client';
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
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center transition-all duration-700 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
           <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-10 text-xs tracking-widest uppercase text-white/50">[ Close ]</button>
           <div className="flex flex-col gap-8 text-center">
              {['Works', 'Strategy'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="font-display text-5xl uppercase hover:text-red-600 transition-colors">{item}</Link>
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
}