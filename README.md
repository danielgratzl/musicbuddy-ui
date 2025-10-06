# MusicBuddy - Music Collection Viewer

An Apple Music-style web application to browse and explore your music collection.

## Features

- 📀 **Album Grid View** - Beautiful grid layout with album artwork
- 🔍 **Search** - Search by title, artist, or genre
- 🎵 **Filter & Sort** - Filter by genre and sort by title, artist, year, or rating
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎬 **YouTube Integration** - Direct links to YouTube videos
- ⭐ **Ratings** - View album ratings and favorites

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- PapaParse (CSV parsing)
- GitHub Pages

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

### Automatic Deployment

The app is configured to automatically deploy to GitHub Pages when pushed to the main branch.

1. Create a new repository on GitHub
2. Push your code to the main branch
3. Go to Settings > Pages in your GitHub repository
4. Under "Build and deployment", select "GitHub Actions" as the source
5. The workflow will automatically build and deploy your app

Your site will be available at: `https://[username].github.io/musicbuddy/`

### Manual Deployment

You can also deploy manually:

```bash
npm run deploy
```

## Customization

### Update the base path

If your repository name is different from "musicbuddy", update the base path in `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

### Update your collection

Replace `public/MusicBuddy.csv` with your own CSV file to display your collection.

## License

MIT
