import React from "react";

const ExportCSVButton = ({ data, filename = "data.csv" }) => {
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((field) => {
        const value = row[field];
        return typeof value === "string"
          ? `"${value.replace(/"/g, '""')}"`
          : `"${value}"`;
      })
    );

    const csvContent =
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
    >
      Exportar CSV
    </button>
  );
};

export default ExportCSVButton;
