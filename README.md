# Flovian — Personal Website

Portfolio for Flovian, a Technical Project Manager, Software Developer, and
Engineering Leader. React + Vite + Tailwind. Warm ivory and gold, editorial
minimal.

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |

## Assets already in place

```
public/hero.jpeg      Hero portrait
public/about.jpeg     About image
public/favicon.svg
```

## Still to add

### 1. Monsterat font

Monsterat isn't on Google Fonts or Fontshare, so files load from `public/fonts/`.
Drop in:

```
Monsterat-Regular.woff2     (400 — body)
Monsterat-Medium.woff2      (500)
Monsterat-SemiBold.woff2    (600 — headings)
Monsterat-Bold.woff2        (700)
```

Until then it falls back to Poppins. Different filenames are fine — update the
`src:` paths in `src/styles/fonts.css`.

### 2. CV

Add the PDF at `public/flovian-cv.pdf`. The hero's "Download My CV" button
already points there.

### 3. Project and article URLs

In `src/data/content.js`, search for `TODO`:

- `projects.items[].href` — three project URLs
- `writing.posts[].href` — four article URLs

Everything else is real: email, LinkedIn, GitHub, Dev.to, both images.

### Contact form

No backend. Set `contact.form.endpoint` to a Formspree / Basin / Web3Forms URL
and submissions POST there as JSON. Leave it empty and the form falls back to
opening the visitor's mail client with the message pre-filled.

## Design tokens

Defined in `tailwind.config.js`.

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#FBF9F5` | Page background, ivory |
| `canvas-alt` | `#F4F0E7` | Alternating section bands |
| `surface` | `#FFFFFF` | Form and card insets |
| `card` / `card-hover` | `#F6F2EA` / `#F1ECE1` | Card fills |
| `line` / `line-strong` | `#E7E0D2` / `#D6CCB7` | Borders |
| `ink` / `ink-muted` / `ink-faint` | `#15120E` / `#6A6154` / `#948B7B` | Text hierarchy |
| `gold` / `gold-soft` / `gold-deep` | `#B9853E` / `#D8B078` / `#8E6229` | Accent |
| `gold-wash` | `#F0E4CE` | Soft accent fills |
| `night` | `#131110` | Footer |

## Structure

```
Navigation → Hero → About Me → What I Do → Featured Work
→ My Tools & Stack → Writing & Ideas → Beyond the Code
→ Contact → Footer
```

```
src/
  data/content.js          All copy and links — edit content, not components
  hooks/useReveal.js       Scroll reveals, active nav, scroll progress,
                           pointer glow, magnetic hover, 3D tilt, carousel,
                           clipboard
  styles/fonts.css         Monsterat @font-face declarations
  index.css                Tokens, base styles, component classes, grain
  components/
    Header.jsx             Fixed nav + reading-progress rule + mobile menu
    Hero.jsx               Split hero: type left, portrait right
    About.jsx              Sticky tilt image + statement, gold-highlighted
    Skills.jsx             Four "What I Do" cards
    Projects.jsx           Horizontal carousel, expandable detail
    Stack.jsx              Categorised technology wall
    Writing.jsx            Article carousel
    BeyondCode.jsx         Four personal cards
    Contact.jsx            Four channel cards + form
    Footer.jsx             Dark footer with oversized wordmark
    SectionHeading.jsx     Shared heading + carousel controls/dots
    Reveal.jsx             Scroll-in wrapper
    icons.jsx              Inline SVG icons + line icons
```

## Interaction notes

All hooks in `useReveal.js` are rAF-throttled, bail out on touch devices, and
respect `prefers-reduced-motion` — tilt, magnetic drift, and pointer glow only
run where a cursor exists.

- **Magnetic** — buttons and social links drift toward the cursor
- **Tilt** — cards rotate slightly in 3D toward the pointer
- **Spotlight** — a gold radial highlight follows the cursor across cards
- **Scroll progress** — gold rule under the header
- **Copy email** — hero button copies to clipboard with a check confirmation
- **Carousels** — native scroll-snap, arrow buttons, dot pagination on mobile

No carousel or animation library; everything is custom hooks and CSS. No
lorem ipsum, no invented experience, employers, metrics, or technologies.

## Deploying

`npm run build` produces a static `dist/` that works on Vercel, Netlify,
Cloudflare Pages, or GitHub Pages. Use Vite as the build command and `dist` as
the output directory.
