import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsLogoBlack from "../assets/images/logo-black.svg";
import useScript from '../useScript.js';
import '../assets/styles/customStyles.css';

const PricingPage = () => {
    const navigate = useNavigate();
    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(0);

    useScript('https://js.stripe.com/v3/pricing-table.js');

    useEffect(() => {
        const handleResize = () => {
            if (navRef.current) {
                setNavHeight(navRef.current.offsetHeight + 20); 
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div ref={navRef} className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <img src={gsLogoBlack} alt="Greenstick logo" className="h-14 cursor-pointer" onClick={() => navigate("/")}/>
                    <div className="flex gap-6">
                        <button
                            className="border-2 border-black text-black font-bold bg-white py-2 px-4 rounded-md hover:bg-black hover:text-white transition-colors duration-300"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </button>
                        <button
                            className="border-2 border-black text-white font-bold bg-black py-2 px-4 rounded-md hover:bg-white hover:text-black transition-colors duration-300"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>

            <div className="promo-banner" style={{ marginTop: `${navHeight}px` }}>
                <div className="promo-text">
                    Use promo code <span className="font-bold text-gs-dark-green">FIRST</span> for a special discount
                </div>
            </div>

            <section style={{marginTop: '1rem'}}>
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-xl px-8 mx-auto text-center">
                        <h2 className="text-2xl font-bold text-black sm:text-3xl lg:text-6xl">
                            Pricing
                        </h2>
                    </div>

                    <div style={{ marginTop: '1rem', marginBottom: '5rem' }}>
                        <stripe-pricing-table
                            pricing-table-id="prctbl_1PKPWw2KoGC9FXDgbDpEsG3r"
                            publishable-key="pk_test_51PJ7rY2KoGC9FXDgdgaJKXvZRk2FGf91kuADV3jHASQLhVEGLhjcFVf5dlGzp05Aan0Tth7MFPnXGugSBcZVrKS400I7bl88MM">
                        </stripe-pricing-table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingPage;
