import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const apiKey = process.env.GEMINI_API_KEY;

console.log('Testing Gemini API...');
console.log('API Key (first 10 chars):', apiKey?.substring(0, 10));

const genAI = new GoogleGenerativeAI(apiKey);

// Test different model names
const modelsToTest = [
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'models/gemini-pro',
  'models/gemini-1.5-pro',
  'models/gemini-1.5-flash'
];

async function testModel(modelName) {
  try {
    console.log(`\nTesting model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say hello');
    const response = await result.response;
    const text = response.text();
    console.log(`✅ SUCCESS with ${modelName}`);
    console.log(`Response: ${text.substring(0, 50)}...`);
    return true;
  } catch (error) {
    console.log(`❌ FAILED with ${modelName}`);
    console.log(`Error: ${error.message}`);
    return false;
  }
}

async function testAllModels() {
  console.log('\n=== Testing All Models ===\n');
  
  for (const modelName of modelsToTest) {
    const success = await testModel(modelName);
    if (success) {
      console.log(`\n✅✅✅ WORKING MODEL FOUND: ${modelName} ✅✅✅`);
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between tests
  }
}

testAllModels().catch(console.error);
