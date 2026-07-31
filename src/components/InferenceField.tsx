import { useEffect, useRef } from 'react'
import { pick, useLanguage } from '../i18n/LanguageContext'

type Node = { x: number; y: number; vx: number; vy: number; group: number; phase: number }

const mulberry32 = (seed: number) => () => {
  let value = seed += 0x6d2b79f5
  value = Math.imul(value ^ value >>> 15, value | 1)
  value ^= value + Math.imul(value ^ value >>> 7, value | 61)
  return ((value ^ value >>> 14) >>> 0) / 4294967296
}

export default function InferenceField() {
  const { language } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const random = mulberry32(642)
    const nodes: Node[] = Array.from({ length: 52 }, (_, index) => ({
      x: random(),
      y: random(),
      vx: (random() - 0.5) * 0.00016,
      vy: (random() - 0.5) * 0.00016,
      group: index % 3,
      phase: random() * Math.PI * 2,
    }))
    const pointer = { x: 0.5, y: 0.5, active: false }
    let width = 0
    let height = 0
    let animationFrame = 0
    let lastFrame = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(0)
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      const centers = [
        { x: width * 0.29, y: height * 0.3 },
        { x: width * 0.69, y: height * 0.4 },
        { x: width * 0.5, y: height * 0.76 },
      ]

      context.strokeStyle = 'rgba(105, 151, 132, 0.065)'
      context.lineWidth = 1
      for (let x = 0; x < width; x += 76) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke()
      }
      for (let y = 0; y < height; y += 76) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke()
      }

      if (!reducedMotion && time - lastFrame > 12) {
        for (const node of nodes) {
          const center = centers[node.group]
          const nx = node.x * width
          const ny = node.y * height
          node.vx += ((center.x - nx) / width) * 0.0000015
          node.vy += ((center.y - ny) / height) * 0.0000015
          if (pointer.active) {
            const dx = node.x - pointer.x
            const dy = node.y - pointer.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 0.18 && distance > 0) {
              node.vx += dx * 0.00003 / distance
              node.vy += dy * 0.00003 / distance
            }
          }
          node.vx *= 0.997
          node.vy *= 0.997
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0.02 || node.x > 0.98) node.vx *= -1
          if (node.y < 0.02 || node.y > 0.98) node.vy *= -1
          node.x = Math.max(0.01, Math.min(0.99, node.x))
          node.y = Math.max(0.01, Math.min(0.99, node.y))
        }
        lastFrame = time
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = (a.x - b.x) * width
          const dy = (a.y - b.y) * height
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 82 && (a.group === b.group || distance < 40)) {
            context.strokeStyle = `rgba(123, 184, 158, ${0.12 * (1 - distance / 82)})`
            context.beginPath()
            context.moveTo(a.x * width, a.y * height)
            context.lineTo(b.x * width, b.y * height)
            context.stroke()
          }
        }
      }

      nodes.forEach((node) => {
        const pulse = reducedMotion ? 1 : 0.7 + Math.sin(time * 0.001 + node.phase) * 0.3
        context.fillStyle = node.group === 1 ? `rgba(88, 185, 142, ${0.55 + pulse * 0.3})` : `rgba(203, 224, 215, ${0.35 + pulse * 0.25})`
        context.beginPath()
        context.arc(node.x * width, node.y * height, 1.2 + pulse, 0, Math.PI * 2)
        context.fill()
      })

      centers.forEach((center, index) => {
        const radius = 47 + index * 9
        context.strokeStyle = 'rgba(88, 185, 142, 0.24)'
        context.beginPath()
        context.arc(center.x, center.y, radius, -Math.PI * 0.8, Math.PI * (0.4 + index * 0.2))
        context.stroke()
      })

      if (!reducedMotion && !document.hidden) animationFrame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        pointer.active = false
        return
      }
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.active = true
    }

    const onVisibility = () => {
      cancelAnimationFrame(animationFrame)
      if (!document.hidden && !reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    resize()
    if (!reducedMotion) animationFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="inference-field" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="inference-field__label inference-field__label--one"><span>01</span> {pick(language, 'Statistical Foundation', '统计基础')}</div>
      <div className="inference-field__label inference-field__label--two"><span>02</span> {pick(language, 'Model Diagnosis', '模型诊断')}</div>
      <div className="inference-field__label inference-field__label--three"><span>03</span> {pick(language, 'Robust Policy Optimization', '稳健策略优化')}</div>
    </div>
  )
}
