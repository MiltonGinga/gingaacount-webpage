import { motion } from 'framer-motion'
import { BadgeCheck, Code, Database, GraduationCap, User } from 'lucide-react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function About({ data, onCert }) {
  const { founder } = data
  return (
    <section id="sobre" className="section alt" data-accent="blue">
      <div className="container">
        <SectionHead
          eyebrow="Quem somos"
          icon={User}
          title={<>Uma empresa de tecnologia <span className="hl-blue">angolana</span>, com mãos de <span className="hl-green">engenheiro</span></>}
          sub="A GingaAcount nasceu para criar software útil e duradouro: sistemas que resolvem problemas reais de empresas e instituições, com segurança e dados ao serviço da decisão."
        />

        <div className="about-grid">
          <Reveal className="about-media" x={-30} y={0}>
            <div className="about-photo">
              <img src="/images/code.jpg" alt="Código-fonte num ecrã" loading="lazy" />
            </div>
            <div className="about-photo small">
              <img src="/images/servers.jpg" alt="Servidores e cabos de rede" loading="lazy" />
            </div>
            <motion.div className="about-badge" whileHover={{ scale: 1.05, rotate: -2 }}>
              <Database size={22} />
              <div><b>Backend &amp; Dados</b><small>APIs · BI · Redes</small></div>
            </motion.div>
          </Reveal>

          <Reveal className="about-copy" x={30} y={0}>
            <div className="founder card">
              <div className="founder-avatar" aria-hidden>MG</div>
              <div>
                <h3>{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
              </div>
            </div>
            <p className="about-text">
              {founder.summary} Trabalho como <span className="mark">programador backend</span> e <span className="mark">analista de dados</span>,
              com experiência em <strong className="hl-green">Spring Boot</strong>, <strong className="hl-red">NestJS</strong>,{' '}
              <strong className="hl-blue">React</strong>, MySQL e Apache Superset.
            </p>

            <h4 className="sub-title"><Code size={18} /> Competências</h4>
            <div className="skills">
              {founder.skills.map((s, i) => (
                <div key={s.name} className={`skill ${s.color}`}>
                  <div className="skill-row"><span>{s.name}</span><b>{s.level}%</b></div>
                  <div className="skill-track">
                    <motion.i
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h4 className="sub-title center"><GraduationCap size={18} /> Formações e certificações</h4>
        </Reveal>
        <div className="certs">
          {founder.certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.button className={`cert c${i % 3}`} onClick={() => onCert(c)} whileHover={{ y: -6 }}>
                <span className="cert-ico"><Icon name={c.icon} size={22} /></span>
                <span className="cert-title">{c.title}</span>
                <span className="cert-issuer"><BadgeCheck size={14} /> {c.issuer}</span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
