import React from "react";
import { motion } from "framer-motion";

const PrimaryButton = ({ children, onClick, type = "button", disabled = false }) => {

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

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
        bg-green-500/70 dark:bg-green-600/60 backdrop-blur-md
        text-white font-semibold text-sm shadow-md hover-glow
        transition-all duration-300 ease-in-out
        hover:bg-green-600/80 dark:hover:bg-green-700/80
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;



