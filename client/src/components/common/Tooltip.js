import React, { useState } from 'react';

const Tooltip = ({ term, definition }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <span className="relative inline-block cursor-pointer" onMouseLeave={handleMouseLeave}>
            <span
                className="underline decoration-dotted decoration-black hover:text-green-500 hover:font-bold transition-all duration-300"
                onClick={() => setShowTooltip(!showTooltip)}
            >
                {term}
            </span>
            {showTooltip && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white border-2 border-dotted border-black rounded-md shadow-lg z-10 w-max max-w-xs tooltip-content">
                    <p className="text-sm">{definition}</p>
                </div>
            )}
        </span>
    );
};

export default Tooltip;