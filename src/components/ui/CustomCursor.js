'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor({ isHovering }) {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      gsap.to(dotRef.current, { left: clientX, top: clientY, duration: 0 });
      outlineRef.current.animate({ left: `${clientX}px`, top: `${clientY}px` }, { duration: 500, fill: "forwards" });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div 
        ref={outlineRef} 
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering ? 'w-16 h-16 bg-white/10 border-transparent' : 'w-10 h-10 border border-white/50 bg-transparent'
        }`} 
      />
    </>
  );
}