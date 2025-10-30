import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

// Configure email transporter with retry logic
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'BexleyCohen@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD || 'SquirrelP628!'
    },
    tls: {
      rejectUnauthorized: false
    },
    maxConnections: 5,
    pool: true,
    rateDelta: 1000,
    rateLimit: 5
  });
};

const transporter = createTransporter();

// Configure CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON for routes
app.use(express.json());

// Contact form endpoint with retry logic
app.post('/api/contact', async (req, res) => {
  const maxRetries = 3;
  let currentTry = 0;

  const sendEmail = async () => {
    try {
      const { businessName, industry, phoneNumber, email, website, townName } = req.body;

      const mailOptions = {
        from: process.env.GMAIL_USER || 'BexleyCohen@gmail.com',
        to: 'BexleyCohen@gmail.com',
        subject: `New Ad Space Inquiry - ${townName}`,
        html: `
          <h2>New Ad Space Inquiry from ${townName}</h2>
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Contact Information:</strong></p>
          <ul>
            <li>Phone: ${phoneNumber}</li>
            <li>Email: ${email}</li>
            ${website ? `<li>Website: ${website}</li>` : ''}
          </ul>
          <p><strong>Town:</strong> ${townName}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error(`Email attempt ${currentTry + 1} failed:`, error);
      if (currentTry < maxRetries - 1) {
        currentTry++;
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, currentTry) * 1000));
        return sendEmail();
      }
      throw error;
    }
  };

  try {
    await sendEmail();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('All email attempts failed:', error);
    res.status(500).json({ error: 'Failed to send message' });
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