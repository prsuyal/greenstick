import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";
import { Helmet } from 'react-helmet';


const RegisterPage = ({ onLogin, onRegister }) => {
  const location = useLocation();
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    email: location.state?.email || "",
    password: "",
    dateOfBirth: new Date(),
    tosChecked: false,
    mailingListChecked: true,
    betaTestingChecked: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setUserData({ ...userData, dateOfBirth: date });
  };

  const handleCheckboxChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.checked });
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://api.greenstickusa.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
          dateOfBirth: userData.dateOfBirth.toISOString().split("T")[0],
          tosChecked: userData.tosChecked,
          mailingListChecked: userData.mailingListChecked,
          betaTestingChecked: userData.betaTestingChecked,
        }),
      }
    );
    const responseData = await response.json();

    if (response.ok) {
      console.log("Registration successful");
      onLogin(responseData);
      onRegister();
      navigate("/pricing");
    } else {
      console.log("Registration failed:", responseData.message);
      alert(responseData.message || "Registration failed");
    }
  } catch (error) {
    console.error("Request failed:", error);
    alert("Network error, please try again later.");
  }
};

  return (
    <>
    <Helmet>
        <title>Register - Greenstick</title>
    </Helmet>
    <div className="relative min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
            src={gsLogoBlack}
            alt="Greenstick logo"
            className="h-8 sm:h-10 md:h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="bg-black border-2 border-black text-white font-bold py-1 px-2 sm:px-3 sm:py-2 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="border-2 border-black text-black font-bold bg-white py-1 px-2 sm:px-3 sm:py-2 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border-solid border-black border-2">
          <h1 className="text-center text-4xl font-medium font-[Poppins] text-black mb-8">
            Join Greenstick
          </h1>
          <div >
            <div>
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={userData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={userData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={userData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <DatePicker
                    id="dateOfBirth"
                    selected={userData.dateOfBirth}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="tosChecked"
                      name="tosChecked"
                      type="checkbox"
                      checked={userData.tosChecked}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-gs-dark-green focus:ring-gs-dark-green border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="tosChecked"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the{" "}
                      <a
                        href="/termsofuse"
                        className="text-gs-dark-green hover:underline"
                      >
                        Terms of Service
                      </a>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="mailingListChecked"
                      name="mailingListChecked"
                      type="checkbox"
                      checked={userData.mailingListChecked}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-gs-dark-green focus:ring-gs-dark-green border-gray-300 rounded"
                    />
                    <label
                      htmlFor="mailingListChecked"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Subscribe to our mailing list
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="betaTestingChecked"
                      name="betaTestingChecked"
                      type="checkbox"
                      checked={userData.betaTestingChecked}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-gs-dark-green focus:ring-gs-dark-green border-gray-300 rounded"
                    />
                    <label
                      htmlFor="betaTestingChecked"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I want to participate in beta testing
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-gs-light-green text-white rounded-md hover:bg-gs-dark-green transition-colors duration-300 font-semibold"
                >
                  Create Account
                </button>
              </form>
              <div className="pt-8 flex flex-col justify-center space-y-6">
              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-gs-dark-green hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default RegisterPage;
