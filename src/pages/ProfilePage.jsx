import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBell, FaUserMd, FaHeartbeat, FaPills, 
  FaCalendarAlt, FaChartLine, FaStethoscope,
  FaUserCircle, FaClipboardList, FaHistory
} from 'react-icons/fa';
import { IoMdPulse } from 'react-icons/io';
import { RiMentalHealthLine } from 'react-icons/ri';
import profileImage from '../assets/images/shubham.jpg';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userData = {
    name: "SHUBHAM",
    role: "Patient",
    patientId: "P-2024-001",
    lastVisit: "15 Mar 2024",
    vitals: [
      { name: "Heart Rate", value: "72", unit: "bpm", icon: <IoMdPulse /> },
      { name: "Blood Pressure", value: "120/80", unit: "mmHg", icon: <FaHeartbeat /> },
      { name: "Mental Health", value: "Good", unit: "", icon: <RiMentalHealthLine /> },
      { name: "Physical Health", value: "Excellent", unit: "", icon: <FaStethoscope /> }
    ],
    upcomingAppointments: [
      {
        doctor: "Dr. Sarah Johnson",
        date: "20 Mar 2024",
        time: "10:30 AM",
        type: "Cardiology Review"
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
    { id: 'appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
    { id: 'medications', label: 'Medications', icon: <FaPills /> },
    { id: 'history', label: 'History', icon: <FaHistory /> }
  ];

  return (
    <div className="profile-container">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="user-welcome">
          <FaUserCircle className="user-icon" />
          <div className="user-info">
            <h2>{userData.name}</h2>
            <span>{userData.patientId}</span>
          </div>
        </div>
        <div className="nav-actions">
          <motion.button 
            className="icon-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBell />
          </motion.button>
          <div className="profile-pic">
            <img src={profileImage} alt="Profile" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <div className="vitals-section">
                <h3>Health Vitals</h3>
                <div className="vitals-grid">
                  {userData.vitals.map((vital, index) => (
                    <motion.div
                      key={index}
                      className="vital-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="vital-icon">{vital.icon}</div>
                      <div className="vital-info">
                        <h4>{vital.name}</h4>
                        <p>{vital.value} <span>{vital.unit}</span></p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="next-appointment">
                <h3>Next Appointment</h3>
                {userData.upcomingAppointments.map((apt, index) => (
                  <motion.div
                    key={index}
                    className="appointment-card"
                    whileHover={{ scale: 1.02 }}
                  >
                    <FaUserMd className="doctor-icon" />
                    <div className="appointment-info">
                      <h4>{apt.doctor}</h4>
                      <p>{apt.type}</p>
                      <div className="appointment-time">
                        <FaCalendarAlt />
                        <span>{apt.date} at {apt.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <motion.button whileHover={{ scale: 1.05 }} className="action-button">
                    <FaClipboardList />
                    <span>Book Appointment</span>
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} className="action-button">
                    <FaPills />
                    <span>View Medications</span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          {/* Add other tab contents here */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage; 