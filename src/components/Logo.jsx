import { useId } from 'react'
import { horizontalSvg, markSvg } from '../brand/brand.js'

/** Logótipo GingaAcount. variant: 'mark' | 'full'. dark = texto branco. */
export default function Logo({ variant = 'full', dark = false, height = 40, tagline = true }) {
  const id = 'lg' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const svg = variant === 'mark' ? markSvg({ id, node: dark ? '#FFFFFF' : undefined }) : horizontalSvg({ id, dark, tagline })
  const ratio = variant === 'mark' ? 1 : 330 / 72
  return (
    <span
      className="logo"
      style={{ display: 'inline-block', height, width: height * ratio, lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svg.replace('<svg ', '<svg width="100%" height="100%" ') }}
    />
  )
}
