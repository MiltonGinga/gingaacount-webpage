import Reveal from './Reveal.jsx'

export default function SectionHead({ eyebrow, icon: IconC, title, sub, left = false }) {
  return (
    <Reveal className={`section-head${left ? ' left' : ''}`}>
      <span className="eyebrow">{IconC && <IconC size={14} />}{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  )
}
