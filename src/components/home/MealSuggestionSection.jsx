import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MealSuggestionSection = () => {
  const [dietPreference, setDietPreference] = useState('');
  const [showAllMeals, setShowAllMeals] = useState(false);
  const [currentMeals, setCurrentMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Diet-specific meal suggestions with Indian dishes
  const mealSuggestionsByDiet = {
    'vegan': [
      {
        id: 'v1',
        category: 'Vegan Bowls',
        title: 'Masala Chana Bowl',
        description: 'Spiced chickpeas with quinoa, fresh vegetables and mint chutney',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'v2',
        category: 'Plant-Based Mains',
        title: 'Vegetable Biryani',
        description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
        image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'v3',
        category: 'Vegan Smoothies',
        title: 'Mango Lassi Smoothie',
        description: 'Ripe mango with coconut yogurt, cardamom and a hint of saffron',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'v4',
        category: 'Plant-Based Desserts',
        title: 'Coconut Kheer',
        description: 'Creamy coconut milk with rice, cardamom and topped with pistachios',
        image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'v5',
        category: 'Vegan Snacks',
        title: 'Masala Avocado Toast',
        description: 'Smashed avocado with chaat masala on whole grain bread',
        image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'v6',
        category: 'Plant-Based Soups',
        title: 'Tomato Rasam',
        description: 'Tangy tomato soup with tamarind, curry leaves and mustard seeds',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      }
    ],
    'vegetarian': [
      {
        id: 'vg1',
        category: 'Vegetarian Mains',
        title: 'Paneer Tikka Masala',
        description: 'Grilled cottage cheese in a rich tomato and onion gravy',
        image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'vg2',
        category: 'Protein-Rich Meals',
        title: 'Egg Curry with Paratha',
        description: 'Spiced egg curry served with whole wheat flatbread',
        image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'vg3',
        category: 'Vegetarian Bowls',
        title: 'Mediterranean Halloumi Bowl',
        description: 'Grilled halloumi with couscous, olives, and roasted vegetables',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'vg4',
        category: 'Vegetarian Pasta',
        title: 'Creamy Mushroom Pasta',
        description: 'Fettuccine with wild mushrooms in a garlic cream sauce',
        image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'vg5',
        category: 'Vegetarian Curries',
        title: 'Paneer Tikka Masala',
        description: 'Indian cottage cheese in a rich tomato and spice gravy',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'vg6',
        category: 'Vegetarian Wraps',
        title: 'Greek Yogurt & Falafel Wrap',
        description: 'Homemade falafel with tzatziki sauce in a whole wheat wrap',
        image: 'https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      }
    ],
    'keto': [
      {
        id: 'k1',
        category: 'Keto Mains',
        title: 'Butter Chicken',
        description: 'Tender chicken in a rich, low-carb butter and tomato sauce',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'k2',
        category: 'Keto Bowls',
        title: 'Cauliflower Rice Bowl',
        description: 'Seasoned cauliflower rice with grilled chicken and avocado',
        image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'k3',
        category: 'Keto Breakfast',
        title: 'Bacon & Egg Cups',
        description: 'Eggs baked in bacon cups with cheddar cheese',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'k4',
        category: 'Keto Snacks',
        title: 'Cheese & Pepperoni Crisps',
        description: 'Baked cheese crisps topped with pepperoni',
        image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'k5',
        category: 'Keto Desserts',
        title: 'Chocolate Avocado Mousse',
        description: 'Rich chocolate mousse made with avocado and coconut cream',
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'k6',
        category: 'Keto Salads',
        title: 'Cobb Salad with Ranch',
        description: 'Classic cobb salad with homemade keto ranch dressing',
        image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      }
    ],
    'high-protein': [
      {
        id: 'hp1',
        category: 'Protein-Rich Mains',
        title: 'Tandoori Chicken',
        description: 'Yogurt and spice marinated chicken, grilled to perfection',
        image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'hp2',
        category: 'Protein Bowls',
        title: 'Chicken & Quinoa Power Bowl',
        description: 'Grilled chicken with quinoa, black beans, and vegetables',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'hp3',
        category: 'Protein Smoothies',
        title: 'Triple Berry Protein Shake',
        description: 'Mixed berries with whey protein and Greek yogurt',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'hp4',
        category: 'High-Protein Breakfast',
        title: 'Greek Yogurt Parfait',
        description: 'Greek yogurt layered with nuts, seeds, and berries',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'hp5',
        category: 'Protein-Rich Salads',
        title: 'Tuna & Egg Protein Salad',
        description: 'Fresh tuna, boiled eggs, and mixed greens with olive oil dressing',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 'hp6',
        category: 'Post-Workout Meals',
        title: 'Turkey & Sweet Potato Hash',
        description: 'Lean ground turkey with sweet potatoes and bell peppers',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      }
    ],
    'default': [
      {
        id: 1,
        category: 'Healthy Salad Bowls',
        title: 'Mediterranean Quinoa Bowl',
        description: 'Fresh avocado, spinach, and quinoa with olive oil dressing',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 2,
        category: 'Nutritious Dishes',
        title: 'Grilled Chicken & Vegetables',
        description: 'Lean protein with seasonal roasted vegetables',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 3,
        category: 'Fruits & Smoothies',
        title: 'Berry Protein Smoothie',
        description: 'Mixed berries with banana and plant-based protein',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 4,
        category: 'Healthy Salad Bowls',
        title: 'Asian Sesame Salad',
        description: 'Crunchy vegetables with sesame dressing and tofu',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 5,
        category: 'Nutritious Dishes',
        title: 'Baked Salmon with Asparagus',
        description: 'Omega-3 rich salmon with fresh asparagus',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 6,
        category: 'Fruits & Smoothies',
        title: 'Green Detox Smoothie',
        description: 'Spinach, kale, apple, and ginger cleansing blend',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      }
    ]
  };

  // Update meals when diet preference changes
  useEffect(() => {
    if (dietPreference) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const selectedDietMeals = mealSuggestionsByDiet[dietPreference] || mealSuggestionsByDiet.default;
        setCurrentMeals(selectedDietMeals);
        setShowAllMeals(false);
        setIsLoading(false);
      }, 600);
    } else {
      setCurrentMeals(mealSuggestionsByDiet.default);
    }
  }, [dietPreference]);

  // Function to handle generating more suggestions
  const handleGenerateSuggestions = () => {
    setShowAllMeals(true);
  };

  // Determine which meals to display
  const displayedMeals = showAllMeals 
    ? currentMeals 
    : currentMeals.slice(0, 3);

  return (
    <section className="meal-suggestion-section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>AI-Powered Meal & Diet Suggestions</h2>
        <p>Get personalized meal recommendations based on your preferences</p>
      </motion.div>
      
      <motion.div 
        className="preference-input"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <label htmlFor="diet-preference">What's your diet preference?</label>
        <div className="input-container">
          <select 
            id="diet-preference" 
            value={dietPreference} 
            onChange={(e) => setDietPreference(e.target.value)}
          >
            <option value="">Select your preference</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
            <option value="high-protein">High-Protein</option>
            <option value="low-carb">Low-Carb</option>
          </select>
          <button 
            className="generate-btn" 
            onClick={handleGenerateSuggestions}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Suggestions'}
          </button>
        </div>
      </motion.div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Generating personalized meal suggestions...</p>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div 
              key={dietPreference || 'default'}
              className="meal-suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {displayedMeals.map((meal, index) => (
                <motion.div 
                  key={meal.id}
                  className="meal-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="meal-image">
                    <img src={meal.image} alt={meal.title} />
                  </div>
                  <div className="meal-content">
                    <span className="meal-category">{meal.category}</span>
                    <h3>{meal.title}</h3>
                    <p>{meal.description}</p>
                    <button className="view-recipe">View Recipe</button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {!showAllMeals && currentMeals.length > 3 && (
            <div className="load-more-container">
              <button 
                className="load-more-btn"
                onClick={handleGenerateSuggestions}
              >
                Show More Recipes
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MealSuggestionSection; 