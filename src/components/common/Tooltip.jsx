import React, { useState, useRef, useEffect } from "react";

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(false), 150);
  };

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (rect.left < 100) {
        setPosition("left");
      } else if (rect.right > screenWidth - 100) {
        setPosition("right");
      } else {
        setPosition("center");
      }
    }
  }, [isVisible]);

  const getTransform = () => {
    switch (position) {
      case "left":
        return "translate-x-0";
      case "right":
        return "translate-x-full -translate-x-4";
      default:
        return "-translate-x-1/2";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <div
        className={`absolute z-50 px-3 py-1 text-sm font-medium text-white bg-black rounded shadow-lg whitespace-nowrap transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          } bottom-full left-1/2 ${getTransform()} mb-2`}
      >
        {text}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-black rotate-45" />
      </div>
    </div>
  );
};

export default Tooltip;


