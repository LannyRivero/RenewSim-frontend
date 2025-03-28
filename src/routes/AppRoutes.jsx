import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Layout from '../components/layout/Layout'; // contenedor con Header y <Outlet />

// Páginas protegidas (ej. Dashboard, Config, etc.)
import TestPage from '../pages/TestPage';
import TestimonialsPage from '../pages/TestimonialsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />

      {/* Privadas con layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

