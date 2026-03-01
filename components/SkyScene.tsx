/* eslint-disable @next/next/no-img-element */
'use client'

const STARS: { top: string; left: string; r: number }[] = [
  { top: '5%',  left: '12%', r: 1.5 }, { top: '8%',  left: '40%', r: 2   },
  { top: '4%',  left: '65%', r: 1.5 }, { top: '12%', left: '78%', r: 1   },
  { top: '7%',  left: '55%', r: 1   }, { top: '15%', left: '25%', r: 1.5 },
  { top: '3%',  left: '88%', r: 1.5 }, { top: '18%', left: '70%', r: 1   },
  { top: '10%', left: '32%', r: 2   }, { top: '20%', left: '50%', r: 1   },
  { top: '6%',  left: '20%', r: 1   }, { top: '14%', left: '90%', r: 1.5 },
  { top: '22%', left: '8%',  r: 1   }, { top: '9%',  left: '48%', r: 1   },
  { top: '16%', left: '60%', r: 1.5 },
]

export default function SkyScene() {
  return (
    <div
      className="relative w-full select-none hover:scale-105 transition-transform duration-700"
      style={{ maxWidth: 520, margin: '0 auto' }}
    >

      {/* Outer decorative halo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -8,
          background: 'conic-gradient(from 0deg, rgba(185,28,28,0.2) 0%, rgba(80,80,80,0.12) 50%, rgba(185,28,28,0.2) 100%)',
          filter: 'blur(14px)',
          zIndex: 0,
        }}
      />

      {/* Aspect-square container */}
      <div className="w-full aspect-square relative" style={{ zIndex: 1 }}>

        {/* Inset shadow for depth */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none z-20"
          style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4), 0 28px 80px rgba(0,0,0,0.2)' }}
        />

        {/* ── THE MOONGATE ── */}
        <div className="absolute inset-0 rounded-full overflow-hidden">

          {/* Sky — three cross-fading layers: night (base) → golden → day */}
          <div className="absolute inset-0 sky-night" />
          <div className="absolute inset-0 sky-golden" />
          <div className="absolute inset-0 sky-day" />

          {/* Stars */}
          <div className="absolute inset-0 sky-stars pointer-events-none">
            {STARS.map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{ top: s.top, left: s.left, width: s.r * 2, height: s.r * 2 }}
              />
            ))}
          </div>

          {/* Moon */}
          <div className="sky-moon">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle at 38% 38%, #f1f5f9 0%, #cbd5e1 100%)',
                boxShadow: '0 0 18px 5px rgba(255,255,255,0.32)',
              }}
            />
          </div>

          {/* Sun */}
          <div className="sky-sun">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #fef08a 0%, #f59e0b 100%)',
                boxShadow: '0 0 30px 10px rgba(251,191,36,0.6), 0 0 70px 30px rgba(251,191,36,0.22)',
              }}
            />
          </div>

          {/* Clouds */}
          <img src="https://i.imgur.com/6tncGeG.png" alt="" className="sky-cloud-1" />
          <img src="https://i.imgur.com/6tncGeG.png" alt="" className="sky-cloud-2" />

          {/* Plane */}
          <img src="https://i.imgur.com/3BGEqFQ.png" alt="" className="sky-plane" />

          {/* Horizon glow */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: '18%', height: '8%', background: 'linear-gradient(to top, rgba(255,255,220,0.08), transparent)' }}
          />

          {/* City skyline */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: '22%' }}>
            <svg viewBox="0 0 400 80" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
              <path
                fill="rgba(5, 10, 24, 0.82)"
                d="M0,80 L0,52 L10,52 L10,36 L18,36 L18,24 L22,18 L26,24 L26,36 L36,36 L36,52
                   L48,52 L48,40 L58,40 L58,52
                   L68,52 L68,38 L74,32 L80,38 L80,52
                   L92,52 L92,28 L104,28 L104,20 L107,14 L110,20 L110,28 L122,28 L122,52
                   L132,52 L132,42 L142,42 L142,28 L150,28 L150,52
                   L162,52 L162,34 L174,34 L174,52
                   L184,52 L184,38 L190,30 L196,38 L196,52
                   L208,52 L208,24 L220,24 L220,16 L223,10 L226,16 L226,24 L238,24 L238,52
                   L250,52 L250,40 L260,40 L260,52
                   L272,52 L272,32 L284,32 L284,52
                   L295,52 L295,42 L305,42 L305,52
                   L316,52 L316,28 L326,28 L326,52
                   L338,52 L338,38 L348,38 L348,24 L352,18 L356,24 L356,38 L366,38 L366,52
                   L378,52 L378,44 L390,44 L390,52
                   L400,52 L400,80 Z"
              />
            </svg>
          </div>

        </div>

        {/* Badge — bottom-left */}
        <div
          className="absolute z-30 flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-md"
          style={{ bottom: '6%', left: '-4%' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
            style={{ background: '#B91C1C' }}
          >
            中
          </div>
          <div>
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">Přímá spolupráce</p>
            <p className="text-sm font-semibold text-gray-800">Čínský konzulát Praha</p>
          </div>
        </div>

        {/* Badge — top-right */}
        <div
          className="absolute z-30 bg-white border border-gray-100 rounded-2xl px-5 py-4 text-center shadow-md"
          style={{ top: '8%', right: '-4%' }}
        >
          <p className="text-2xl font-bold leading-none" style={{ color: '#B91C1C' }}>100%</p>
          <p className="text-[10px] text-gray-400 mt-1">Úspěšnost</p>
        </div>

      </div>
    </div>
  )
}
