import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            animate={{ opacity: 1, height: 'auto' }}
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

const FAQSection = () => {
  const faqItems = [
    { question: "How much does Greenstick cost?", answer: "You can find detailed price information at our Pricing page. Keep in mind that until Greenstick is released on August 1, you can get your first three months 20% off by using code EARLY at checkout!" },
    { question: "How can I get Exo?", answer: "Once Greenstick is released on August 1, a trial of Exo will be available to users on the Standard plan, while users on the Pro and Ultimate plans will have near-complete access to all of Exo’s abilities." },
    { question: "How do I change or cancel my subscription?", answer: "Log in to your account and navigate to the Settings page. From there, you will be able to make changes to your account and subscription. Please note that at this time, we cannot offer refunds under any circumstances." },
    { question: "How do I register?", answer: "Just click the link here and follow the steps!" },
    { question: "How do I change or cancel my subscription?", answer: "Log in to your account and navigate to the Settings page. From there, you will be able to make changes to your account and subscription. Please note that at this time, we cannot offer refunds under any circumstances." },
    { question: "Where can I ask more questions?", answer: "Try checking our help page first. If you’re still not sure, feel free to contact us at the email address to the left!" },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-5xl font-[Poppins] mb-8">Need help?</h2>
            <div className="mb-8">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-gs-dark-green mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="font-[Poppins] font-medium">support@greenstickusa.com</div>
                  <div className="text-sm text-gray-500">Support Email</div>
                </div>
              </div>
            </div>
            <a href="/help" className="text-gs-dark-green font-[Poppins] font-medium flex items-center">
              Help
              <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="md:w-2/3 md:pl-16">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;