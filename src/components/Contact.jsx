import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle, Phone, PhoneCall } from 'lucide-react'
import ContactForm from './ContactForm.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Contact({ data, notify }) {
  const { company } = data
  const tel = company.phone.replace(/\s/g, '')
  const items = [
    { icon: Phone, tone: 'blue', label: 'Telefone', value: company.phone, href: `tel:${tel}` },
    { icon: MessageCircle, tone: 'green', label: 'WhatsApp', value: company.phone, href: `https://wa.me/${company.whatsapp}` },
    { icon: Mail, tone: 'red', label: 'E-mail', value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, tone: 'blue', label: 'Localização', value: company.city },
    { icon: Clock, tone: 'green', label: 'Horário', value: 'Seg. a Sex. · 08h–18h' },
  ]

  return (
    <section id="contacto" className="section" data-accent="green">
      <div className="container">
        <SectionHead
          eyebrow="Contacto"
          icon={PhoneCall}
          title={<>Vamos construir o <span className="hl-green">seu sistema</span>?</>}
          sub="Envie uma mensagem — respondemos normalmente no mesmo dia útil."
        />
        <div className="contact-grid">
          <Reveal className="contact-info" x={-30} y={0}>
            {items.map((it) => {
              const Body = (
                <>
                  <span className={`ci-ico ${it.tone}`}><it.icon size={20} /></span>
                  <span><small>{it.label}</small><b>{it.value}</b></span>
                </>
              )
              return it.href
                ? <motion.a key={it.label} className="ci" href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" whileHover={{ x: 6 }}>{Body}</motion.a>
                : <div key={it.label} className="ci">{Body}</div>
            })}
            <div className="contact-photo">
              <img src="/images/collab.jpg" alt="Pessoas a colaborar à volta de uma mesa" loading="lazy" />
            </div>
          </Reveal>
          <Reveal className="card contact-form" x={30} y={0}>
            <ContactForm company={company} systems={data.systems} notify={notify} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
