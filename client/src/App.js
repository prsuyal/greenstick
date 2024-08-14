import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./components/ErrorPage";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DashboardPage from './pages/DashboardPage';
import SuccessPage from './pages/SuccessPage';
import CanceledPage from './pages/CanceledPage';
import ExoPage from './pages/ExoPage';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import CheckEmailPage from './pages/CheckEmailPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js'; 
import ResetPasswordPage from './pages/ResetPasswordPage';
import Lesson1a1 from './pages/Level 1/1A/Lesson 1/Module1.js';
import Quiz1a1 from './pages/Level 1/1A/Lesson 1/Quiz1.js';
import Lesson1a2 from './pages/Level 1/1A/Lesson 2/Module2.js';
import Quiz1a2 from './pages/Level 1/1A/Lesson 2/Quiz2.js';
import Lesson1b1 from './pages/Level 1/1B/Lesson 1/Module1.js';
import Quiz1b1 from './pages/Level 1/1B/Lesson 1/Quiz1.js';
import Lesson1b2 from './pages/Level 1/1B/Lesson 2/Module2.js';
import Quiz1b2 from './pages/Level 1/1B/Lesson 2/Quiz2.js';
import Lesson1c1 from './pages/Level 1/1C/Lesson 1/Module1.js';
import Quiz1c1 from './pages/Level 1/1C/Lesson 1/Quiz1.js';
import Lesson1c2 from './pages/Level 1/1C/Lesson 2/Module2.js';
import Quiz1c2 from './pages/Level 1/1C/Lesson 2/Quiz2.js';
import ProtectedRoute from './components/ProtectedRoute.js';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSPU, setIsSPU] = useState(false);  
  const [isPU, setIsPU] = useState(false);
  const [isU, setIsU] = useState(false);
  const [user, setUser] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsAuthenticated(true);
      if (userData.plan == "Standard" || userData.plan == "Pro" || userData.plan == "Ultimate") {
        setIsSPU(true);
      }
      if (userData.plan == "Pro" || userData.plan == "Ultimate") {
        setIsPU(true);
      }
      if (userData.plan == "Ultimate") {
        setIsU(true);
      }
      setUser(userData);
      setHasPaid(userData.hasPaid || false);
      setIsEmailConfirmed(userData.isEmailConfirmed || false);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setHasPaid(userData.hasPaid || false);
    setIsEmailConfirmed(userData.isEmailConfirmed || false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async (navigate, currentPath) => {
    try {
      const response = await fetch('https://api.greenstickusa.com/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
        setHasPaid(false);
        setIsEmailConfirmed(false);
        localStorage.removeItem('user');
        
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        if (currentPath === '/dashboard') {
          navigate('/');
        } else if (currentPath === '/pricing') {
          navigate('/pricing');
        } else {
          navigate('/');
        }
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handlePayment = () => {
    setHasPaid(true);
    localStorage.setItem('hasPaid', 'true');
  };

  const handleEmailConfirmation = () => {
    setIsEmailConfirmed(true);
    localStorage.setItem('isEmailConfirmed', 'true');
  };

  const fetchUpdatedUser = async (userId) => {
    try {
      const response = await fetch(`https://api.greenstickusa.com/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const updatedUser = await response.json();
      console.log('Fetched user data:', updatedUser);
      console.log('bob:', updatedUser);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error fetching updated user:', error);
    }
  };

  const AppWrapper = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const wrappedHandleLogout = () => handleLogout(navigate, location.pathname);

    return React.cloneElement(children, {
      onLogout: wrappedHandleLogout,
      isAuthenticated,
      user,
      hasPaid,
      onLogin: handleLogin, 
      onRegister: handleEmailConfirmation, 
      onPayment: handlePayment, 
      fetchUpdatedUser
    });
  }; 

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AppWrapper><LandingPage /></AppWrapper>} />
        <Route path="/about" element={<AppWrapper><AboutPage /></AppWrapper>} />
        <Route path="/contact" element={<AppWrapper><ContactPage /></AppWrapper>} />
        <Route path="/help" element={<AppWrapper><HelpPage /></AppWrapper>} />
        <Route path="/termsofuse" element={<AppWrapper><TermsOfUsePage /></AppWrapper>} />
        <Route path="/privacypolicy" element={<AppWrapper><PrivacyPolicyPage /></AppWrapper>} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AppWrapper><RegisterPage /></AppWrapper>} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AppWrapper><LoginPage /></AppWrapper>} />
        <Route path="/pricing" element={<AppWrapper><PricingPage /></AppWrapper>} />
        <Route path="/check-email" element={<AppWrapper><CheckEmailPage /></AppWrapper>} />
        <Route path="/verify-email/:token" element={<AppWrapper><VerifyEmailPage /></AppWrapper>} />
        <Route path="/forgot-password" element={<AppWrapper><ForgotPasswordPage /></AppWrapper>} />
        <Route path="/reset-password/:token" element={<AppWrapper><ResetPasswordPage /></AppWrapper>} />
  
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppWrapper><DashboardPage /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/success" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppWrapper><SuccessPage /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/canceled" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppWrapper><CanceledPage /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exo" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Pro">
              <AppWrapper><ExoPage /></AppWrapper>
            </ProtectedRoute>
          } 
        />
  
        {/* Level 1 routes */}
        <Route 
          path="/level-1/a/lesson-1" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Standard">
              <AppWrapper><Lesson1a1 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/a/lesson-2" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Standard">
              <AppWrapper><Lesson1a2 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/b/lesson-1" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Standard">
              <AppWrapper><Lesson1b1 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/b/lesson-2" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Standard">
              <AppWrapper><Lesson1b2 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/c/lesson-1" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Standard">
              <AppWrapper><Lesson1c1 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/c/lesson-2" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Standard">
              <AppWrapper><Lesson1c2 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
  
        {/* Quiz routes */}
        <Route 
          path="/level-1/a/quiz-1" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Pro">
              <AppWrapper><Quiz1a1 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/a/quiz-2" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Pro">
              <AppWrapper><Quiz1a2 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/b/quiz-1" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Pro">
              <AppWrapper><Quiz1b1 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/b/quiz-2" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Pro">
              <AppWrapper><Quiz1b2 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/c/quiz-1" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Pro">
              <AppWrapper><Quiz1c1 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/level-1/c/quiz-2" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredPlan="Pro">
              <AppWrapper><Quiz1c2 /></AppWrapper>
            </ProtectedRoute>
          } 
        />
  
        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
};

export default App;