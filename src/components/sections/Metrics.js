'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Metrics() {

  const container = useRef(null)

  const metrics = [
    {
      value: 78,
      suffix: '%',
      label: 'Avg. Thumbstop Rate',
      highlight: true
    },
    {
      value: 2.3,
      suffix: 'M',
      label: 'Total Views Generated'
    },
    {
      value: 0.42,
      suffix: '₹',
      label: 'Average CPI (Cost per Install)'
    },
    {
      value: 4.8,
      suffix: 'x',
      label: 'ROAS (Return on Ad Spend)'
    }
  ]

  useGSAP(() => {

    const counters = gsap.utils.toArray('.counter')

    counters.forEach(counter => {

      const target = parseFloat(counter.dataset.target)

      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,

        onEnter: () => {

          let obj = { val: 0 }

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power3.out",

            onUpdate: () => {

              if (target % 1 !== 0) {
                counter.innerText = obj.val.toFixed(1)
              } else {
                counter.innerText = Math.floor(obj.val)
              }

            }
          })

        }

      })

    })

  }, { scope: container })


  return (

    <section
      ref={container}
      className="py-36 px-6 bg-black border-t border-b border-white/5"
    >

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-20 text-center">

          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-white mb-4">
            Performance Metrics
          </h2>

          <p className="text-white/40 text-sm tracking-widest uppercase">
            Data from High Impact Promo Campaigns
          </p>

        </div>

        {/* Metrics Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">

          {metrics.map((metric, i) => (

            <div
              key={i}
              className="border border-white/10 rounded-xl p-10 hover:border-red-700/40 transition-all duration-500"
            >

              <div className={`font-display text-6xl md:text-7xl font-bold mb-3 ${metric.highlight ? 'text-red-700' : 'text-white'}`}>

                <span
                  className="counter"
                  data-target={metric.value}
                >
                  0
                </span>

                {metric.suffix}

              </div>

              <p className="text-white/50 text-sm tracking-widest uppercase">
                {metric.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}