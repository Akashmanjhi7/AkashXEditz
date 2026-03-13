'use client'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Showreel({ isHover }) {

  const container = useRef(null)
  const videoRef = useRef(null)
  const playBtn = useRef(null)

  const [hovered, setHovered] = useState(false)

  useGSAP(() => {

    const ctx = gsap.context(() => {

      const words = gsap.utils.toArray('.scroll-word')

      gsap.fromTo(
        words,
        { opacity: 0.1, filter: 'blur(8px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.showreel-container',
            start: 'bottom 80%',
            end: 'bottom 20%',
            scrub: true,
          }
        }
      )

    }, container)

    return () => ctx.revert()

  }, [])

  // 🔥 hover logic
  const handleEnter = () => {

    setHovered(true)
    isHover?.(true)

    videoRef.current.volume = 0.3
    videoRef.current.play()
    gsap.to(videoRef.current, {
      scale: 1.08,
      duration: 0.6,
      ease: 'power3.out'
    })

  }

  const handleLeave = () => {

    setHovered(false)
    isHover?.(false)

    videoRef.current.pause()

    gsap.to(videoRef.current, {
      scale: 1,
      duration: 0.5
    })

  }

  return (

    <section
      ref={container}
      className="py-32 px-6 md:px-12 bg-black min-h-screen flex flex-col justify-center"
    >

      <div className="max-w-7xl mx-auto w-full">

        {/* Heading */}

        <h2 className="font-display text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter mb-16 opacity-20">
          Selected Suspense
        </h2>

        {/* VIDEO */}

        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="relative w-full aspect-video bg-black rounded-md overflow-hidden cursor-pointer mb-24 showreel-container"
        >

          {/* Video */}

          <video
            ref={videoRef}
            src="/videos/showreel_1.mp4"
            loop
            video
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700"
          />

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/40 transition-all duration-500"></div>

          {/* Play UI */}

          {!hovered && (

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white">

              <div
                ref={playBtn}
                className="w-20 h-20 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md"
              >

                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>

              </div>

              <p className="text-sm tracking-widest uppercase opacity-80">
                Hover to play
              </p>

            </div>

          )}

        </div>

        {/* Scroll Text */}

        <div className="flex flex-wrap gap-6 justify-center text-3xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tight">

          <span className="scroll-word text-white/10">Hook.</span>
          <span className="scroll-word text-white/10">Emotion.</span>
          <span className="scroll-word text-white/10">Tension.</span>
          <span className="scroll-word text-white/10">Release.</span>
          <span className="scroll-word text-red-700">Cliffhanger.</span>

        </div>

      </div>

    </section>

  )
}