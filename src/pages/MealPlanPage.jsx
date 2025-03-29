"use client"

import { useState } from "react"
import "./MealPlanPage.css"
import {
  Bell,
  Calendar,
  Bookmark,
  Printer,
  Share2,
  Mic,
  Upload,
  ChevronDown,
  Plus,
  Check,
  ArrowRight,
  Save,
  FileText,
  BarChart2,
  Coffee,
  Sun,
  CloudRain,
  Snowflake,
} from "lucide-react"

export default function MealPlanPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeDietType, setActiveDietType] = useState(null)
  const [activeSeason, setActiveSeason] = useState("summer")
  const [healthPreferences, setHealthPreferences] = useState({
    lowSodium: false,
    highFiber: false,
    diabeticFriendly: true,
    glutenFree: false,
    lowFat: true,
    highProtein: false,
  })

  const toggleHealthPreference = (preference) => {
    setHealthPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }))
  }

  return (
    <div className="meal-plan-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-section quick-actions">
          <div className="quick-actions-header">
            <h2>Quick Actions</h2>
            <div className="notification-bell">
              <Bell size={20} />
              <span className="notification-count">3</span>
            </div>
          </div>
          <div className="quick-actions-buttons">
            <button className="action-button">
              <Printer size={18} />
              <span>Print</span>
            </button>
            <button className="action-button">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="sidebar-section weekly-stats">
          <h2>Weekly Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">12,450</span>
              <span className="stat-label">Total Calories</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">75g</span>
              <span className="stat-label">Avg. Protein</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">14</span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>
        </div>

        <div className="sidebar-section meal-calendar">
          <div className="section-header">
            <h2>Meal Calendar</h2>
            <Calendar size={20} />
          </div>
          <div className="calendar-container">
            <div className="calendar-header">
              <button className="calendar-nav">&lt;</button>
              <h3>June 2023</h3>
              <button className="calendar-nav">&gt;</button>
            </div>
            <div className="calendar-weekdays">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={index} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-days">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 3
                return (
                  <div
                    key={i}
                    className={`calendar-day ${day > 0 && day <= 30 ? "active-month" : ""} ${
                      day === 15 ? "selected-day" : ""
                    } ${[5, 12, 19, 26].includes(day) ? "has-meal" : ""}`}
                  >
                    {day > 0 && day <= 30 ? day : ""}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="sidebar-section saved-meals">
          <div className="section-header">
            <h2>Saved Meals</h2>
            <Bookmark size={20} />
          </div>
          <ul className="saved-meals-list">
            {["High Protein Breakfast", "Vegetarian Lunch Thali", "Low Carb Dinner", "South Indian Breakfast"].map(
              (meal, index) => (
                <li key={index} className="saved-meal-item">
                  <span>{meal}</span>
                  <Bookmark size={16} />
                </li>
              )
            )}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Your Personalized Thali Builder</h1>
          <p className="hero-subtitle">
            AI-powered meal planning tailored to your preferences, health needs, and cultural tastes
          </p>
        </section>

        <div className="filter-bar">
          {["All", "Recent", "Favorites", "High Protein", "Low Carb"].map((filter) => (
            <button
              key={filter}
              className={`filter-tag ${activeFilter === filter.toLowerCase().replace(" ", "-") ? "active" : ""}`}
              onClick={() => setActiveFilter(filter.toLowerCase().replace(" ", "-"))}
            >
              {filter}
            </button>
          ))}
        </div>

        <section className="feature-cards-grid">
          {/* Thali Builder Card */}
          <div className="feature-card thali-builder-card">
            <h2>Thali Builder</h2>
            <p>Select your diet type and cuisine preferences</p>

            <div className="diet-types">
              {["Vegetarian", "Vegan", "Non-Vegetarian", "Pescatarian", "Keto", "Paleo"].map((diet) => (
                <button
                  key={diet}
                  className={`diet-type-button ${activeDietType === diet ? "active" : ""}`}
                  onClick={() => setActiveDietType(diet)}
                >
                  {diet}
                </button>
              ))}
            </div>

            <div className="cuisine-selector">
              <label>Cuisine</label>
              <div className="select-wrapper">
                <select>
                  <option>North Indian</option>
                  <option>South Indian</option>
                  <option>Bengali</option>
                  <option>Gujarati</option>
                  <option>Punjabi</option>
                  <option>Maharashtrian</option>
                </select>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Health Preferences Card */}
          <div className="feature-card health-preferences-card">
            <h2>Health Preferences</h2>
            <p>Select your dietary health requirements</p>

            <div className="health-toggles">
              {Object.entries(healthPreferences).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
                return (
                  <button
                    key={key}
                    className={`health-toggle ${value ? "active" : ""}`}
                    onClick={() => toggleHealthPreference(key)}
                  >
                    {value ? <Check size={16} /> : <Plus size={16} />}
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Voice Input Card */}
          <div className="feature-card voice-input-card">
            <h2>Voice Input</h2>
            <p>Describe your meal preferences by voice</p>

            <button className="voice-button">
              <Mic size={24} />
              <span>Tap to speak</span>
            </button>

            <div className="voice-instructions">
              <p>Try saying:</p>
              <ul>
                <li>"I want a high protein vegetarian thali"</li>
                <li>"Create a low carb dinner plan"</li>
              </ul>
            </div>
          </div>

          {/* Photo Upload Card */}
          <div className="feature-card photo-upload-card">
            <h2>Photo Upload</h2>
            <p>Upload a photo of food you'd like to include</p>

            <div className="upload-zone">
              <Upload size={24} />
              <p>Drag & drop or click to upload</p>
              <input type="file" className="file-input" accept="image/*" />
            </div>

            <div className="upload-preview">
              <div className="preview-placeholder">
                <p>Preview will appear here</p>
              </div>
            </div>
          </div>

          {/* Seasonal Foods Card */}
          <div className="feature-card seasonal-foods-card">
            <h2>Seasonal Foods</h2>
            <p>Optimize your thali with seasonal ingredients</p>

            <div className="season-selector">
              <button
                className={`season-button ${activeSeason === "summer" ? "active" : ""}`}
                onClick={() => setActiveSeason("summer")}
              >
                <Sun size={18} />
                <span>Summer</span>
              </button>
              <button
                className={`season-button ${activeSeason === "monsoon" ? "active" : ""}`}
                onClick={() => setActiveSeason("monsoon")}
              >
                <CloudRain size={18} />
                <span>Monsoon</span>
              </button>
              <button
                className={`season-button ${activeSeason === "winter" ? "active" : ""}`}
                onClick={() => setActiveSeason("winter")}
              >
                <Snowflake size={18} />
                <span>Winter</span>
              </button>
            </div>

            <div className="seasonal-foods-list">
              <h3>Recommended Seasonal Foods:</h3>
              <ul>
                {activeSeason === "summer" && (
                  <>
                    <li>Watermelon</li>
                    <li>Cucumber</li>
                    <li>Mango</li>
                    <li>Mint</li>
                  </>
                )}
                {activeSeason === "monsoon" && (
                  <>
                    <li>Corn</li>
                    <li>Ginger</li>
                    <li>Turmeric</li>
                    <li>Jamun</li>
                  </>
                )}
                {activeSeason === "winter" && (
                  <>
                    <li>Carrots</li>
                    <li>Spinach</li>
                    <li>Sweet Potato</li>
                    <li>Mustard Greens</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Meal Plan Results Section */}
        <section className="meal-plan-results">
          <div className="action-bar">
            <h2>Your Personalized Thali</h2>
            <div className="action-buttons">
              <button className="action-button primary">
                <Save size={18} />
                <span>Save Meal</span>
              </button>
              <button className="action-button">
                <FileText size={18} />
                <span>Export PDF</span>
              </button>
              <button className="action-button">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="thali-components">
            <div className="thali-main">
              <div className="thali-item main-dish">
                <img src="/placeholder.jpg" alt="Main Dish" />
                <div className="thali-item-details">
                  <h3>Paneer Butter Masala</h3>
                  <p>Rich, creamy tomato gravy with paneer cubes</p>
                </div>
              </div>
            </div>

            <div className="thali-sides">
              {[
                { name: "Jeera Rice", desc: "Basmati rice with cumin tempering" },
                { name: "Dal Tadka", desc: "Yellow lentils with spices" },
                { name: "Cucumber Raita", desc: "Yogurt with cucumber and spices" },
                { name: "Roti", desc: "Whole wheat flatbread" },
              ].map((item, index) => (
                <div key={index} className="thali-item side-dish">
                  <img src="/placeholder.jpg" alt={item.name} />
                  <div className="thali-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="nutrition-info">
            <h3>Nutrition Information</h3>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <div className="nutrition-icon calories">
                  <BarChart2 size={20} />
                </div>
                <div className="nutrition-details">
                  <span className="nutrition-value">850</span>
                  <span className="nutrition-label">Calories</span>
                </div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-icon protein">
                  <Coffee size={20} />
                </div>
                <div className="nutrition-details">
                  <span className="nutrition-value">35g</span>
                  <span className="nutrition-label">Protein</span>
                </div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-icon carbs">
                  <Coffee size={20} />
                </div>
                <div className="nutrition-details">
                  <span className="nutrition-value">90g</span>
                  <span className="nutrition-label">Carbs</span>
                </div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-icon fats">
                  <Coffee size={20} />
                </div>
                <div className="nutrition-details">
                  <span className="nutrition-value">25g</span>
                  <span className="nutrition-label">Fats</span>
                </div>
              </div>
            </div>
          </div>

          <div className="health-tips">
            <h3>Health Tips</h3>
            <ul className="tips-list">
              <li>This meal is balanced with protein, carbs, and healthy fats</li>
              <li>The cucumber raita adds probiotics for gut health</li>
              <li>Consider having this meal 2-3 hours before bedtime</li>
              <li>Pair with a glass of buttermilk for better digestion</li>
            </ul>
          </div>

          <div className="substitutes-section">
            <h3>Ingredient Substitutes</h3>
            <div className="substitutes-list">
              <div className="substitute-item">
                <div className="substitute-header">
                  <h4>Paneer</h4>
                  <ArrowRight size={16} />
                  <h4>Tofu</h4>
                </div>
                <p>For a vegan alternative with similar protein content</p>
              </div>
              <div className="substitute-item">
                <div className="substitute-header">
                  <h4>White Rice</h4>
                  <ArrowRight size={16} />
                  <h4>Brown Rice</h4>
                </div>
                <p>For more fiber and lower glycemic index</p>
              </div>
              <div className="substitute-item">
                <div className="substitute-header">
                  <h4>Cream</h4>
                  <ArrowRight size={16} />
                  <h4>Cashew Paste</h4>
                </div>
                <p>For a dairy-free alternative with healthy fats</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

