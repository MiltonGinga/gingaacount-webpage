import { useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Check, Download, FileImage, MessageCircle, Send } from 'lucide-react'
import { useSiteData } from './hooks/useSiteData.js'
import { useTheme } from './hooks/useTheme.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Systems, { STATUS } from './components/Systems.jsx'
import Process from './components/Process.jsx'
import Brand from './components/Brand.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Modal from './components/Modal.jsx'
import ContactForm from './components/ContactForm.jsx'
import Toasts from './components/Toast.jsx'
import Logo from './components/Logo.jsx'
import Icon from './components/Icon.jsx'

export default function App() {
  const { data, error } = useSiteData()
  const { theme, toggle } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const [system, setSystem] = useState(null)
  const [quote, setQuote] = useState(null) // null = fechado; string = serviço pré-seleccionado
  const [cert, setCert] = useState(null)
  const [asset, setAsset] = useState(null)
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const notify = useCallback((type, text) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, type, text }])
    setTimeout(() => dismiss(id), 5000)
  }, [dismiss])

  const openQuote = useCallback((service) => setQuote(typeof service === 'string' ? service : ''), [])
  const copy = useCallback(async (hex) => {
    try { await navigator.clipboard.writeText(hex); notify('info', `Cor ${hex} copiada.`) } catch { notify('info', hex) }
  }, [notify])

  // O conteúdo chega depois do primeiro render: só então se pode saltar para #ancora.
  useEffect(() => {
    if (!data || !window.location.hash) return
    const t = setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 100)
    return () => clearTimeout(t)
  }, [data])

  if (!data) {
    return (
      <div className="loader">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}>
          <Logo variant="mark" height={72} />
        </motion.div>
        <p>{error || 'A carregar…'}</p>
      </div>
    )
  }

  const St = system && (STATUS[system.status] || STATUS.producao)
  const tone = (s) => (s?.status === 'desenvolvimento' ? 'red' : s?.status === 'pessoal' ? 'blue' : 'green')

  return (
    <div className="app">
      <motion.div className="read-progress" style={{ scaleX: progress }} />
      <Header theme={theme} onToggleTheme={toggle} onQuote={() => openQuote()} />

      <main>
        <Hero data={data} onQuote={() => openQuote()} />
        <About data={data} onCert={setCert} />
        <Services data={data} onQuote={openQuote} />
        <Systems data={data} onOpen={setSystem} />
        <Process data={data} />
        <Brand onAsset={setAsset} onCopy={copy} />
        <Faq data={data} />
        <Contact data={data} notify={notify} />
      </main>

      <Footer data={data} />

      {/* Detalhe de sistema */}
      <Modal
        open={!!system}
        onClose={() => setSystem(null)}
        title={system?.name}
        subtitle={system && `${system.sector} · ${St.label}`}
        icon={system && <img src={system.logo} alt="" />}
        tone={tone(system)}
        variant="zoom"
        width={820}
        footer={system && (
          <>
            <button className="btn sm ghost" onClick={() => { const s = system.name; setSystem(null); setTimeout(() => setQuote(''), 250); notify('info', `Diga-nos o que precisa no ${s}.`) }}>
              <MessageCircle size={16} /> Pedir demonstração
            </button>
            {system.url
              ? <a className="btn sm" style={{ '--b': system.color }} href={system.url} target="_blank" rel="noreferrer">Abrir {system.name} <ArrowUpRight size={16} /></a>
              : <span className={`status ${system.status}`}>{St.label}</span>}
          </>
        )}
      >
        {system && (
          <div className="sys-detail" style={{ '--sys': system.color }}>
            <div className="sys-detail-media">
              <img src={system.image} alt="" />
              <p className="sys-detail-tag">{system.tagline}</p>
            </div>
            <p className="sys-detail-desc">{system.description}</p>
            <h4>Funcionalidades</h4>
            <ul className="sys-features">
              {system.features.map((f, i) => (
                <motion.li key={f} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <Check size={16} /> {f}
                </motion.li>
              ))}
            </ul>
            <h4>Tecnologias</h4>
            <div className="system-stack">{system.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </div>
        )}
      </Modal>

      {/* Pedido de orçamento */}
      <Modal
        open={quote !== null}
        onClose={() => setQuote(null)}
        title="Pedir orçamento"
        subtitle="Resposta normalmente no mesmo dia útil"
        icon={<Send size={22} />}
        tone="blue"
        variant="slide"
        width={640}
      >
        {quote !== null && (
          <ContactForm company={data.company} systems={data.systems} initialService={quote} notify={notify} onDone={() => setQuote(null)} />
        )}
      </Modal>

      {/* Certificação */}
      <Modal
        open={!!cert}
        onClose={() => setCert(null)}
        title={cert?.title}
        subtitle={cert?.issuer}
        icon={cert && <Icon name={cert.icon} size={22} />}
        tone="green"
        variant="pop"
        width={520}
      >
        {cert && (
          <div className="cert-detail">
            <BadgeCheck size={44} />
            <p>
              Formação concluída por <strong>{data.founder.name}</strong> na <strong>{cert.issuer}</strong>.
              Estes conhecimentos são aplicados no desenho de redes, na segurança das APIs e na infraestrutura dos sistemas GingaAcount.
            </p>
          </div>
        )}
      </Modal>

      {/* Versões da marca */}
      <Modal
        open={!!asset}
        onClose={() => setAsset(null)}
        title={asset && `Logótipo — ${asset.name}`}
        subtitle={asset?.note}
        icon={<FileImage size={22} />}
        tone="red"
        variant="rise"
        width={720}
      >
        {asset && (
          <div className="asset-detail">
            <div className={`brand-preview big bg-${asset.bg}`}><img src={`/brand/${asset.svg}`} alt="" /></div>
            <div className="asset-files">
              <a className="asset-file" href={`/brand/${asset.svg}`} download>
                <Download size={16} /> <b>SVG</b> <small>vectorial · qualquer tamanho</small>
              </a>
              {asset.png.map((p) => (
                <a key={p} className="asset-file" href={`/brand/${p}`} download>
                  <Download size={16} /> <b>PNG</b> <small>{p.match(/(\d+)\.png$/)?.[1]} px · {p.includes('fundo-branco') ? 'fundo branco' : 'transparente'}</small>
                </a>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Toasts items={toasts} onDismiss={dismiss} />
    </div>
  )
}
