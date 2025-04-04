import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Unauthorized from '../pages/Unauthorized';

import TestPage from '../pages/TestPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import UserHistory from "@/pages/dashboard/user/UserHistory";
import UserSettings from "@/pages/dashboard/user/UserSettings"; 
import AdminDashboard from "@/pages/dashboard/adminPanel/AdminDashboard";

import Layout from '../components/layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌐 Layout general con Header y Footer público */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
      </Route>

      {/* 🔐 Rutas protegidas para usuarios autenticados */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/user/history" element={<UserHistory />} />
        <Route path="/dashboard/user/settings" element={<UserSettings />} /> 
      </Route>

      {/* 🔐 Rutas protegidas SOLO para ADMIN */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/dashboard/admin/users" element={<AdminDashboard />} />
      </Route>

      {/* 🔄 Ruta comodín para redireccionar */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;






