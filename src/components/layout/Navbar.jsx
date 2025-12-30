import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserMd, FaRobot, FaUser, FaPills, FaUtensils, FaUsers, FaSignInAlt, FaBell, FaBrain } from 'react-icons/fa';
import './Navbar.css';
import { isAuthenticated, logout as doLogout } from '../../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const location = useLocation();
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Home', path: '/', icon: <FaHome /> },
    { title: 'AI Chat', path: '/chat', icon: <FaRobot /> },
    { title: 'Medicines', path: '/medicines', icon: <FaPills /> },
    // { title: 'Meal Plan', path: '/meal-plan', icon: <FaUtensils /> },
    { title: 'Reminders', path: '/reminders', icon: <FaBell /> },
    { title: 'ML Predictor', path: '/predict', icon: <FaBrain /> },
    { title: 'Profile', path: '/profile', icon: <FaUser /> }
  ];

  // Toggle menu and body scroll
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('menu-open');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar-container')) {
        setIsOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    document.body.classList.remove('menu-open');
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        document.body.classList.remove('menu-open');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdown && profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdown]);

  const handleLogout = () => {
    setProfileDropdown(false);
    doLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AYSH
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {menuItems.map((item, index) => (
            item.title === 'Profile' && isAuthenticated() ? (
              <li key={index} className="nav-item profile-item" ref={profileRef}>
                <div
                  className={`nav-links ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setProfileDropdown((prev) => !prev)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.title}
                </div>
                {profileDropdown && (
                  <div className="profile-dropdown">
                    <Link to="/profile" className="dropdown-link" onClick={() => setProfileDropdown(false)}>
                      Profile
                    </Link>
                    <button className="dropdown-link" onClick={handleLogout} style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', padding: 0 }}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : item.title !== 'Profile' ? (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-links ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={toggleMenu}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.title}
                </Link>
              </li>
            ) : null
          ))}
          {!isAuthenticated() && (
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={toggleMenu}>
                <span className="nav-icon"><FaSignInAlt /></span>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 