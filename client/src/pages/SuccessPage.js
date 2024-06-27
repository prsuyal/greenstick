import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. If you have any questions, please contact support at support@greenstickusa.com.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default SuccessPage;