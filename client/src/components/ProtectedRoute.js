import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredPlan }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setIsAuthenticated(!!user);
      setUserPlan(user?.plan || null);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const planHierarchy = ['Standard', 'Pro', 'Ultimate'];

  const hasRequiredPlan = () => {
    if (!requiredPlan) return true;
    if (!userPlan) return false;
    
    const userPlanIndex = planHierarchy.indexOf(userPlan);
    const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
    
    return userPlanIndex >= requiredPlanIndex;
  };

  if (requiredPlan && !hasRequiredPlan()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;