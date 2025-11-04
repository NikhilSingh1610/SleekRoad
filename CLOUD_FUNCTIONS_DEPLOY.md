Cloud Functions deployment and email setup (summary)

This project contains Cloud Function code (nodemailer) to send emails when a report is created. Deployment requires the Firebase project to be on the Blaze (pay-as-you-go) plan.

Steps to deploy (overview):

1) Upgrade project to Blaze plan
   - Go to Firebase Console -> Project Settings -> Manage Billing -> Upgrade to Blaze.
   - Deployment of functions using outbound networking (e.g., SMTP) requires Blaze.

2) Prepare function environment variables
   - Avoid hard-coding email credentials in source. Use `functions.config()` or environment variables.
   - Example using Gmail app password (not regular account password):
     - `firebase functions:config:set gmail.user="your.email@example.com" gmail.pass="APP_PASSWORD"`
   - If using SendGrid or another provider, set the API key similarly:
     - `firebase functions:config:set sendgrid.key="SG.xxx"`

3) Verify `package.json` and install dependencies in `functions/` (nodemailer is required)
   - cd functions
   - npm install

4) Deploy functions
   - From repo root (or functions folder):
     - `firebase deploy --only functions`
   - Or deploy a specific function by name: `firebase deploy --only functions:sendReportEmail`

5) Monitor logs and set proper IAM if needed
   - Use `firebase functions:log` or the Cloud Console to inspect logs after deployment.

6) Testing
   - Create a report via the app (or Firestore console). The function should trigger onCreate and send an email.
   - Ensure the function's environment variables are set and that the function has outbound network access (Blaze).

Security notes
- Do NOT commit real credentials to the repository. Use the Firebase config or secret manager.
- If using Gmail, create an App Password (if your account has 2FA). See `GMAIL_APP_PASSWORD.md` in the repo for guidance.

Troubleshooting
- If emails are not sent, check function logs for SMTP errors.
- For high-volume sending, prefer a dedicated transactional email provider (SendGrid, Postmark) and store the key in functions config.

