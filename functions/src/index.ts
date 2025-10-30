import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

admin.initializeApp();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

// Configure nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Cloud Function to send email on form submission
export const onContactFormSubmitted = functions.firestore
  .document('contact_forms/{formId}')
  .onCreate(async (snap, context) => {
    try {
      const formData = snap.data();
      
      // Email template
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: 'BexleyCohen@gmail.com', // Your email address
        subject: `New Contact Form Submission - ${formData.townName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Business Name:</strong> ${formData.businessName}</p>
          <p><strong>Industry:</strong> ${formData.industry}</p>
          <p><strong>Contact Information:</strong></p>
          <ul>
            <li>Phone: ${formData.phoneNumber}</li>
            <li>Email: ${formData.email}</li>
            ${formData.website ? `<li>Website: ${formData.website}</li>` : ''}
          </ul>
          <p><strong>Town:</strong> ${formData.townName}</p>
          <p><strong>Submission Time:</strong> ${new Date(formData.created_at.toDate()).toLocaleString()}</p>
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);
      
      // Update the document to mark it as processed
      await snap.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return null;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  });

export const createCheckoutSession = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const {
      subscriptionId,
      userId,
      adType,
      term,
      includeDesign,
      town,
      amount
    } = req.body;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${adType.charAt(0).toUpperCase() + adType.slice(1)} Ad Space - ${town}`,
              description: `${term} subscription${includeDesign ? ' with design services' : ''}`
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/dashboard?canceled=true`,
      metadata: {
        subscriptionId,
        userId,
        adType,
        term,
        includeDesign: String(includeDesign),
        town
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

export const handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig!,
      webhookSecret!
    );

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { subscriptionId, userId, term } = session.metadata!;

      // Calculate subscription end date
      const months = term === 'monthly' ? 1 :
                    term === '3months' ? 3 :
                    term === '6months' ? 6 : 12;
      
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + months);

      // Update subscription status
      await admin.firestore().collection('subscriptions').doc(subscriptionId).update({
        status: 'active',
        end_date: admin.firestore.Timestamp.fromDate(endDate),
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      });

      // Create invoice
      await admin.firestore().collection('invoices').add({
        subscription_id: subscriptionId,
        profile_id: userId,
        amount: session.amount_total! / 100, // Convert from cents
        status: 'paid',
        payment_method: 'card',
        payment_date: admin.firestore.FieldValue.serverTimestamp(),
        due_date: admin.firestore.FieldValue.serverTimestamp(),
        invoice_number: `INV-${Date.now()}`,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send('Webhook Error');
  }
});