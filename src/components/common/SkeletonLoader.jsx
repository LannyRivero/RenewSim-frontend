
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="mt-8 space-y-6 animate-pulse">
      {/* Tarjeta de resultados simulados */}
      <div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-gray-300 dark:border-gray-700 p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>

      {/* Tarjeta de tecnologías */}
      <div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-gray-300 dark:border-gray-700 p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>

      {/* Tarjeta de recomendación */}
      <div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-lg border border-gray-300 dark:border-gray-700 p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

