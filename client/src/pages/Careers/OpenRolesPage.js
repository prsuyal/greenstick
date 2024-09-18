import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../../assets/images/logo-black.svg";
import Footer from "../../components/common/Footer";
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";

const RolePopup = ({ role, onClose }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/apply');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{role.title}</h2>
          <button onClick={onClose} className="text-2xl"><FaXmark /></button>
        </div>
        <div className="text-base sm:text-lg space-y-4">
          {role.fullDescription.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <h3 className="text-xl font-semibold mt-6">Key Responsibilities</h3>
          <ul className="list-disc pl-6 space-y-2">
            {role.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
          {role.qualifications && (
            <>
              <h3 className="text-xl font-semibold mt-6">Qualifications</h3>
              <ul className="list-disc pl-6 space-y-2">
                {role.qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </>
          )}
          <p className="font-semibold mt-6">{role.compensation}</p>
        </div>
        <button 
          className="mt-8 bg-gs-light-green text-black font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-md hover:bg-gs-dark-green transition-colors duration-300"
          onClick={handleApply}
        >
          Apply Now
        </button>
      </motion.div>
    </motion.div>
  );
};

const OpenRolesPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      title: "Content Writer",
      shortDescription: "Create engaging and informative lessons that make financial education accessible to everyone.",
      compensation: "Part time $25/hr, potential for substantial growth in the long run",
      fullDescription: [
        "As a content writer at Greenstick, you'll be at the forefront of creating engaging and informative lessons that make financial education accessible to everyone. We need a highly adaptable individual with financial expertise and a passion to teach others.",
        "In-depth knowledge of the stock market is necessary for this role, albeit with no specific requirements. We don't need to know how long you have traded, or whether you've taken a college level course—we just want to see if you have the base experience needed to explain concepts.",
        "Above even knowledge, though, we're looking for candidates who take a creative approach to teaching. The requirement here isn't to demonstrate an extraordinary level of expertise, but rather to pass on the information you do know in a fun and digestible way.",
        "During the second-round interview, you will be asked to walk us through a specific financial concept and explain how you would teach it effectively."
      ],
      responsibilities: [
        "Write well-researched, creative lessons that fit Greenstick's visions",
        "Tailor content to appeal to learners with different levels of experience",
        "Collaborate directly with engineers and animators to create interactive, dynamic lessons",
        "Specifically convey a vision for educational animations",
        "Adapt quickly to task assignments and topics in a fast-paced, high-stakes environment"
      ]
    },
    {
      title: "Growth/Marketing",
      shortDescription: "Scale our platform, focus on expanding our reach and building our brand presence globally.",
      compensation: "Part time $20/hr, potential for substantial growth in the long run",
      fullDescription: [
        "Marketers help us scale our platform, focusing on expanding our reach and building our brand presence. Your role is to ensure we stand out in a crowded space.",
        "After all, all the product quality in the world can't help if no one knows what Greenstick is. We're looking for marketers who understand the startup landscape and can deliver results in an evolving market."
      ],
      responsibilities: [
        "Plan and execute effective digital marketing campaigns working under a tight budget",
        "Analyze market trends to refine our positioning and approach",
        "Manage our brand presence across social media",
        "Leverage user insights to continuously improvement engagement strategies"
      ]
    },
    {
      title: "Animator",
      shortDescription: "Bring our platform to life by creating engaging visual animations to help users understand complex topics.",
      compensation: "Part time $20/hr, potential for substantial growth in the long run",
      fullDescription: [
        "As an animator at Greenstick, you'll be responsible for bringing our platform to life. You'll take content written by our team and make engaging visual animations to help users of all levels better understand complex topics.",
        "Experience with Adobe After Effects is necessary for this role."
      ],
      responsibilities: [
        "Create dynamic animations that bring the writers' vision to life",
        "Work closely with the writers and devs to ensure compatibility and fit",
        "Ensure animations have optimal performance on any web browser"
      ]
    },
    {
      title: "Frontend Engineer",
      shortDescription: "Create seamless user experiences that drive engagement to our platform.",
      compensation: "Part time $25/hr, potential for substantial growth in the long run",
      fullDescription: [
        "As a frontend engineer at Greenstick, you'll be responsible for creating seamless user experiences that drive engagement to our platform. Your primary responsibility will be to transform the content by our writers and animators into interactive, engaging lessons for our users. This role requires a balance of creativity and technical skill, as you'll be directly involved in bringing lessons to life on our platform.",
        "We also don't require our engineers to have a formal background in CS. We understand that different people have different access to higher education, and some people have the skills for engineering jobs before completing or even starting their degrees. At Greenstick, we emphasize a culture of inclusion and creativity, and we'll only judge you based on your skillset, not your access to arbitrary factors."
      ],
      responsibilities: [
        "Implement educational content and animations into interactive lessons",
        "Collaborate with writers and animators to ensure seamless integration and alignment of objectives",
        "Optimize user interactions for speed and responsiveness",
        "Ensure cross-browser compatibility and optimal designs across devices"
      ],
      qualifications: [
        "Proficient in modern frontend frameworks such as React and Tailwind",
        "Familiarity with design tools like Figma",
        "Familiarity with complex animation libraries like GSAP",
        "Understanding of responsive design and web performance optimization",
        "Knowledge of React Native for mobile app development is a plus"
      ]
    },
    {
      title: "Backend Engineer",
      shortDescription: "Implement robust server-side solutions that power our platform.",
      compensation: "Part time $25/hr, potential for substantial growth in the long run",
      fullDescription: [
        "As a backend engineer at Greenstick, you'll be responsible for implementing robust server-side solutions that power our platform. You'll help manage our core infrastructure and work closely with the frontend team to ensure seamless data flow and an optimal user experience.",
        "We also don't require our engineers to have a formal background in CS. We understand that different people have different access to higher education, and some people have the skills for engineering jobs before completing or even starting their degrees. At Greenstick, we emphasize a culture of inclusion and creativity, and we'll only judge you based on your skillset, not your access to arbitrary factors."
      ],
      responsibilities: [
        "Design, build, and maintain scalable APIs and services to support the platform",
        "Work with modern database technologies to store and retrieve app data",
        "Ensure robust security practices in handling sensitive user or financial data",
        "Collaborate with frontend engineers to integrate server-side logic with user-facing features",
        "Monitor, troubleshoot, and optimize backend performance"
      ],
      qualifications: [
        "Proficient in Node.js, Express, RESTful APIs",
        "Experience with both relational and nonrelational databases (PostgreSQL, MongoDB)",
        "Strong understanding of authentication protocols (OAuth, JWT)",
        "Knowledge of cloud platforms (AWS, Heroku) for deployment and scaling",
        "Familiarity with Docker and containerization",
        "Experience with vector databases is a plus"
      ]
    },
    {
      title: "Machine Learning Engineer",
      shortDescription: "Build and refine Exo to become the leading financial education chatbot in the industry.",
      compensation: "Part time $30/hr, potential for substantial growth in the long run",
      fullDescription: [
        "As a machine learning engineer at Greenstick, you're someone who thrives in a flexible, unstructured environment. Your primary responsibility is to focus on building and refining Exo to become the leading financial education chatbot in the industry. You'll ensure Exo seamlessly integrates with our platform to provide personalized and context-aware user interactions.",
        "We also don't require our engineers to have a formal background in CS. We understand that different people have different access to higher education, and some people have the skills for engineering jobs before completing or even starting their degrees. At Greenstick, we emphasize a culture of inclusion and creativity, and we'll only judge you based on your skillset, not your access to arbitrary factors."
      ],
      responsibilities: [
        "Implement and integrate Exo's functionality across the platform",
        "Handle embeddings and context-aware data to personalize Exo's interactions",
        "Collaborate with backend engineers to ensure smooth deployment and operation of AI features",
        "Continuously refine Exo's capabilities to ensure it becomes the go-to chatbot for financial education and trading advice"
      ],
      qualifications: [
        "Strong proficiency in Python",
        "Proficient with OpenAI API and LangChain",
        "Experience with vector databases like Pinecone",
        "Ability to deploy and integrate AI services into production environments",
        "Familiarity with API integration and backend data management",
        "Machine learning research experience a plus"
      ]
    }
  ];

  return (
    <>
    <Helmet>
        <title>Open Roles - Greenstick</title>
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Open Roles.</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6 mb-12">
            <p>
              Hey! Before you apply to a position, please read this quick{" "}
              <a
                href="/our-values"
                className="underline text-black hover:text-green-500"
              >
                note
              </a>
              .
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {roles.map((role, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 cursor-pointer transition-colors duration-300 hover:bg-gray-50"
                onClick={() => setSelectedRole(role)}
              >
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">{role.title}</h3>
                  <p className="text-gray-600 mb-4">{role.shortDescription}</p>
                  <p className="text-sm text-gray-500">{role.compensation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>

    <AnimatePresence>
      {selectedRole && (
        <RolePopup role={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </AnimatePresence>
    </>
  );
};

export default OpenRolesPage;