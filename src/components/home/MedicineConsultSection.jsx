import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPills, FaSearch, FaArrowRight } from 'react-icons/fa';
import './MedicineConsultSection.css';

const MedicineConsultSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample medicine data with Indian currency
  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 45.99,
      alternatives: ['Ibuprofen 400mg', 'Aspirin 325mg'],
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Vitamin D3 1000IU',
      category: 'Supplements',
      price: 199.49,
      alternatives: ['Multivitamin Complex', 'Calcium + D3'],
      image: 'https://images.unsplash.com/photo-1550572017-9a5daa21a2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Omeprazole 20mg',
      category: 'Digestive Health',
      price: 89.99,
      alternatives: ['Pantoprazole 40mg', 'Famotidine 20mg'],
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <section className="medicine-consult-section">
      <div className="section-content">
        <motion.div 
          className="medicine-search-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="card-header">
            <FaPills className="icon" />
            <h2>Find & Compare Medicines</h2>
          </div>
          <p>Search for medicines and compare prices across top pharmacies</p>
          <Link to="/medicines" className="search-link">
            <motion.button 
              className="search-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch /> Search Medicines
              <FaArrowRight className="arrow-icon" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      <motion.div 
        className="medicine-doctor-container"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="medicines-section"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>Suggested Medications</h3>
          <div className="medicine-cards">
            {medicines.map((medicine, index) => (
              <motion.div 
                key={medicine.id}
                className="medicine-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
                viewport={{ once: true }}
              >
                <div className="medicine-image">
                  <img src={medicine.image} alt={medicine.name} />
                </div>
                <div className="medicine-content">
                  <h4>{medicine.name}</h4>
                  <span className="medicine-category">{medicine.category}</span>
                  <p className="medicine-price">₹{medicine.price}</p>
                  <div className="medicine-alternatives">
                    <span>Alternatives:</span>
                    <ul>
                      {medicine.alternatives.map((alt, i) => (
                        <li key={i}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="medicine-btn">Compare Prices</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="cta-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <button className="cta-button ai-chat">Talk to AI for Quick Health Advice</button>
      </motion.div>
    </section>
  );
};

export default MedicineConsultSection; 