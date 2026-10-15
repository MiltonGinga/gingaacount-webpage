// Fonte única da identidade GingaAcount.
// Usada pelo site (componente Logo) e pelo script scripts/export-brand.mjs,
// que gera os ficheiros SVG/PNG de public/brand.
//
// Símbolo: um "G" formado por três arcos (azul = tecnologia, verde = crescimento,
// vermelho = energia/Angola) que termina numa barra-API ligada a um nó central:
// sistemas diferentes, uma só ligação.

export const COLORS = {
  navy: '#0B1F4D',
  blue: '#1D4ED8',
  blueLight: '#3B82F6',
  green: '#059669',
  greenLight: '#22C55E',
  red: '#DC2626',
  redLight: '#F43F5E',
  white: '#FFFFFF',
}

const FONT = "'Plus Jakarta Sans','Segoe UI',Arial,sans-serif"

function defs(id) {
  return `<defs>
    <linearGradient id="${id}-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COLORS.blueLight}"/><stop offset="1" stop-color="${COLORS.blue}"/></linearGradient>
    <linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COLORS.greenLight}"/><stop offset="1" stop-color="${COLORS.green}"/></linearGradient>
    <linearGradient id="${id}-r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COLORS.redLight}"/><stop offset="1" stop-color="${COLORS.red}"/></linearGradient>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#132E6B"/><stop offset="1" stop-color="${COLORS.navy}"/></linearGradient>
    <linearGradient id="${id}-w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${COLORS.blueLight}"/><stop offset="1" stop-color="${COLORS.green}"/></linearGradient>
  </defs>`
}

/** Traços do símbolo em coordenadas 0..64. mono = cor única (ou null para cores da marca). */
function markShapes(id, { mono = null, node = COLORS.navy } = {}) {
  const b = mono || `url(#${id}-b)`
  const g = mono || `url(#${id}-g)`
  const r = mono || `url(#${id}-r)`
  return `<g fill="none" stroke-width="7" stroke-linecap="round">
      <path d="M46.14 15.15 A22 22 0 0 0 12.95 21" stroke="${b}"/>
      <path d="M11.08 25.2 A22 22 0 0 0 28.94 53.79" stroke="${g}"/>
      <path d="M33.53 53.95 A22 22 0 0 0 54 32 L39 32" stroke="${r}"/>
    </g>
    <circle cx="32" cy="32" r="4.6" fill="${mono || node}"/>
    <circle cx="51.6" cy="20.6" r="3.1" fill="${mono || `url(#${id}-g)`}"/>`
}

/** Símbolo isolado, fundo transparente. */
export function markSvg({ id = 'ga', mono = null, node = COLORS.navy, size = null } = {}) {
  const wh = size ? ` width="${size}" height="${size}"` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${wh} role="img" aria-label="GingaAcount">${defs(id)}${markShapes(id, { mono, node })}</svg>`
}

/** Ícone de aplicação: símbolo sobre quadrado arredondado azul-marinho. */
export function appIconSvg({ id = 'gai', size = null, light = false } = {}) {
  const wh = size ? ` width="${size}" height="${size}"` : ''
  const bg = light ? '#FFFFFF' : `url(#${id}-bg)`
  const node = light ? COLORS.navy : '#FFFFFF'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${wh} role="img" aria-label="GingaAcount">${defs(id)}
    <rect width="64" height="64" rx="15" fill="${bg}"/>
    <rect x="1" y="1" width="62" height="62" rx="14" fill="none" stroke="${light ? '#DBE4F5' : '#FFFFFF'}" stroke-opacity="${light ? 1 : 0.14}" stroke-width="2"/>
    <g transform="translate(9.6 9.6) scale(.7)">${markShapes(id, { node })}</g></svg>`
}

/** Logótipo horizontal: símbolo + "GingaAcount" + assinatura. */
export function horizontalSvg({ id = 'gah', dark = false, mono = null, tagline = true } = {}) {
  const text = mono || (dark ? '#FFFFFF' : COLORS.navy)
  const acc = mono || `url(#${id}-w)`
  const tag = mono || (dark ? '#A9B8D9' : '#4B5B7C')
  const node = mono || (dark ? '#FFFFFF' : COLORS.navy)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 72" role="img" aria-label="GingaAcount">${defs(id)}
    <g transform="translate(4 4)">${markShapes(id, { mono, node })}</g>
    <text x="80" y="${tagline ? 41 : 49}" font-family="${FONT}" font-size="34" font-weight="800" letter-spacing="-1" fill="${text}">Ginga<tspan fill="${acc}">Acount</tspan></text>
    ${tagline ? `<text x="81" y="60" font-family="${FONT}" font-size="10.5" font-weight="600" letter-spacing="3.1" fill="${tag}">SISTEMAS · APIs · DADOS</text>` : ''}
  </svg>`
}

/** Logótipo empilhado (símbolo em cima, nome em baixo). */
export function stackedSvg({ id = 'gas', dark = false } = {}) {
  const text = dark ? '#FFFFFF' : COLORS.navy
  const tag = dark ? '#A9B8D9' : '#4B5B7C'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 170" role="img" aria-label="GingaAcount">${defs(id)}
    <g transform="translate(62 4) scale(1.5)">${markShapes(id, { node: dark ? '#FFFFFF' : COLORS.navy })}</g>
    <text x="110" y="132" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="800" letter-spacing="-1" fill="${text}">Ginga<tspan fill="url(#${id}-w)">Acount</tspan></text>
    <text x="110" y="156" text-anchor="middle" font-family="${FONT}" font-size="10" font-weight="600" letter-spacing="3" fill="${tag}">SISTEMAS · APIs · DADOS</text>
  </svg>`
}

/** Selo circular, para carimbos, redes sociais e documentos. */
export function badgeSvg({ id = 'gab' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="GingaAcount">${defs(id)}
    <linearGradient id="${id}-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COLORS.blueLight}"/><stop offset=".5" stop-color="${COLORS.greenLight}"/><stop offset="1" stop-color="${COLORS.redLight}"/></linearGradient>
    <circle cx="100" cy="100" r="96" fill="url(#${id}-bg)"/>
    <circle cx="100" cy="100" r="88" fill="none" stroke="url(#${id}-ring)" stroke-width="3"/>
    <circle cx="100" cy="100" r="81" fill="none" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="1" stroke-dasharray="2 4"/>
    <g transform="translate(62 30) scale(1.2)">${markShapes(id, { node: '#FFFFFF' })}</g>
    <text x="100" y="134" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="800" letter-spacing="1" fill="#FFFFFF">GINGAACOUNT</text>
    <text x="100" y="153" text-anchor="middle" font-family="${FONT}" font-size="8.5" font-weight="600" letter-spacing="3" fill="#A9B8D9">LUANDA · ANGOLA</text>
  </svg>`
}
