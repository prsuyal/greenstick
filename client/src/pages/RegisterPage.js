import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";
import { Helmet } from 'react-helmet';
import ErrorMessage from "../components/ErrorMessage";
import DisclaimerModal from "./Disclaimer";

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
    parentalApprovalChecked: false,
  });
  const [isUnder18, setIsUnder18] = useState(false);
  const [isUnder13, setIsUnder13] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const today = new Date();
    const birthDate = new Date(userData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setIsUnder18(age < 18);
    setIsUnder13(age < 13);
  }, [userData.dateOfBirth]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setUserData({ ...userData, dateOfBirth: date });
  };

  const handleCheckboxChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.checked });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsDisclaimerOpen(true);
  };

  const handleConfirmRegister = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setErrorMessage("Please complete the reCAPTCHA");
      return;
    }
  
    if (isUnder13) {
      setErrorMessage("You must be at least 13 years old to register.");
      recaptchaRef.current.reset();
      return;
    }
  
    if (isUnder18 && !userData.parentalApprovalChecked) {
      setErrorMessage("You must have parental approval to sign up if you are under 18.");
      recaptchaRef.current.reset();
      return;
    }
  
    if (!validatePassword(userData.password)) {
      setErrorMessage("Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.");
      recaptchaRef.current.reset();
      return;
    }
  
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
            recaptchaToken: recaptchaValue,
          }),
        }
      );
      const responseData = await response.json();
  
      if (response.ok) {
        onRegister();
        navigate("/check-email", { state: { email: userData.email } });
      } else {
        setErrorMessage(responseData.message || "Registration failed");
        recaptchaRef.current.reset();
      }
    } catch (error) {
      setErrorMessage("Network error, please try again later.");
      recaptchaRef.current.reset();
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

        <div className="mb-24 md:mb-32 lg:mb-36 pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border-solid border-black border-2">
            <h1 className="text-center text-4xl font-medium font-[Poppins] text-black mb-8">
              Join Greenstick
            </h1>
            {errorMessage && (
              <ErrorMessage 
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
              />
            )}
            <div>
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
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                    )}
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
                      maxDate={new Date()}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
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
                    {isUnder18 && (
                      <div className="flex items-center">
                        <input
                          id="parentalApprovalChecked"
                          name="parentalApprovalChecked"
                          type="checkbox"
                          checked={userData.parentalApprovalChecked}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-gs-dark-green focus:ring-gs-dark-green border-gray-300 rounded"
                          required
                        />
                        <label
                          htmlFor="parentalApprovalChecked"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          I have parental approval to sign up
                        </label>
                      </div>
                    )}
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey='6LfiZh4qAAAAAC0VLWt_g9jiXZ7gNkW47Of2MhA3'
                  />
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
      <DisclaimerModal 
        isOpen={isDisclaimerOpen} 
        onClose={() => {
          setIsDisclaimerOpen(false);
          handleConfirmRegister();
        }} 
      />
    </>
  );
};

export default RegisterPage