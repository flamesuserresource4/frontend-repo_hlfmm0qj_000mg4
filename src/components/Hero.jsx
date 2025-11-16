import { useEffect, useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import DataTicker from './DataTicker'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  // Scroll transforms (0-100vh)
  const networkScale = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const networkY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  // Headline lines animation
  const lines = useMemo(
    () => ['We Engineer', 'Attention,', 'Emotion,', 'Action.'],
    []
  )

  // Scroll indicator fade out after 3s or on scroll
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Parallax mouse for Spline wrapper
  const parallaxRef = useRef(null)
  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX / w - 0.5) * 10 // max 10px
      const y = (e.clientY / h - 0.5) * 10
      el.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#1A1A1A] text-[#FAFAFA]"
    >
      {/* Fluid gradient mesh background */}
      <div className="absolute inset-0">
        {/* Canvas gradient mesh */}
        <div className="absolute inset-0">
          {/* Lazy import via dynamic component boundary can be added later if needed */}
        </div>
      </div>

      {/* Left content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="min-h-screen grid grid-cols-12 items-center">
          <motion.div
            style={{ scale: headlineScale, opacity: headlineOpacity }}
            className="col-span-12 md:col-span-6 lg:col-span-5"
          >
            <div className="space-y-6">
              <div className="leading-[1.1] tracking-[-0.02em]">
                {lines.map((t, i) => (
                  <motion.h1
                    key={t}
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ delay: i * 0.8, duration: 0.9, ease: 'easeOut' }}
                    className="text-[48px] sm:text-[56px] md:text-[64px] font-serif"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {t}
                  </motion.h1>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: lines.length * 0.8 + 1.2, duration: 0.6 }}
                className="text-[#999999] max-w-[60ch] text-[18px]"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.6 }}
              >
                Psychology-driven design for brands that demand measurable results.
              </motion.p>

              <div className="pt-4">
                <DataTicker />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: lines.length * 0.8 + 1.8, duration: 0.6 }}
                className="pt-8"
              >
                <a
                  href="#framework"
                  className="inline-block bg-[#2C5F4D] text-white text-[16px] font-medium px-9 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(44,95,77,0.3)] transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  Explore The Framework →
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Spline cover on right */}
          <motion.div
            style={{ scale: networkScale, y: networkY }}
            className="col-span-12 md:col-span-6 lg:col-span-7 relative"
          >
            <div
              ref={parallaxRef}
              className="absolute right-0 top-0 h-[60vh] md:h-[80vh] lg:h-[90vh] w-full md:w-[60vw]"
            >
              <Spline
                scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />

              {/* soft gradient overlay for depth - pointer events disabled */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#1A1A1A] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-3"
      >
        <div className="text-xs tracking-wide text-[#9AA5A1]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Scroll to see psychology in action
        </div>
        <div className="relative h-[60px] w-px bg-[#2C5F4D]" aria-hidden>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 block h-2 w-2 rounded-full bg-[#2C5F4D] animate-ping" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 block h-2 w-2 rounded-full bg-[#2C5F4D]" />
        </div>
      </motion.div>
    </section>
  )
}
