import React from "react";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../../assets/images/logo-black.svg";
import Footer from "../../components/common/Footer";
import { Helmet } from 'react-helmet';

const ValuesPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Helmet>
        <title>Our Values - Greenstick</title>
    </Helmet>
    <div className="flex flex-col relative min-h-screen bg-white">
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

      <div className="flex-grow pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Careers</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Our Values.</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6 mb-12">
            <p>
              Welcome! Here's a quick note from one of the founders at Greenstick.
            </p>
            <p>
              If you're thinking about joining Greenstick, we're really excited to get to know you! But before you even begin the application process, we want you to understand the core traits that we value and expect in any member of our team.
            </p>
            <h3 className="text-2xl font-semibold mt-8">A driven mindset</h3>
            <p>
              At Greenstick, we believe in complete ownership. This means you're not just clocking in and out — you take responsibility for every challenge and opportunity. If you see something that needs improvement, you don't wait for someone else to step in. You lead the way, turning ideas into direct impact. We're looking for people who push limits — who are willing to grind when it counts, while still finding the smart way to get things done.
            </p>
            <h3 className="text-2xl font-semibold mt-8">Gold standard work ethic</h3>
            <p>
              You approach every task relentlessly, knowing that excellent isn't a destination but the standard you hold yourself to daily. You thrive on challenges and your ambition doesn't stop until you've reached the peak.
            </p>
            <p>
              Our founding engineer personally designed, built, and productionized Greenstick's core without taking a single day off during the middle of his summer break. This kind of dedication is what defines us. We don't stop when things are difficult; we push through and deliver our best, every single time.
            </p>
            <h3 className="text-2xl font-semibold mt-8">Desire to learn</h3>
            <p>
              We're in the business of educating and empowering people to make genius financial decisions, so a love for learning is baked into everything we do. We expect there to be things that you don't have a clue about. We care more about how quickly you adapt to the environment and master new skills you haven't had before. Whether it's the latest web framework or a new way to solve complex problems, you're expected to absorb knowledge and continuously grow. Curiosity isn't just encouraged — it's required.
            </p>
            <h3 className="text-2xl font-semibold mt-8">Above all, a big heart</h3>
            <p>
              At the core of Greenstick, we believe in doing the right thing, even when no one's looking. We're looking for inherently good humans who have strong moral compasses and a deep sense of empathy. We care about each other and the people we serve. Kindness and integrity are foundational to our work.
            </p>
          </div>
          <div className="flex justify-start mt-12 mb-24">
            <a href="/careers">
            <button 
              onClick={() => navigate("/careers")}
              className="bg-gs-light-green border-2 border-gs-light-green text-black font-bold py-3 px-6 rounded-md hover:text-black hover:bg-gs-dark-green hover:border-gs-dark-green transition-colors duration-300"
            >
              Return to Open Roles
            </button>
            </a>
          </div>
        </div>
        
      </div>
      

      <Footer />
    </div>
    </>
  );
};

export default ValuesPage;