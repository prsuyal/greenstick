import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ModuleTemplate from '../../../../components/common/ModuleTemplate';

const Module3 = () => {
    const textRef = useRef(null);
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "Apple isn’t even owned by a single parent company, or a group of 5.",
        "Not even by 10...",
        "Or 20...",
        "Or even 100...",
        "In fact, it’s owned by tens of thousands of shareholders from all around the world.",
        "To illustrate, imagine the company's ownership split among 23,763 people."
    ];

    useEffect(() => {
        const animateText = () => {
            if (textIndex < texts.length) {
                gsap.fromTo(textRef.current, 
                    { y: 50, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 1, onComplete: () => {
                        setTimeout(() => {
                            if (textIndex < texts.length - 1) {
                                gsap.to(textRef.current, { y: -50, opacity: 0, duration: 1, onComplete: () => {
                                    setTextIndex(textIndex + 1);
                                }});
                            }
                        }, 2000);
                    }}
                );
            }
        };

        animateText();
    }, [textIndex]);

    return (
        <ModuleTemplate previousPath="/module2" continuePath="/module4">
            <div className="max-w-5xl mx-auto pt-10">
                <div className="text-left">
                    <p ref={textRef} className="text-lg mt-4 mb-4">
                        {texts[textIndex]}
                    </p>
                </div>
            </div>
        </ModuleTemplate>
    );
};

export default Module3;
