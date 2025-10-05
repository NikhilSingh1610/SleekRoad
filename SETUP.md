# SleekRoad - Setup Guide

## 📋 Prerequisites

Before running this project, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v18.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
  
- **npm** (v9.0.0 or higher) or **yarn**
  - Comes with Node.js
  - Verify installation: `npm --version`

- **Git** (for version control)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Optional but Recommended
- **VS Code** (for development)
  - Download from: https://code.visualstudio.com/
  - Recommended extensions:
    - ESLint
    - Tailwind CSS IntelliSense
    - Prettier - Code formatter

---

## 🚀 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/NikhilSingh1610/SleekRoad.git
cd SleekRoad
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React 18+
- TypeScript
- Vite
- Tailwind CSS
- Firebase
- Radix UI components
- Lucide React icons
- And more...

### 3. Firebase Configuration

#### Option A: Use Existing Firebase Config (Already Configured)
The project already has Firebase credentials in `src/firebase/firebaseConfig.ts`. However, for security reasons, you should set up your own Firebase project.

#### Option B: Set Up Your Own Firebase Project (Recommended for Production)

1. **Create a Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to **Authentication**
   - Click "Get Started"
   - Enable **Email/Password** sign-in method
   - Enable **Google** sign-in method

3. **Register Your Web App**
   - In Project Settings, click "Add app" → Web
   - Register your app and copy the config

4. **Add Authorized Domains** (for Google Sign-In)
   - Go to **Authentication** → **Settings** → **Authorized domains**
   - Add `localhost` and your deployment domain

5. **Update Firebase Config**
   - Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
   
   - Update `src/firebase/firebaseConfig.ts` to use environment variables (optional)

### 4. Run the Development Server
```bash
npm run dev
```

The application will start at:
- **Local:** http://localhost:5173 (or another available port)
- **Network:** Will be displayed in the terminal

---

## 📦 Project Dependencies

### Core Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "~5.6.2",
  "vite": "^6.0.1"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.17",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0",
  "lucide-react": "^0.468.0"
}
```

### Firebase
```json
{
  "firebase": "^11.1.0"
}
```

### UI Components (Radix UI)
```json
{
  "@radix-ui/react-avatar": "^1.1.2",
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-dropdown-menu": "^2.1.3",
  "@radix-ui/react-label": "^2.1.1",
  "@radix-ui/react-slot": "^1.1.1",
  // ... and more
}
```

### Form Handling
```json
{
  "react-hook-form": "^7.54.2",
  "@hookform/resolvers": "^3.9.1",
  "zod": "^3.24.1"
}
```

---

## 🛠️ Build for Production

### Build Command
```bash
npm run build
```

This will create an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Option 2: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`

### Option 3: Firebase Hosting
1. Install Firebase CLI: `npm i -g firebase-tools`
2. Run: `firebase login`
3. Run: `firebase init hosting`
4. Run: `firebase deploy`

### Option 4: GitHub Pages
1. Update `vite.config.ts` with base path
2. Run: `npm run build`
3. Push `dist/` folder to `gh-pages` branch

---

## 📁 Project Structure

```
sleekhub2/
├── public/                 # Static assets
│   ├── catty.png          # Decorative cat image
│   └── fonts/             # Custom fonts
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # UI components (buttons, cards, etc.)
│   │   ├── Header.tsx    # Navigation header
│   │   ├── HeroSection.tsx
│   │   └── ...
│   ├── firebase/          # Firebase configuration
│   │   ├── firebaseConfig.ts
│   │   └── AuthProvider.tsx
│   ├── pages/            # Page components
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignUpPage.tsx
│   │   └── ...
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Features

### Authentication
- ✅ Email/Password Sign Up & Login
- ✅ Google Sign-In
- ✅ User Session Management
- ✅ Auto-redirect to Dashboard after login

### UI/UX
- ✅ Elegant beige/black/cream color scheme
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Professional card-based layout
- ✅ Custom Tailwind CSS utilities

### Pages
- ✅ Home/Landing Page
- ✅ Dashboard (authenticated users)
- ✅ Login & Sign Up pages
- ✅ Browse Categories
- ✅ Trending Items
- ✅ Messages & Notifications
- ✅ Sell Item page

---

## 🐛 Troubleshooting

### Issue: Port 5173 is already in use
**Solution:** The dev server will automatically use the next available port (5174, 5175, etc.)

### Issue: Firebase authentication errors
**Solutions:**
- Ensure Firebase Authentication is enabled in Firebase Console
- Add `localhost` to authorized domains
- Check that API keys are correct in `firebaseConfig.ts`

### Issue: Tailwind styles not working
**Solutions:**
- Ensure `tailwind.config.js` is properly configured
- Check that `globals.css` imports Tailwind directives
- Run `npm install` again

### Issue: Module not found errors
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build errors with TypeScript
**Solution:**
- Check `tsconfig.json` settings
- Ensure all imports have proper types
- Run `npm run build` to see detailed errors

---

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## 📝 Environment Variables

Create a `.env` file in the root directory for sensitive data:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Note:** Add `.env` to `.gitignore` to keep credentials secure!

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Additional Notes

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Tips
- Use production build for deployment
- Enable Firebase caching
- Optimize images (compress `catty.png`)
- Consider lazy loading for routes

### Security Best Practices
- Never commit Firebase credentials to GitHub
- Use environment variables for sensitive data
- Enable Firebase security rules
- Validate all user inputs
- Implement rate limiting for API calls

---

## 📞 Support

For issues or questions:
- **GitHub Issues:** https://github.com/NikhilSingh1610/SleekRoad/issues
- **Email:** [Your Email]
- **Documentation:** See README.md

---

## 🎉 You're Ready!

Your SleekRoad marketplace is now set up and ready to run!

Start the development server:
```bash
npm run dev
```

Visit http://localhost:5173 and start exploring! 🚀
