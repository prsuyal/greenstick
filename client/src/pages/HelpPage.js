import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-[Poppins]">{question}</span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gs-dark-green text-2xl"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600 font-[Poppins]"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const HelpPage = () => {
  const navigate = useNavigate();

  const faqData = [
    {
      section: "General",
      questions: [
        {
          question: "What is Greenstick?",
          answer: "Greenstick is an online platform designed to teach anyone how to trade successfully on the stock market. From stocks, to options, to futures and more, Greenstick is a one-stop-shop for traders of all experience levels. "
        },
        {
          question: "How do I get Greenstick?",
          answer: "Greenstick will be released on August 1. You can still sign up now, though, to get a 20% discount on your first three months by using code EARLY at checkout!"
        },
        {
          question: "Can I use Greenstick on mobile?",
          answer: "Yes, although we recommend using Greenstick on non-mobile devices to better enjoy all of its abilities."
        }
      ]
    },
    {
        section: "Product",
        questions: [
          {
            question: "How does Greenstick work?",
            answer: "Greenstick breaks learning down into structured components: Levels, Sublevels, Lessons, Quizzes, and Practicals. Levels cover large topics, while Sublevels break those topics down into digestible pieces. Lessons, Quizzes, and Practicals are used as teaching tools to facilitate the learning process."
          },
          {
            question: "What are Levels 1–6?",
            answer: "These are the Levels that will become available upon Greenstick’s release, with more Levels coming soon! They will cover a variety of topics, ranging from stocks, to options, to futures and more."
          },
          {
            question: "What are Exo 1.0 and Exo 1.5?",
            answer: "Exo 1.0 is the original version of Exo: your personal guide to the stock market and any questions you may have, as well as fully integrated with Greenstick. Exo 1.5 is the next generation of Exo: stronger, faster, and better at offering unique advice."
          },
          {
            question: "What is “paper money” trading?",
            answer: "Built into Greenstick is a paper money trading system that allows you to trade on the live stock market using fake, or “paper,” money. Paper money trading allows you to learn actively and put your knowledge to the test without any of the risks inherent to trading with real money."
          }
        ]
      },
    {
      section: "Pricing",
      questions: [
        {
          question: "How much does Greenstick cost?",
          answer: "You can find detailed price information at our Pricing page."
        },
        {
          question: "Are there any discounts?",
          answer: "Until Greenstick is released on August 1, you can get your first three months 20% off by using code EARLY at checkout!"
        }
      ]
    },
    {
      section: "Support",
      questions: [
        {
          question: "Where can I ask more questions?",
          answer: "Get in touch with us at support@greenstickusa.com! We are always happy to answer any questions you may have."
        },
        {
          question: "Is there a community I can join?",
          answer: "Once Greenstick is released, there will be! You will become a part of a group of like-minded people, all with one goal: to increase their knowledge."
        }
      ]
    }
  ];

  return (
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

      <div className="pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Help</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Frequently Asked Questions</h2>
          
          {faqData.map((section, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-[Poppins] font-medium text-gray-900 mb-6">{section.section}</h3>
              {section.questions.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpPage;
