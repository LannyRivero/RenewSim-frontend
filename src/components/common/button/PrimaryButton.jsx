import React from "react";
import { motion } from "framer-motion";

const PrimaryButton = ({ children, onClick, type = "button", disabled = false }) => {
  const createRipple = (event) => {
    if (disabled) return;

    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  const handleClick = (e) => {
    if (!disabled) {
      createRipple(e);
      onClick && onClick(e);
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        relative overflow-hidden w-full px-6 py-2 rounded-lg 
        bg-green-600 backdrop-blur-md text-white font-semibold text-sm shadow-md 
        hover:bg-green-700 transition-all duration-300 ease-in-out
        disabled:bg-green-400 disabled:text-gray-100 disabled:opacity-70 disabled:cursor-not-allowed
      `}
      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
