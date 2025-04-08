import React from "react";
import { exportToCSV } from "@/utils/exportCSV";

const ExportCSVButton = ({ data, filename = "data.csv" }) => {
  return (
    <button
      onClick={() => exportToCSV(data, filename)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
    >
      Exportar CSV
    </button>
  );
};

export default ExportCSVButton;
