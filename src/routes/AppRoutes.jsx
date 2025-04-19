import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import TestimonialsPage from "@/pages/TestimonialsPage";

import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import SimulationPage from "@/pages/dashboard/simulation/SimulationPage";
import SimulationHistory from "@/pages/dashboard/history/SimulationHistory";
import Comparison from "@/pages/dashboard/comparison/Comparison";
import GlobalTechnologiesComparison from "@/pages/dashboard/comparison/GlobalTechnologiesComparison";
import About from "@/pages/About";
import Resources from "@/pages/Resources";
import AdminTechnologiesPanel from "@/pages/dashboard/admin/AdminTechnologiesPanel";
import AllTechnologiesList from "@/components/technologies/AllTechnologiesList";




import UserSettings from "@/pages/dashboard/user/UserSettings";

import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";

import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
      </Route>

      {/* Rutas protegidas con layout compartido */}
      <Route element={<ProtectedRoute />}>
  <Route element={<DashboardLayout />}>
    {/* User Dashboard */}
    <Route path="/dashboard/user" element={<UserDashboard />}>
      <Route index element={<SimulationPage />} />
      <Route path="history" element={<SimulationHistory />} />
      <Route path="settings" element={<UserSettings />} />
      <Route path="comparison/:simulationId" element={<Comparison />} />
      <Route path="global-comparison" element={<GlobalTechnologiesComparison />} />

    </Route>

    {/* Admin Dashboard */}
    <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
      <Route path="/dashboard/admin/users" element={<AdminDashboard />} />
      <Route path="/dashboard/admin/technologies" element={<AdminTechnologiesPanel />} />
      <Route path="/dashboard/admin/technologies/list" element={<AllTechnologiesList />} />
    </Route>
  </Route>
</Route>


      {/* Ruta comodín */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;







