import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DoctorListPage from './pages/DoctorListPage';
import AIChatPage from './pages/AIChatPage';
import ProfilePage from './pages/ProfilePage';
import MedicinesPage from './pages/MedicinesPage';
import MealPlanPage from './pages/MealPlanPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={
            <>
              <Navbar />
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/doctors" element={<DoctorListPage />} />
                  <Route path="/chat" element={<AIChatPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/medicines" element={<MedicinesPage />} />
                  <Route path="/meal-plan" element={<MealPlanPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                </Routes>
              </Layout>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
