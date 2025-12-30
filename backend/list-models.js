import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const apiKey = process.env.GEMINI_API_KEY;

console.log('Checking API Key and Available Models...');
console.log('API Key (first 10 chars):', apiKey?.substring(0, 10));

async function listAvailableModels() {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    console.log('\n✅ API Key is VALID!\n');
    console.log('Available Models:');
    console.log('================\n');
    
    if (response.data.models && response.data.models.length > 0) {
      response.data.models.forEach(model => {
        console.log(`Model: ${model.name}`);
        console.log(`  Display Name: ${model.displayName}`);
        console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
        console.log('');
      });
      
      // Find models that support generateContent
      const contentGenModels = response.data.models.filter(m => 
        m.supportedGenerationMethods?.includes('generateContent')
      );
      
      console.log('\n📝 Models supporting generateContent:');
      contentGenModels.forEach(m => console.log(`  - ${m.name}`));
      
    } else {
      console.log('No models found for this API key.');
    }
  } catch (error) {
    console.error('\n❌ Error listing models:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Message: ${error.response.data?.error?.message || error.response.statusText}`);
    } else {
      console.error(error.message);
    }
    console.log('\n⚠️  Your API key may be invalid or does not have access to Gemini API.');
    console.log('🔗 Generate a new key at: https://aistudio.google.com/app/apikey');
  }
}

listAvailableModels();
