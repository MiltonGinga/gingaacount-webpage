import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'

// Envio sem backend próprio: o FormSubmit reencaminha o formulário para o e-mail da empresa.
// (Na primeira mensagem o FormSubmit envia um e-mail de activação para gingaacount@gmail.com.)
const SERVICES = ['APIs e integrações', 'Sistemas de gestão', 'Análise de dados e BI', 'Bases de dados', 'Redes e segurança', 'Alojamento e manutenção', 'Outro']

export default function ContactForm({ company, systems, initialService = '', onDone, notify }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: initialService, system: '', message: '' })
  const [sending, setSending] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const whatsappText = () => {
    const parts = [
      `Olá GingaAcount! Sou ${form.name || '...'}.`,
      form.service && `Serviço: ${form.service}.`,
      form.system && `Sistema de interesse: ${form.system}.`,
      form.message,
    ].filter(Boolean)
    return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(parts.join(' '))}`
  }

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Novo pedido pelo site — ${form.service || 'Contacto'}`,
          _template: 'table',
          _captcha: 'false',
          Nome: form.name,
          Email: form.email,
          Telefone: form.phone,
          Servico: form.service,
          Sistema: form.system,
          Mensagem: form.message,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === 'false' || json.success === false) throw new Error(json.message || 'Falha no envio')
      notify('success', 'Mensagem enviada! Respondemos em breve.')
      setForm({ name: '', email: '', phone: '', service: '', system: '', message: '' })
      onDone?.()
    } catch (err) {
      // Ex.: formulário ainda não activado no FormSubmit — fica registado na consola para diagnóstico.
      console.warn('[GingaAcount] envio do formulário falhou:', err.message)
      notify('error', 'Não foi possível enviar agora. Tente pelo WhatsApp ou e-mail.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label className="field">
          <span>Nome *</span>
          <input required value={form.name} onChange={set('name')} placeholder="O seu nome" autoComplete="name" />
        </label>
        <label className="field">
          <span>E-mail *</span>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="nome@empresa.ao" autoComplete="email" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>Telefone</span>
          <input value={form.phone} onChange={set('phone')} placeholder="+244 9xx xxx xxx" autoComplete="tel" />
        </label>
        <label className="field">
          <span>Serviço</span>
          <select value={form.service} onChange={set('service')}>
            <option value="">Escolha um serviço</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <label className="field">
        <span>Sistema de interesse</span>
        <select value={form.system} onChange={set('system')}>
          <option value="">Nenhum em particular</option>
          {systems.map((s) => <option key={s.id}>{s.name}</option>)}
        </select>
      </label>
      <label className="field">
        <span>Mensagem *</span>
        <textarea required rows={4} value={form.message} onChange={set('message')} placeholder="Descreva brevemente o que precisa…" className="scroll-green scroll-thin" />
      </label>
      <div className="form-actions">
        <motion.button className="btn grad" type="submit" disabled={sending} whileTap={{ scale: 0.97 }}>
          {sending ? <span className="spinner" /> : <Send size={17} />} {sending ? 'A enviar…' : 'Enviar mensagem'}
        </motion.button>
        <a className="btn green" href={whatsappText()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
      </div>
    </form>
  )
}
