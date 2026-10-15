import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Boxes, Check, Eye, Hammer, Rocket, Smartphone, Table2 } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export const STATUS = {
  producao: { label: 'Em produção', icon: Rocket },
  desenvolvimento: { label: 'Em desenvolvimento', icon: Hammer },
  pessoal: { label: 'Projecto pessoal', icon: Smartphone },
}

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'producao', label: 'Em produção' },
  { id: 'desenvolvimento', label: 'Em desenvolvimento' },
  { id: 'pessoal', label: 'Pessoais' },
]

export default function Systems({ data, onOpen }) {
  const [filter, setFilter] = useState('todos')
  const list = useMemo(
    () => data.systems.filter((s) => filter === 'todos' || s.status === filter),
    [data.systems, filter],
  )
  const count = (id) => (id === 'todos' ? data.systems.length : data.systems.filter((s) => s.status === id).length)

  return (
    <section id="sistemas" className="section alt" data-accent="red">
      <div className="container">
        <SectionHead
          eyebrow="Portefólio"
          icon={Boxes}
          title={<>Sistemas <span className="hl-red">reais</span>, a funcionar na <span className="hl-blue">nuvem</span></>}
          sub="Cada sistema nasce de uma necessidade concreta. Explore os que já estão em produção e os que estão a caminho."
        />

        <Reveal className="filters" role="tablist" aria-label="Filtrar sistemas">
          {FILTERS.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'active' : ''} onClick={() => setFilter(f.id)}>
              {filter === f.id && <motion.span layoutId="filter-pill" className="filter-pill" />}
              <span>{f.label}</span><em>{count(f.id)}</em>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="systems">
          <AnimatePresence mode="popLayout">
            {list.map((s, i) => {
              const St = STATUS[s.status] || STATUS.producao
              return (
                <motion.article
                  key={s.id}
                  layout
                  className="system"
                  style={{ '--sys': s.color }}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="system-media">
                    <img src={s.image} alt="" loading="lazy" />
                    <span className={`status ${s.status}`}><St.icon size={12} />{St.label}</span>
                  </div>
                  <div className="system-body">
                    <div className="system-title">
                      <img className="system-logo" src={s.logo} alt={`Logótipo ${s.name}`} />
                      <div>
                        <h3>{s.name}</h3>
                        <small>{s.sector}</small>
                      </div>
                    </div>
                    <p className="system-tag">{s.tagline}</p>
                    <div className="system-stack">
                      {s.stack.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                    </div>
                    <div className="system-actions">
                      <button className="btn sm ghost" onClick={() => onOpen(s)}><Eye size={16} /> Detalhes</button>
                      {s.url
                        ? <a className="btn sm" style={{ '--b': s.color }} href={s.url} target="_blank" rel="noreferrer">Abrir <ArrowUpRight size={16} /></a>
                        : <span className="soon">Brevemente</span>}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <SystemsTable systems={data.systems} onOpen={onOpen} />
      </div>
    </section>
  )
}

function SystemsTable({ systems, onOpen }) {
  return (
    <Reveal className="table-wrap">
      <div className="table-head">
        <h3><Table2 size={20} /> Visão geral dos sistemas</h3>
        <span className="legend">
          <i className="lg producao" /> Produção <i className="lg desenvolvimento" /> Desenvolvimento <i className="lg pessoal" /> Pessoal
        </span>
      </div>
      <div className="table-scroll scroll-blue scroll-thin">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sistema</th>
              <th>Sector</th>
              <th>Estado</th>
              <th>Principais módulos</th>
              <th>Tecnologias</th>
              <th aria-label="Acções" />
            </tr>
          </thead>
          <tbody>
            {systems.map((s) => {
              const St = STATUS[s.status] || STATUS.producao
              return (
                <tr key={s.id} className={`row-${s.status}`} style={{ '--sys': s.color }}>
                  <td>
                    <div className="cell-sys"><img src={s.logo} alt="" /><b>{s.name}</b></div>
                  </td>
                  <td>{s.sector}</td>
                  <td><span className={`status ${s.status}`}>{St.label}</span></td>
                  <td>
                    <ul className="cell-list">
                      {s.features.slice(0, 3).map((f) => <li key={f}><Check size={13} />{f}</li>)}
                    </ul>
                  </td>
                  <td className="cell-stack">{s.stack.join(' · ')}</td>
                  <td><button className="icon-btn" onClick={() => onOpen(s)} aria-label={`Ver ${s.name}`}><Eye size={17} /></button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}
