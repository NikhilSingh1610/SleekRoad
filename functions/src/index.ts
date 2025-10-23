/**
 * Cloud Functions for sending email notifications when reports are submitted
 */

import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Configure email transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail?.email || "hotdrop.tech@gmail.com",
    pass: functions.config().gmail?.password || "",
  },
});

/**
 * Cloud Function that triggers when a new report is created in Firestore
 * Sends an email notification to the admin
 */
export const sendReportEmail = functions.firestore
  .document("reports/{reportId}")
  .onCreate(async (snapshot, context) => {
    const report = snapshot.data();
    const reportId = context.params.reportId;

    // Email to admin
    const adminMailOptions = {
      from: functions.config().gmail?.email || "hotdrop.tech@gmail.com",
      to: "hotdrop.tech@gmail.com", // Admin email
      subject: `🚨 New Report Submitted: ${report.issueType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #f5f5dc; padding-bottom: 10px;">
            New Issue Report Received
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Report ID:</strong> ${reportId}</p>
            <p><strong>Issue Type:</strong> <span style="background: #1a1a1a; color: white; padding: 4px 12px; border-radius: 4px;">${report.issueType}</span></p>
            <p><strong>Status:</strong> <span style="color: #e67e22;">Open</span></p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1a1a1a;">Reporter Information</h3>
            <p><strong>Name:</strong> ${report.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${report.email}">${report.email}</a></p>
            <p><strong>User ID:</strong> ${report.userId || "Anonymous"}</p>
            ${report.relatedItem ? `<p><strong>Related Item:</strong> ${report.relatedItem}</p>` : ""}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1a1a1a;">Description</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #1a1a1a; border-radius: 4px;">
              ${report.description}
            </div>
          </div>

          <div style="margin: 20px 0; padding: 15px; background: #e8f4f8; border-radius: 4px;">
            <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://console.firebase.google.com/project/on-time-f0c31/firestore/data/~2Freports~2F${reportId}" 
               style="background: #1a1a1a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Firebase Console
            </a>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="text-align: center; color: #666; font-size: 12px;">
            This is an automated notification from SleekRoad Report System
          </p>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: functions.config().gmail?.email || "hotdrop.tech@gmail.com",
      to: report.email,
      subject: "✅ We received your report - SleekRoad",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Thank You for Your Report</h2>
          
          <p>Hi ${report.name},</p>
          
          <p>We've successfully received your report and our team will review it shortly.</p>
          
          <div style="background: #f5f5dc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Report ID:</strong> ${reportId}</p>
            <p style="margin: 5px 0;"><strong>Issue Type:</strong> ${report.issueType}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Under Review</p>
          </div>

          <p>We typically respond within <strong>24-48 hours</strong>. If your issue is urgent, please don't hesitate to contact us directly.</p>
          
          <p>Thank you for helping us improve SleekRoad!</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The SleekRoad Team</strong>
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="text-align: center; color: #666; font-size: 12px;">
            If you didn't submit this report, please contact us immediately.
          </p>
        </div>
      `,
    };

    try {
      // Send both emails in parallel
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);

      console.log(`✅ Emails sent successfully for report: ${reportId}`);
      return {success: true, reportId};
    } catch (error) {
      console.error("❌ Error sending emails:", error);
      // Don't throw error - we don't want to fail the function
      // The report is still saved in Firestore
      return {success: false, error: String(error)};
    }
  });
