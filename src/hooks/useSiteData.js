import { useEffect, useState } from 'react'

// O conteúdo do site vive em JSON (sem backend):
//  1) VITE_CONTENT_URL — opcional, um JSON remoto (ex.: ficheiro raw no GitHub/jsDelivr)
//     que permite actualizar o site sem novo build;
//  2) /data/site.json — cópia que acompanha o site (fallback).
const REMOTE = import.meta.env.VITE_CONTENT_URL

async function load(url) {
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

export function useSiteData() {
  const [state, setState] = useState({ data: null, error: null })

  useEffect(() => {
    let alive = true
    const sources = [REMOTE, '/data/site.json'].filter(Boolean)
    ;(async () => {
      for (const src of sources) {
        try {
          const data = await load(src)
          if (alive) setState({ data, error: null })
          return
        } catch (e) {
          console.warn('[GingaAcount] conteúdo indisponível em', src, e)
        }
      }
      if (alive) setState({ data: null, error: 'Não foi possível carregar o conteúdo.' })
    })()
    return () => { alive = false }
  }, [])

  return state
}
