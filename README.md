# AYHS 2.0 - AI-Powered Healthcare Assistant

<div align="center">

**A comprehensive web-based healthcare management platform powered by AI and Machine Learning**

> 💡 **Note**: Add your project logo here by replacing the placeholder in `/public/` directory

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)](https://www.mongodb.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow.js-ML-FF6F00?logo=tensorflow)](https://www.tensorflow.org/js)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [API Documentation](#api-documentation)
- [ML Model Integration](#ml-model-integration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🌟 Overview

**AYHS (AI Your Health Support) 2.0** is a comprehensive web-based healthcare management platform that combines modern web technologies with artificial intelligence to help users manage their health effectively. The application provides tools for medication management, doctor search, meal planning, AI-powered health assistance, medication adherence prediction, and smart reminders.

### What Makes AYHS Unique?

- **AI-Powered Medicine Search**: Multi-pharmacy price comparison with AI-generated purchase links
- **ML-Based Adherence Prediction**: Machine learning model predicts medication non-adherence risk
- **Smart Reminder System**: Context-aware reminders for medications, meals, and appointments
- **AI Health Assistant**: Interactive chatbot powered by Google's Gemini AI and OpenAI
- **Personalized Meal Planning**: AI-generated meal suggestions based on health conditions
- **Community Support**: Forum for users to connect and share experiences
- **Doctor Discovery**: Search and connect with healthcare providers

---

## ✨ Key Features

### 🔍 **Medicine Search & Price Comparison**
- Search medicines across multiple Indian pharmacies (Netmeds, PharmEasy, 1mg)
- Real-time price comparison with web scraping
- AI-powered purchase link generation
- Detailed medicine information using Gemini AI
- Generic alternatives suggestions

### 🤖 **AI Health Assistant**
- Interactive chatbot for health-related queries
- Powered by Google Gemini AI and OpenAI APIs
- Context-aware responses for medicine questions
- Trusted pharmacy recommendations
- Health consultation reminders

### 📊 **ML-Powered Adherence Prediction**
- Machine learning model predicts medication non-adherence risk
- Analyzes 20+ patient factors including:
  - Demographics (age, gender, education, income)
  - Medical complexity (conditions, medications)
  - Behavioral patterns (app usage, reminder response)
  - Sentiment analysis from patient notes
- Real-time risk assessment (Low, Medium, High, Critical)
- Personalized recommendations based on risk factors
- Confidence scores for predictions

### ⏰ **Smart Reminder System**
- Context-aware reminders for:
  - Medications (with dosage information)
  - Meals (for dietary management)
  - Doctor appointments (with location)
  - Custom health-related reminders
- Flexible scheduling:
  - One-time reminders
  - Recurring (hourly, daily, weekly, monthly)
- Browser push notifications
- Snooze and completion tracking
- Auto-recurring for completed reminders

### 🍽️ **Meal Planning**
- Personalized meal suggestions
- Dietary recommendations based on health conditions
- Nutritional information
- Recipe suggestions

### 👨‍⚕️ **Doctor Search**
- Find doctors by specialty
- Location-based search
- Doctor profiles and contact information

### 👥 **Community Forum**
- Connect with other users
- Share experiences and advice
- Health discussions and support

### 🔐 **User Authentication & Security**
- Secure user registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected API routes
- Environment-based API key management

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.2.0 with Vite
- **Routing**: React Router DOM 6.22.0
- **Styling**: 
  - Tailwind CSS 4.0.9
  - CSS Modules
  - GSAP for animations
  - Framer Motion
- **UI Components**: 
  - Material-UI (@mui/material)
  - Radix UI (Dialog, Dropdown, Toast, Tabs)
  - Lucide React Icons
- **State Management**: React Query
- **AI/ML**: TensorFlow.js 4.22.0
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Web Scraping**: Puppeteer
- **Environment Variables**: dotenv
- **CORS**: CORS middleware

### AI & Machine Learning
- **Google Gemini AI**: Generative AI for chat and medicine information
- **OpenAI API**: Alternative AI chatbot
- **TensorFlow.js**: Browser-based ML
- **Python ML Service**:
  - scikit-learn for ML models
  - pandas for data processing
  - numpy for numerical operations
  - joblib for model persistence

### External APIs
- **Google Custom Search API**: Multi-pharmacy medicine search
- **Gemini API**: AI-powered responses and recommendations
- **OpenAI API**: Alternative chatbot functionality

### Development Tools
- **Build Tool**: Vite 5.0.8
- **Linter**: ESLint
- **Package Manager**: npm

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐      │
│  │ Medicine│  │   AI    │  │Reminders│  │   Meal   │      │
│  │ Search  │  │  Chat   │  │  System │  │  Planner │      │
│  └────┬────┘  └────┬────┘  └────┬────┘  └─────┬────┘      │
│       │            │            │              │            │
│       └────────────┴────────────┴──────────────┘            │
│                         │                                    │
│                    Axios HTTP                                │
└─────────────────────────┼───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                   Backend (Express.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐    │
│  │     API      │  │     Auth     │  │   Scraping    │    │
│  │   Routes     │  │  (JWT)       │  │  (Puppeteer)  │    │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘    │
│         │                  │                   │             │
│         └──────────────────┴───────────────────┘             │
│                         │                                    │
└─────────────────────────┼───────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────┴────────┐ ┌─────┴──────┐ ┌────────┴────────┐
│    MongoDB     │ │  Gemini AI │ │   ML Service    │
│   Database     │ │   OpenAI   │ │    (Python)     │
└────────────────┘ └────────────┘ └─────────────────┘
```

### Data Flow

1. **User Interaction** → React Components
2. **API Requests** → Express.js Backend
3. **Authentication** → JWT Verification
4. **Data Operations** → MongoDB via Mongoose
5. **AI Processing** → Gemini/OpenAI APIs
6. **ML Predictions** → Python Service (scikit-learn)
7. **Web Scraping** → Puppeteer for pharmacy data
8. **Response** → JSON back to Frontend

---

## 📦 Prerequisites

Before installing AYHS 2.0, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Python** (v3.8 or higher) - Required for ML service - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)

### Optional Requirements
- **Google Cloud Account** - For Gemini API access
- **OpenAI Account** - For OpenAI API access
- **Google Custom Search API** - For medicine search functionality

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Demiserular/AYHS-2.0.git
cd AYHS-2.0
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Install Python ML Service Dependencies

```bash
cd ml_service
pip install -r requirements.txt
cd ..
```

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the **backend** directory based on the example:

```bash
cd backend
# Copy the example file from root directory
cp ../.env.example .env
# Or create manually and add the required environment variables
```

Edit the `.env` file with your configuration:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/ayhs

# Google Custom Search API (for medicine search)
GOOGLE_API_KEY=your_google_api_key_here
SEARCH_ENGINE_ID=your_search_engine_id_here

# AI APIs
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret (generate a secure random string)
JWT_SECRET=your_secure_jwt_secret_here

# Node Environment
NODE_ENV=development
```

### 2. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# On Linux/Mac:
sudo systemctl start mongodb
# Or
mongod

# On Windows:
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 3. API Keys Setup

#### Google Custom Search API
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "Custom Search API"
4. Create credentials (API Key)
5. Create Custom Search Engine at [Programmable Search Engine](https://programmablesearchengine.google.com/)
6. Copy API Key and Search Engine ID to `.env`

#### Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Copy to `.env` as `GEMINI_API_KEY`

#### OpenAI API (Optional)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create API key
3. Copy to `.env` as `OPENAI_API_KEY`

---

## 🎮 Running the Application

### Development Mode

You need to run three services concurrently:

#### Terminal 1: Start MongoDB (if not running as service)
```bash
mongod
```

#### Terminal 2: Start Backend Server
```bash
cd backend
npm start
```
Backend runs on: `http://localhost:3001`

#### Terminal 3: Start Frontend Development Server
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173` (default Vite port)

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

> **Note**: Vite uses port 5173 by default. If this port is already in use, Vite will automatically use the next available port (5174, 5175, etc.). Check your terminal output for the actual port.

### Default Ports
- **Frontend**: 5173 (default Vite port)
- **Backend**: 3001
- **MongoDB**: 27017

---

## 📁 Project Structure

```
AYHS-2.0/
├── backend/                    # Backend server
│   ├── server.js              # Main Express server
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (create this)
│
├── src/                       # Frontend source code
│   ├── components/            # React components
│   │   ├── home/             # Home page components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   ├── medicine/         # Medicine search components
│   │   └── reminders/        # Reminder components
│   │
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx      # Landing page
│   │   ├── LoginPage.jsx     # User login
│   │   ├── RegisterPage.jsx  # User registration
│   │   ├── MedicinesPage.jsx # Medicine search
│   │   ├── AIChatPage.jsx    # AI chatbot
│   │   ├── RemindersPage.jsx # Reminder management
│   │   ├── MealPlanPage.jsx  # Meal planning
│   │   ├── DoctorListPage.jsx # Doctor search
│   │   ├── CommunityPage.jsx # Community forum
│   │   ├── ProfilePage.jsx   # User profile
│   │   └── AdherencePredictorPage.jsx # ML predictions
│   │
│   ├── services/             # API service functions
│   ├── config/               # Configuration files
│   ├── assets/               # Static assets
│   ├── App.jsx               # Main App component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
│
├── ml_service/               # Machine Learning service
│   ├── predict.py           # Prediction script
│   ├── generate_synthetic_data.py # Data generation
│   ├── requirements.txt     # Python dependencies
│   └── README.md            # ML service documentation
│
├── models/                   # ML models
│   ├── best_adherence_model.pkl # Trained model
│   └── model_metadata.json  # Model information
│
├── data/                     # Data files
│   ├── patients.csv         # Patient data
│   ├── medications.csv      # Medication data
│   ├── adherence_records.csv # Adherence data
│   └── data_dictionary.md   # Data documentation
│
├── public/                   # Public static files
├── notebooks/               # Jupyter notebooks (ML development)
├── .env.example             # Example environment variables
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── eslint.config.js         # ESLint configuration
├── README.md                # This file
├── ProjectReport.md         # Detailed project report
├── GEMINI_INTEGRATION.md    # Gemini AI integration guide
├── ML_TESTING_GUIDE.md      # ML testing guide
└── REMINDER_FEATURE.md      # Reminder feature documentation
```

---

## 🎯 Core Features

### 1. Medicine Search & Price Comparison

**Location**: `/medicines`

**Features**:
- Search across Netmeds, PharmEasy, and 1mg
- Real-time price scraping with Puppeteer
- Sorted results (lowest to highest price)
- AI-generated purchase links
- Detailed medicine information

**API Endpoints**:
```javascript
GET  /api/search-medicine?query={medicineName}
GET  /gemini-medicine-links?medicineName={medicineName}
POST /api/medicine-info
```

**Usage**:
1. Navigate to Medicines page
2. Enter medicine name
3. Click "Search Medicine" for price comparison
4. Click "AI Links" for purchase recommendations
5. Click "Medicine Info" for detailed information

### 2. AI Health Assistant

**Location**: `/ai-chat`

**Features**:
- Interactive chat interface
- Health and medicine queries
- Context-aware responses
- Pharmacy recommendations
- Professional consultation reminders

**API Endpoint**:
```javascript
POST /api/chat
Body: { 
  "message": "Tell me about paracetamol",
  "context": "medicine" // optional
}
```

**Usage**:
1. Navigate to AI Chat page
2. Type health-related questions
3. Get instant AI-powered responses
4. Follow up with additional questions

### 3. Medication Adherence Prediction

**Location**: `/predict`

**Features**:
- ML-powered risk assessment
- 20+ factor analysis
- Real-time predictions
- Risk level classification (Low/Medium/High/Critical)
- Personalized recommendations
- Confidence scores

**API Endpoint**:
```javascript
POST /api/predict-adherence
Body: {
  "age": 55,
  "gender": "Male",
  "education_level": "High School",
  "income_level": "Low",
  "num_conditions": 3,
  "num_medications": 5,
  "adherence_score": 45,
  // ... more fields
}
```

**Risk Levels**:
- **Low**: < 30% risk (Green)
- **Medium**: 30-60% risk (Yellow)
- **High**: 60-80% risk (Orange)
- **Critical**: > 80% risk (Red)

**Usage**:
1. Navigate to Adherence Predictor page
2. Fill in patient information form
3. Click "Predict Adherence Risk"
4. View risk assessment and recommendations

### 4. Smart Reminders

**Location**: `/reminders`

**Features**:
- Medicine reminders (with dosage)
- Meal reminders (dietary management)
- Appointment reminders (with location)
- Custom health reminders
- Flexible scheduling (one-time, hourly, daily, weekly, monthly)
- Browser push notifications
- Snooze and completion tracking
- Auto-recurring reminders

**API Endpoints**:
```javascript
POST   /api/reminders              // Create reminder
GET    /api/reminders              // Get all reminders
GET    /api/reminders/:id          // Get specific reminder
PUT    /api/reminders/:id          // Update reminder
DELETE /api/reminders/:id          // Delete reminder
PATCH  /api/reminders/:id/complete // Mark complete
PATCH  /api/reminders/:id/snooze   // Snooze reminder
```

**Reminder Types**:
- 💊 **Medicine**: Track medication schedule
- 🍽️ **Meal**: Maintain eating schedule
- 👨‍⚕️ **Appointment**: Never miss doctor visits
- 📝 **Custom**: Any health-related reminder

**Usage**:
1. Navigate to Reminders page
2. Click "Create Reminder"
3. Select reminder type
4. Fill in details (title, time, frequency)
5. Add context (medicine name, dosage, etc.)
6. Save reminder
7. Receive browser notifications when due

### 5. Meal Planning

**Location**: `/meals`

**Features**:
- Personalized meal suggestions
- Dietary recommendations
- Nutritional information
- Recipe ideas

**Usage**:
1. Navigate to Meal Plan page
2. View suggested meals
3. Get nutritional information
4. Save favorite meal plans

### 6. Doctor Search

**Location**: `/doctors`

**Features**:
- Search by specialty
- Location-based results
- Doctor profiles
- Contact information

**Usage**:
1. Navigate to Doctors page
2. Enter specialty or location
3. Browse doctor profiles
4. View contact information

### 7. Community Forum

**Location**: `/community`

**Features**:
- User discussions
- Health topic threads
- Share experiences
- Connect with others

**Usage**:
1. Navigate to Community page
2. Browse discussions
3. Create new topics
4. Reply to threads

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Medicine Endpoints

#### Search Medicine
```http
GET /api/search-medicine?query=paracetamol

Response:
{
  "results": [
    {
      "pharmacy": "Netmeds",
      "name": "Paracetamol 500mg",
      "price": "₹45",
      "link": "https://..."
    }
  ]
}
```

#### Get Medicine Info (AI)
```http
POST /api/medicine-info
Content-Type: application/json

{
  "medicineName": "paracetamol"
}

Response:
{
  "info": "Detailed AI-generated information..."
}
```

#### Get AI Purchase Links
```http
GET /gemini-medicine-links?medicineName=paracetamol

Response:
{
  "links": [
    {
      "pharmacy": "Netmeds",
      "url": "https://...",
      "description": "..."
    }
  ]
}
```

### AI Chat Endpoint

```http
POST /api/chat
Content-Type: application/json
Authorization: Bearer {token}

{
  "message": "What is paracetamol used for?",
  "context": "medicine"
}

Response:
{
  "response": "Paracetamol is commonly used for..."
}
```

### Adherence Prediction Endpoint

```http
POST /api/predict-adherence
Content-Type: application/json
Authorization: Bearer {token}

{
  "age": 55,
  "gender": "Male",
  "education_level": "High School",
  "income_level": "Low",
  "living_situation": "Alone",
  "has_insurance": false,
  "num_conditions": 3,
  "num_medications": 5,
  "medication_complexity": "High",
  "average_monthly_cost": 450,
  "adherence_score": 45,
  "missed_doses_last_month": 8,
  "using_reminder_app": false,
  "refill_on_time": false,
  "patient_notes": "Patient struggles with cost",
  "sentiment_polarity": -0.2,
  "sentiment_subjectivity": 0.6
}

Response:
{
  "prediction": 1,
  "is_non_adherent": true,
  "risk_probability": 0.85,
  "adherence_probability": 0.15,
  "risk_level": "Critical",
  "confidence": 0.85
}
```

### Reminder Endpoints

#### Create Reminder
```http
POST /api/reminders
Content-Type: application/json
Authorization: Bearer {token}

{
  "type": "medicine",
  "title": "Take Vitamin D",
  "description": "Daily vitamin supplement",
  "reminderTime": "2024-01-15T09:00:00",
  "frequency": "daily",
  "context": {
    "medicineName": "Vitamin D",
    "dosage": "1 tablet"
  },
  "notes": "Take with breakfast"
}
```

#### Get All Reminders
```http
GET /api/reminders?status=active&type=medicine
Authorization: Bearer {token}
```

#### Complete Reminder
```http
PATCH /api/reminders/:id/complete
Authorization: Bearer {token}
```

#### Snooze Reminder
```http
PATCH /api/reminders/:id/snooze
Authorization: Bearer {token}

Body:
{
  "minutes": 15
}
```

---

## 🤖 ML Model Integration

### Overview

AYHS 2.0 includes a machine learning service for predicting medication non-adherence risk.

### Model Details

- **Type**: Binary Classification (Random Forest)
- **Framework**: scikit-learn
- **Features**: 20+ patient and behavioral factors
- **Performance**: ~85% accuracy on test data
- **Output**: Risk probability (0-1) and risk level classification

### Model Features

The model analyzes:

**Demographics**:
- Age, gender, education level
- Income level, living situation
- Insurance status

**Medical Complexity**:
- Number of chronic conditions
- Number of medications
- Medication complexity level
- Average monthly medication cost

**Behavioral Patterns**:
- Adherence score (0-100%)
- Missed doses last month
- Refill punctuality
- Reminder app usage
- App engagement metrics

**Sentiment Analysis**:
- Patient notes sentiment (polarity)
- Subjectivity scores

### Running ML Predictions

#### Via Web Interface
1. Navigate to `/predict`
2. Fill patient information form
3. Submit for prediction
4. View results with recommendations

#### Via API
```python
import requests

url = "http://localhost:3001/api/predict-adherence"
headers = {"Authorization": "Bearer YOUR_TOKEN"}
data = {
    "age": 55,
    "gender": "Male",
    # ... other fields
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

#### Via Python Script
```bash
cd ml_service
python predict.py
```

### Model Training

The model was trained on synthetic patient data. To retrain:

1. Generate new training data:
```bash
cd ml_service
python generate_synthetic_data.py
```

2. Open training notebook:
```bash
jupyter notebook notebooks/medication_adherence_model.ipynb
```

3. Run all cells to train new model

4. Model saved to: `models/best_adherence_model.pkl`

### Model Metrics

- **Accuracy**: ~85%
- **Precision**: ~82%
- **Recall**: ~88%
- **F1-Score**: ~85%
- **AUC-ROC**: ~0.89

See `ML_TESTING_GUIDE.md` for detailed testing instructions.

---

## 🤝 Contributing

We welcome contributions to AYHS 2.0! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** (replace `YOUR_USERNAME` with your GitHub username):
   ```bash
   git clone https://github.com/YOUR_USERNAME/AYHS-2.0.git
   cd AYHS-2.0
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes**
5. **Test thoroughly**
6. **Commit with clear messages**:
   ```bash
   git commit -m "Add: Brief description of changes"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request**

### Code Style

- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Use ESLint for JavaScript code

### Testing

- Test all new features locally
- Ensure existing features still work
- Test on multiple browsers if UI changes
- Verify API endpoints with Postman or similar

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Additional test coverage
- ♿ Accessibility improvements
- 🌐 Internationalization (i18n)
- 📱 Mobile responsiveness

### Reporting Issues

Found a bug? Please [open an issue](https://github.com/Demiserular/AYHS-2.0/issues) with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

---

## 📄 License

This project is part of an academic/research initiative. Please contact the repository owner for licensing information.

---

## 👤 Contact

**Project Maintainer**: Demiserular

**Email**: Demiserular@gmail.com

**Repository**: [https://github.com/Demiserular/AYHS-2.0](https://github.com/Demiserular/AYHS-2.0)

---

## 📚 Additional Documentation

- [Project Report](./ProjectReport.md) - Comprehensive project analysis
- [Gemini Integration Guide](./GEMINI_INTEGRATION.md) - AI integration details
- [ML Testing Guide](./ML_TESTING_GUIDE.md) - Machine learning testing
- [Reminder Feature](./REMINDER_FEATURE.md) - Reminder system documentation
- [Data Dictionary](./data/data_dictionary.md) - ML dataset documentation

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful generative AI capabilities
- **OpenAI** - For GPT model integration
- **TensorFlow.js** - For browser-based machine learning
- **MongoDB** - For flexible data storage
- **Puppeteer** - For web scraping capabilities
- **React & Vite** - For modern web development
- **Open Source Community** - For amazing libraries and tools

---

## 🔮 Future Enhancements

### Planned Features
- 📱 Mobile application (React Native)
- 🔐 Two-factor authentication
- 🌍 Multi-language support
- 📊 Advanced analytics dashboard
- 🎥 Telemedicine integration
- 💬 Real-time chat with WebSockets
- 📧 Email/SMS notifications
- 🗺️ Geolocation-based features
- 🔗 Health device integration (Fitbit, Apple Health)
- 📈 Progress tracking and health metrics
- 🤝 Family/caregiver access
- 🧬 Genetic data integration
- 🎯 Gamification and rewards
- 🔊 Voice assistant integration
- 📖 Health education resources

---

## ⚠️ Disclaimer

**AYHS 2.0 is a healthcare management tool and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.**

---

<div align="center">

**Made with ❤️ for better healthcare management**

⭐ Star this repository if you find it helpful!

[Report Bug](https://github.com/Demiserular/AYHS-2.0/issues) · [Request Feature](https://github.com/Demiserular/AYHS-2.0/issues) · [Documentation](./ProjectReport.md)

</div>
