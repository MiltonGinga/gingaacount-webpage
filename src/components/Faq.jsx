import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, CircleHelp } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Faq({ data }) {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="section alt" data-accent="red">
      <div className="container faq-wrap">
        <SectionHead
          left
          eyebrow="Perguntas frequentes"
          icon={CircleHelp}
          title={<>Dúvidas? <span className="hl-red">Respondemos.</span></>}
          sub="Se a sua pergunta não estiver aqui, fale connosco pelo WhatsApp ou e-mail."
        />
        <div className="faq">
          {data.faq.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.06} className={`faq-item${isOpen ? ' open' : ''} c${i % 3}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={20} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
