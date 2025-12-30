import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AIChatPage from './pages/AIChatPage';
import ProfilePage from './pages/ProfilePage';
import MedicinesPage from './pages/MedicinesPage';
import MealPlanPage from './pages/MealPlanPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RemindersPage from './pages/RemindersPage';
import AdherencePredictorPage from './pages/AdherencePredictorPage';
import { isAuthenticated } from './services/authService';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={
            <>
              <Navbar />
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/chat" element={<AIChatPage />} />
                  <Route path="/profile" element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />} />
                  <Route path="/medicines" element={<MedicinesPage />} />
                  <Route path="/meal-plan" element={<MealPlanPage />} />
                  <Route path="/reminders" element={isAuthenticated() ? <RemindersPage /> : <Navigate to="/login" />} />
                  <Route path="/predict" element={<AdherencePredictorPage />} />
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
