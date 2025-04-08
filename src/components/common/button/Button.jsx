import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary", // primary, secondary, danger, outline, ghost
  size = "md", // sm, md, lg
  icon = null,
  iconPosition = "left",
  isLoading = false,
  noAnimation = false,
}) => {
  const baseStyle = `
    inline-flex items-center justify-center gap-2 
    px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    ${size === "sm" ? "text-xs px-3 py-1.5" : size === "lg" ? "text-base px-6 py-3" : ""}
  `;

  const variantStyle = {
    primary: "bg-green-500/70 dark:bg-green-600/60 text-white hover:bg-green-600/80 dark:hover:bg-green-700/80 backdrop-blur-md",
    secondary: "bg-blue-500/70 dark:bg-blue-600/60 text-white hover:bg-blue-600/80 dark:hover:bg-blue-700/80 backdrop-blur-md",
    danger: "bg-red-500/70 dark:bg-red-600/60 text-white hover:bg-red-600/80 dark:hover:bg-red-700/80 backdrop-blur-md",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 backdrop-blur-md",
    ghost: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 backdrop-blur-md",
  };

  const motionProps = noAnimation
    ? {}
    : {
        whileHover: disabled ? {} : { scale: 1.05 },
        whileTap: disabled ? {} : { scale: 0.95 },
      };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle[variant]}`}
      {...motionProps}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
      {isLoading && <span className="ml-2 animate-spin">⏳</span>}
    </motion.button>
  );
};

export default Button;




