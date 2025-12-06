# Environment Setup Guide

This guide will help you set up the project securely without exposing API keys.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Firebase account
- A Google AI Studio account (for Gemini API)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/santhoshsharuk/joshua-computers.git
cd joshua-computers
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Now edit the `.env` file with your actual credentials (see below for how to get them).

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your site!

## 🔑 Getting Your API Keys

### Firebase Configuration

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" or select existing project
   - Give it a name (e.g., "joshua-computers")
   - Follow the setup wizard

2. **Register Your Web App:**
   - In project overview, click the web icon (</>)
   - Register app with a nickname
   - Copy the configuration object

3. **Get Your Credentials:**
   ```javascript
   // You'll see something like this:
   const firebaseConfig = {
     apiKey: "AIzaSy...",              // Copy this
     authDomain: "project.firebaseapp.com",
     projectId: "project-id",
     storageBucket: "project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123:web:abc123"
   };
   ```

4. **Add to Your `.env` File:**
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=project-id
   VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123:web:abc123
   ```

### Google Gemini AI API Key

1. **Get API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Select a Google Cloud project or create a new one
   - Copy the API key

2. **Add to Your `.env` File:**
   ```env
   VITE_GOOGLE_GEMINI_API_KEY=AIzaSy...
   ```

## 🔥 Firebase Setup

### Enable Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click **Create Database**
3. Start in **Production Mode**
4. Choose a location close to your users
5. Click **Enable**

### Set Up Security Rules

1. Go to **Firestore Database > Rules** tab
2. Copy the contents of `firestore.rules` from this repo
3. **Important:** Replace `admin@joshuacomputers.com` with your admin email
4. Click **Publish**

### Enable Authentication

1. Go to **Build > Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Go to **Users** tab
5. Click **Add User**
6. Enter your admin email (must match firestore.rules) and password
7. Save

## 🧪 Testing Your Setup

### Test Firebase Connection

```bash
npm run dev
```

Open browser console and check for errors. If Firebase is set up correctly, you should see no authentication errors.

### Test Admin Panel

1. Visit `http://localhost:5173/admin/login.html`
2. Log in with your admin credentials
3. Try adding a product

### Test AI Recommendations

1. Visit the home page
2. Click "Find My Perfect Laptop"
3. Fill out the questionnaire
4. Check if AI recommendations work

## 🚢 Deployment

### Cloudflare Pages

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

4. **Add Environment Variables:**
   - Go to Settings > Environment Variables
   - Add all variables from your `.env` file:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_GOOGLE_GEMINI_API_KEY`

5. **Deploy:**
   - Click "Save and Deploy"
   - Wait for build to complete
   - Visit your deployed site!

### Other Platforms

**Vercel:**
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variables in Settings

**Netlify:**
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variables in Site settings

## ⚠️ Important Security Notes

### What NOT to Do:

❌ **Never commit your `.env` file**
```bash
# This file should be in .gitignore (it already is)
.env
```

❌ **Never commit the `dist/` folder**
```bash
# This folder should be in .gitignore (it already is)
dist/
```

❌ **Never hardcode API keys in source code**
```javascript
// ❌ DON'T DO THIS:
const apiKey = "AIzaSy...";

// ✅ DO THIS:
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
```

### What TO Do:

✅ **Use environment variables**
✅ **Keep `.env` in `.gitignore`**
✅ **Use `.env.example` to document required variables**
✅ **Set environment variables in your deployment platform**
✅ **Rotate API keys regularly**

## 🆘 Troubleshooting

### "Firebase: No Firebase App '[DEFAULT]' has been created"

- Check that all Firebase environment variables are set in `.env`
- Restart the development server after changing `.env`

### "API key not valid" Error

- Verify API key is correct in `.env`
- Check for extra spaces or quotes
- Ensure you're using the correct key for the correct service

### Build Fails on Deployment

- Verify all environment variables are set in deployment platform
- Check build logs for specific errors
- Ensure Node.js version is compatible (v16+)

### AI Recommendations Not Working

- Check that `VITE_GOOGLE_GEMINI_API_KEY` is set
- Verify the API key is active in Google AI Studio
- Check browser console for errors

## 📞 Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review the main [README.md](README.md)
3. Check the [SECURITY.md](SECURITY.md) for security-related issues
4. Open an issue on GitHub with details about your problem

## 📚 Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Google AI Studio](https://ai.google.dev/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
