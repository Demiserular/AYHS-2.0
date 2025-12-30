import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="ayhs-footer">
      <div className="footer-main">
        <div className="footer-title">Advance Youth Health Care Solution</div>
        <div className="footer-mission">
          <em>"Empowering youth for a healthier tomorrow through technology and compassion."</em>
        </div>
        <div className="footer-details">
          <span>Developed by: <strong>Shubham Chauhan</strong></span> | 
          <span>Address: Hapur</span> | 
          <span>Date of Execution: 2019</span> | 
          <span>Phone: 8954XXXX84</span> | 
          <span>Email: <a href="mailto:demiseular@gmail.com">demiseular@gmail.com</a></span> | 
          <span>GitHub: <a href="https://github.com/Demiserular/AYHS-2.0" target="_blank" rel="noopener noreferrer">AYHS-2.0</a></span>
        </div>
      </div>
      <div className="footer-bottom">
        © {year} AYHS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 