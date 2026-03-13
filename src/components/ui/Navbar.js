'use client';
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
}