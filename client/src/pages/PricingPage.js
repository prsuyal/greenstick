import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";
import stripePromise from "../utils/stripe";

const PricingPage = ({ isAuthenticated, onPayment, user, onLogout }) => {
    const navigate = useNavigate();
    const [isYearly, setIsYearly] = useState(false);
    const [checkoutSessionId, setCheckoutSessionId] = useState(null);
    const plans = [
        {
            name: 'Standard',
            description: 'Starting point.',
            monthlyPrice: 20,
            yearlyPrice: 200,
            features: ['Levels 1-6', 'Paper money trading', 'Exo 1.0 trial'],
            monthlyPriceId: 'price_1PKOsm2KoGC9FXDg42Tta0JW',
            yearlyPriceId: 'price_1PKOsm2KoGC9FXDgJi4UOohD',
        },
        {
            name: 'Pro',
            description: 'Bang for your buck.',
            monthlyPrice: 28,
            yearlyPrice: 280,
            features: ['Quizzes for optimal retention', 'Bonus lessons', 'Exo 1.0'],
            monthlyPriceId: 'price_1PKOtk2KoGC9FXDgtU7cuYnO',
            yearlyPriceId: 'price_1PKOtk2KoGC9FXDgn2CGgXR5',
        },
        {
            name: 'Ultimate',
            description: 'Best of the best.',
            monthlyPrice: 36,
            yearlyPrice: 360,
            features: ['Weekly reviews', 'Early access to beta features', 'Exo 1.5'],
            monthlyPriceId: 'price_1PKOu72KoGC9FXDgT425OKJ3',
            yearlyPriceId: 'price_1PKOub2KoGC9FXDgKKR0cUa1',
        },
    ];

    const handleSubscribe = async (plan) => {
        if (!isAuthenticated) {
          navigate('/register');
        } else {
          console.log('User before subscribing:', user);
          try {
            const response = await fetch('https://www.greenstickusa.com/api/stripe/create-checkout-session', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                priceId: isYearly ? plan.yearlyPriceId : plan.monthlyPriceId,
                userId: user.id,
              }),
            });
      
            const session = await response.json();
            if (response.ok) {
              setCheckoutSessionId(session.id);
              console.log('Checkout session created:', session);
            } else {
              console.error('Failed to create checkout session:', session);
            }
          } catch (error) {
            console.error("Error in subscription process:", error);
          }
        }
      };
      

    useEffect(() => {
        if (checkoutSessionId) {
            const loadCheckout = async () => {
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                    sessionId: checkoutSessionId,
                });
                if (error) {
                    console.warn('Error:', error);
                }
            };
            loadCheckout();
        }
    }, [checkoutSessionId]);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation bar */}
            <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <img
                        src={gsLogoBlack}
                        alt="Greenstick logo"
                        className="h-8 sm:h-10 md:h-12 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {isAuthenticated ? (
                            <button
                                className="border-2 border-black text-black font-bold bg-white py-1 px-2 sm:px-3 sm:py-2 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
                                onClick={onLogout} 
                            >
                                Log out
                            </button>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Pricing content */}
            <div className="pb-32 pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="font-[Poppins] text-7xl font-medium mb-4">Pricing</h1>
                        <p className="font-[Poppins] text-2xl mb-8">Choose the plan that's right for you.</p>
                        <div className="font-[Poppins] flex justify-center items-center mb-8">
                            <span className={`mr-2 ${!isYearly ? 'text-gs-dark-green' : ''}`}>Monthly</span>
                            <button
                                className={`w-12 h-6 rounded-full p-1 ${isYearly ? 'bg-gs-dark-green' : 'bg-gray-300'}`}
                                onClick={() => setIsYearly(!isYearly)}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white transform duration-300 ease-in-out ${isYearly ? 'translate-x-6' : ''}`} />
                            </button>
                            <span className={`ml-2 ${isYearly ? 'text-gs-dark-green' : ''}`}>Yearly</span>
                        </div>
                    </div>

                    <div className="font-[Poppins] grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div key={plan.name} className="border rounded-lg p-6 flex flex-col">
                                <h2 className="text-2xl font-medium mb-2">{plan.name}</h2>
                                <p className="text-gray-600 mb-4">{plan.description}</p>
                                <p className="text-3xl font-medium mb-6">
                                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    <span className="text-sm font-normal">/{isYearly ? 'year' : 'month'}</span>
                                </p>
                                <ul className="mb-6 flex-grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center mb-2">
                                            <svg className="w-4 h-4 mr-2 text-gs-dark-green" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className="bg-gs-light-green text-white font-medium py-2 px-4 rounded hover:bg-gs-dark-green transition-colors duration-300"
                                    onClick={() => handleSubscribe(plan)}
                                >
                                    Subscribe
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PricingPage;
