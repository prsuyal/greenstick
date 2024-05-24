import React, { useState } from 'react';
import gsLogoBlack from "../assets/images/logo-black.svg";
import { useNavigate } from "react-router-dom";
import checkImage from "../assets/images/check.svg";

const PricingPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <img src={gsLogoBlack} alt="Greenstick logo" className="h-14" onClick={() => navigate("/")}/>
                    <div className="flex gap-6">
                        <button
                            className="border-2 border-black text-black font-bold bg-white py-2 px-4 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </button>
                        <button
                            className="border-2 border-black text-white font-bold bg-black py-2 px-4 rounded-md font-[Poppins] hover:text-black hover:bg-white transition-colors duration-300"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>

            <section className="py-12 bg-white sm:py-16 lg:py-20">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="py-20 max-w-xl px-8 mx-auto text-center md:px-0">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-[Poppins]">
                            Choose the best plan for you
                        </h2>
                        <p className="mt-6 text-lg font-normal text-gray-600 font-[Poppins]">
                            Choose from our affordable 3 packages
                        </p>
                    </div>

                    <div className="grid max-w-sm grid-cols-1 gap-6 mx-auto mt-8 text-center md:text-left md:mt-16 md:max-w-6xl md:grid-cols-3">
                        <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl">
                            <div className="p-6 lg:px-10 lg:py-8">
                                <h3 className="text-lg font-bold text-gray-900 font-[Poppins]">Standard</h3>
                                <p className="mt-3 text-4xl font-bold text-gray-900 font-[Poppins]">$20/mo, $200/yr</p>
                                <p className="mt-5 text-base font-normal text-gray-600 font-[Poppins]">
                                    Best for individuals
                                </p>
                                <a
                                    href="#"
                                    title=""
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        px-8
                                        py-3.5
                                        w-full
                                        mt-8
                                        text-base
                                        font-bold
                                        text-gray-900
                                        transition-all
                                        duration-200
                                        border-2 border-gray-400
                                        rounded-xl
                                        font-[Poppins]
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                        hover:bg-gray-900
                                        focus:bg-gray-900
                                        hover:text-white
                                        focus:text-white
                                        hover:border-gray-900
                                        focus:border-gray-900
                                    "
                                    role="button"
                                >
                                    Get Started
                                </a>
                                <p className="mt-8 text-base font-bold text-gray-900 font-[Poppins]">What's included:</p>
                                <ul className="mt-4 space-y-3 text-base font-medium text-gray-600 font-[Poppins]">
                                    <li>15 Exo requests trial</li>
                                    <li>All levels</li>
                                    <li>Paper money trading</li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4">
                                <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
                                     style={{ background: "linear-gradient(90deg, #34D399 -0.55%, #10B981 22.86%, #059669 48.36%, #34D399 73.33%, #A7F3D0 99.34%)" }}>
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-gray-900 border border-gray-200 rounded-2xl">
                                <div className="p-6 lg:px-10 lg:py-8">
                                    <h3 className="text-lg font-bold text-white font-[Poppins]">Pro</h3>
                                    <p className="mt-3 text-4xl font-bold text-white font-[Poppins]">$28/mo, $280/yr</p>
                                    <p className="mt-5 text-base font-normal leading-7 text-gray-400 font-[Poppins]">
                                        Best for growing teams
                                    </p>
                                    <a
                                        href="#"
                                        title=""
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            px-8
                                            py-3.5
                                            w-full
                                            mt-8
                                            text-base
                                            font-bold
                                            text-gray-900
                                            bg-white
                                            transition-all
                                            duration-200
                                            border-2 border-transparent
                                            focus:ring-offset-gray-900
                                            rounded-xl
                                            font-[Poppins]
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                                            hover:bg-opacity-90
                                        "
                                        role="button"
                                    >
                                        Get Started
                                    </a>
                                    <p className="mt-8 text-base font-bold text-white font-[Poppins]">What's included:</p>
                                    <ul className="mt-4 space-y-3 text-base font-medium text-gray-400 font-[Poppins]">
                                        <li>15 Exo requests per day</li>
                                        <li>Can attach pictures/files/anything</li>
                                        <li>Can remember what you’ve said in the past</li>
                                        <li>Quizzes</li>
                                        <li>Bonus Lessons, Avatars, Profiles</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl">
                            <div className="p-6 lg:px-10 lg:py-8">
                                <h3 className="text-lg font-bold text-gray-900 font-[Poppins]">Ultimate</h3>
                                <p className="mt-3 text-4xl font-bold text-gray-900 font-[Poppins]">$36/mo, $360/yr</p>
                                <p className="mt-5 text-base font-normal text-gray-600 font-[Poppins]">
                                    Best for large organizations
                                </p>
                                <a
                                    href="#"
                                    title=""
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        px-8
                                        py-3.5
                                        w-full
                                        mt-8
                                        text-base
                                        font-bold
                                        text-gray-900
                                        transition-all
                                        duration-200
                                        border-2 border-gray-400
                                        rounded-xl
                                        font-[Poppins]
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                        hover:bg-gray-900
                                        focus:bg-gray-900
                                        hover:text-white
                                        focus:text-white
                                        hover:border-gray-900
                                        focus:border-gray-900
                                    "
                                    role="button"
                                >
                                    Get Started
                                </a>
                                <p className="mt-8 text-base font-bold text-gray-900 font-[Poppins]">What's included:</p>
                                <ul className="mt-4 space-y-3 text-base font-medium text-gray-600 font-[Poppins]">
                                    <li>40 Exo requests per day</li>
                                    <li>Exo 2.0</li>
                                    <li>Smarter</li>
                                    <li>More powerful</li>
                                    <li>Weekly Review</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PricingPage;
