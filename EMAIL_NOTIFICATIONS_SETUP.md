# Email Notifications with Firebase Cloud Functions

## Overview
Set up automatic email notifications when users submit reports via Firebase Cloud Functions.

## Prerequisites
- Firebase Blaze (Pay-as-you-go) plan required for Cloud Functions
- Firebase CLI installed globally

---

## Step 1: Install Firebase CLI

```powershell
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```powershell
firebase login
```

## Step 3: Initialize Cloud Functions

From your project root:

```powershell
firebase init functions
```

Select:
- **Use an existing project** → Choose `on-time-f0c31`
- **Language**: TypeScript (recommended) or JavaScript
- **ESLint**: Yes
- **Install dependencies**: Yes

This creates a `functions` folder with the Cloud Functions code.

---

## Step 4: Install Email Dependencies

Navigate to the functions folder and install email libraries:

```powershell
cd functions
npm install nodemailer
npm install --save-dev @types/nodemailer
```

---

## Step 5: Configure Email Service

### Option A: Using Gmail (Simple Setup)

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Create app password for "Mail"
   - Copy the 16-character password

3. **Set Firebase Config** (from `functions` folder):

```powershell
firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="your-app-password"
```

### Option B: Using SendGrid (Production Recommended)

1. Sign up at https://sendgrid.com (Free tier: 100 emails/day)
2. Create API key
3. Set config:

```powershell
firebase functions:config:set sendgrid.apikey="your-sendgrid-api-key"
```

---

## Step 6: Create the Cloud Function

Edit `functions/src/index.ts`:

```typescript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

// Trigger when a new report is created
export const sendReportEmail = functions.firestore
  .document("reports/{reportId}")
  .onCreate(async (snapshot, context) => {
    const report = snapshot.data();
    const reportId = context.params.reportId;

    // Email content
    const mailOptions = {
      from: functions.config().gmail.email,
      to: "admin@yourdomain.com", // Your admin email
      subject: `New Report Submitted: ${report.issueType}`,
      html: `
        <h2>New Issue Report</h2>
        <p><strong>Report ID:</strong> ${reportId}</p>
        <p><strong>Issue Type:</strong> ${report.issueType}</p>
        <p><strong>Submitted by:</strong> ${report.name} (${report.email})</p>
        <p><strong>Related Item:</strong> ${report.relatedItem || "N/A"}</p>
        <p><strong>Description:</strong></p>
        <p>${report.description}</p>
        <p><strong>Submitted at:</strong> ${new Date(report.createdAt?.toDate()).toLocaleString()}</p>
        <hr>
        <p><a href="https://console.firebase.google.com/project/on-time-f0c31/firestore/data/~2Freports~2F${reportId}">View in Firebase Console</a></p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent for report: ${reportId}`);
      return null;
    } catch (error) {
      console.error("Error sending email:", error);
      return null;
    }
  });
```

### Using SendGrid Instead:

```typescript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

sgMail.setApiKey(functions.config().sendgrid.apikey);

export const sendReportEmail = functions.firestore
  .document("reports/{reportId}")
  .onCreate(async (snapshot, context) => {
    const report = snapshot.data();
    const reportId = context.params.reportId;

    const msg = {
      to: "admin@yourdomain.com",
      from: "noreply@yourdomain.com", // Must be verified in SendGrid
      subject: `New Report: ${report.issueType}`,
      html: `
        <h2>New Issue Report</h2>
        <p><strong>Report ID:</strong> ${reportId}</p>
        <p><strong>Issue Type:</strong> ${report.issueType}</p>
        <p><strong>Name:</strong> ${report.name}</p>
        <p><strong>Email:</strong> ${report.email}</p>
        <p><strong>Description:</strong></p>
        <p>${report.description}</p>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`Email sent for report: ${reportId}`);
      return null;
    } catch (error) {
      console.error("Error sending email:", error);
      return null;
    }
  });
```

---

## Step 7: Deploy the Function

From the `functions` folder:

```powershell
cd ..  # Back to project root
firebase deploy --only functions
```

---

## Step 8: Test It

1. Go to your app
2. Submit a test report
3. Check your admin email inbox
4. Monitor function logs:

```powershell
firebase functions:log
```

---

## Advanced: Send Confirmation Email to User

Modify the function to also send a confirmation email to the user:

```typescript
export const sendReportEmail = functions.firestore
  .document("reports/{reportId}")
  .onCreate(async (snapshot, context) => {
    const report = snapshot.data();
    const reportId = context.params.reportId;

    // Email to admin
    const adminEmail = {
      from: functions.config().gmail.email,
      to: "admin@yourdomain.com",
      subject: `New Report: ${report.issueType}`,
      html: `...admin email content...`,
    };

    // Confirmation email to user
    const userEmail = {
      from: functions.config().gmail.email,
      to: report.email,
      subject: "We received your report",
      html: `
        <h2>Thank you for your report</h2>
        <p>Hi ${report.name},</p>
        <p>We've received your report about: <strong>${report.issueType}</strong></p>
        <p><strong>Report ID:</strong> ${reportId}</p>
        <p>Our team will review it and get back to you within 24-48 hours.</p>
        <p>Thank you for helping us improve!</p>
        <p>- The SleekRoad Team</p>
      `,
    };

    try {
      // Send both emails
      await Promise.all([
        transporter.sendMail(adminEmail),
        transporter.sendMail(userEmail),
      ]);
      console.log(`Emails sent for report: ${reportId}`);
      return null;
    } catch (error) {
      console.error("Error sending emails:", error);
      return null;
    }
  });
```

---

## Costs

Firebase Cloud Functions pricing:
- **Free tier**: 2M invocations/month
- **After free tier**: $0.40 per million invocations
- **Outbound networking**: First 5GB free, then $0.12/GB

Email service costs:
- **Gmail**: Free (but has daily limits ~500 emails/day)
- **SendGrid**: Free tier 100 emails/day, paid plans from $15/month

---

## Troubleshooting

### Function not deploying?
```powershell
# Check Firebase billing plan
firebase projects:list

# Upgrade to Blaze plan if needed
```

### Emails not sending?
```powershell
# Check function logs
firebase functions:log

# Test email config locally
cd functions
npm run serve
```

### Gmail App Password not working?
- Ensure 2-Step Verification is enabled
- Generate a NEW app password
- Use the 16-character password WITHOUT spaces

---

## Local Testing (Optional)

Test functions locally before deploying:

```powershell
cd functions
npm run serve
```

Then trigger the function by creating a test document in Firestore.

---

## Summary

1. ✅ Install Firebase CLI
2. ✅ Initialize Cloud Functions
3. ✅ Configure email service (Gmail/SendGrid)
4. ✅ Write the trigger function
5. ✅ Deploy to Firebase
6. ✅ Test with a real report submission

Once deployed, you'll automatically receive emails whenever someone submits a report! 📧
