# ⚠️ IMPORTANT: Gmail App Password Setup

## Security Warning
**DO NOT use your actual Gmail password "Idfc@1029" in the Firebase config!**

You need to create a **Gmail App Password** instead. Here's how:

## Step-by-Step Guide

### 1. Enable 2-Step Verification
1. Go to: https://myaccount.google.com/security
2. Click on **2-Step Verification**
3. Follow the steps to enable it (if not already enabled)

### 2. Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Under "Select app" → Choose **Mail**
4. Under "Select device" → Choose **Other (Custom name)**
5. Type: **SleekRoad Firebase**
6. Click **Generate**
7. Copy the **16-character password** (it looks like: `abcd efgh ijkl mnop`)

### 3. Set Firebase Config
Run this command with your NEW app password:

```powershell
firebase functions:config:set gmail.email="hotdrop.tech@gmail.com" gmail.password="YOUR_16_CHAR_APP_PASSWORD"
```

**Example:**
```powershell
firebase functions:config:set gmail.email="hotdrop.tech@gmail.com" gmail.password="abcdefghijklmnop"
```

### 4. Verify Config
```powershell
firebase functions:config:get
```

### 5. Deploy Functions
```powershell
firebase deploy --only functions
```

---

## Alternative: Use Environment Variable (More Secure)

For development/testing, you can also set it in `.env` file:

```
GMAIL_USER=hotdrop.tech@gmail.com
GMAIL_PASS=your_app_password_here
```

Then update the code to read from environment variables.

---

## Troubleshooting

### "Invalid credentials" error?
- Make sure 2-Step Verification is enabled
- Generate a NEW app password
- Use the app password WITHOUT spaces
- Don't use your regular Gmail password

### Still not working?
Try using SendGrid instead (see EMAIL_NOTIFICATIONS_SETUP.md)

---

## Current Status
✅ Functions built successfully  
⚠️ Need to set Gmail App Password before deploying  
⏳ Ready to deploy once password is configured
