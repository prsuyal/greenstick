import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/customStyles.css";
import googleIcon from "../assets/images/icons8-google.svg";
import appleIcon from "../assets/images/icons8-apple-logo.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setUserData({...userData, dateOfBirth: date});
  };
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: userData.username,
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            dateOfBirth: userData.dateOfBirth.toISOString().split('T')[0]  
        }),
    });
      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (response.ok) {
        console.log("Registration successful");
        navigate("/dashboard");
    } else {
        console.log("Registration failed:", responseData.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
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
          Create an account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

<DatePicker
          selected={userData.dateOfBirth}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          className="w-full p-2 border rounded"
          placeholderText="Date of Birth"
        />

          <button
            type="submit"
            className="w-full p-3 bg-gs-ultralight-green text-gs-blueish-black rounded-md hover:bg-gs-grayish-green"
          >
            Sign up with Email
          </button>
        </form>
        <div className="mt-4 text-gs-dark-gray font-[Poppins]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gs-dark-green hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
