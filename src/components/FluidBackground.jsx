import { useEffect, useRef } from 'react'

export default function FluidBackground() {
  const canvasRef = useRef(null)
  const noiseCanvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const noiseCanvas = document.createElement('canvas')
    noiseCanvasRef.current = noiseCanvas
    const nctx = noiseCanvas.getContext('2d')

    let width = (canvas.width = noiseCanvas.width = window.innerWidth)
    let height = (canvas.height = noiseCanvas.height = window.innerHeight)

    const gradientColors = [
      { r: 26, g: 26, b: 26 }, // charcoal
      { r: 44, g: 95, b: 77 }, // hunter green
    ]

    const points = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      r: 200 + Math.random() * 300,
    }))

    let startTime = performance.now()

    const drawNoise = () => {
      const imgData = nctx.createImageData(noiseCanvas.width, noiseCanvas.height)
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = (Math.random() * 15) | 0 // subtle grain
        imgData.data[i] = 0 + v
        imgData.data[i + 1] = 0 + v
        imgData.data[i + 2] = 0 + v
        imgData.data[i + 3] = 13 // ~5% opacity over composite
      }
      nctx.putImageData(imgData, 0, 0)
    }

    const render = (t) => {
      const elapsed = (t - startTime) / 1000
      ctx.clearRect(0, 0, width, height)

      // very slow morphing: 45s cycle
      const phase = (elapsed / 45) * Math.PI * 2

      points.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -p.r) p.x = width + p.r
        if (p.x > width + p.r) p.x = -p.r
        if (p.y < -p.r) p.y = height + p.r
        if (p.y > height + p.r) p.y = -p.r
      })

      // radial gradients blending
      points.forEach((p, i) => {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        const colorA = gradientColors[0]
        const colorB = gradientColors[1]
        const mix = (Math.sin(phase + i) + 1) / 2
        const r = Math.round(colorA.r * (1 - mix) + colorB.r * mix)
        const gch = Math.round(colorA.g * (1 - mix) + colorB.g * mix)
        const b = Math.round(colorA.b * (1 - mix) + colorB.b * mix)
        g.addColorStop(0, `rgba(${r},${gch},${b},0.35)`)
        g.addColorStop(1, 'rgba(26,26,26,0.0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // subtle vignette
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.2,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      )
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.35)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      // grain overlay
      ctx.drawImage(noiseCanvas, 0, 0)

      requestAnimationFrame(render)
    }

    const onResize = () => {
      width = canvas.width = noiseCanvas.width = window.innerWidth
      height = canvas.height = noiseCanvas.height = window.innerHeight
      drawNoise()
    }

    drawNoise()
    requestAnimationFrame(render)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ filter: 'saturate(1.05) contrast(1.05)' }}
    />
  )
}
