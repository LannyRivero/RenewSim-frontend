import React from "react";
import { motion } from "framer-motion";

const PrimaryButton = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        w-full px-6 py-2 rounded-lg 
        bg-green-500/70 dark:bg-green-600/60 backdrop-blur-md
        text-white font-semibold text-sm shadow-md
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

