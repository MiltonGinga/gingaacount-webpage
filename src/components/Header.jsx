import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Send, Sun, X } from 'lucide-react'
import Logo from './Logo.jsx'

export const NAV = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sistemas', label: 'Sistemas' },
  { id: 'processo', label: 'Processo' },
  { id: 'marca', label: 'Marca' },
  { id: 'contacto', label: 'Contacto' },
]

export default function Header({ theme, onToggleTheme, onQuote }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaca no menu a secção visível.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const t = setTimeout(() => NAV.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    }), 400)
    return () => { clearTimeout(t); io.disconnect() }
  }, [])

  const onHero = !scrolled

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}${onHero ? ' on-hero' : ''}`}>
      <div className="container header-inner">
        <a href="#inicio" className="header-logo" aria-label="GingaAcount — início">
          <Logo height={42} dark={onHero || theme === 'dark'} tagline={false} />
        </a>

        <nav className="nav" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''}>
              {active === n.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <motion.button className="icon-btn theme-btn" onClick={onToggleTheme} aria-label="Mudar tema" whileTap={{ rotate: 180, scale: 0.9 }}>
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </motion.button>
          <button className="btn sm grad hide-sm" onClick={onQuote}><Send size={16} /> Pedir orçamento</button>
          <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu size={20} /></button>
        </div>
      </div>

      {createPortal(<AnimatePresence>
        {open && (
          <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside
              className="drawer scroll-blue scroll-thin"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <div className="drawer-head">
                <Logo height={34} dark tagline={false} />
                <button className="modal-close" onClick={() => setOpen(false)} aria-label="Fechar menu"><X size={20} /></button>
              </div>
              <nav>
                {NAV.map((n, i) => (
                  <motion.a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={active === n.id ? 'active' : ''}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <span className="drawer-num">0{i + 1}</span>{n.label}
                  </motion.a>
                ))}
              </nav>
              <button className="btn grad" onClick={() => { setOpen(false); onQuote() }}><Send size={16} /> Pedir orçamento</button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </header>
  )
}
