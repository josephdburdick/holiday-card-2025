# Christmas Card 2025

A beautiful interactive Christmas card with page-turn animation and music.

## Features

- **Page-turn animation**: Realistic 3D card opening effect
- **Responsive design**: Works on desktop and mobile
- **Music player**: Inline audio player for your DJ mix
- **Elegant typography**: Beautiful fonts for the message
- **Accessibility**: Keyboard navigation and screen reader support
- **Static export**: Ready for deployment to any static hosting

## Setup

1. **Add your content:**

   - Your cover image is already at `public/img/xmas-card-cover-2025.png`
   - Add your DJ mix audio file to `public/audio/` (e.g., `christmas-mix.mp3`)
   - Update the message text in `app/components/InsideMessage/InsideMessage.tsx`
   - Update your name in the signature

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Development:**

   ```bash
   pnpm run dev
   ```

4. **Build for production:**
   ```bash
   pnpm run build
   ```

## Deployment

This is a Next.js static site that can be deployed to any static hosting service:

### GitHub Pages

```bash
pnpm run build
# The `out/` directory contains your static files
# Upload the contents of `out/` to your GitHub Pages branch
```

### Netlify

```bash
pnpm run build
# Upload the `out/` directory to Netlify
```

### Vercel

```bash
pnpm run build
# Vercel will automatically detect and deploy the `out/` directory
```

### Other static hosts

Upload the contents of the `out/` directory after running `pnpm run build`.

## Customization

- **Fonts**: Edit `app/globals.css` to change the font families
- **Colors**: Modify the CSS variables and gradients in `app/globals.css`
- **Animation**: Adjust timing and easing in the CardFlip component
- **Message**: Update the text and styling in InsideMessage component

## Browser Support

- Modern browsers with CSS 3D transforms support
- Graceful fallback for `prefers-reduced-motion`
- Mobile-friendly touch interactions
