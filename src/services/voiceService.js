// Voice recognition service using Web Speech API
class VoiceService {
  constructor() {
    this.recognition = null;
    this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    this.isListening = false;
    this.setupRecognition();
  }

  setupRecognition() {
    if (!this.isSupported) {
      console.warn('Speech recognition is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    // Configure recognition
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-IN'; // Set to Indian English
  }

  startListening(onResult, onError) {
    if (!this.isSupported) {
      onError('Speech recognition is not supported in your browser');
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.isListening = true;

    this.recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase();
      
      // Process the command
      const preferences = this.extractPreferences(command);
      onResult(preferences);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onError(`Error occurred in recognition: ${event.error}`);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError('Error starting voice recognition');
      this.isListening = false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  extractPreferences(command) {
    const preferences = {
      dietType: null,
      cuisine: null,
      healthPreferences: [],
      budget: null,
    };

    // Extract diet type
    if (command.includes('vegetarian')) preferences.dietType = 'veg';
    if (command.includes('non vegetarian') || command.includes('non-vegetarian')) preferences.dietType = 'non-veg';
    if (command.includes('jain')) preferences.dietType = 'jain';

    // Extract cuisine
    const cuisines = ['punjabi', 'south indian', 'gujarati', 'bengali', 'maharashtrian'];
    for (const cuisine of cuisines) {
      if (command.includes(cuisine)) {
        preferences.cuisine = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
        break;
      }
    }

    // Extract health preferences
    if (command.includes('high protein')) preferences.healthPreferences.push('high-protein');
    if (command.includes('diabetes') || command.includes('diabetic')) preferences.healthPreferences.push('diabetes-friendly');
    if (command.includes('weight loss')) preferences.healthPreferences.push('weight-loss');

    // Extract budget (if mentioned)
    const budgetMatch = command.match(/(\d+)\s*rupees/);
    if (budgetMatch) {
      preferences.budget = parseInt(budgetMatch[1]);
    }

    return preferences;
  }
}

export default new VoiceService(); 