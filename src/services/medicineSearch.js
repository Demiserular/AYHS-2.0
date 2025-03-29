import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyC6RL8IlnqQkhfXTv9VfGC5HQcRBzVgtPE'; // You'll need to get this from Google Cloud Console
const SEARCH_ENGINE_ID = '53a77f332e466495f'; // Custom Search Engine ID


export const searchMedicine = async (medicineName) => {
  try {
    const response = await axios.get(
      'http://localhost:3001/search-medicine',
      {
        params: {
          medicineName
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error searching medicine:', error);
    throw error;
  }
};

// Helper function to extract price from HTML content
const extractPrice = (html, url) => {
  // Different extraction logic for different websites
  if (url.includes('netmeds.com')) {
    // Extract price from Netmeds
    const priceMatch = html.match(/₹\s*(\d+(?:\.\d{2})?)/);
    return priceMatch ? parseFloat(priceMatch[1]) : null;
  }
  else if (url.includes('pharmeasy.in')) {
    // Extract price from PharmEasy
    const priceMatch = html.match(/MRP\s*₹\s*(\d+(?:\.\d{2})?)/);
    return priceMatch ? parseFloat(priceMatch[1]) : null;
  }
  // Add more website-specific extraction logic as needed
  return null;
}; 