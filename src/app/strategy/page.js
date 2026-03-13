'use client';
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
               <p>Visual retention is not about showing everything; it\'s about withholding information at the right moment. By cutting a scene 2 frames before the expected resolution, we create a cognitive itch that the viewer must scratch.</p>
               <p>This "Open Loop" technique is what keeps viewers scrolling for more. We call it Emotional Architecture.</p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}