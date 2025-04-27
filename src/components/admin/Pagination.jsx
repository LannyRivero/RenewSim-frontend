import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex justify-center items-center gap-2 animate-fade-in">
      {pages.map((page) => (
        <button
          key={page}
          aria-label={`Página ${page}`}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-full border transition duration-200 text-sm font-medium
            ${
              page === currentPage
                ? "bg-green-600 text-white border-green-600 shadow-md scale-105"
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

