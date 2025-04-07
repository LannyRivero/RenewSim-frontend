import React from "react";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`px-3 py-1 rounded-md shadow transition ${
        darkMode
          ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
          : "bg-gray-800 text-white hover:bg-gray-700"
      }`}
    >
      {darkMode ? "🌞 Claro" : "🌙 Oscuro"}
    </button>
  );
};

export default DarkModeToggle;
