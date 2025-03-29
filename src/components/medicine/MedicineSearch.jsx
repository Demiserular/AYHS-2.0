import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import { searchMedicine } from '../../services/medicineSearch';
import './MedicineSearch.css';

const MedicineSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchMedicine(query);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to search for medicine. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-search">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter medicine name..."
            className="search-input"
          />
          <motion.button
            type="submit"
            className="search-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <FaSpinner className="spinner" /> : <FaSearch />}
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        {results.length > 0 && (
          <motion.div
            className="results-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>Price Comparison Results</h3>
            {results.map((result, index) => (
              <motion.div
                key={index}
                className="result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="result-info">
                  <h4>{result.title}</h4>
                  <p className="price">₹{result.price}</p>
                  <p className="website">{result.website}</p>
                </div>
                <motion.a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buy-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now <FaExternalLinkAlt />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicineSearch; 