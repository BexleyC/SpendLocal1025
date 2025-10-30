import { builder } from "@netlify/functions";
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
  });
}

const db = getFirestore();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function handler(event) {
  // Ensure this is a POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    // Parse the incoming email data
    const payload = JSON.parse(event.body);
    const {
      from,
      subject,
      text,
      html,
      attachments = []
    } = payload;

    // Store email in Firestore
    const emailRef = db.collection('inbound_emails').doc();
    await emailRef.set({
      from_email: from,
      subject,
      text_content: text,
      html_content: html,
      has_attachments: attachments.length > 0,
      processed: false,
      received_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    // Forward all emails to admin
    await forwardToAdmin(payload);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email processed successfully' })
    };
  } catch (error) {
    console.error('Error processing email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

async function forwardToAdmin(emailData) {
  try {
    // Format attachments if they exist
    const attachmentsHtml = emailData.attachments?.length 
      ? `<p><strong>Attachments:</strong> ${emailData.attachments.map(a => a.filename).join(', ')}</p>` 
      : '';

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'BexleyCohen@gmail.com',
      subject: `[SPENDLOCAL] ${emailData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New SPENDLOCAL Email</h2>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>From:</strong> ${emailData.from}</p>
            <p><strong>Subject:</strong> ${emailData.subject}</p>
            <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
            ${attachmentsHtml}
          </div>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            ${emailData.html || emailData.text}
          </div>
        </div>
      `,
      attachments: emailData.attachments
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error forwarding email:', error);
    throw error; // Propagate error to main handler
  }
}

export { handler };