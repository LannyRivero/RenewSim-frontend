import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Unauthorized from '../pages/Unauthorized';

import TestPage from '../pages/TestPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import SimulationPage from '../pages/dashboard/simulation/SimulationPage';
import SimulationHistory from "../pages/dashboard/history/SimulationHistory";
import UserDashboard from "@/pages/dashboard/user/UserDashboard";

import AdminDashboard from "@/pages/dashboard/adminPanel/AdminDashboard";


import Layout from '../components/layout/Layout';
import DashboardLayout from '../pages/dashboard/layout/DashboardLayout'; // Nuevo layout para dashboard

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout general con Header y Footer público */}
      <Route element={<Layout />}>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rutas públicas de test/demo */}
        <Route path="/test" element={<TestPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
      </Route>

      {/* Rutas protegidas bajo el DashboardLayout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<SimulationPage />} />
          <Route path="history" element={<SimulationHistory />} />
          <Route path="user" element={<UserDashboard />} />

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="admin/users" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>

      {/* Ruta comodín */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;




