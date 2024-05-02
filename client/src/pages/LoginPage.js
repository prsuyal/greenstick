import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/customStyles.css";
import googleIcon from "../assets/images/icons8-google.svg";
import appleIcon from "../assets/images/icons8-apple-logo.svg";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Login successful', responseData);
                navigate("/dashboard")
            } else {
                console.log('Login failed:', responseData.message);
                alert(responseData.message || "Failed to log in");
            }
        } catch (error) {
            console.error('Network request failed:', error);
            alert("Network error, please try again later.");
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          <div className="typewriter mb-8">
            <h1 className="text-6xl font-bold font-[Poppins]">
              <span className="text-gs-blueish-black">Welcome to</span>
              <span className="text-gs-dark-green"> Greenstick</span>
            </h1>
          </div>
          <div className="w-full max-w-md p-8 text-center border rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold font-[Poppins] text-gs-blueish-black mb-6">
              Login to your account
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="w-full p-3 bg-gs-ultralight-green text-gs-blueish-black rounded-md hover:bg-gs-grayish-green">
                Login
              </button>
            </form>
            <div className="mt-4 text-gs-dark-gray font-[Poppins]">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-gs-dark-green hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      );
};

export default LoginPage;
