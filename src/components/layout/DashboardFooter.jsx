import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import logo from '@/assets/8408600.jpg';


const Footer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cerrar dropdown al seleccionar una opción
  const handleSelectOption = () => {
    setShowDropdown(false);
  };

  return (
    <footer className="w-full bg-green-50  border-t border-gray-200 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700 relative">
      
      {/* Logo */}
       {/* Logo */}
            <div className="flex items-center space-x-3"> </div>

      {/* Centro: derechos */}
      <div className="text-center mb-2 md:mb-0">
        RENEWSIM © 2025. All rights reserved.
      </div>

      {/* Navegación */}
      <nav className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
        <a href="/" className="hover:text-green-600 transition">Home</a>

        {/* Dropdown Services */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 hover:text-green-600 transition focus:outline-none"
          >
            Services <FaChevronDown className="text-xs mt-1" />
          </button>

          {showDropdown && (
            <div className="absolute top-8 right-0 md:right-auto bg-white border border-gray-200 rounded-md shadow-md py-2 w-40 z-10">
              <a
                href="/services/solar"
                onClick={handleSelectOption}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Solar
              </a>
              <a
                href="/services/wind"
                onClick={handleSelectOption}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Wind
              </a>
              <a
                href="/services/hydro"
                onClick={handleSelectOption}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Hydro
              </a>
            </div>
          )}
        </div>

        <a href="/blog" className="hover:text-green-600 transition">Blog</a>
        <a href="/about" className="hover:text-green-600 transition">About</a>
      </nav>
    </footer>
  );
};

export default Footer;



