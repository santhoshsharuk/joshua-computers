# 🚨 URGENT: How to Fix Your API Key Exposure

## What Happened

Your Google API keys (Firebase and Gemini) were exposed in the built files (`assets/main-BReLN-j1.js`). This likely happened because:
1. You built the project with API keys in your environment
2. You committed the `dist/` folder to Git
3. The built files were deployed with hardcoded API keys

## ⚠️ IMMEDIATE ACTIONS REQUIRED

### Step 1: Regenerate All API Keys (DO THIS NOW!)

The exposed keys are **COMPROMISED** and must be regenerated immediately.

#### Secure Your Firebase Configuration:

**Important Note:** Firebase Web API keys are actually safe to be public as long as you have proper security rules. However, if your keys were exposed with weak security rules, follow these steps:

**Option 1: Enable App Check (Recommended)**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Build** > **App Check**
4. Click **Get started**
5. Register your web app with reCAPTCHA v3 or v2
6. Enable enforcement for Firestore and other services

**Option 2: Restrict API Keys**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your API key
4. Click **Edit**
5. Under **Application restrictions**, select **HTTP referrers**
6. Add your domain (e.g., `yourdomain.com/*`, `*.cloudflare.com/*`)
7. Click **Save**

**Option 3: Regenerate (if absolutely necessary)**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** > **General**
4. Delete the existing web app (⚠️ This will break your site until reconfigured!)
5. Click **Add app** > Web icon
6. Register a new app and copy the NEW configuration
7. Update your environment variables immediately

#### Regenerate Google Gemini API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Find your exposed API key
3. **Delete it**
4. Click **Create API Key**
5. Copy the NEW API key

### Step 2: Update Your Environment Variables

#### For Local Development:
```bash
# Edit your .env file (if it doesn't exist, create it)
nano .env
```

Add your NEW credentials:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_NEW_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_NEW_app_id

# Google Gemini AI API Key
VITE_GOOGLE_GEMINI_API_KEY=your_NEW_gemini_api_key
```

#### For Cloudflare Pages (or your deployment platform):
1. Go to your Cloudflare Pages dashboard
2. Select your site
3. Go to **Settings** > **Environment Variables**
4. **Delete** all old `VITE_*` variables
5. **Add** the NEW variables one by one:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GOOGLE_GEMINI_API_KEY`
6. Click **Save**
7. Trigger a **new deployment** (or it will happen automatically)

### Step 3: Remove Built Files from Git

**NEVER commit the `dist/` folder to Git!**

```bash
# Remove dist folder from Git (if it was committed)
git rm -rf dist/

# Make sure .gitignore includes dist/
# (it should already be there in this updated repo)

# Commit the change
git add .gitignore
git commit -m "Remove dist folder and ensure it's in .gitignore"
git push
```

### Step 4: Clean Git History (Optional but Recommended)

If the exposed keys are in your Git history, remove them:

**Option A: Use BFG Repo-Cleaner (Easier)**
```bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
# Then run:
java -jar bfg.jar --delete-folders dist
java -jar bfg.jar --delete-files .env
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

**Option B: Use git-filter-repo**
```bash
pip install git-filter-repo
git filter-repo --path dist --invert-paths
git filter-repo --path .env --invert-paths
git push --force
```

⚠️ **Warning:** Force pushing rewrites history and affects all collaborators!

## ✅ Verification

After completing the above steps, verify:

1. **Check .gitignore:**
   ```bash
   cat .gitignore | grep -E "^dist/|^\.env$"
   ```
   You should see:
   ```
   dist/
   .env
   ```

2. **Check Git status:**
   ```bash
   git status
   ```
   Should NOT show `dist/` or `.env` as tracked files

3. **Test local build:**
   ```bash
   npm run build
   # Check that dist folder is created but NOT tracked by Git
   git status
   # Should not show dist/ as modified
   ```

4. **Test deployment:**
   - Wait for new deployment to complete
   - Visit your site
   - Check browser console for errors
   - Test Firebase functionality
   - Test AI recommendations

## 📚 Understanding the Fix

This repository has been updated with:

1. **`.env.example`** - Template showing which environment variables are needed (WITHOUT your actual keys)
2. **Updated README.md** - Security warnings and setup instructions
3. **SECURITY.md** - Comprehensive security guide
4. **SETUP.md** - Step-by-step setup guide

The source code was already correct (using `import.meta.env.VITE_*`), but the built files were committed with your keys in them.

## 🔒 Going Forward

**ALWAYS:**
- ✅ Use `.env` file for local development
- ✅ Set environment variables in your deployment platform
- ✅ Keep `.env` in `.gitignore`
- ✅ Keep `dist/` in `.gitignore`

**NEVER:**
- ❌ Commit `.env` files
- ❌ Commit `dist/` folders
- ❌ Hardcode API keys in source code
- ❌ Share API keys in any form

## 🆘 Need Help?

If you're stuck:
1. Read [SETUP.md](SETUP.md) for detailed setup instructions
2. Read [SECURITY.md](SECURITY.md) for security best practices
3. Open an issue on GitHub

## 📞 Monitoring

After regenerating keys, monitor your Firebase and Google Cloud Console for:
- Unusual API usage
- Unexpected charges
- Unauthorized access attempts

If you see anything suspicious, regenerate the keys again and contact support.
