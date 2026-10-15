import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { Activity, ArrowRight, CircleCheck, Lock, MapPin, Sparkles } from 'lucide-react'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

const float = (d = 0) => ({ animate: { y: [0, -12, 0] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: d } })

export default function Hero({ data, onQuote }) {
  const { company, stats, systems } = data
  const live = systems.filter((s) => s.status === 'producao')

  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" aria-hidden>
        <motion.span className="blob b1" animate={{ x: [0, 60, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity }} />
        <motion.span className="blob b2" animate={{ x: [0, -50, 0], y: [0, -40, 0] }} transition={{ duration: 16, repeat: Infinity }} />
        <motion.span className="blob b3" animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity }} />
        <span className="grid-lines" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.span className="hero-badge" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Sparkles size={14} /> Software à medida · {company.city}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            Transformamos <span className="hl-blue">ideias</span> em <span className="hl-green">sistemas</span> que fazem o seu
            negócio <span className="hl-red">crescer</span>.
          </motion.h1>
          <motion.p className="hero-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            A <strong>GingaAcount</strong> desenvolve <strong>APIs seguras</strong>, <strong>sistemas de gestão</strong> e
            {' '}<strong>painéis de análise de dados</strong> para empresas, clínicas, escolas, farmácias e centros de formação.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <button className="btn grad" onClick={onQuote}>Pedir orçamento <ArrowRight size={18} /></button>
            <a className="btn ghost" href="#sistemas">Ver sistemas</a>
          </motion.div>
          <motion.ul className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <li><CircleCheck size={16} /> Código moderno e seguro</li>
            <li><CircleCheck size={16} /> Publicado na nuvem</li>
            <li><CircleCheck size={16} /> Suporte em português</li>
          </motion.ul>
        </div>

        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <div className="hero-photo">
            <img src="/images/hero-dashboard.jpg" alt="Portátil com painel de análise de dados" />
            <span className="photo-tint" />
          </div>
          <motion.div className="float-card fc-1" {...float(0)}>
            <span className="fc-ico green"><Activity size={18} /></span>
            <div><b>{live.length} sistemas</b><small>em produção</small></div>
          </motion.div>
          <motion.div className="float-card fc-2" {...float(1.2)}>
            <span className="fc-ico blue"><Lock size={18} /></span>
            <div><b>API segura</b><small>JWT · HTTPS · auditoria</small></div>
          </motion.div>
          <motion.div className="float-card fc-3" {...float(2.1)}>
            <div className="fc-logos">
              {live.map((s) => <img key={s.id} src={s.logo} alt={s.name} title={s.name} />)}
            </div>
            <small><MapPin size={12} /> Feito em Angola</small>
          </motion.div>
          <motion.svg className="fc-chart" viewBox="0 0 160 70" {...float(0.6)}>
            <defs>
              <linearGradient id="hc" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#10B981" stopOpacity=".45" />
                <stop offset="1" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 60 L20 48 L40 52 L60 34 L80 38 L100 22 L120 26 L140 10 L160 14 L160 70 L0 70Z" fill="url(#hc)" />
            <motion.path
              d="M0 60 L20 48 L40 52 L60 34 L80 38 L100 22 L120 26 L140 10 L160 14"
              fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.6 }}
            />
          </motion.svg>
        </motion.div>
      </div>

      <div className="container">
        <div className="hero-stats">
          {stats.map((s, i) => (
            <motion.div key={s.label} className={`stat c${i % 3}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
              <strong><Counter value={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
