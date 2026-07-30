# Birthday Surprise — A Birthday Story Hidden Just For You

A premium, cinematic, interactive birthday experience built with **React + Vite**.  
Personalize everything from one config file — no backend required.

---

## Quick start

```bash
cd birthday-surprise
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

---

## Default password

The login key is set in `src/config/birthdayConfig.js`:

```js
password: "CHANGE_ME",
```

Enter that on the secret login screen to unlock the experience.

---

## Where to place media

Put files in:

```
public/media/
```

| Type | Example path | Config field |
|------|----------------|--------------|
| Photos | `/media/photo1.jpg` | `photos`, `memories[].media`, `finalMedia.src` |
| Videos | `/media/video1.mp4` | `videos`, `memories[].media` |
| Music | `/media/birthday-music.mp3` | `musicPath` |
| Easter egg | `/media/easter-photo.jpg` | `easterEgg.photo` / `.video` |

If a file is missing, the UI shows an elegant placeholder and the rest of the site still works.

---

## How to personalize (`src/config/birthdayConfig.js`)

### Name & password

```js
birthdayName: "Priya",
nickname: "Pri",
password: "your-secret-key",
passwordHint: "Think of the one thing that makes this day special.",
```

### Final message

```js
finalMessage: `Your personal letter goes here…`,
```

### Questions (MCQ)

```js
questions: [
  {
    question: "What always makes her smile?",
    options: ["A", "B", "C", "D"],
    correctAnswer: 1, // 0-based index
  },
],
```

### Gifts (exactly 9 recommended)

```js
gifts: [
  {
    id: 1,
    title: "Mystery Gift",
    description: "A surprise waiting for you",
    reveal: "The real gift message after the box opens",
  },
  // …up to 9
],
```

### Memories, emotional lines, Easter egg

Edit `memories`, `emotionalMessages`, and `easterEgg` in the same file.  
Components read only from this config — you should not need to change component logic.

---

## Experience flow

1. Secret login  
2. Cinematic intro (tap to skip)  
3. Hero → Memory journey → Quiz  
4. “Things we don’t say enough”  
5. Pick exactly 3 of 9 gifts → Birthday box  
6. Gift reveal → Final twist → Personal message  
7. Replay  

**Easter egg:** tap the tiny sparkle (bottom-left) five times.

**Music:** use “♫ Turn on the music” / the toggle (bottom-right). Autoplay is never forced.

---

## Deploy

### Vercel

```bash
npm i -g vercel
vercel
```

Or connect the GitHub repo in the Vercel dashboard (framework: Vite).

### Netlify

```bash
npm run build
```

Drag the `dist` folder into Netlify, or set:

- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

1. Set `base` in `vite.config.js` if the site is not at the domain root, e.g. `base: '/birthday-surprise/'`
2. Build and publish `dist` (e.g. with `gh-pages` or Actions)

---

## Tech stack

- React + Vite (JavaScript)
- Framer Motion
- GSAP + ScrollTrigger
- Lucide React
- CSS Modules

---

## Accessibility & performance

- Keyboard-friendly controls and visible focus states  
- `prefers-reduced-motion` reduces heavy animation  
- Lazy-loaded images, IntersectionObserver for videos  
- Lighter particle counts on mobile  

---

## Project structure

```
src/
  components/   # Login, intro, hero, memories, quiz, gifts, finale…
  config/       # birthdayConfig.js  ← edit this
  hooks/        # useAudio, scroll helpers
  styles/       # globals.css
  App.jsx
  main.jsx
public/media/   # your photos, videos, music
```
