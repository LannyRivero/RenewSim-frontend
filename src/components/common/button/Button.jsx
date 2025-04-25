import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  isLoading = false,
  noAnimation = false,
  className = "",
}) => {
  const baseStyle = `
    inline-flex items-center justify-center gap-2 
    px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-300
    disabled:cursor-not-allowed
    ${size === "sm" ? "text-xs px-3 py-1.5" : size === "lg" ? "text-base px-6 py-3" : ""}
  `;

  const variantStyle = {
    primary: "bg-green-600 text-white hover:bg-green-700 backdrop-blur-md disabled:bg-green-400 disabled:text-gray-100",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 backdrop-blur-md disabled:bg-blue-400 disabled:text-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700 backdrop-blur-md disabled:bg-red-400 disabled:text-gray-100",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 backdrop-blur-md disabled:text-gray-400",
    ghost: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 backdrop-blur-md disabled:text-gray-400",
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
      className={`${baseStyle} ${variantStyle[variant]} ${disabled ? "opacity-70" : ""} ${className}`} // ✅ USADO AQUÍ
      {...motionProps}
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
      {isLoading && <span className="ml-2 animate-spin">⏳</span>}
    </motion.button>
  );
};

export default Button;
