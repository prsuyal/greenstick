import React, { useState, useEffect, useRef } from "react";
import gsap from 'gsap';
import timcook from "../../../../assets/images/timcookillustration.svg";
import apple from "../../../../assets/images/Apple_logo_black.svg"; 
import ModuleTemplate from '../../../../components/common/ModuleTemplate';

const Module2 = () => {
    const titleRef = useRef(null);
    const appleRef = useRef(null);
    const timCookRef = useRef(null);
    const textRef = useRef(null);
    const [index, setIndex] = useState(0);
    const fullText = "Apple’s CEO is Tim Cook, but he doesn’t actually own the whole company.";
    const typeSpeed = 50;
    const startTimCook = fullText.indexOf("Tim Cook");
    const endTimCook = fullText.indexOf("company") + "company".length;
    

    useEffect(() => {
        gsap.timeline()
            .fromTo(titleRef.current, 
                { y: -100, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
            )
            .fromTo(appleRef.current, 
                { scale: 0.2, rotation: -45, opacity: 0 }, 
                { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" },
                "<0.5"
            );
    }, []);
    
    

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setIndex(index + 1);
                if (index === startTimCook) {
                    gsap.to(timCookRef.current, { autoAlpha: 1, x: 0, duration: 0.5 });
                }
                if (index === endTimCook) {
                    gsap.to(timCookRef.current, { x: 100, autoAlpha: 0, duration: 0.5 });
                }
            } else {
                clearInterval(interval);
            }
        }, typeSpeed);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="relative min-h-screen">
            <ModuleTemplate previousPath="/module1" continuePath="/module3">
                <div className="relative text-center pt-10">
                    <h1 ref={titleRef} className="text-6xl font-[Poppins] font-bold pb-10">
                        A Look at Apple
                    </h1>
                    <div className="flex justify-center items-center mt-2">
                        <img ref={appleRef} src={apple} alt="Apple Logo" className="w-48 h-48 object-contain" />
                    </div>
                    <p ref={textRef} className="text-lg mt-10">
                        {fullText.substring(0, index)}
                    </p>
                    <div className="fixed bottom-0 right-0 transform transition-all ease-in-out">
                        <img ref={timCookRef} src={timcook} alt="Tim Cook" className="w-32 h-auto opacity-0" />
                    </div>
                </div>
            </ModuleTemplate>
        </div>
    );
};

export default Module2;
