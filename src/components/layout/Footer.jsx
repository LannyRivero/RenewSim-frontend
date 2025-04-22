import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import logo from '@/assets/8408600.jpg';

const Footer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const currentYear = new Date().getFullYear();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
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

  const handleSelectOption = () => {
    setShowDropdown(false);
  };

  return (
    <footer className="w-full bg-white border-t border-gray-300 py-2 px-3 text-sm">
    <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-6 h-6 rounded-full object-cover" />
        <span className="font-semibold text-gray-700">Renewable Energy Simulator</span>
      </div>
      <p className="text-gray-500">
        RENEWSIM © {currentYear}. Todos los derechos reservados. <span>v1.0.0</span>
      </p>
      <nav className="flex flex-wrap justify-center gap-4 text-gray-600">
        <a href="/" className="hover:text-green-600 transition">Inicio</a>
        <a href="/blog" className="hover:text-green-600 transition">Blog</a>
        <a href="/about" className="hover:text-green-600 transition">Acerca de</a>
        <a href="mailto:soporte@renewsim.com" className="hover:text-green-600 transition">Soporte</a>
      </nav>
    </div>
  </footer>
  
  );
  
};

export default Footer;



