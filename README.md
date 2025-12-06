# Joshua Computers Website

A modern laptop e-commerce website with a Black-White-Yellow theme, featuring a public catalog and admin panel.

## ⚠️ IMPORTANT SECURITY NOTICE

**NEVER commit API keys or secrets to your repository!**

This project uses environment variables to keep sensitive information secure. Always:
- Use `.env` file for local development (already in `.gitignore`)
- Use platform environment variables for deployment (Cloudflare Pages, Vercel, etc.)
- Never hardcode API keys in source code
- Never commit the `dist/` folder or built assets to Git

**📖 New to this project?** See the detailed [Setup Guide](SETUP.md) for step-by-step instructions.

**🔒 Security concerns?** Read our [Security Policy](SECURITY.md) for handling sensitive data.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd joshua-computers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual API keys (see setup guide below).

4. **Run development server**
   ```bash
   npm run dev
   ```

## 🔥 Firebase Setup Guide

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a Web App

### 2. Configure Environment Variables

**Create a `.env` file in the project root:**

```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials:

```env
# Firebase Configuration (from Firebase Console)
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Gemini AI API Key (from https://makersuite.google.com/app/apikey)
VITE_GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

⚠️ **Important:** Never commit the `.env` file to Git!

### 3. Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Start in **Production Mode**
4. Choose a location

### 4. Apply Firestore Security Rules

**Option A: Via Firebase Console (Recommended for beginners)**

1. Go to **Firestore Database** > **Rules** tab
2. Copy the contents of `firestore.rules`
3. Paste it into the rules editor
4. **Important:** Replace `admin@joshuacomputers.com` with your actual admin email
5. Click **Publish**

**Option B: Via Firebase CLI**

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

### 5. Enable Authentication

1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Go to **Users** tab
4. Click **Add User**
5. Enter your admin email (must match the one in firestore.rules) and password
6. Save the credentials

### 6. Test the Setup

1. Run the dev server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:5173/admin/login.html`
3. Login with your admin credentials
4. Add a product with an image URL

## 📞 WhatsApp Configuration

The WhatsApp number is hardcoded as `+91 8110960489` in:

- `src/home.js`
- `src/shop.js`
- `src/product.js`
- `index.html`

To change it, search for `918110960489` and replace with your number.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

**⚠️ SECURITY WARNING:** The `dist/` folder contains your built application and should **NEVER** be committed to Git. It's already in `.gitignore`.

### Deploy to Cloudflare Pages

1. Push your **source code** to GitHub (never push the `dist/` folder)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your repository
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. **IMPORTANT:** Add your environment variables in Cloudflare Pages settings:
   - Go to Settings > Environment Variables
   - Add all `VITE_*` variables from your `.env` file
   - These will be used during the build process
7. Deploy

## 📁 Project Structure

```
├── admin/              # Admin panel pages
├── src/                # JavaScript modules and styles
│   ├── firebase.js     # Firebase config (uses env vars)
│   ├── gemini.js       # Gemini AI integration (uses env vars)
│   ├── admin.js        # Admin logic
│   ├── home.js         # Home page logic
│   ├── shop.js         # Products listing logic
│   ├── product.js      # Single product logic
│   └── style.css       # Global styles
├── index.html          # Home page
├── laptops.html        # Products listing page
├── product.html        # Product details page
├── .env.example        # Example environment variables (COMMIT THIS)
├── .env                # Your actual API keys (NEVER COMMIT)
├── .gitignore          # Git ignore rules (includes .env and dist/)
└── firestore.rules     # Firestore security rules
```

## 🔒 Security Best Practices

1. **Never commit sensitive data:**
   - `.env` file is in `.gitignore` - keep it there
   - `dist/` folder is in `.gitignore` - never commit built files
   
2. **Use environment variables:**
   - All API keys use `import.meta.env.VITE_*` pattern
   - Check `src/firebase.js` and `src/gemini.js` for examples

3. **For deployment:**
   - Set environment variables in your hosting platform
   - Let the platform build your app with those variables
   - Never include API keys in source code

4. **If you accidentally committed secrets:**
   - Immediately regenerate the API keys
   - Update them in your `.env` and deployment platform
   - Consider using `git-filter-branch` or BFG Repo-Cleaner to remove from history

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the Lightning Yellow accent color.

### Fonts

Fonts are loaded from Google Fonts in `src/style.css`. Change the import URL to use different fonts.

## 📝 License

MIT
