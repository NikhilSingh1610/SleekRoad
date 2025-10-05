Place the Charlsworth font files here so the app can load them from /fonts/charlsworth.*

Expected filenames (update `src/styles/globals.css` if you use different names):

- charlsworth.woff2   (preferred, modern browsers)
- charlsworth.woff    (fallback)

How to add the files
1. Copy your font files into this folder (the repo path):
   public/fonts/charlsworth.woff2
   public/fonts/charlsworth.woff

2. Restart the dev server (if running):

   # PowerShell
   npm run dev

3. Open the site and verify the hero heading uses the new font. If it doesn't appear, hard-refresh the page or clear cache.

If you prefer to host fonts on a CDN instead, update the @font-face `src` in `src/styles/globals.css` to point to the remote URLs.

If you want, paste the font files here and I can place them into `public/fonts/` for you (upload the .woff2 and .woff files).