import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import axios from 'axios';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '../.env' });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const JWT_SECRET = process.env.JWT_SECRET || 'nextxisxyourxbestxfriend';

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayhs';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Update User model to include password
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// JWT middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper to extract price from pharmacy pages
async function extractPriceFromPage(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  let price = null;
  try {
    if (url.includes('netmeds.com')) {
      price = await page.$eval('.final-price', el => el.innerText.replace(/[^\d.]/g, ''));
    } else if (url.includes('pharmeasy.in')) {
      price = await page.$eval('[data-testid="product-price"]', el => el.innerText.replace(/[^\d.]/g, ''));
    } else if (url.includes('1mg.com')) {
      price = await page.$eval('div[class*="Price__value"]', el => el.innerText.replace(/[^\d.]/g, ''));
    }
  } catch (e) {
    price = null;
  }
  await browser.close();
  return price;
}

app.get('/search-medicine', async (req, res) => {
  const { medicineName } = req.query;
  try {
    // Google Custom Search API
    const { data } = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: `${medicineName} site:netmeds.com OR site:pharmeasy.in OR site:1mg.com`,
        num: 5
      }
    });
    const items = data.items || [];
    const results = [];
    for (const item of items) {
      const url = item.link;
      let website = '';
      if (url.includes('netmeds.com')) website = 'Netmeds';
      else if (url.includes('pharmeasy.in')) website = 'PharmEasy';
      else if (url.includes('1mg.com')) website = '1mg';
      else continue;
      const price = await extractPriceFromPage(url);
      results.push({
        title: item.title,
        price: price ? parseFloat(price) : null,
        website,
        link: url
      });
    }
    // Sort by price (lowest first, nulls last)
    results.sort((a, b) => (a.price === null ? 1 : b.price === null ? -1 : a.price - b.price));
    res.json(results);
  } catch (error) {
    console.error('Error searching medicine:', error);
    res.status(500).json({ error: 'Failed to search for medicine' });
  }
});

app.get('/gemini-medicine-links', async (req, res) => {
  const { medicineName } = req.query;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Give me the best links to buy ${medicineName} online in India from trusted pharmacies like Netmeds, PharmEasy, 1mg, Apollo Pharmacy. List the direct links only.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ linksText: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to get links from Gemini' });
  }
});

app.post('/chatgpt-medicine-links', async (req, res) => {
  const { medicineName } = req.body;
  try {
    const prompt = `List the best links to buy ${medicineName} online in India from trusted pharmacies. List only the links.`;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.2,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    const text = response.data.choices?.[0]?.message?.content || '';
    res.json({ linksText: text });
  } catch (error) {
    console.error('OpenAI API error:', error?.response?.data || error);
    res.status(500).json({ error: 'Failed to get links from ChatGPT' });
  }
});

// Enhanced Gemini Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    let prompt = message;

    // Add context for medicine-related queries
    if (context === 'medicine' || message.toLowerCase().includes('medicine') || message.toLowerCase().includes('drug')) {
      prompt = `You are a helpful medical information assistant. Please provide accurate information about: ${message}. 
      If this is about medicine prices or availability, suggest checking trusted online pharmacies in India like Netmeds, PharmEasy, or 1mg.
      Always remind users to consult healthcare professionals for medical advice.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Gemini Chat API error:', error);
    res.status(500).json({ error: 'Failed to get response from chatbot' });
  }
});

// Enhanced medicine search with Gemini insights
app.post('/api/medicine-info', async (req, res) => {
  const { medicineName } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Get basic medicine information from Gemini
    const infoPrompt = `Provide basic information about the medicine "${medicineName}" including:
    - What it's used for
    - Common dosage
    - Important precautions
    - Generic alternatives if any
    Keep it concise and always mention to consult a doctor.`;

    const result = await model.generateContent(infoPrompt);
    const response = await result.response;
    const medicineInfo = response.text();

    // Get price comparison data
    const { data } = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: `${medicineName} site:netmeds.com OR site:pharmeasy.in OR site:1mg.com`,
        num: 5
      }
    });

    const items = data.items || [];
    const priceResults = [];

    for (const item of items) {
      const url = item.link;
      let website = '';
      if (url.includes('netmeds.com')) website = 'Netmeds';
      else if (url.includes('pharmeasy.in')) website = 'PharmEasy';
      else if (url.includes('1mg.com')) website = '1mg';
      else continue;

      const price = await extractPriceFromPage(url);
      priceResults.push({
        title: item.title,
        price: price ? parseFloat(price) : null,
        website,
        link: url
      });
    }

    priceResults.sort((a, b) => (a.price === null ? 1 : b.price === null ? -1 : a.price - b.price));

    res.json({
      medicineInfo,
      priceComparison: priceResults,
      medicineName
    });
  } catch (error) {
    console.error('Medicine info API error:', error);
    res.status(500).json({ error: 'Failed to get medicine information' });
  }
});

// Reminder Schema
const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['medicine', 'meal', 'appointment', 'custom'],
    default: 'custom'
  },
  title: { type: String, required: true },
  description: { type: String },
  reminderTime: { type: Date, required: true },
  frequency: {
    type: String,
    enum: ['once', 'hourly', 'daily', 'weekly', 'monthly'],
    default: 'once'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'snoozed'],
    default: 'active'
  },
  context: {
    medicineName: String,
    dosage: String,
    mealType: String,
    doctorName: String,
    location: String
  },
  notes: String,
  completedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Reminder API Endpoints

// Create a new reminder
app.post('/api/reminders', authMiddleware, async (req, res) => {
  try {
    const reminderData = {
      ...req.body,
      userId: req.user.userId
    };

    const reminder = new Reminder(reminderData);
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    console.error('Create reminder error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all reminders for the authenticated user
app.get('/api/reminders', authMiddleware, async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = { userId: req.user.userId };

    if (status) filter.status = status;
    if (type) filter.type = type;

    const reminders = await Reminder.find(filter).sort({ reminderTime: 1 });
    res.json(reminders);
  } catch (error) {
    console.error('Get reminders error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get upcoming reminders within specified hours
app.get('/api/reminders/upcoming', authMiddleware, async (req, res) => {
  try {
    const hours = parseInt(req.query.hours) || 24;
    const now = new Date();
    const futureTime = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const reminders = await Reminder.find({
      userId: req.user.userId,
      status: 'active',
      reminderTime: { $gte: now, $lte: futureTime }
    }).sort({ reminderTime: 1 });

    res.json(reminders);
  } catch (error) {
    console.error('Get upcoming reminders error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific reminder
app.get('/api/reminders/:id', authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.json(reminder);
  } catch (error) {
    console.error('Get reminder error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a reminder
app.put('/api/reminders/:id', authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.json(reminder);
  } catch (error) {
    console.error('Update reminder error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a reminder
app.delete('/api/reminders/:id', authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error('Delete reminder error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark reminder as complete
app.patch('/api/reminders/:id/complete', authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    reminder.status = 'completed';
    reminder.completedAt = new Date();
    reminder.updatedAt = new Date();

    // If recurring, create next occurrence
    if (reminder.frequency !== 'once') {
      const nextReminderTime = calculateNextOccurrence(reminder.reminderTime, reminder.frequency);

      if (nextReminderTime) {
        const nextReminder = new Reminder({
          userId: reminder.userId,
          type: reminder.type,
          title: reminder.title,
          description: reminder.description,
          reminderTime: nextReminderTime,
          frequency: reminder.frequency,
          context: reminder.context,
          notes: reminder.notes
        });

        await nextReminder.save();
      }
    }

    await reminder.save();
    res.json(reminder);
  } catch (error) {
    console.error('Complete reminder error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Snooze a reminder
app.patch('/api/reminders/:id/snooze', authMiddleware, async (req, res) => {
  try {
    const { minutes = 15 } = req.body;

    const reminder = await Reminder.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    const newReminderTime = new Date(Date.now() + minutes * 60 * 1000);
    reminder.reminderTime = newReminderTime;
    reminder.status = 'snoozed';
    reminder.updatedAt = new Date();

    await reminder.save();

    // Reset status back to active after a delay
    setTimeout(async () => {
      reminder.status = 'active';
      await reminder.save();
    }, 1000);

    res.json(reminder);
  } catch (error) {
    console.error('Snooze reminder error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to calculate next occurrence
function calculateNextOccurrence(currentTime, frequency) {
  const date = new Date(currentTime);

  switch (frequency) {
    case 'hourly':
      date.setHours(date.getHours() + 1);
      break;
    case 'daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    default:
      return null;
  }

  return date;
}

// ML Prediction endpoint
app.post('/api/predict-adherence', async (req, res) => {
  try {
    const { spawn } = await import('child_process');
    const path = await import('path');
    const { fileURLToPath } = await import('url');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const patientData = req.body;

    // Spawn Python process to run prediction
    const pythonProcess = spawn('python', [
      path.join(__dirname, '..', 'ml_service', 'predict.py'),
      JSON.stringify(patientData)
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
      console.log('Python stdout chunk:', data.toString());
    }); pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python error:', error);
        return res.status(500).json({
          error: 'Prediction failed',
          details: error
        });
      }

      try {
        const prediction = JSON.parse(result);
        console.log('Parsed prediction:', prediction);
        res.json(prediction);
      } catch (e) {
        console.error('JSON parse error:', e);
        console.error('Raw result:', result);
        res.status(500).json({
          error: 'Failed to parse prediction result',
          details: result
        });
      }
    });

  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
}); 