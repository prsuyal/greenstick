import React, { useRef, useEffect } from 'react';
import icon from '../assets/images/personicon.svg'; 

const testimonials = [
  {
    text: "Greenstick flips existing methods of stock market education upside down with its creative approach. If you're looking for something more than Investopedia or YouTube, this is the place for you.",
    name: 'Dinakar K.',
    title: 'Lead Analyst',
    company: 'Cetera Financial Group',
  },
  {
    text: 'With Greenstick, learning about the stock market is no longer daunting. The interactivity and personalized learning paths make it an invaluable resource for anyone serious about understanding the market.',
    name: 'Harish S.',
    title: 'Lead Quant Developer',
    company: 'Franklin Templeton Investments',
  },
  {
    text: "Exo is a game-changer in stock market education. The chatbot’s ability to analyze trades and provide personalized feedback makes learning interactive and highly effective.",
    name: 'Sreeni H.',
    title: 'Algorithms Engineer',
    company: 'Sumitomo Bank',
  }
];

const Testimonials = () => {
  return (
    <div className="mt-12 py-12 bg-gs-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-[Poppins] text-black mb-4">
        Check out what experts have to say.
        </h2>
        <p className="mt-4 text-lg text-black font-[Poppins]">
          At Greenstick, we pride ourselves on delivering high quality content.
          <br />
          But don't just take our word for it. See what the experts are saying.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="transform transition-transform duration-300 hover:scale-105 flex-shrink-0 w-80 p-8 bg-white rounded-lg border border-gs-dark-gray text-center"
            >
              <img src={icon} alt="Icon" className="mx-auto mb-4 w-12 h-12 rounded-full" />
              <p className="text-base text-black font-[Poppins]">{testimonial.text}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-black font-[Poppins]">{testimonial.name}</p>
                <p className="text-sm text-black font-[Poppins]">{testimonial.title}</p>
                <p className="text-sm text-black font-[Poppins]">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
