import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./components/ErrorPage"
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import ModuleTemplate from './components/common/ModuleTemplate';
import Module1 from './pages/Level 1/1A/Lesson 1/Module1';
import Module2 from './pages/Level 1/1A/Lesson 1/Module2';
import Module3 from './pages/Level 1/1A/Lesson 1/Module3';

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
  },
  {
    path: "/pricing",
    element: <PricingPage />,
    errorElement: <ErrorPage  />
  },
  {
    path: "/module",
    element: <ModuleTemplate />,
    errorElement: <ErrorPage />
  },
  {
    path: "/module1",
    element: <Module1 />,
    errorElement: <ErrorPage />
  },
  {
    path: "/module2",
    element: <Module2 />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/module3",
    element: <Module3/>,
    errorElement: <ErrorPage/>
  }
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
