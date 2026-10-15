// Gera as versões do logótipo em public/brand (SVG + PNG transparentes e com fundo).
// Uso: npm run brand
import { mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'
import { appIconSvg, badgeSvg, horizontalSvg, markSvg, stackedSvg, COLORS } from '../src/brand/brand.js'

const out = new URL('../public/brand/', import.meta.url)
mkdirSync(out, { recursive: true })

const svgs = {
  'gingaacount-simbolo': markSvg(),
  'gingaacount-simbolo-branco': markSvg({ mono: '#FFFFFF' }),
  'gingaacount-simbolo-mono': markSvg({ mono: COLORS.navy }),
  'gingaacount-icone-app': appIconSvg(),
  'gingaacount-icone-app-claro': appIconSvg({ light: true }),
  'gingaacount-horizontal': horizontalSvg(),
  'gingaacount-horizontal-escuro': horizontalSvg({ dark: true }),
  'gingaacount-horizontal-mono': horizontalSvg({ mono: COLORS.navy }),
  'gingaacount-empilhado': stackedSvg(),
  'gingaacount-empilhado-escuro': stackedSvg({ dark: true }),
  'gingaacount-selo': badgeSvg(),
}

for (const [name, svg] of Object.entries(svgs)) {
  writeFileSync(new URL(`${name}.svg`, out), svg)
}

// PNG com fundo transparente em vários tamanhos.
const png = async (svg, file, width, background) => {
  let img = sharp(Buffer.from(svg), { density: 600 }).resize({ width })
  if (background) img = img.flatten({ background })
  await img.png().toFile(new URL(file, out).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
}

for (const size of [16, 32, 64, 128, 256, 512, 1024]) {
  await png(svgs['gingaacount-simbolo'], `gingaacount-simbolo-${size}.png`, size)
}
for (const size of [180, 192, 512]) {
  await png(svgs['gingaacount-icone-app'], `gingaacount-icone-app-${size}.png`, size)
}
for (const size of [400, 800, 1600]) {
  await png(svgs['gingaacount-horizontal'], `gingaacount-horizontal-${size}.png`, size)
  await png(svgs['gingaacount-horizontal-escuro'], `gingaacount-horizontal-escuro-${size}.png`, size)
}
await png(svgs['gingaacount-empilhado'], 'gingaacount-empilhado-800.png', 800)
await png(svgs['gingaacount-selo'], 'gingaacount-selo-512.png', 512)
// Versão com fundo branco, útil para documentos e e-mail.
await png(svgs['gingaacount-horizontal'], 'gingaacount-horizontal-fundo-branco-1200.png', 1200, '#FFFFFF')

// Favicon e imagem de partilha (Open Graph).
writeFileSync(new URL('../favicon.svg', out), appIconSvg({ id: 'fav' }))
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="og" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#132E6B"/><stop offset="1" stop-color="#071433"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <rect y="618" width="400" height="12" fill="${COLORS.blue}"/><rect x="400" y="618" width="400" height="12" fill="${COLORS.green}"/><rect x="800" y="618" width="400" height="12" fill="${COLORS.red}"/>
  <g transform="translate(150 190) scale(2.8)">${horizontalSvg({ id: 'ogh', dark: true }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI,Arial" font-size="34" fill="#C9D5F0">Sistemas, APIs e análise de dados feitos à medida — Luanda, Angola</text>
</svg>`
await png(og, '../og-image.png', 1200)
console.log('Marca exportada para public/brand')
