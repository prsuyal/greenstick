import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { animateScroll as scroll } from 'react-scroll';
import ModuleTemplate from '../../../../components/common/ModuleTemplate';
import Tooltip from '../../../../components/common/Tooltip';

const Module1 = () => {
    const titleRef = useRef(null);
    const [contentVisible, setContentVisible] = useState(false);
    const additionalContentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
        );
    }, []);
    useEffect(() => {
        if (contentVisible) {
            scroll.scrollTo(additionalContentRef.current.offsetTop, {
                duration: 500,
                smooth: "easeInOutQuart"
            });
        }
    }, [contentVisible]); 
    const handleContinueClick = () => {
        setContentVisible(true);
    };

    const finalButtonConfigurations = [
        {
            key: 'prev',
            text: 'Previous',
            className: 'border-2 border-black text-black font-bold bg-white py-2 px-4 rounded-md hover:text-white hover:bg-black transition-colors duration-300',
            action: { type: 'navigate', path: '/' } 
        },
        {
            key: 'next',
            text: 'Next',
            className: 'font-[Poppins] bg-black border-2 border-black text-white font-bold py-2 px-4 rounded-md hover:text-black hover:bg-white transition-colors duration-300',
            action: { type: 'function', func: handleContinueClick }
        }
    ];
    const inlineButtonConfigurations = [
        {
            key: 'continue',
            text: 'Continue',
            className: 'font-[Poppins] bg-black border-2 border-black text-white font-bold py-2 px-4 rounded-md hover:text-black hover:bg-white transition-colors duration-300',
            action: { type: 'function', func: handleContinueClick }
        }
    ];

    return (
        <ModuleTemplate 
        inlineButtonConfigurations={contentVisible ? null : inlineButtonConfigurations}
        navigationButtonConfigurations={contentVisible ? finalButtonConfigurations : null}
    >
            <div className="max-w-5xl mx-auto">
                <h1
                    ref={titleRef}
                    className="text-center pt-10 text-6xl font-[Poppins] font-bold pb-10"
                >
                    Getting Started
                </h1>
                <p className="mt-4 mb-4 text-lg">
                    So, you want to know what the stock market is? That’s a complicated ask, so let’s start with the basics.
                </p>
                <p className="mt-4 mb-4 text-lg">
                    To understand what the stock market is, we must understand what is meant by a {" "}
                    <Tooltip term="public company" definition="A company that anyone can buy a piece of." />.
                </p>
                {contentVisible && (
                    <div ref={additionalContentRef}>
                        <p className="mt-4 mb-4 text-lg">
                            Additional content revealed when clicking continue. You can add more text here.
                        </p>
                        <p className="mt-4 mb-4 text-lg">
                            Another piece of text to further explain the topic. Continue adding as much content as needed.
                        </p>
                    </div>
                )}
            </div>
        </ModuleTemplate>
    );
};

export default Module1;
