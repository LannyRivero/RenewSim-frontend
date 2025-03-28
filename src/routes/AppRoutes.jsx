import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Layout from '../components/layout/Layout';
import AdminPanel from '../pages/adminPanel/AdminPanel';
import SimulationPage from '../pages/SimulationPage'; // 👈 Añadido

import TestPage from '../pages/TestPage';
import TestimonialsPage from '../pages/TestimonialsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout para rutas públicas + privadas */}
      <Route element={<Layout />}>
        {/* Página pública: Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/simulation" element={<SimulationPage />} /> 
        </Route>

        {/* Rutas protegidas SOLO para ADMIN */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/users" element={<AdminPanel />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;



