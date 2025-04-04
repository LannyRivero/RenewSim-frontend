import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

import TestPage from "../pages/TestPage";
import TestimonialsPage from "../pages/TestimonialsPage";

import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import SimulationPage from "@/pages/dashboard/simulation/SimulationPage";
import SimulationHistory from "@/pages/dashboard/history/SimulationHistory";
import UserSettings from "@/pages/dashboard/user/UserSettings";

import AdminDashboard from "@/pages/dashboard/adminPanel/AdminDashboard";

import Layout from "../components/layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
      </Route>

      {/*Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard de Usuario */}
        <Route path="/dashboard/user" element={<UserDashboard />}>
          <Route index element={<SimulationPage />} /> {/* Simulación por defecto */}
          <Route path="history" element={<SimulationHistory />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>

        {/* Admin Panel */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/dashboard/admin/users" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/*Ruta comodín */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;







