# Gemini AI Integration Guide

## Overview
Your AYHS application now has enhanced AI capabilities powered by Google's Gemini AI with your API key: `AIzaSyDxExny_dJhOD68FKugoRE_5_rDFP89gXw`

## Features Integrated

### 1. AI Chatbot (AIChatPage)
- **Endpoint**: `POST /api/chat`
- **Features**: 
  - General health and medicine queries
  - Context-aware responses for medicine-related questions
  - Suggests trusted pharmacy websites
  - Reminds users to consult healthcare professionals

### 2. Enhanced Medicine Search
- **Endpoint**: `POST /api/medicine-info`
- **Features**:
  - Detailed medicine information from Gemini AI
  - Price comparison across multiple pharmacies
  - Usage instructions and precautions
  - Generic alternatives suggestions

### 3. AI-Generated Pharmacy Links
- **Endpoint**: `GET /gemini-medicine-links`
- **Features**:
  - AI-generated links to trusted pharmacies
  - Specific to Indian pharmacy websites
  - Quick access to medicine purchasing options

## How to Use

### Starting the Application
1. **Backend**: 
   ```bash
   cd backend
   npm start
   ```

2. **Frontend**:
   ```bash
   npm run dev
   ```

### Using the AI Chatbot
1. Navigate to the AI Chat page
2. Ask questions like:
   - "Tell me about paracetamol"
   - "What are common cold medicines?"
   - "How to find medicine prices?"
   - "What's the difference between generic and branded medicines?"

### Using Enhanced Medicine Search
1. Go to the Medicines page
2. Enter a medicine name
3. Click "Medicine Info" for detailed AI-powered information
4. Click "AI Links" for pharmacy recommendations
5. Use regular search for price comparison

## API Endpoints

### Chat Endpoint
```javascript
POST /api/chat
{
  "message": "Tell me about aspirin",
  "context": "medicine" // optional
}
```

### Medicine Info Endpoint
```javascript
POST /api/medicine-info
{
  "medicineName": "paracetamol"
}
```

### Pharmacy Links Endpoint
```javascript
GET /gemini-medicine-links?medicineName=aspirin
```

## Environment Variables
Make sure your `.env` file contains:
```
GEMINI_API_KEY=AIzaSyDxExny_dJhOD68FKugoRE_5_rDFP89gXw
GOOGLE_API_KEY=your_google_search_api_key
SEARCH_ENGINE_ID=your_search_engine_id
```

## Security Notes
- API keys are stored in environment variables
- Always validate user input
- Rate limiting should be implemented for production
- Consider implementing user authentication for API access

## Troubleshooting
- If Gemini API fails, check your API key and quota
- Ensure all dependencies are installed: `npm install`
- Check console logs for detailed error messages
- Verify internet connection for API calls