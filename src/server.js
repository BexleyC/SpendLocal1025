import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Configure CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON for routes
app.use(express.json());

// Email notification endpoint
app.post('/api/notify-purchase', async (req, res) => {
  try {
    const { slot, user } = req.body;

    if (!slot || !user) {
      return res.status(400).json({ error: 'Missing required information' });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Ad Space Inquiry - ${slot.price === 900 ? 'Premium' : 'Standard'} Space`,
      html: `
        <h2>New Ad Space Inquiry</h2>
        <p><strong>Company:</strong> ${user.company_name}</p>
        <p><strong>Contact Email:</strong> ${user.email}</p>
        <p><strong>Phone Number:</strong> ${user.phone_number}</p>
        <h3>Ad Space Details</h3>
        <p><strong>Type:</strong> ${slot.price === 900 ? 'Premium' : 'Standard'} Space</p>
        <p><strong>Price:</strong> $${slot.price}</p>
        <p><strong>Dimensions:</strong> ${slot.dimensions}</p>
        <p><strong>Position:</strong> ${slot.position}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Email notification error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Create Vite dev server
let vite;
async function createServer() {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const PORT = process.env.PORT || 5173;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

createServer();