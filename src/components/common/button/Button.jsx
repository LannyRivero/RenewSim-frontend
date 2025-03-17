
import React from "react";

const Button = ({ text, type = "primary", onClick, disabled = false }) => {
    const baseStyles = "inline-block px-5 py-2 text-lg font-bold text-center rounded-md transition-all duration-200 ease-in-out transform";

    const typeStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-700 hover:scale-105",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 hover:scale-105",
        success: "bg-green-500 text-white hover:bg-green-700 hover:scale-105",
        danger: "bg-red-500 text-white hover:bg-red-700 hover:scale-105",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed hover:scale-100"
    };

    return (
        <button
            className={`${baseStyles} ${disabled ? typeStyles.disabled : typeStyles[type]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
