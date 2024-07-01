import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = ({ user, fetchUpdatedUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchUpdatedUser(user.id).then(() => {
        const timer = setTimeout(() => {
          navigate('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
      });
    }
  }, [user, fetchUpdatedUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[Poppins]">
      <h1 className="text-4xl font-bold">Thanks!</h1>
      <p className="text-xl mt-4">Redirecting in 3 seconds...</p>
    </div>
  );
};

export default SuccessPage;
