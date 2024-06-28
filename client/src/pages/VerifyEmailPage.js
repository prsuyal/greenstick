import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };

  const handleSubmit = async () => {
    const verificationCode = code.join('');
    const email = localStorage.getItem('userEmail'); 

    try {
      const response = await axios.post('https://api.greenstickusa.com/api/auth/verify-email', { email, code: verificationCode });
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.removeItem('userEmail');
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>Check your email for a verification code and type it in here:</p>
      <div>
        {code.map((num, index) => (
          <input
            key={index}
            type="text"
            value={num}
            onChange={(e) => handleChange(e, index)}
            maxLength="1"
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Verify</button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmailPage;
