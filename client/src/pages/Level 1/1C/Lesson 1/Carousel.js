import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = ({ images, blurred }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image.src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    loadImages();
  }, [images]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!imagesLoaded) {
    return <div className="h-96 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={`bg-gray-100 rounded-xl p-6 my-8 shadow-lg ${blurred ? 'filter blur-md' : ''}`}>
      <h3 className="text-2xl font-bold mb-4 text-center">Candlestick Anatomy</h3>
      <div className="relative w-full max-w-2xl mx-auto h-96">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-64 flex items-center justify-center mb-4">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].caption}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-lg font-semibold text-center mb-2">{images[currentIndex].caption}</p>
            <p className="text-sm text-gray-600 text-center">{images[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;