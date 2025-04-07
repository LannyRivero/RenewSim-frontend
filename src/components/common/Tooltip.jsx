import React, { useState } from "react";

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 px-3 py-1 text-sm font-medium text-white bg-black rounded shadow-lg bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">
          {text}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-black rotate-45" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

