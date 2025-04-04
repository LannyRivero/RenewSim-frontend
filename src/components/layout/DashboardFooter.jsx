import React from "react";
import { useNotification } from "@/context/NotificationContext";

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();
  const { notification } = useNotification();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-4 px-6 mt-auto text-sm text-gray-500 dark:text-gray-400 text-center">
      <p>
        © {currentYear} RenewSim 🌿 | Proyecto personal de energías renovables.
      </p>
      <p>
        Desarrollado con ❤️ por tu equipo.
      </p>
    </footer>
  );
};

export default DashboardFooter;
