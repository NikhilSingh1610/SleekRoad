# SleekRoad - System Requirements

## Software Requirements

### Required
- Node.js >= 18.0.0
- npm >= 9.0.0 (or yarn >= 1.22.0)
- Git (latest version)

### Optional
- VS Code (recommended IDE)
- Chrome/Firefox/Safari/Edge (latest versions)

---

## Node Package Dependencies

### Production Dependencies
react@^18.3.1
react-dom@^18.3.1
firebase@^11.1.0
react-hook-form@^7.54.2
@hookform/resolvers@^3.9.1
zod@^3.24.1
lucide-react@^0.468.0
class-variance-authority@^0.7.1
clsx@^2.1.1
tailwind-merge@^2.6.0
@radix-ui/react-avatar@^1.1.2
@radix-ui/react-dialog@^1.1.2
@radix-ui/react-dropdown-menu@^2.1.3
@radix-ui/react-label@^2.1.1
@radix-ui/react-slot@^1.1.1

### Development Dependencies
@vitejs/plugin-react@^4.3.4
typescript@~5.6.2
vite@^6.0.1
tailwindcss@^3.4.17
postcss@^8.4.49
autoprefixer@^10.4.20
eslint@^9.17.0
@typescript-eslint/eslint-plugin@^8.18.2
@typescript-eslint/parser@^8.18.2

---

## Firebase Configuration Required

- Firebase API Key
- Firebase Auth Domain
- Firebase Database URL
- Firebase Project ID
- Firebase Storage Bucket
- Firebase Messaging Sender ID
- Firebase App ID
- Firebase Measurement ID

---

## Browser Compatibility

### Desktop
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Mobile
- iOS Safari (latest 2 versions)
- Chrome Mobile (latest 2 versions)
- Samsung Internet (latest version)

---

## Minimum System Specifications

### Development
- CPU: Dual-core processor (2.0 GHz or higher)
- RAM: 4 GB minimum, 8 GB recommended
- Storage: 500 MB free space
- Internet: Required for npm install and Firebase

### Production (Hosting)
- Static hosting (Vercel, Netlify, Firebase Hosting)
- No server-side requirements (SPA)
- CDN recommended for assets

---

## Installation Commands

```bash
# Install Node.js dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Setup

### Required Files
- package.json (included)
- tsconfig.json (included)
- vite.config.ts (included)
- tailwind.config.js (included)
- postcss.config.js (included)

### Optional Files
- .env (for environment variables)
- .env.local (for local overrides)

---

## Network Requirements

### Development
- Port 5173 (or next available: 5174, 5175, etc.)
- Internet connection for Firebase

### Production
- HTTPS required for Firebase Authentication
- Authorized domains configured in Firebase Console

---

## Quick Check Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version

# Check if all dependencies are installed
npm list --depth=0
```

---

## Troubleshooting Requirements

If you encounter issues, ensure:
1. ✅ Node.js version is 18.0.0 or higher
2. ✅ npm is up to date: `npm install -g npm@latest`
3. ✅ All dependencies installed: `npm install`
4. ✅ No port conflicts on 5173
5. ✅ Firebase credentials are valid
6. ✅ Internet connection is stable

---

## Additional Tools (Optional)

### Recommended VS Code Extensions
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- GitLens
- Auto Rename Tag
- Path Intellisense

### Deployment Tools
- Vercel CLI: `npm i -g vercel`
- Netlify CLI: `npm i -g netlify-cli`
- Firebase CLI: `npm i -g firebase-tools`

---

Last Updated: October 5, 2025
