# Global Movement Research (GMR) Website

A public-facing website for Global Movement Research, designed to feel like a living, interactive research project rather than a code demo.

## Structure

```
gmr-site/
├── index.html          # Homepage with hero and narrative sections
├── maps.html           # Interactive confluence map (Waterworks-inspired)
├── dances.html         # Gallery of 3D dance visualizations
├── compare.html        # Side-by-side dance comparison interface
├── methods.html        # Technical methods explainer
├── css/
│   └── style.css       # Full design system
├── js/                 # (For future JavaScript modules)
├── data/
│   └── confluences.json # Confluence/region data for the map
├── viz/
│   ├── bata-sinclair.html      # Placeholder - replace with actual viz
│   └── esapkaide-sinclair.html # Placeholder - replace with actual viz
└── docs/
    └── aei-canonical-first-steps.html # AEI documentation (placeholder)
```

## Quick Start

1. **Clone or download** this folder to your local machine
2. **Open `index.html`** in a browser to preview locally
3. **Push to GitHub** and enable GitHub Pages in repository settings

The site is static HTML/CSS/JS with no build step required.

## Customization Checklist

### Replace Placeholders

- [ ] **Visualizations**: Replace `viz/bata-sinclair.html` and `viz/esapkaide-sinclair.html` with your actual Three.js visualization files
- [ ] **AEI Documentation**: Replace `docs/aei-canonical-first-steps.html` with rendered content from your `aei-canonical-first-steps.md`
- [ ] **Confluence Data**: Update `data/confluences.json` with real narratives, timeframes, and links

### Update Content

- [ ] Review all narrative text on `index.html` and `methods.html` for accuracy
- [ ] Add your StoryMap links where indicated
- [ ] Update GitHub repository links throughout
- [ ] Add real thumbnails for dance cards (optional)

### Extend the Archive

To add new dances:

1. Add the visualization HTML file to `viz/`
2. Update the `dances` array in `dances.html`
3. Update the `dances` array in `compare.html`
4. Add the dance to relevant confluences in `data/confluences.json`

To add new confluences:

1. Add an entry to `data/confluences.json` with:
   - `id`: Unique identifier
   - `name`: Display name
   - `location`: Geographic context
   - `coordinates`: [lat, lng] for map marker
   - `timeframe`: Research period
   - `lineages`: Cultural lineages
   - `dances`: Key dances
   - `narrative`: Full description
   - `links`: Related visualizations/pages
   - `status`: "active", "planned", or "future"

## Design System

The CSS design system uses CSS custom properties for consistent styling:

### Colors
- `--color-ink`: Primary text (#1a1a1a)
- `--color-paper`: Background (#faf9f7)
- `--color-earth`: Primary accent (#8b5e3c)
- `--color-ocean`: Secondary accent (#2d5a6b)
- `--color-confluence`: Map markers (#c45d3a)

### Typography
- Display: Playfair Display (serif)
- Body: Source Sans 3 (sans-serif)
- Mono: IBM Plex Mono (code/labels)

### Spacing
Follows a consistent scale: `--space-xs` through `--space-4xl`

## Dependencies

External dependencies loaded via CDN:
- **Google Fonts**: Playfair Display, Source Sans 3, IBM Plex Mono
- **Leaflet 1.9.4**: For the interactive map
- **CartoDB Basemaps**: Clean map tiles

No npm/build dependencies required.

## Browser Support

Tested in modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties and modern JavaScript features—IE11 is not supported.

## License

[Add your license information]

---

Built with care for Global Movement Research. For questions, contact [your contact info].
