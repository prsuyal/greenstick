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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import CheckEmailPage from './pages/CheckEmailPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js'; 
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(userData);
      setHasPaid(userData.hasPaid || false);
      setIsEmailConfirmed(userData.isEmailConfirmed || false);
    }
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
      setUser(updatedUser);
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
        <Route path="/" element={<AppWrapper><LandingPage /></AppWrapper>} />
        <Route path="/about" element={<AppWrapper><AboutPage /></AppWrapper>} />
        <Route path="/contact" element={<AppWrapper><ContactPage /></AppWrapper>} />
        <Route path="/help" element={<AppWrapper><HelpPage /></AppWrapper>} />
        <Route path="/termsofuse" element={<AppWrapper><TermsOfUsePage /></AppWrapper>} />
        <Route path="/privacypolicy" element={<AppWrapper><PrivacyPolicyPage /></AppWrapper>} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AppWrapper><RegisterPage /></AppWrapper>} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AppWrapper><LoginPage /></AppWrapper>} />
        <Route path="/pricing" element={<AppWrapper><PricingPage /></AppWrapper>} />
        <Route path="/dashboard" element={isAuthenticated ? <AppWrapper><DashboardPage /></AppWrapper> : <Navigate to="/login" />} />
        <Route path="/success" element={<AppWrapper><SuccessPage /></AppWrapper>} />
        <Route path="/canceled" element={<AppWrapper><CanceledPage /></AppWrapper>} />
        <Route path="/check-email" element={<AppWrapper><CheckEmailPage /></AppWrapper>} />
        <Route path="/verify-email/:token" element={<AppWrapper><VerifyEmailPage /></AppWrapper>} />
        <Route path="/forgot-password" element={<AppWrapper><ForgotPasswordPage /></AppWrapper>} />
        <Route path="/reset-password/:token" element={<AppWrapper><ResetPasswordPage /></AppWrapper>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
};

export default App;
