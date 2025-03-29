import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="gradient-animation"></div>
      </div>
      
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Personalized Health & Nutrition Assistant
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AI-powered meal plans, doctor consultations & smart medicine recommendations
        </motion.p>
        
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/meal-plan" className="cta-button consultation">
            <FaUtensils className="button-icon" />
            Get My Meal Plan
          </Link>
          <Link to="/chat" className="cta-button meal-plan">
            Talk to AI Assistant
          </Link>
        </motion.div>
      </div>
      
      <motion.div 
        className="food-banners"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.div 
          className="banner fruits-vegetables"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>Fruits & Vegetables</h3>
          <p>Seasonal Indian produce rich in fiber & vitamins</p>
        </motion.div>
        
        <motion.div 
          className="banner high-protein"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3>High-Protein Dishes</h3>
          <p>Paneer, Dal, Eggs, Chicken & Lentils</p>
        </motion.div>
        
        <motion.div 
          className="banner hydration"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3>Hydration & Wellness</h3>
          <p>Nimbu Pani, Coconut Water & Herbal Teas</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 