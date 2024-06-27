import React from 'react';
import { Link } from 'react-router-dom';

const CanceledPage = () => {
  return (
    <div>
      <h1>Payment Canceled</h1>
      <p>Your payment was canceled. If you have any questions, please contact support at support@greenstickusa.com.</p>
      <Link to="/pricing">Return to Pricing</Link>
    </div>
  );
};

export default CanceledPage;