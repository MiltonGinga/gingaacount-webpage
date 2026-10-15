import { motion } from 'framer-motion'
import { ArrowUp, Mail, MessageCircle, Phone } from 'lucide-react'
import Logo from './Logo.jsx'
import { NAV } from './Header.jsx'

export default function Footer({ data }) {
  const { company, systems } = data
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-bar" aria-hidden><i /><i /><i /></div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo height={48} dark />
          <p>{company.slogan}</p>
          <div className="footer-social">
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
            <a href={`mailto:${company.email}`} aria-label="E-mail"><Mail size={18} /></a>
            <a href={`tel:${company.phone.replace(/\s/g, '')}`} aria-label="Telefone"><Phone size={18} /></a>
          </div>
        </div>
        <div>
          <h4>Navegação</h4>
          <ul>{NAV.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}</ul>
        </div>
        <div>
          <h4>Sistemas</h4>
          <ul>
            {systems.filter((s) => s.status !== 'pessoal').map((s) => (
              <li key={s.id}>
                {s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a> : <span>{s.name} <em>brevemente</em></span>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contactos</h4>
          <ul>
            <li><a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></li>
            <li><a href={`mailto:${company.email}`}>{company.email}</a></li>
            <li>{company.city}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} GingaAcount. Todos os direitos reservados.</span>
        <span className="muted">Fotografias: Unsplash (licença livre)</span>
        <motion.a href="#inicio" className="to-top" whileHover={{ y: -4 }} aria-label="Voltar ao topo"><ArrowUp size={18} /></motion.a>
      </div>
    </footer>
  )
}
