import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Unauthorized from '../pages/Unauthorized';

import TestPage from '../pages/TestPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import SimulationPage from '../pages/SimulationPage';
import AdminPanel from '../pages/adminPanel/AdminPanel';

import Layout from '../components/layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout general con Header y Footer */}
      <Route element={<Layout />}>
        
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rutas protegidas para usuarios autenticados */}
        <Route element={<ProtectedRoute />}>
          <Route path="/test" element={<TestPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
        </Route>

        {/*  Rutas solo para ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/users" element={<AdminPanel />} />
        </Route>

        {/*  Ruta comodín: redirige cualquier ruta no válida al Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;




