import { useState } from 'react';
import { motion } from 'framer-motion';
import './DoctorListPage.css';

const DoctorListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'reviews', 'name'

    // Sample doctor data with Indian names (Expanded for more variety)
  const allDoctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      available: true,
      city: 'Mumbai',
      experience: 15
    },
    {
      id: 2,
      name: 'Dr. Rajesh Patel',
      specialty: 'Nutrition',
      rating: 4.8,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      available: true,
      city: 'Delhi',
      experience: 12
    },
    {
      id: 3,
      name: 'Dr. Ananya Gupta',
      specialty: 'General Medicine',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      available: false,
      city: 'Bangalore',
      experience: 10
    },
    {
      id: 4,
      name: 'Dr. Arjun Singh',
      specialty: 'Dermatology',
      rating: 4.6,
      reviews: 85,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      available: true,
      city: 'Chennai',
      experience: 8
    },
    {
      id: 5,
      name: 'Dr. Aisha Khan',
      specialty: 'Pediatrics',
      rating: 4.9,
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      available: true,
      city: 'Kolkata',
      experience: 18
    },
    {
      id: 6,
      name: 'Dr. Vikram Verma',
      specialty: 'Orthopedics',
      rating: 4.5,
      reviews: 62,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Reusing image
      available: false,
      city: 'Hyderabad',
      experience: 7
    }
  ];

  const filteredDoctors = allDoctors
    .filter(doctor =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(doctor =>
      filterSpecialty === '' || doctor.specialty === filterSpecialty
    )
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating; // Highest rating first
      } else if (sortBy === 'reviews') {
        return b.reviews - a.reviews; // Most reviews first
      } else {
        return a.name.localeCompare(b.name); // Alphabetical
      }
    });

  return (
    <div className="doctor-list-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Find a Specialist</h1>
        <p>Connect with experienced doctors across various specialties</p>
      </motion.div>

      <div className="search-filter-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div className="filter-sort">
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="filter-select"
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Nutrition">Nutrition</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="rating">Sort by Rating</option>
            <option value="reviews">Sort by Reviews</option>
            <option value="name">Sort by Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="doctor-list">
        {filteredDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            className="doctor-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (doctor.id % 6) }} // Staggered animation
          >
            <div className="doctor-image">
              <img src={doctor.image} alt={doctor.name} />
              {doctor.available && <span className="available-badge">Available</span>}
            </div>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="specialty">{doctor.specialty}</p>
              <p className="city">📍 {doctor.city}</p>
              <p className="experience">Experience: {doctor.experience} years</p>
              <div className="rating">
                <span className="stars">
                  {'★'.repeat(Math.floor(doctor.rating))}
                  {'☆'.repeat(5 - Math.floor(doctor.rating))}
                </span>
                <span className="reviews">({doctor.reviews} reviews)</span>
              </div>
              <div className="actions">
                <button className="ai-advice-btn">AI Advice</button>
                <button
                  className={`consult-btn ${doctor.available ? 'active' : 'disabled'}`}
                >
                  {doctor.available ? 'Book Video Call' : 'Not Available'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorListPage; 