import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./components/ErrorPage"
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",           
    element: <LandingPage />, 
    errorElement: <ErrorPage /> 
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage  />
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage  />
  }
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
