import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSpinner, FaExternalLinkAlt, FaRobot, FaCommentDots } from 'react-icons/fa';
import { searchMedicine } from '../../services/medicineSearch';
import './MedicineSearch.css';

const MedicineSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geminiLinks, setGeminiLinks] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState(null);
  const [gptLinks, setGptLinks] = useState('');
  const [gptLoading, setGptLoading] = useState(false);
  const [gptError, setGptError] = useState(null);
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoError, setInfoError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setGeminiLinks('');
    setGeminiError(null);

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

  const handleGeminiLinks = async () => {
    if (!query.trim()) return;
    setGeminiLoading(true);
    setGeminiLinks('');
    setGeminiError(null);
    try {
      const res = await fetch(`http://localhost:3001/gemini-medicine-links?medicineName=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.linksText) {
        setGeminiLinks(data.linksText);
      } else {
        setGeminiError('No links found from Gemini.');
      }
    } catch (err) {
      setGeminiError('Failed to get links from Gemini.');
    } finally {
      setGeminiLoading(false);
    }
  };

  const handleGptLinks = async () => {
    if (!query.trim()) return;
    setGptLoading(true);
    setGptLinks('');
    setGptError(null);
    try {
      const res = await fetch('http://localhost:3001/chatgpt-medicine-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineName: query }),
      });
      const data = await res.json();
      if (data.linksText) {
        setGptLinks(data.linksText);
      } else {
        setGptError('No links found from ChatGPT.');
      }
    } catch (err) {
      setGptError('Failed to get links from ChatGPT.');
    } finally {
      setGptLoading(false);
    }
  };

  const handleMedicineInfo = async () => {
    if (!query.trim()) return;
    setInfoLoading(true);
    setMedicineInfo(null);
    setInfoError(null);
    try {
      const res = await fetch('http://localhost:3001/api/medicine-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineName: query }),
      });
      const data = await res.json();
      if (data.medicineInfo) {
        setMedicineInfo(data);
      } else {
        setInfoError('No information found for this medicine.');
      }
    } catch (err) {
      setInfoError('Failed to get medicine information.');
    } finally {
      setInfoLoading(false);
    }
  };

  // Helper to render links from Gemini text
  const renderGeminiLinks = (text) => {
    // Find URLs in the text and make them clickable
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{color:'#1976d2', textDecoration:'underline', marginRight:4}}>{part}</a>;
      }
      return <span key={i}>{part}</span>;
    });
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
          <motion.button
            type="button"
            className="search-button gemini-button"
            style={{marginLeft:8, background:'#fff', color:'#1976d2', border:'1px solid #1976d2'}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={geminiLoading}
            onClick={handleGeminiLinks}
            title="Get AI pharmacy links (Gemini)"
          >
            {geminiLoading ? <FaSpinner className="spinner" /> : <FaRobot style={{marginRight:4}} />} AI Links
          </motion.button>
          <motion.button
            type="button"
            className="search-button info-button"
            style={{marginLeft:8, background:'#fff', color:'#16a34a', border:'1px solid #16a34a'}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={infoLoading}
            onClick={handleMedicineInfo}
            title="Get detailed medicine information"
          >
            {infoLoading ? <FaSpinner className="spinner" /> : <FaRobot style={{marginRight:4}} />} Medicine Info
          </motion.button>
          <motion.button
            type="button"
            className="search-button gpt-button"
            style={{marginLeft:8, background:'#fff', color:'#10a37f', border:'1px solid #10a37f'}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={gptLoading}
            onClick={handleGptLinks}
            title="Get AI pharmacy links (ChatGPT)"
          >
            {gptLoading ? <FaSpinner className="spinner" /> : <FaCommentDots style={{marginRight:4}} />} ChatGPT Links
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
                  <p className="price">
                    {result.price !== null ? `₹${result.price}` : <span style={{color: '#888'}}>Check on website</span>}
                  </p>
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

        {(geminiLinks || geminiError) && (
          <motion.div
            className="results-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>AI-Generated Pharmacy Links (Gemini)</h3>
            {geminiLinks && <div className="gemini-links" style={{marginBottom:8}}>{renderGeminiLinks(geminiLinks)}</div>}
            {geminiError && <div className="error-message">{geminiError}</div>}
            <div className="disclaimer" style={{fontSize:'0.92rem', color:'#888', marginTop:4}}>
              Links are AI-generated and may not be up-to-date. Please verify before purchasing.
            </div>
          </motion.div>
        )}

        {(gptLinks || gptError) && (
          <motion.div
            className="results-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>AI-Generated Pharmacy Links (ChatGPT)</h3>
            {gptLinks && <div className="gpt-links" style={{marginBottom:8}}>{renderGeminiLinks(gptLinks)}</div>}
            {gptError && <div className="error-message">{gptError}</div>}
            <div className="disclaimer" style={{fontSize:'0.92rem', color:'#888', marginTop:4}}>
              Links are AI-generated and may not be up-to-date. Please verify before purchasing.
            </div>
          </motion.div>
        )}

        {(medicineInfo || infoError) && (
          <motion.div
            className="results-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>Medicine Information & Price Comparison</h3>
            {medicineInfo && (
              <div className="medicine-info-section">
                <div className="info-content" style={{marginBottom: 16, padding: 16, background: '#f8f9fa', borderRadius: 8}}>
                  <h4 style={{color: '#16a34a', marginBottom: 8}}>About {medicineInfo.medicineName}</h4>
                  <div style={{whiteSpace: 'pre-line', lineHeight: 1.6}}>{medicineInfo.medicineInfo}</div>
                </div>
                {medicineInfo.priceComparison && medicineInfo.priceComparison.length > 0 && (
                  <div className="price-comparison">
                    <h4 style={{marginBottom: 12}}>Price Comparison</h4>
                    {medicineInfo.priceComparison.map((result, index) => (
                      <motion.div
                        key={index}
                        className="result-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="result-info">
                          <h4>{result.title}</h4>
                          <p className="price">
                            {result.price !== null ? `₹${result.price}` : <span style={{color: '#888'}}>Check on website</span>}
                          </p>
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
                  </div>
                )}
              </div>
            )}
            {infoError && <div className="error-message">{infoError}</div>}
            <div className="disclaimer" style={{fontSize:'0.92rem', color:'#888', marginTop:8}}>
              Information is AI-generated for educational purposes. Always consult a healthcare professional before taking any medication.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicineSearch; 