import {
  Award, ChartColumn, Cloud, Code, Database, LayoutDashboard, Network, Plug, Router, ShieldCheck,
} from 'lucide-react'

// Converte os nomes de ícone usados no site.json em componentes.
const MAP = {
  plug: Plug, layout: LayoutDashboard, chart: ChartColumn, database: Database, shield: ShieldCheck,
  cloud: Cloud, network: Network, router: Router, code: Code,
}

export default function Icon({ name, size = 24, ...rest }) {
  const C = MAP[name] || Award
  return <C size={size} {...rest} />
}
