import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Services({ data, onQuote }) {
  return (
    <section id="servicos" className="section" data-accent="green">
      <div className="container">
        <SectionHead
          eyebrow="Serviços"
          icon={Layers}
          title={<>Tudo o que o seu negócio precisa, <span className="hl-green">do servidor ao ecrã</span></>}
          sub="Do desenho da base de dados à interface final, passando pela segurança, pelos relatórios e pela publicação na nuvem."
        />

        <div className="services">
          {data.services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.1}>
              <motion.article className={`service ${s.color}`} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                <span className="service-num">0{i + 1}</span>
                <span className="service-ico"><Icon name={s.icon} size={26} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <button className="service-link" onClick={() => onQuote(s.title)}>
                  Quero este serviço <ArrowRight size={16} />
                </button>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="services-banner">
          <img src="/images/team.jpg" alt="Equipa a trabalhar com portáteis" loading="lazy" />
          <div className="services-banner-copy">
            <h3>Tem uma ideia? <span className="hl-green">Nós construímos.</span></h3>
            <p>Conte-nos o que precisa — preparamos uma proposta com âmbito, prazos e custos claros.</p>
            <button className="btn green" onClick={() => onQuote()}>Falar com a GingaAcount <ArrowRight size={18} /></button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
