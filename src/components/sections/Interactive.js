'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const strategies = {
  thriller: {
    30: `<span class="text-blood font-bold">0:00 - 0:03:</span> Violent jump cut to breathing in the dark. No context.<br><br><span class="text-white">0:03 - 0:25:</span> Fast montage synced to a ticking clock. Overlapping chaotic dialogue.<br><br><span class="text-white/50">0:25 - 0:30:</span> Dead silence. "I know what you did." Smash cut to black.`,
    60: `<span class="text-blood font-bold">0:00 - 0:05:</span> A calm, unsettling lie told directly to camera.<br><br><span class="text-white">0:05 - 0:45:</span> Gradual build of discordant strings. Visuals contradict the opening lie. Subliminal flash cuts of the crime.<br><br><span class="text-white/50">0:45 - 0:60:</span> Hard stop. Sound drops. A knock on the door. Cut.`,
    90: `<span class="text-blood font-bold">0:00 - 0:10:</span> Long, continuous tracking shot. Deep bass drone. Establish the stakes immediately.<br><br><span class="text-white">0:10 - 0:75:</span> Three-act escalation. Fake resolution at 0:60, followed by the actual twist reveal.<br><br><span class="text-white/50">0:75 - 0:90:</span> The protagonist realizes they are trapped. A scream cut off by the title card.`
  },
  romance: {
    30: `<span class="text-blood font-bold">0:00 - 0:03:</span> A tear falling. Sound of a slap or breaking glass reversed.<br><br><span class="text-white">0:03 - 0:25:</span> Intimate, extreme close-ups. Whispered, toxic dialogue over slow, heavy breathing audio.<br><br><span class="text-white/50">0:25 - 0:30:</span> "I hate that I love you." Eye contact. Blackout.`,
    60: `<span class="text-blood font-bold">0:00 - 0:07:</span> Happy memory playback, glitching into a dark reality.<br><br><span class="text-white">0:07 - 0:50:</span> The push and pull. Fast cuts of passion mixed with slow-motion scenes of betrayal. Emotional piano fades to a low synth pulse.<br><br><span class="text-white/50">0:50 - 0:60:</span> One character walking away. The other holding a secret. Fade out.`,
    90: `<span class="text-blood font-bold">0:00 - 0:15:</span> Establishing the perfect lie. Bright colors, soft music.<br><br><span class="text-white">0:15 - 0:70:</span> The unraveling. Music shifts to minor keys. Dialogue overlaps focusing on gaslighting and doubt. The visual palette darkens.<br><br><span class="text-white/50">0:70 - 0:90:</span> The ultimate betrayal revealed, but with a twist. The victim smiles. Title.`
  },
  horror: {
    30: `<span class="text-blood font-bold">0:00 - 0:02:</span> Pure silence. A static frame of an empty hallway.<br><br><span class="text-white">0:02 - 0:28:</span> Rapid, disorienting barrage of disturbing imagery. Deafening static and shrieks.<br><br><span class="text-white/50">0:28 - 0:30:</span> Normalcy returns abruptly. Someone whispers behind you. End.`,
    60: `<span class="text-blood font-bold">0:00 - 0:10:</span> A seemingly innocent question asked in the dark. No answer.<br><br><span class="text-white">0:10 - 0:50:</span> Sound design leads the visual. We hear the monster/threat before we see it. Extreme tight framing so the viewer feels claustrophobic.<br><br><span class="text-white/50">0:50 - 0:60:</span> The protagonist turns around. The camera pans the other way. Jump scare frame for 1 frame. Black.`,
    90: `<span class="text-blood font-bold">0:00 - 0:20:</span> Establishing psychological dread. Uncanny valley imagery. Something is slightly off.<br><br><span class="text-white">0:20 - 0:80:</span> Descent into madness. The rules of physics/reality break down in the edit. Loops, reversed shots, subliminal text.<br><br><span class="text-white/50">0:80 - 0:90:</span> A realization that the threat isn't outside, it's inside. A final horrifying gaze into the lens.`
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
}