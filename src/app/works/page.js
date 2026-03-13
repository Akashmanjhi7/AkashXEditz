'use client';
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
}