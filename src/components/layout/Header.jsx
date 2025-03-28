import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaClipboardList,
  FaBook,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaShieldAlt
} from "react-icons/fa";
import logo from '../../assets/8408600.jpg';
import { useAuth } from "../../context/AuthContext";
import RoleWrapper from "../RoleWrapper";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLanguageChange = (event) => {
    console.log(`Language changed to: ${event.target.value}`);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md py-3 px-4 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
        <h1 className="text-lg font-bold text-gray-700 dark:text-white">Renewable Energy Simulator</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <NavLink to="/" icon={<FaHome />} label="Home" active={location.pathname === "/"} />

        <RoleWrapper allowedRoles={['USER', 'ADVANCED_USER', 'ADMIN']}>
          <>
            <NavLink to="/configuration" icon={<FaCog />} label="Configuration" active={location.pathname === "/configuration"} />
            <NavLink to="/recommendations" icon={<FaClipboardList />} label="Recommendations" active={location.pathname === "/recommendations"} />
            <NavLink to="/resources" icon={<FaBook />} label="Resources" active={location.pathname === "/resources"} />
          </>
        </RoleWrapper>

        <RoleWrapper allowedRoles={['ADMIN']}>
          <NavLink to="/admin/users" icon={<FaShieldAlt />} label="Panel Admin" active={location.pathname === "/admin/users"} />
        </RoleWrapper>
      </nav>

      {/* Header Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 w-48">
          <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none py-2 px-2 w-full" />
          <button className="text-gray-500">🔍</button>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-xl p-2 rounded-md focus:outline-none">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-500" />}
        </button>

        {/* Language Selector */}
        <select className="border rounded-md p-2 bg-gray-100 dark:bg-gray-700 dark:text-white" onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>

        {/* User Info */}
        {user ? (
          <div className="relative">
            <button onClick={toggleMenu} className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-300">
              <img
                src="https://www.gravatar.com/avatar/?d=mp"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline text-gray-700 dark:text-white">{user.username}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <Link className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" to="/profile">Perfil</Link>
                <Link className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" to="/settings">Configuración</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Iniciar sesión</Link>
        )}

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-40">
          <NavLink to="/" icon={<FaHome />} label="Home" active={location.pathname === "/"} />

          <RoleWrapper allowedRoles={['USER', 'ADVANCED_USER', 'ADMIN']}>
            <>
              <NavLink to="/configuration" icon={<FaCog />} label="Configuration" active={location.pathname === "/configuration"} />
              <NavLink to="/recommendations" icon={<FaClipboardList />} label="Recommendations" active={location.pathname === "/recommendations"} />
              <NavLink to="/resources" icon={<FaBook />} label="Resources" active={location.pathname === "/resources"} />
            </>
          </RoleWrapper>

          <RoleWrapper allowedRoles={['ADMIN']}>
            <NavLink to="/admin/users" icon={<FaShieldAlt />} label="Panel Admin" active={location.pathname === "/admin/users"} />
          </RoleWrapper>
        </nav>
      )}
    </header>
  );
};

const NavLink = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex items-center space-x-2 text-gray-700 dark:text-white hover:text-blue-500 transition ${active ? "font-bold" : ""}`}>
    {icon}
    <span>{label}</span>
  </Link>
);

export default Header;



