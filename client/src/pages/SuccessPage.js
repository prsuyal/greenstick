import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = ({ user, fetchUpdatedUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchUpdatedUser(user.id);
    }
  }, [user, fetchUpdatedUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Payment Successful!</h1>
    </div>
  );
};

export default SuccessPage;
