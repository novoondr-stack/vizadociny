'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const RED = '#B91C1C'

interface Props {
  code: string
  name: string
  desc: string
  price: string
  badge: string
  docs: string[]
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
}

export default function VisaCard({ code, name, desc, price, badge, docs, icon: Icon }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [glare, setGlare] = useState({ gx: 50, gy: 50, op: 0 })

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 280, damping: 28 })
  const springY = useSpring(rotY, { stiffness: 280, damping: 28 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = e.clientX - r.left
    const py = e.clientY - r.top
    rotX.set(((py - r.height / 2) / r.height) * -12)
    rotY.set(((px - r.width  / 2) / r.width ) *  12)
    setGlare({ gx: (px / r.width) * 100, gy: (py / r.height) * 100, op: 0.18 })
  }

  function onLeave() {
    rotX.set(0)
    rotY.set(0)
    setGlare({ gx: 50, gy: 50, op: 0 })
    setActive(false)
  }

  return (
    <motion.div
      ref={ref}
      className="visa-card relative cursor-default h-full"
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      /* inflate: scale up + float higher */
      whileHover={{ scale: 1.06, y: -6 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={onLeave}
    >
      <div
        className="relative overflow-hidden bg-white p-7 rounded-[2rem] flex flex-col h-full"
        style={{
          border: active ? '1.5px solid rgba(185,28,28,0.45)' : '1.5px solid #f1f5f9',
          boxShadow: active
            ? '0 40px 90px -10px rgba(185,28,28,0.22), 0 20px 40px rgba(0,0,0,0.10)'
            : '0 2px 16px rgba(0,0,0,0.05)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Glare */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[2rem]"
          style={{
            background: `radial-gradient(circle at ${glare.gx}% ${glare.gy}%, rgba(255,255,255,${glare.op}) 0%, transparent 62%)`,
            transition: active ? 'none' : 'opacity 0.5s ease',
            zIndex: 10,
          }}
        />

        <div className="relative z-20 flex flex-col h-full">

          {/* Animated icon — lifts and enlarges on card hover */}
          <motion.div
            className="mb-4 w-fit"
            animate={active ? { y: -8, scale: 1.22 } : { y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            <Icon size={24} style={{ color: RED }} />
          </motion.div>

          {/* Header row */}
          <div className="flex items-start justify-between mb-3">
            <span
              className="text-5xl font-extrabold tracking-tighter leading-none"
              style={{ color: RED }}
            >
              {code}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-red-50 text-red-700 rounded-full">
              {badge}
            </span>
          </div>

          <p className="text-sm font-bold text-gray-800 mb-1.5">{name}</p>
          <p className="text-xs text-gray-500 leading-relaxed flex-1">{desc}</p>

          {/* Bottom */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-xs text-gray-400 font-medium">od</span>
              <span className="text-xl font-bold text-gray-900">{price}</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Dokumenty
            </p>
            <div className="flex flex-wrap gap-1.5">
              {docs.map((doc) => (
                <span
                  key={doc}
                  className="bg-gray-50 text-gray-500 text-xs px-3 py-1 rounded-full border border-gray-100"
                >
                  {doc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
