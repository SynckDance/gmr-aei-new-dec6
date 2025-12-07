# Global Movement Research — Interactive Site

Interactive archive for the Global Movement Research (GMR) project, featuring the Atomic Confluences map, theory frameworks, lab data, and AEI Horizon visualizations.

**By Sinclair Ogaga Emoghene**  
Department of Theatre and Dance, University of Texas at Austin

---

## Live Site

Once deployed: `https://synckdance.github.io/gmr-site/`

---

## Quick Deploy

### 1. Create repo on GitHub
- Go to github.com/new
- Name it `gmr-site` (or change `base` in vite.config.js to match)
- Keep it public

### 2. Push this code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/synckdance/gmr-site.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to repo Settings → Pages
- Source: **GitHub Actions**
- The workflow will auto-run on push

### 4. Wait ~2 minutes
Your site will be live at `https://synckdance.github.io/gmr-site/`

---

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Structure

```
gmr-site/
├── src/
│   ├── App.jsx          # Main GMR component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.js       # Build config (change base path here)
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml   # Auto-deploy on push
```

---

## Customization

**Change repo name:**  
Edit `base` in `vite.config.js` to match your repo name.

**Add custom domain:**  
1. Add CNAME file to `public/` folder with your domain
2. Update DNS to point to GitHub Pages
3. Could become `gmr.sinclair.dance`

---

## Sections

1. **Atomic Confluences** — Interactive map of 30 sites
2. **Theory & Methods** — Frozen/Motion/Living/Thinking Archives, ACF, DRP, QTC, SAM
3. **Labs & Data** — YouTube archive, data artifacts
4. **Geospatial & Migration** — Movement connections and routes  
5. **AEI Horizon** — 3D visualizations, AEI Activation Framework
6. **Writing Archive** — Essays and publications

---

## Links

- Main site: [sinclair.dance](https://sinclair.dance)
- 3D Visualizations: [synckdance.github.io/gmr_space_visualizations](https://synckdance.github.io/gmr_space_visualizations/)

---

## License

© Sinclair Ogaga Emoghene. All rights reserved.
