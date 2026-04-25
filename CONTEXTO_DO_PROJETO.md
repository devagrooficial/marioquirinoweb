# CONTEXTO DO PROJETO — Mario Quirino Landing Page
### Fonte da Verdade para todas as decisões de Código e Design

---

## 🎯 Missão

Construir uma Landing Page Institucional **Ultra-Premium** para **Mario Quirino** — Diretor Executivo BNI e Especialista Nacional em PNL — com estética de agência premiada (nível Awwwards / FWA). O objetivo é transmitir autoridade máxima, gerar altíssimo valor percebido e converter visitantes em leads de alto nível.

---

## 1. A Estética: "The Cinematic Canvas" (Black Top)

### Princípio Fundamental
O site não é uma página. É uma **experiência cinematográfica**. Cada scroll é um frame. Cada elemento entra em cena como um ator. Nenhuma linha de código deve trair esse princípio.

### Paleta de Cores (Tema Customizado Estrito)

| Token              | Valor HEX   | Uso                                              |
|--------------------|-------------|--------------------------------------------------|
| `color-void`       | `#000000`   | Fundo padrão absoluto. O cânone do projeto.      |
| `color-depth-1`    | `#0A0A0A`   | Variação de profundidade sutil — seções alternadas |
| `color-depth-2`    | `#111111`   | Cards, containers leves, hover states            |
| `color-depth-3`    | `#1A1A1A`   | Borders invisíveis, separadores sutis            |
| `color-surface`    | `#FFFFFF`   | Texto principal — contraste máximo               |
| `color-muted`      | `#8A8A8A`   | Texto secundário, labels, legendas               |
| `color-accent`     | `#C9A96E`   | Gold discreto — hierarquia, CTAs, destaques      |
| `color-accent-dim` | `rgba(201,169,110,0.12)` | Glow sutil, halos de fundo           |

### Tipografia Escultural

- **Títulos (Display):** `Playfair Display` ou `DM Serif Display` — peso `400` e `700`. Escala gigantesca: `clamp(4rem, 10vw, 12rem)`. Letras devem ocupar grande parte da viewport.
- **Corpo (Body):** `Inter` — peso `200` (ExtraLight) e `300` (Light). Espaçamento de letra levemente aumentado (`tracking-wide`).
- **Labels / Eyebrow Text:** `Inter` — peso `400`, UPPERCASE, espaçamento extremo (`tracking-[0.3em]`), tamanho `0.65rem`.
- **Regra absoluta:** Nunca misturar mais de 2 famílias tipográficas. Hierarquia é feita por peso, tamanho e opacidade.

### Diretrizes de Layout

- **Zero grids óbvios.** Não há colunas iguais, não há "Bento Boxes".
- **Full Bleed:** Imagens e vídeos tocam as bordas da viewport. `overflow: hidden` no body, mas seções usam `100vw`.
- **Imagens mascaradas:** Use `clip-path` e `mask-image` para cortes artísticos, não retangulares.
- **Profundidade sem bordas:** Use `background: linear-gradient` sutis e `box-shadow` com `spread` negativo para criar camadas sem delineadores físicos.
- **Espaço negativo é design:** Margens generosas (`py-40` a `py-64`) são intencionais — o branco/preto respira.
- **`mix-blend-mode: overlay/screen`:** Aplicar em elementos gráficos decorativos (grain textures, noise overlays) para fundir com o fundo sem parecer "colado".

---

## 2. A Stack Tecnológica

### Framework: Astro (Arquitetura em Ilhas)
- **Versão:** Astro 4.x (latest stable)
- **Objetivo:** Máximo de HTML estático gerado no build. JavaScript zero no cliente, exceto ilhas explicitamente ativadas.
- **Rota única:** Este é um site de página única (`/`). Sem roteamento dinâmico.
- **Integração oficial:** `@astrojs/tailwind`

### Estilização: Tailwind CSS
- **Versão:** Tailwind CSS v3.x
- **Configuração:** `tailwind.config.mjs` com tema completamente customizado. **Nenhuma cor padrão do Tailwind é utilizada.** Apenas os tokens definidos na seção 1.
- **Plugins:** `@tailwindcss/typography` para rich text, se necessário.

### Física de Scroll: Lenis (Studio Freight)
- **Versão:** `@studio-freight/lenis` (latest)
- **Objetivo:** Substituir o scroll nativo do browser por uma física de scroll fluida e "amanteigada" (easing `lerp`).
- **Integração:** Inicializado em um script island `<script>` no `Layout.astro`. O RAF (requestAnimationFrame) do Lenis deve alimentar o ScrollTrigger do GSAP.
- **Configuração Base:**
  ```js
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });
  ```

### Motor de Animação: GSAP + ScrollTrigger
- **Versão:** `gsap` (latest, licença gratuita é suficiente — sem plugins pagos inicialmente)
- **Plugins Registrados:** `ScrollTrigger`, `SplitText` (via CDN da Cloudflare ou shim, se necessário)
- **Padrões de Animação Mandatórios:**
  - **Reveal de Títulos:** `SplitText` linha por linha, com `stagger: 0.1` e `duration: 1.2`, `ease: "power3.out"`. Sempre com máscara (`overflow: hidden` no wrapper).
  - **Parallax de Fundo:** Imagens de fundo se movem a `30%` da velocidade do scroll via `gsap.to(el, { y: "30%", scrollTrigger: { scrub: true } })`.
  - **Fade-in de Blocos:** `opacity: 0, y: 40` → `opacity: 1, y: 0` com `duration: 1.0, ease: "power2.out"`.
  - **Regra de Ouro:** `scrub: 1` (não `scrub: true`) para suavizar a ligação scroll-animação com 1 segundo de lag.

---

## 3. Arquitetura de Componentes

```
src/
├── layouts/
│   └── Layout.astro          # Shell global: meta, fonts, Lenis init, GSAP register
├── components/
│   ├── Hero.astro             # Tela cheia de abertura — título cinematic + video/imagem parallax
│   ├── AuthorityNumbers.astro # Números de impacto (ex: 500+ eventos, 20 anos, etc.)
│   ├── PNLSection.astro       # Seção de autoridade em PNL — texto + visual mascarado
│   ├── SpeakerVideo.astro     # Vídeo de palestra — Full Bleed, autoplay muted ou player custom
│   ├── Testimonials.astro     # Depoimentos — scroll horizontal ou stagger vertical
│   ├── AppSection.astro       # Mockup 3D do app flutuante com feature cards glassmorphism
│   ├── BookSection.astro      # Livro integrado ao ambiente dark + citação escultural + ghost CTA
│   ├── EventSection.astro     # Passe VIP — data/local em alto contraste + badge de tech proprietária
│   └── CTA.astro              # Chamada para ação final — minimalista e direta
├── pages/
│   └── index.astro            # Importa Layout + todos os componentes em sequência
└── styles/
    └── global.css             # Reset, variáveis CSS, fontes, scrollbar customizado
```

---

## 4. Seções de Produto & Conversão (The Ecosystem)

> **Diretriz Máxima:** Nenhuma destas seções pode ter aparência de e-commerce genérico. Cada uma é um objeto de desejo. O visitante não deve sentir que está comprando — deve sentir que está sendo admitido.

---

### A. Seção do Aplicativo — *The Digital Monolith*

**Componente:** `AppSection.astro`

#### Estrutura Visual
- **Fundo:** `#000000` absoluto. Espaço negativo total — o mockup do smartphone é o único protagonista.
- **Mockup:** Smartphone escuro (frame dark, sem reflexos brancos), centralizado ou levemente deslocado para a direita. Tamanho: ~60vh de altura em desktop.
- **Posicionamento:** O telefone flutua no vazio. Nenhuma superfície, nenhuma mesa, nenhuma sombra de chão genérica.

#### Animação do Mockup (GSAP + ScrollTrigger)
```js
// Efeito de rotação 3D parallax atrelado ao scroll
gsap.to('#app-mockup', {
  rotateY: 8,          // leve rotação no eixo Y (perspectiva)
  rotateX: -4,         // inclinação sutil
  y: -30,              // flutuação vertical
  scrollTrigger: {
    trigger: '#app-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,        // lag de 1.5s para máxima suavidade
  },
});
// CSS obrigatório no elemento pai:
// perspective: 1200px; transform-style: preserve-3d;
```

#### Feature Cards — Glassmorphism Escuro
- **Quantidade:** 3 cards, um para cada funcionalidade principal do app.
- **Aparência:**
  ```css
  /* Glassmorphism Dark — padrão do projeto */
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05);
  ```
- **Posicionamento:** Os cards **não** formam uma lista. Eles orbitam o mockup — um acima-esquerda, um à direita, um abaixo. `position: absolute` relativo ao container.
- **Entrada (ScrollTrigger):** Cada card entra com `opacity: 0 → 1` + translação da sua direção de origem (esq/dir/baixo), com `stagger: 0.15` entre eles.
- **Conteúdo do card:** Ícone SVG monocromático (branco/gold) + label em caps + descrição curta (1 linha).

#### Eyebrow Label
```
TECNOLOGIA PROPRIETÁRIA  •  DISPONÍVEL EM iOS & ANDROID
```

---

### B. Seção do Livro — *The Legacy*

**Componente:** `BookSection.astro`

#### Estrutura Visual
- **Fundo:** `#0A0A0A` — profundidade 1, levemente distinto do void puro.
- **Imagem do Livro:** Alta resolução, sem fundo branco. Se a imagem tiver fundo, aplicar `mix-blend-mode: luminosity` ou usar uma versão com fundo transparente (PNG). A capa deve parecer emergir das sombras.
- **Sombra Ambiente:** `box-shadow: 0 40px 120px rgba(0,0,0,0.9), 0 0 60px rgba(201,169,110,0.08)` — a sutileza do gold no glow é o requinte.

#### Tipografia Escultural de Background
- Uma palavra ou frase curta do autor (ex: *"Transformação"* ou *"Liderar é ouvir"*) renderizada em tamanho gigantesco (`font-size: clamp(6rem, 18vw, 20rem)`) no background da seção.
- **Estilo:** `color: rgba(255,255,255,0.03)` — quase invisível, mas perceptível. `font-family: Playfair Display`, `font-weight: 700`, `letter-spacing: -0.03em`.
- **Posicionamento:** `position: absolute`, `z-index: 0`. O conteúdo real fica em `z-index: 1`.
- Esta tipografia de fundo **não se move com o scroll** — cria contraste de velocidade com o livro que tem parallax.

#### Citação do Autor
- Exibida à direita (ou abaixo em mobile) da imagem do livro.
- Tamanho: `clamp(1.4rem, 2.5vw, 2.2rem)`, `font-family: Playfair Display`, estilo itálico.
- Precedida por um travessão (`—`) em `color-accent` (#C9A96E).
- Atribuição em `Inter ExtraLight`, UPPERCASE, `tracking-[0.3em]`, `color-muted`.

#### Ghost Button de Compra
```css
/* Ghost Button — padrão do projeto para CTAs secundários */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(201, 169, 110, 0.5);   /* gold semi-opaco */
  color: #C9A96E;
  padding: 1rem 2.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  transition: background 0.5s ease, color 0.5s ease, border-color 0.5s ease;
  position: relative;
  overflow: hidden;
}

/* Efeito de preenchimento suave via pseudo-elemento */
.btn-ghost::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #C9A96E;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  z-index: -1;
}
.btn-ghost:hover::before { transform: scaleX(1); }
.btn-ghost:hover { color: #000000; border-color: #C9A96E; }
```
- **Label do botão:** `Adquirir o Livro  →` (sem maiúsculas em bloco, apenas capitalizado)
- **Micro-texto abaixo do botão:** `Enviado para todo o Brasil  •  Exemplar com dedicatória disponível` em `color-muted`, `Inter 200`, `0.65rem`.

---

### C. Seção de Palestra / Evento — *The Exclusive Access*

**Componente:** `EventSection.astro`

#### Filosofia de Design: O Passe VIP
- O componente não vende um ingresso. Ele **concede acesso**. O copy e o visual devem reforçar exclusividade, não disponibilidade.
- **Fundo:** `#000000` com um elemento gráfico sutil — uma linha horizontal fina (`1px solid rgba(201,169,110,0.15)`) dividindo o espaço, como um carimbo de documento.

#### Estrutura do Passe VIP
```
┌─────────────────────────────────────────────────────────┐
│  [EYEBROW LABEL]  ACESSO EXCLUSIVO  •  EDIÇÃO LIMITADA  │
│                                                         │
│  [TÍTULO GIGANTE]  A Palestra                           │
│                                                         │
│  [DATA]   15 de Junho, 2025          [LOCAL]  São Paulo │
│  ─────────────────────────────────────────────────────  │
│  [DESCRIÇÃO]  2 linhas máximo. Impacto direto.          │
│                                                         │
│  [CTA BUTTON + BADGE]  ← ver especificação abaixo       │
└─────────────────────────────────────────────────────────┘
```
- **Data e Local:** Renderizados em `font-size: clamp(1rem, 1.8vw, 1.4rem)`, `Inter 200`, separados por uma linha vertical `|` em `color-accent`. Alto contraste obrigatório: `color: #FFFFFF`.
- **Reaproveitamento:** O componente aceita `Props` para `eventTitle`, `eventDate`, `eventLocation`, `eventDescription` e `eventCTAUrl` — reutilizável para qualquer evento futuro sem modificar o template.

#### Badge de Tecnologia Proprietária (Requisito Mandatório de Autoridade)

Este é um elemento de design crítico. O objetivo é elevar o status empresarial de Mario Quirino ao deixar claro que a infraestrutura de compra e emissão de acessos é uma **tecnologia proprietária**, não um link de terceiros genérico.

**Design do Badge:**
- Posicionado **adjacente ou abaixo do botão de CTA**, nunca sobreposto.
- **Aparência:** Pequeno elemento horizontal com:
  - Um ícone de escudo ou chip (`16x16px`, SVG monocromático gold `#C9A96E`)
  - Texto: `Powered by MQ Access™` ou `Sistema Exclusivo MQ™`
  - Tipografia: `Inter 300`, `0.65rem`, `letter-spacing: 0.15em`, `color: rgba(201,169,110,0.7)`
  - Sublinhado decorativo: linha de `1px` em `rgba(201,169,110,0.2)`

```html
<!-- Estrutura HTML do Badge -->
<div class="mq-access-badge">
  <!-- Ícone SVG de escudo/chip aqui -->
  <span>Sistema de Acesso Exclusivo</span>
  <strong>MQ Access™</strong>
</div>
```

```css
.mq-access-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border: 1px solid rgba(201, 169, 110, 0.2);
  border-radius: 100px;          /* pill shape */
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.7);
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  margin-top: 0.75rem;
}
.mq-access-badge strong {
  font-weight: 500;
  color: #C9A96E;
}
```

- **Typography Footprint alternativo** (se preferir inline ao badge): Texto `© MQ Access™ — Tecnologia proprietária de gestão de eventos` em `0.6rem`, `color-muted`, abaixo do botão, como rodapé do componente. Mais sutil, igualmente sofisticado.

#### Micro-interação do CTA de Evento
- O botão de evento usa o mesmo `ghost button` da seção do livro, porém com label diferente:
  - Label: `Garantir Meu Acesso  →`
  - Ao hover: além do preenchimento em gold, um sutil `letter-spacing` aumenta de `0.2em` para `0.25em` com `transition: letter-spacing 0.4s ease`.
- **Indicador de escassez (opcional, data-driven):** Se o componente receber uma prop `spotsRemaining`, renderizar um contador sutil: `● 12 acessos restantes` em `color-accent`, pulsando suavemente via CSS `animation: pulse 2s infinite`.

---

## 5. Regras de Código (The Workflow)

### Componentização
- **Um arquivo `.astro` por seção.** Sem exceções.
- **Props tipadas:** Todo componente que aceitar dados externos terá uma interface `Props` definida no frontmatter.
- **Sem lógica de negócio nos componentes.** Componentes são puramente visuais.

### Performance & Bundle
- **JavaScript no cliente = zero** exceto: inicialização do Lenis e do GSAP/ScrollTrigger no `Layout.astro`.
- **Fontes:** Carregar via `<link rel="preconnect">` + `font-display: swap`. Nunca bloquear o render.
- **Imagens:** Usar o componente `<Image />` nativo do Astro com `loading="lazy"` e `format="webp"`.
- **Vídeos:** Sempre `preload="metadata"`, `muted`, `playsinline`. Nunca autoplay com áudio.
- **LCP Target:** < 2.5s em conexão 4G simulada.

### Animações Subliminares (A Lei do Suave)
- **Nenhuma animação tem `duration` abaixo de `0.8s`.**
- **Nenhum elemento "pula" para a tela.** Tudo entra com deslocamento máximo de `40px` no eixo Y.
- **Delays são escalonados (`stagger`)**, nunca simultâneos.
- **Easing padrão do projeto:** `"power3.out"` para entradas, `"power2.inOut"` para transições bidirecionais.
- **ScrollTrigger padrão:** `start: "top 80%"` (elemento entra em cena quando está 80% visível na viewport).

### Acessibilidade Mínima Não-Negociável
- Todo `<img>` tem `alt` descritivo.
- Todo CTA tem `aria-label`.
- Contraste mínimo de texto: 4.5:1 (WCAG AA).
- `prefers-reduced-motion`: Todas as animações GSAP são envoltas em uma checagem. Se o usuário preferir menos movimento, as animações são desativadas.

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  // GSAP animations here
}
```

---

## 6. Conteúdo e Tom de Voz

- **Tom:** Autoridade calma. Não é arrogante — é inevitável. Como quem não precisa gritar para ser ouvido.
- **Títulos:** Frases curtas e impactantes. Máximo de 6 palavras por linha de destaque.
- **Copy de suporte:** Denso em significado, leve na leitura. Parágrafos curtos (3-4 linhas).
- **Evitar:** Palavras como "incrível", "revolucionário", "melhor do mercado". Preferir: "preciso", "consistente", "transformador".
- **Idioma:** Português Brasileiro (pt-BR) com vocabulário sofisticado.

---

## 7. Critérios de Entrega ("Definition of Done")

- [ ] Lighthouse Performance Score ≥ 90
- [ ] Lighthouse SEO Score = 100
- [ ] Lighthouse Accessibility Score ≥ 90
- [ ] Zero CLS (Cumulative Layout Shift)
- [ ] Scroll fluido a 60fps em Chrome, Firefox e Safari (desktop)
- [ ] Responsivo: Mobile (375px), Tablet (768px), Desktop (1440px), Wide (1920px)
- [ ] Nenhum elemento de UI usa a cor `#FF0000`, `#0000FF` ou qualquer cor padrão de framework

---

*Este documento é a lei. Em caso de dúvida sobre qualquer decisão de design ou código, consulte este arquivo primeiro.*
