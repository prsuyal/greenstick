import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";
import stripePromise from "../utils/stripe";
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

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
            features: ['Level 1 access', 'Levels 2–6 (coming soon)', 'Comprehensive dictionary', 'Exo 1.0 trial'],
            monthlyPriceId: 'price_1PXvWF2KoGC9FXDgwDBzvzPj',
            yearlyPriceId: 'price_1PXvWd2KoGC9FXDg6uDjUcck',
        },
        {
            name: 'Pro',
            description: 'Bang for your buck.',
            monthlyPrice: 28,
            yearlyPrice: 280,
            features: ['Everything in Standard', 'Quizzes for optimal retention', 'Exclusive bonus lessons (coming soon)', 'Full access to Exo 1.0'],
            monthlyPriceId: 'price_1PXvXF2KoGC9FXDgQ8xGpC9P',
            yearlyPriceId: 'price_1PXvXP2KoGC9FXDgK1hLoSA3',
        },
        {
            name: 'Ultimate',
            description: 'Best of the best.',
            monthlyPrice: 36,
            yearlyPrice: 360,
            features: ['Everything in Pro', 'Early access to beta features', 'Weekly reviews (coming soon)',  'Exo 2.0 (coming soon)'],
            monthlyPriceId: 'price_1PXvXn2KoGC9FXDgBs3OOVNi',
            yearlyPriceId: 'price_1PXvY02KoGC9FXDgIQFabFb8',
        },
    ];

    const handleSubscribe = async (plan) => {
        if (!isAuthenticated) {
            navigate('/register');
        } else if (user.subscription_id) {
            try {
                const response = await fetch('https://api.greenstickusa.com/api/stripe/create-customer-portal-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user.id }),
                });

                const data = await response.json();
                if (response.ok) {
                    window.location.href = data.url;
                } else {
                    console.error('Failed to create customer portal session:', data);
                }
            } catch (error) {
                console.error("Error creating customer portal session:", error);
            }
        } else {
            try {
                const response = await fetch('https://api.greenstickusa.com/api/stripe/create-checkout-session', {
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

    const getButtonText = (planName) => {
        if (!isAuthenticated || !user.subscription_id) {
            return 'Subscribe';
        }
        if (user.plan === planName) {
            return 'Current Plan';
        }
        const currentPlanIndex = plans.findIndex(p => p.name === user.plan);
        const thisPlanIndex = plans.findIndex(p => p.name === planName);
        if (thisPlanIndex > currentPlanIndex) {
            return 'Upgrade';
        }
        return 'Downgrade';
    };

    return (
        <>
        <Helmet>
        <title>Pricing - Greenstick</title>
    </Helmet>
        <div className="flex flex-col min-h-screen bg-white">
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
            <div className="flex-grow pb-32 pt-24 md:pt-28 lg:pt-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center relative">
                        
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
                                    className={`text-white font-medium py-2 px-4 rounded transition-colors duration-300 ${
                                        getButtonText(plan.name) === 'Current Plan' 
                                            ? 'bg-gray-400 cursor-default' 
                                            : 'bg-gs-dark-green hover:bg-black'
                                    }`}
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={getButtonText(plan.name) === 'Current Plan'}
                                >
                                    {getButtonText(plan.name)}
                                </button>
                            </div>
                        ))}
                    </div>
                    {isAuthenticated && (
                        <div className="mt-8 text-center">
                            <a
                                href="#"
                                onClick={() => navigate('/dashboard')}
                                className="text-gs-dark-green hover:underline font-[Poppins]"
                            >
                                Continue to dashboard
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
        </>
    );
};

export default PricingPage;