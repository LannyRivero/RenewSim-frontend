import React from "react";
import { exportToCSV } from "@/utils/ExportCSV";

const ExportCSVButton = ({ data, filename = "data.csv", className = "" }) => {
  return (
    <button
      onClick={() => exportToCSV(data, filename)}
      className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition ${className}`}
    >
      Exportar CSV
    </button>
  );
};

export default ExportCSVButton;

