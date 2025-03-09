import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestPage from "./pages/TestPage";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Barra de Navegación - Responsiva */}
        <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center md:px-12">
          <h1 className="text-xl font-bold text-blue-600">Simulador energias renovables</h1>
          <div className="space-x-4 flex">
            <Link to="/" className="px-4 py-2 text-sm md:text-base bg-green-500 text-white rounded-lg shadow hover:bg-green-700 transition" > Home </Link>
            <Link to="/test" className="px-4 py-2 text-sm md:text-base bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 transition"> Test Page </Link>
          </div>
        </nav>

        {/* Contenido de las Páginas */}
        <div className="flex flex-col items-center justify-center flex-grow w-full px-4 py-8 md:px-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </div>

        {/* Footer - Responsivo */}
        <footer className="w-full text-center py-4 bg-gray-200 text-gray-600 text-sm mt-6">
          © {new Date().getFullYear()} RenewSim - Energía Sostenible para el Futuro
        </footer>
      </div>
    </Router>
  );
}

export default App;


