import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestPage from "./pages/TestPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <nav className="mb-4">
          <Link to="/test" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
            Go to Test Page
          </Link>
        </nav>

        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<h1 className="text-2xl font-bold">Home Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

