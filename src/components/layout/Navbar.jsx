import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserMd, FaRobot, FaUser, FaPills, FaUtensils, FaUsers, FaSignInAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Home', path: '/', icon: <FaHome /> },
    { title: 'AI Chat', path: '/chat', icon: <FaRobot /> },
    { title: 'Doctor Consultation', path: '/doctors', icon: <FaUserMd /> },
    { title: 'Medicines', path: '/medicines', icon: <FaPills /> },
    { title: 'Meal Plan', path: '/meal-plan', icon: <FaUtensils /> },
    { title: 'Community', path: '/community', icon: <FaUsers /> },
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
          ))}
          <li className="nav-item login-item">
            <Link 
              to="/login" 
              className={`nav-links login-link ${location.pathname === '/login' ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              <span className="nav-icon"><FaSignInAlt /></span>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 