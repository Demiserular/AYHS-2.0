// Sample meal database
const mealDatabase = {
  veg: {
    Punjabi: {
      regular: {
        main: ['Chole Bhature', 'Paneer Butter Masala', 'Dal Makhani', 'Rajma Chawal'],
        sides: ['Jeera Rice', 'Tandoori Roti', 'Laccha Paratha'],
        accompaniments: ['Raita', 'Mixed Pickle', 'Onion Salad'],
      },
      'high-protein': {
        main: ['Soya Chaap Masala', 'Paneer Tikka', 'Mixed Dal Tadka', 'Quinoa Pulao'],
        sides: ['Multigrain Roti', 'Sprouts Salad'],
        accompaniments: ['Mint Chutney', 'Low-fat Yogurt'],
      },
      'diabetes-friendly': {
        main: ['Mixed Vegetable Curry', 'Moong Dal', 'Baked Paneer'],
        sides: ['Brown Rice', 'Jowar Roti', 'Cucumber Salad'],
        accompaniments: ['Buttermilk', 'Green Chutney'],
      },
    },
    'South Indian': {
      regular: {
        main: ['Masala Dosa', 'Sambar', 'Vegetable Uttapam', 'Idli'],
        sides: ['Coconut Chutney', 'Podi'],
        accompaniments: ['Filter Coffee', 'Mixed Vegetable Raita'],
      },
      'high-protein': {
        main: ['Pesarattu', 'Quinoa Dosa', 'Mixed Lentil Adai'],
        sides: ['Sprouts Usili', 'Peanut Chutney'],
        accompaniments: ['Tomato Chutney', 'Buttermilk'],
      },
    },
  },
  'non-veg': {
    Punjabi: {
      regular: {
        main: ['Butter Chicken', 'Chicken Tikka Masala', 'Mutton Curry'],
        sides: ['Naan', 'Jeera Rice'],
        accompaniments: ['Raita', 'Onion Salad'],
      },
      'high-protein': {
        main: ['Grilled Chicken Tikka', 'Egg Curry', 'Fish Tikka'],
        sides: ['Multigrain Roti', 'Chicken Seekh Kebab'],
        accompaniments: ['Mint Chutney', 'Low-fat Yogurt'],
      },
    },
  },
};

// Helper function to check if a meal meets dietary restrictions
const meetsRestrictions = (meal, preferences) => {
  // Implementation of dietary restriction checks
  return true; // Placeholder
};

// Helper function to calculate meal nutrition
const calculateNutrition = (meal) => {
  // Implementation of nutrition calculation
  return {
    calories: 800, // Placeholder values
    protein: 25,
    carbs: 100,
    fats: 30,
  };
};

export const generateMealPlan = (preferences) => {
  const {
    dietType,
    cuisine,
    healthPreferences,
    excludeIngredients = [],
  } = preferences;

  try {
    // Get base meals for diet type and cuisine
    const baseMeals = mealDatabase[dietType]?.[cuisine];
    if (!baseMeals) {
      throw new Error('No meals found for selected preferences');
    }

    // Select appropriate meal category based on health preferences
    const mealCategory = healthPreferences.includes('high-protein') 
      ? baseMeals['high-protein'] 
      : healthPreferences.includes('diabetes-friendly')
      ? baseMeals['diabetes-friendly']
      : baseMeals.regular;

    // Generate thali components
    const thali = {
      main: mealCategory.main[Math.floor(Math.random() * mealCategory.main.length)],
      sides: mealCategory.sides[Math.floor(Math.random() * mealCategory.sides.length)],
      accompaniments: mealCategory.accompaniments[Math.floor(Math.random() * mealCategory.accompaniments.length)],
    };

    // Calculate nutrition
    const nutrition = calculateNutrition(thali);

    return {
      success: true,
      mealPlan: {
        thali,
        nutrition,
        tips: [
          'Eat slowly and mindfully',
          'Drink water before meals',
          'Include all six tastes in your meal',
        ],
        substitutes: {
          'high-calorie': 'Replace rice with quinoa or cauliflower rice',
          'low-protein': 'Add sprouts or tofu to increase protein content',
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Function to get healthy alternatives for common foods
export const getHealthyAlternatives = (foodItem) => {
  const alternatives = {
    'Pani Puri': {
      healthier: 'Ragi Pani Puri',
      benefits: ['High in calcium', 'Low glycemic index', 'Rich in fiber'],
    },
    'White Rice': {
      healthier: 'Brown Rice or Quinoa',
      benefits: ['High in fiber', 'Better blood sugar control', 'More nutrients'],
    },
    'Maggi': {
      healthier: 'Oats Masala or Ragi Noodles',
      benefits: ['High in protein', 'Complex carbohydrates', 'Low sodium'],
    },
  };

  return alternatives[foodItem] || {
    healthier: 'No specific alternative found',
    benefits: ['Consider whole grain options', 'Add more vegetables'],
  };
};

// Function to get seasonal recommendations
export const getSeasonalRecommendations = (season, region) => {
  const seasonalFoods = {
    Summer: {
      fruits: ['Mango', 'Watermelon', 'Muskmelon'],
      vegetables: ['Bottle Gourd', 'Cucumber', 'Ridge Gourd'],
      drinks: ['Coconut Water', 'Buttermilk', 'Lime Water'],
    },
    Winter: {
      fruits: ['Orange', 'Guava', 'Apple'],
      vegetables: ['Carrot', 'Spinach', 'Mustard Greens'],
      drinks: ['Turmeric Milk', 'Herbal Tea', 'Kanji'],
    },
    Monsoon: {
      fruits: ['Pomegranate', 'Pear', 'Jamun'],
      vegetables: ['Bitter Gourd', 'Tinda', 'Cluster Beans'],
      drinks: ['Ginger Tea', 'Tulsi Kadha', 'Masala Chai'],
    },
  };

  return seasonalFoods[season] || seasonalFoods.Summer;
}; 