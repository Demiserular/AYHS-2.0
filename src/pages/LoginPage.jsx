import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaHeartbeat, FaStethoscope, FaTablets, FaHospital } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('doctor@aysh.com');
  const [password, setPassword] = useState('healthpassword');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  // Generate animated particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 5,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          icon: Math.floor(Math.random() * 4)
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just navigate to home
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderIcon = (iconIndex) => {
    switch (iconIndex) {
      case 0:
        return <FaHeartbeat />;
      case 1:
        return <FaStethoscope />;
      case 2:
        return <FaTablets />;
      case 3:
        return <FaHospital />;
      default:
        return <FaHeartbeat />;
    }
  };

  return (
    <div className="login-page">
      {/* Animated background particles */}
      <div className="particles-container">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            style={{ fontSize: particle.size }}
          >
            {renderIcon(particle.icon)}
          </motion.div>
        ))}
      </div>

      <div className="login-container">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="login-header">
            <motion.div 
              className="logo-container"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <FaHeartbeat className="logo-icon" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              AYSH Health
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Your health, our priority
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="login-form"
          >
            <div className="input-group">
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="login-input"
              />
              <motion.span 
                className="input-focus"
                initial={{ width: "0%" }}
                whileFocus={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="login-input"
              />
              <motion.span 
                className="input-focus"
                initial={{ width: "0%" }}
                whileFocus={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="submit"
              className="login-button"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              ) : (
                <span className="button-text">Sign In</span>
              )}
            </motion.button>
          </motion.form>

          <motion.div 
            className="login-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <p>Don't have an account? <a href="#">Register</a></p>
            <div className="pulse-container">
              <motion.div 
                className="pulse"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.2, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage; 