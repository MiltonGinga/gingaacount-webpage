import { motion } from 'framer-motion'
import { Download, Palette } from 'lucide-react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export const BRAND_ASSETS = [
  { id: 'horizontal', name: 'Horizontal', bg: 'light', svg: 'gingaacount-horizontal.svg', png: [400, 800, 1600].map((w) => `gingaacount-horizontal-${w}.png`), note: 'Versão principal, para fundos claros.' },
  { id: 'horizontal-escuro', name: 'Horizontal — fundo escuro', bg: 'dark', svg: 'gingaacount-horizontal-escuro.svg', png: [400, 800, 1600].map((w) => `gingaacount-horizontal-escuro-${w}.png`), note: 'Texto branco, para fundos azul-marinho ou fotografias.' },
  { id: 'simbolo', name: 'Símbolo', bg: 'check', svg: 'gingaacount-simbolo.svg', png: [16, 32, 64, 128, 256, 512, 1024].map((w) => `gingaacount-simbolo-${w}.png`), note: 'Fundo transparente, do favicon (16 px) à impressão (1024 px).' },
  { id: 'icone', name: 'Ícone de aplicação', bg: 'light', svg: 'gingaacount-icone-app.svg', png: [180, 192, 512].map((w) => `gingaacount-icone-app-${w}.png`), note: 'Para telemóveis, redes sociais e atalhos.' },
  { id: 'empilhado', name: 'Empilhado', bg: 'check', svg: 'gingaacount-empilhado.svg', png: ['gingaacount-empilhado-800.png'], note: 'Para cartazes, capas e espaços quadrados.' },
  { id: 'selo', name: 'Selo', bg: 'check', svg: 'gingaacount-selo.svg', png: ['gingaacount-selo-512.png'], note: 'Para documentos, carimbos e perfis.' },
  { id: 'mono', name: 'Monocromático', bg: 'light', svg: 'gingaacount-horizontal-mono.svg', png: [], note: 'Uma só cor, para impressão económica e gravação.' },
  { id: 'branco', name: 'Símbolo branco', bg: 'dark', svg: 'gingaacount-simbolo-branco.svg', png: [], note: 'Sobre cores fortes ou fotografias escuras.' },
]

const PALETTE = [
  { name: 'Azul-marinho', hex: '#0B1F4D', use: 'Texto e fundos' },
  { name: 'Azul', hex: '#1D4ED8', use: 'Tecnologia · acções' },
  { name: 'Verde', hex: '#059669', use: 'Crescimento · sucesso' },
  { name: 'Vermelho', hex: '#DC2626', use: 'Energia · destaque' },
  { name: 'Branco gelo', hex: '#F5F8FF', use: 'Fundos claros' },
]

export default function Brand({ onAsset, onCopy }) {
  return (
    <section id="marca" className="section" data-accent="blue">
      <div className="container">
        <SectionHead
          eyebrow="Identidade"
          icon={Palette}
          title={<>A marca <span className="hl-grad">GingaAcount</span></>}
          sub="Um “G” formado por três arcos — azul, verde e vermelho — que termina numa ligação: sistemas diferentes, um só ponto de integração. Descarregue todas as versões."
        />

        <div className="brand-grid">
          {BRAND_ASSETS.map((a, i) => (
            <Reveal key={a.id} delay={(i % 4) * 0.07}>
              <motion.button className="brand-card" onClick={() => onAsset(a)} whileHover={{ y: -6 }}>
                <span className={`brand-preview bg-${a.bg}`}>
                  <img src={`/brand/${a.svg}`} alt={`Logótipo GingaAcount — ${a.name}`} loading="lazy" />
                </span>
                <span className="brand-meta">
                  <b>{a.name}</b>
                  <small>{a.png.length ? `SVG + ${a.png.length} PNG` : 'SVG'}</small>
                </span>
                <Download size={18} className="brand-dl" />
              </motion.button>
            </Reveal>
          ))}
        </div>

        <Reveal className="palette">
          {PALETTE.map((c) => (
            <motion.button key={c.hex} className="swatch" onClick={() => onCopy(c.hex)} whileHover={{ y: -4 }} title="Copiar código da cor">
              <span className="swatch-color" style={{ background: c.hex }} />
              <b>{c.name}</b>
              <code>{c.hex}</code>
              <small>{c.use}</small>
            </motion.button>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
