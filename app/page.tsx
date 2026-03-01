'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, animate, useInView } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Star,
  Phone,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  HardHat,
} from 'lucide-react'
import VisaCard from '../components/VisaCard'

const SkyScene = dynamic(() => import('../components/SkyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-[480px] mx-auto rounded-full bg-gray-100 animate-pulse" />
  ),
})

/* ─── Theme ─── */
const RED  = '#B91C1C'
const DARK = '#111827'

/* ─── Reusable spring variants ───────────────────────────
   High damping (28-30) = settles quickly, no overshoot
   This is the "Lusion-style" feel: physical but not bouncy
─────────────────────────────────────────────────────── */
const FADE_UP = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 28 } },
}
const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
}
/* whileInView sections — once:false → reverts on scroll-up (bidirectional) */
const ITEM = {
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 28 } },
}

/* viewport helper — once: false gives bidirectional (Lusion-style) */
const VP = { once: false, margin: '-80px' }

/* ─── CountUp — animates from 0 to `raw`, resets when out of view ─── */
function CountUp({ raw, suffix }: { raw: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, margin: '-50px' })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!inView) {
      setDisplayed('0')
      return
    }
    const stop = animate(0, raw, {
      duration: 2,
      ease: [0.0, 0.0, 0.2, 1.0],
      onUpdate(v) {
        const n = Math.round(v)
        setDisplayed(raw >= 1000 ? n.toLocaleString('cs-CZ') : String(n))
      },
    })
    return stop.stop
  }, [inView, raw])

  return (
    <span ref={ref}>
      {displayed}{suffix}
    </span>
  )
}

/* ─── Data ─── */
const VISA_TYPES = [
  {
    code: 'L', name: 'Turistické vízum',
    desc: 'Pro soukromé cestovatele. 1–2 vstupy, pobyt 30–90 dní.',
    price: '4 499 Kč', badge: 'Nejoblíbenější',
    docs: ['Cestovní pas', 'Fotografie', 'Hotel', 'Letenka', 'Itinerář'],
    icon: Globe,
  },
  {
    code: 'M', name: 'Obchodní vízum',
    desc: 'Pro podnikatele a firmy. Multi-vstup platný 1–5 let.',
    price: '5 999 Kč', badge: 'Multi-vstup 5 let',
    docs: ['Výpis z rej.', 'Zvací dopis', 'Cestovní pas', 'Fotografie'],
    icon: Briefcase,
  },
  {
    code: 'X', name: 'Studijní vízum',
    desc: 'Pro studenty. X1 nad 180 dní, X2 do 180 dní pobytu.',
    price: '5 999 Kč', badge: 'X1 / X2',
    docs: ['JW201 formulář', 'Přijímací dopis', 'Cestovní pas', 'Fotografie'],
    icon: GraduationCap,
  },
  {
    code: 'Z', name: 'Pracovní vízum',
    desc: 'Pro cizince pracující v Číně s pracovním povolením.',
    price: '5 999 Kč', badge: 'Long-stay',
    docs: ['Pracovní povolení', 'Pracovní smlouva', 'Cestovní pas', 'Fotografie'],
    icon: HardHat,
  },
]

const STATS = [
  { raw: 31982, suffix: '',     label: 'Podaných žádostí', sub: 'od roku 2008' },
  { raw: 100,   suffix: '%',    label: 'Úspěšnost',        sub: 'udělení víza zaručeno' },
  { raw: 4,     suffix: ' dny', label: 'Standardní doba',  sub: '3 dny v expres režimu' },
  { raw: 25,    suffix: '+',    label: 'Let zkušeností',   sub: 's čínským konzulátem' },
]

const PROCESS_STEPS = [
  { n: '01', title: 'Příprava dokumentů',
    desc: 'Detailní kontrola vašich podkladů. Upravíme vše tak, aby splnilo přísné požadavky konzulátu.', icon: FileText },
  { n: '02', title: 'Podání žádosti',
    desc: 'Domluvíme termín a s naší asistencí podáme žádost na centru CITS. Otisky prstů jen u dlouhodobých víz.', icon: CheckCircle2 },
  { n: '03', title: 'Vízum uděleno',
    desc: 'Do 4 pracovních dnů. Pas zašleme EMS nebo vyzvednete osobně na Václavském náměstí.', icon: Star },
]

/* ─── Page ─── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">

      {/* ════════════════════════════════
          NAVBAR
      ════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between py-4">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0" style={{ background: RED }}>
              中
            </div>
            <span className="font-bold text-gray-900 text-[15px] tracking-tight">VízadoČíny.cz</span>
            <span className="hidden sm:inline text-gray-400 text-xs">od roku 2008</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[['#typy-viz','Typy víz'],['#proces','Jak to funguje'],['#cenik','Ceník'],['#dokumenty','Dokumenty']].map(([href, label]) => (
              <a key={href} href={href} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                {label}
              </a>
            ))}
          </nav>

          <motion.a
            href="https://www.vizadociny.cz/objednavka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-full"
            style={{ background: RED, transition: 'background-color 0.4s ease' }}
            whileHover={{ scale: 1.05, backgroundColor: '#991b1b' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Objednat vízum <ArrowRight size={14} />
          </motion.a>
        </div>
      </header>

      {/* ════════════════════════════════
          HERO — fills viewport, no scroll needed
      ════════════════════════════════ */}
      <section
        className="relative z-10 flex items-center"
        style={{ minHeight: 'calc(100vh - 73px)' }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8 w-full">
          {/* flex justify-between keeps headline and SkyScene at opposite ends */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-10">

            {/* ── LEFT — flex-1 so it fills remaining space next to the circle ── */}
            <motion.div variants={STAGGER} initial="hidden" animate="visible" className="flex-1 min-w-0">

              {/* Pill */}
              <motion.div variants={FADE_UP} className="mb-7">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Aktuálně otevřeno · Pondělí – Pátek
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={FADE_UP}
                className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06] mb-5"
                style={{ color: DARK }}
              >
                Čínské vízum{' '}
                <span style={{ color: RED }}>rychle</span>
                <br />a spolehlivě
              </motion.h1>

              <motion.p variants={FADE_UP} className="text-lg text-gray-500 font-light leading-relaxed max-w-md mb-10">
                Přes <span className="text-gray-700 font-medium">31 000 spokojených klientů</span>{' '}
                od roku 2008. Zaručená 100&thinsp;% úspěšnost podání.
              </motion.p>

              {/* CTA — scale + shadow pulse only; no layout-shifting animations */}
              <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-3">
                <motion.a
                  href="https://www.vizadociny.cz/objednavka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pulse group inline-flex items-center gap-2.5 px-7 py-3.5 text-white font-semibold text-sm rounded-full"
                  style={{ background: RED, transition: 'background-color 0.4s ease' }}
                  whileHover={{ scale: 1.05, backgroundColor: '#991b1b' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                >
                  Chci zajistit vízum
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.a>
                <motion.a
                  href="#typy-viz"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full"
                  whileHover={{ scale: 1.04, borderColor: '#9ca3af' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  Typy víz
                </motion.a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: explicit lg:w-[460px] so aspect-square can resolve height ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 26, delay: 0.3 }}
              className="mt-10 lg:mt-0 w-full lg:w-[460px] lg:flex-none"
            >
              <SkyScene />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          VISA CARDS — immediately after hero
      ════════════════════════════════ */}
      <section id="typy-viz" className="relative z-10 bg-gray-50/60 border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-8">

          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={FADE_UP}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RED }}>Nabídka víz</p>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: DARK }}>Typy čínských víz</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={STAGGER}
          >
            {VISA_TYPES.map((v) => (
              <motion.div key={v.code} variants={ITEM} className="flex">
                <VisaCard {...v} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          STATS — awan clouds as background + CountUp numbers
      ════════════════════════════════ */}
      <section className="relative z-10 border-y border-gray-100 overflow-hidden">
        {/* Awan cloud strip behind the numbers */}
        <div className="awan-strip absolute inset-0 pointer-events-none" style={{ opacity: 0.14 }} />
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={STAGGER}
          >
            {STATS.map((s, i) => (
              <motion.div key={i} variants={ITEM} className="text-center">
                <p className="text-4xl font-bold tracking-tight" style={{ color: RED }}>
                  <CountUp raw={s.raw} suffix={s.suffix} />
                </p>
                <p className="text-sm font-semibold text-gray-700 mt-1.5">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROCESS
      ════════════════════════════════ */}
      <section id="proces" className="relative z-10 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">

          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={VP}
            variants={FADE_UP}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RED }}>Jak to funguje</p>
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: DARK }}>Vízum ve 3 krocích</h2>
            <p className="text-base text-gray-500 max-w-lg mx-auto">Zajistíme kompletní a bezchybnou žádost. Zaručujeme 100&thinsp;% úspěšné podání.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={VP}
            variants={STAGGER}
          >
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.n}
                  variants={ITEM}
                  className="relative bg-white p-8 rounded-[2rem] border border-gray-100 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.09)' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                >
                  <span className="absolute top-5 right-6 text-7xl font-black select-none leading-none" style={{ color: RED, opacity: 0.04 }}>
                    {step.n}
                  </span>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(185,28,28,0.07)' }}>
                    <Icon size={20} style={{ color: RED }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: DARK }}>{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          DOCUMENTS
      ════════════════════════════════ */}
      <section id="dokumenty" className="relative z-10 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">

          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={VP}
            variants={FADE_UP}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RED }}>Požadavky 2026</p>
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: DARK }}>Potřebné dokumenty</h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">U krátkodobých víz (L, M 1–2 vstupy) otisky prstů nejsou od 1. 1. 2026 vyžadovány.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial="hidden" whileInView="visible" viewport={VP}
            variants={STAGGER}
          >
            {[
              {
                label: null, icon: FileText, title: 'Základní dokumenty — všechna víza',
                items: [
                  'Originál cestovního pasu + kopie (platnost min. 6 měsíců, 2 volné strany)',
                  '1× barevná originální fotografie dle specifikace konzulátu',
                  'Vyplněný Application Form — žádost o vízum ČLR',
                  'Povolení k pobytu nebo pracovní smlouva (pro cizince)',
                ],
              },
              {
                label: 'L', icon: null, title: 'Turistické vízum — navíc',
                items: [
                  'Rezervace hotelu / ubytování v Číně',
                  'Zpáteční letenka (rezervace)',
                  'Cestovní itinerář',
                  'Zvací dopis od organizace nebo jednotlivce v Číně (volitelně)',
                ],
              },
              {
                label: 'M', icon: null, title: 'Obchodní vízum — navíc',
                items: [
                  'Výpis z obchodního rejstříku české společnosti',
                  'Osvědčení o registraci čínské společnosti',
                  'Zvací dopis od čínské zvoucí organizace',
                  'Pro multi-vstupé víza: vysílací dopis od zaměstnavatele',
                ],
              },
            ].map((card, i) => (
              <motion.div key={i} variants={ITEM} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold" style={{ background: 'rgba(185,28,28,0.07)', color: RED }}>
                    {card.icon ? <card.icon size={18} style={{ color: RED }} /> : card.label}
                  </div>
                  <h3 className="font-bold text-gray-900">{card.title}</h3>
                </div>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: RED }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Info card — dark */}
            <motion.div
              variants={ITEM}
              className="p-8 rounded-[2rem] flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)' }}
            >
              <div>
                <Clock size={22} className="mb-5" style={{ color: 'rgba(255,255,255,0.4)' }} />
                <h3 className="text-lg font-bold text-white mb-3">Aktuální podmínky 2026</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Od 1. 1. 2026 jsou otisky prstů vyžadovány{' '}
                  <strong className="text-white">pouze u dlouhodobých víz</strong>{' '}
                  (Z, X1, D, J1, Q1, S1). U turistických L a obchodních M (1–2 vstupy){' '}
                  <strong className="text-white">se otisky neodebírají</strong>.
                </p>
                <p className="text-xs text-gray-500 mt-3">Platnost: do 31. 12. 2026</p>
              </div>
              <a
                href="https://www.vizadociny.cz/aktualni-podminky"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Zobrazit všechny podmínky <ArrowRight size={13} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          PRICING
      ════════════════════════════════ */}
      <section id="cenik" className="relative z-10 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">

          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={VP}
            variants={FADE_UP}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: RED }}>Ceník</p>
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: DARK }}>Transparentní ceny</h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Ceny jsou včetně DPH. Zahrnují poplatek vízového centra CITS (1 100 Kč) i konzulátu (1 100 Kč).
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={VP}
            variants={STAGGER}
          >
            {[
              {
                tier: 'Turista', price: '4 499 Kč', sub: 'Turistické vízum L · soukromé osoby',
                featured: false,
                features: ['Turistické víza L (1–2 vstupy)','Poplatky konzulátu + CITS v ceně','Detailní kontrola dokumentů','Příspěvek 100 Kč na DOBRÝ ANDĚL','Video manuál k Application Form'],
              },
              {
                tier: 'Profi', price: '5 999 Kč', sub: 'Obchodní vízum M + ostatní typy',
                featured: true,
                features: ['Vše z balíčku Turista','Víza M, F, Z, C, D, G, R, S, J, Q, X','Asistence při otiscích prstů','Vzory zvacích dopisů','Fakturace na IČO'],
              },
              {
                tier: 'Komplet', price: '8 499 Kč', sub: 'Full-service · vše vyřídíme za vás',
                featured: false,
                features: ['Vše z balíčku Profi','Obchodní vízum na 1–5 let','Příprava zvacího dopisu','Vyplnění Application Form za vás','Maximální pohodlí'],
              },
            ].map((card) => (
              <motion.div
                key={card.tier}
                variants={ITEM}
                className="relative flex flex-col rounded-[2rem] p-8 overflow-hidden"
                style={card.featured
                  ? { background: 'linear-gradient(145deg, #111827 0%, #1f2937 100%)', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }
                  : { background: '#fff', border: '1.5px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }
                }
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 180, damping: 28 }}
              >
                {card.featured && (
                  <div className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)' }}>
                    Nejpopulárnější
                  </div>
                )}
                <p className="text-xs font-bold uppercase tracking-widest mb-5 text-gray-400">{card.tier}</p>
                <p className={`text-4xl font-bold mb-1 ${card.featured ? 'text-white' : 'text-gray-900'}`}>{card.price}</p>
                <p className="text-sm mb-8 text-gray-400">{card.sub}</p>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {card.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${card.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: card.featured ? 'rgba(255,255,255,0.4)' : RED }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="https://www.vizadociny.cz/objednavka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 rounded-xl text-sm font-semibold"
                  style={card.featured
                    ? { background: '#fff', color: DARK, transition: 'background-color 0.3s ease' }
                    : { border: `1.5px solid ${RED}`, color: RED, transition: 'background-color 0.3s ease, color 0.3s ease' }
                  }
                  whileHover={card.featured
                    ? { backgroundColor: '#f9fafb' }
                    : { backgroundColor: RED, color: '#fff', borderColor: RED }
                  }
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  Objednat
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl px-7 py-5 text-center">
            <p className="text-sm text-gray-500">
              Doplňkové služby:{' '}
              <strong className="text-gray-700">EXPRES 3 dny +2 999 Kč</strong>
              {' · '}<strong className="text-gray-700">VIP EXPRES 1 den +5 999 Kč</strong>
              {' · '}<strong className="text-gray-700">Zaslání EMS +299 Kč</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          TESTIMONIAL
      ════════════════════════════════ */}
      <section className="relative z-10 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial="hidden" whileInView="visible" viewport={VP}
            variants={FADE_UP}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: RED }}>Reference</p>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed italic">
              „Obchodní víza do Číny si vždy vyřizujeme přes JOUGROUP, se kterou dlouhodobě spolupracujeme a jsme spokojeni."
            </blockquote>
            <div className="mt-7 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: RED }}>L</div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Libor Tušar</p>
                <p className="text-xs text-gray-400">Mevia Marketing s.r.o.</p>
              </div>
              <div className="ml-3 flex gap-0.5">
                {[1,2,3,4,5].map((i) => <Star key={i} size={12} fill={RED} stroke="none" />)}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden" whileInView="visible" viewport={VP}
            variants={STAGGER}
          >
            {[
              { icon: CheckCircle2, title: 'Od roku 2008', desc: 'Spolupráce s čínským konzulátem v Praze' },
              { icon: Star,         title: 'Google ★★★★★', desc: '13 ověřených recenzí, hodnocení 5/5' },
              { icon: Clock,        title: 'Standard 4 dny', desc: 'Expres do 3 pracovních dnů' },
              { icon: MapPin,       title: 'Václavské nám.', desc: 'Osobní odběr nebo doručení EMS' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i} variants={ITEM}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 28px rgba(0,0,0,0.09)' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                >
                  <Icon size={16} className="mb-3" style={{ color: RED }} />
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          CTA BANNER
      ════════════════════════════════ */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="rounded-[2rem] px-10 py-16 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)' }}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VP}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(185,28,28,0.12), transparent)' }} />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">Začněte ještě dnes</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Připraveni vyrazit do Číny?
              </h2>
              <p className="text-base text-gray-400 max-w-md mx-auto mb-10">
                Zálohová platba 1 499 Kč, zbytek po úspěšném udělení víza.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.a
                  href="https://www.vizadociny.cz/objednavka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pulse group inline-flex items-center gap-2.5 px-8 py-4 text-white font-bold text-sm rounded-full"
                  style={{ background: RED, transition: 'background-color 0.4s ease' }}
                  whileHover={{ scale: 1.05, backgroundColor: '#991b1b' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                >
                  Objednat vízum
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.a>
                <a
                  href="tel:+420"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-white/15 text-gray-400 text-sm font-medium rounded-full hover:text-white hover:border-white/30 transition-colors"
                >
                  <Phone size={14} /> Zavolejte nám
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          FOOTER
      ════════════════════════════════ */}
      <footer className="relative z-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: RED }}>中</div>
            <span className="font-semibold text-gray-700 text-sm">VízadoČíny.cz</span>
            <span className="text-gray-400 text-sm">· JOUGROUP s.r.o. · od roku 2008</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Mail size={13} />
            <a href="mailto:info@vizadociny.cz" className="hover:text-gray-700 transition-colors">info@vizadociny.cz</a>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <MapPin size={13} />
            <span>Václavské náměstí, Praha</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
