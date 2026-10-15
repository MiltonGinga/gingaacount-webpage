import { motion } from 'framer-motion'
import { Handshake, LifeBuoy, Code, FileText, Rocket, Workflow } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const ICONS = [Handshake, FileText, Code, Rocket, LifeBuoy]
const TONES = ['blue', 'green', 'red', 'blue', 'green']

export default function Process({ data }) {
  return (
    <section id="processo" className="section dark" data-accent="green">
      <div className="container">
        <SectionHead
          eyebrow="Como trabalhamos"
          icon={Workflow}
          title={<>Um processo <span className="hl-green">simples</span> e <span className="hl-blue">transparente</span></>}
          sub="Sabe sempre em que ponto está o seu projecto — da primeira conversa ao suporte depois da entrega."
        />
        <div className="timeline">
          <motion.span
            className="timeline-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          {data.process.map((p, i) => {
            const I = ICONS[i % ICONS.length]
            return (
              <Reveal key={p.title} className={`step ${TONES[i % TONES.length]}`} delay={i * 0.15}>
                <motion.span className="step-ico" whileHover={{ scale: 1.12, rotate: 8 }}><I size={24} /></motion.span>
                <span className="step-num">Passo {i + 1}</span>
                <h3>{p.title}</h3>
                <p className="muted">{p.text}</p>
              </Reveal>
            )
          })}
        </div>

        <div className="gallery">
          {[
            ['/images/meeting.jpg', 'Reunião de levantamento de requisitos'],
            ['/images/analytics.jpg', 'Painel de métricas num portátil'],
            ['/images/office.jpg', 'Equipa de desenvolvimento em escritório'],
          ].map(([src, alt], i) => (
            <Reveal key={src} className="gallery-item" delay={i * 0.1}>
              <img src={src} alt={alt} loading="lazy" />
              <span>{alt}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
