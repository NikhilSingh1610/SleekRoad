# Firestore Security Rules Setup

## Quick Fix: Firestore Rules Configuration

You're getting a "Missing or insufficient permissions" error because Firestore has security rules that prevent writes by default.

### Option 1: Allow All Users to Submit Reports (Recommended for Development)

Go to your Firebase Console:
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **on-time-f0c31**
3. Click on **Firestore Database** in the left sidebar
4. Click the **Rules** tab
5. Replace the rules with:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create reports (authenticated or not)
    match /reports/{reportId} {
      allow create: if true;
      allow read, update, delete: if false; // Only admins can read/update/delete
    }
    
    // Block all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish**

### Option 2: Allow Only Authenticated Users (More Secure)

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to create reports
    match /reports/{reportId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update, delete: if false; // Only admins can update/delete
    }
    
    // Block all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Option 3: Development Mode (INSECURE - Only for Testing)

⚠️ **WARNING**: This allows anyone to read/write ANY data. Use only for testing!

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## After Setting Rules

1. Save and publish the rules in Firebase Console
2. Wait 10-30 seconds for rules to propagate
3. Refresh your app and try submitting a report again

## Verifying It Works

Once configured, you should be able to:
- Submit reports without permission errors
- See reports in Firebase Console under Firestore Database > Data > reports collection
