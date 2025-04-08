import React, { useEffect, useState } from "react";
import UserDashboardLayout from "./UserDashboardLayout";
import SimulationTable from "@/components/user/SimulationTable";

const UserHistory = () => {
  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    const storedSimulations = JSON.parse(localStorage.getItem('userSimulations')) || [];
    setSimulations(storedSimulations);
  }, []);

  return (
    <UserDashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Historial de Simulaciones</h2>
      <SimulationTable simulations={simulations} />
    </UserDashboardLayout>
  );
};

export default UserHistory;
