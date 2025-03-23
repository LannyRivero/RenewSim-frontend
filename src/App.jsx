import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestPage from "./components/pages/TestPage";
import Home1 from "./components/pages/Home1";
import Header from "./components/Header";
import TestimonialsPage from "./components/pages/TestimonialsPage";
import "./App.css";
import TestComponent from "./components/TestComponent";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">    

        {/* Contenido de las Páginas */}
        <div className="flex flex-col items-center justify-center flex-grow w-full px-4 py-8 md:px-12">
        <Header />
          <Routes>
            <Route path="/" element={<Home1 />} />
        {/*<Route path="/testimonials" element={<TestimonialsPage />} />*/}    
            <Route path="/test" element={<TestComponent />} />
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


