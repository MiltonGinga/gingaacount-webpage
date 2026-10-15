<p align="center"><img src="public/brand/gingaacount-horizontal.svg" alt="GingaAcount" width="360"></p>

# GingaAcount — página institucional

Site estático (React 19 + Vite + Framer Motion + lucide-react) da **GingaAcount**: sistemas, APIs e análise de dados à medida.

Produção: **https://gingaacount.onrender.com** (Render, Static Site, deploy automático a cada commit na `main`).

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run brand      # regenera os logótipos (SVG/PNG) em public/brand a partir de src/brand/brand.js
```

## Docker

```bash
docker compose up -d --build   # http://localhost:8088 (nginx)
```

## Conteúdo sem backend

Todo o conteúdo (empresa, serviços, **sistemas**, processo, FAQ) está em [`public/data/site.json`](public/data/site.json).

**Publicar um novo sistema (ex.: GingaFarma concluído):**

1. Em `public/data/site.json`, no objecto do sistema, mude `"status": "desenvolvimento"` para `"producao"` e preencha `"url"`.
   Para um sistema novo, copie um objecto existente e ajuste `id`, `name`, `logo`, `image`, `features`, `stack`.
2. Coloque o logótipo em `public/logos/` e a imagem em `public/images/`.
3. Commit/merge na `main` → o Render publica sozinho em 1–2 minutos.

Opcional: defina `VITE_CONTENT_URL` (variável de ambiente no Render) com o URL de um JSON remoto (ex.: ficheiro raw de um Gist/GitHub)
para alterar o conteúdo **sem novo deploy**; se falhar, o site usa `public/data/site.json`.

**Formulário de contacto:** enviado por [FormSubmit](https://formsubmit.co) para `gingaacount@gmail.com` (sem servidor próprio).
Na primeira mensagem o FormSubmit envia um e-mail de activação — basta confirmar uma vez. Há também o botão de WhatsApp.

## Estrutura

```
public/
  brand/    versões do logótipo (SVG + PNG transparentes, ícones, selo)
  data/     site.json — conteúdo do site
  images/   fotografias (Unsplash, licença livre)
  logos/    logótipos dos sistemas
src/
  brand/        fonte única do logótipo (usada pelo site e pelo script de exportação)
  components/   Header, Hero, About, Services, Systems (+ tabela), Process, Brand, Faq, Contact, Footer, Modal, Toast
  hooks/        useSiteData (carrega o JSON), useTheme (claro/escuro)
  styles/       global.css (tokens, barras de rolagem), sections.css
```

## Contactos

GingaAcount · +244 952 737 074 · gingaacount@gmail.com
