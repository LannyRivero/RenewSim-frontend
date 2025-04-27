import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="mt-8 space-y-6 animate-pulse">

      <div className="rounded-3xl bg-white/30 dark:bg-white/10 backdrop-blur-xl shadow-xl border border-white/30 dark:border-white/20 p-6">
        <div className="h-6 bg-white/50 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-white/50 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-white/50 dark:bg-gray-700 rounded w-1/2"></div>
      </div>

      <div className="rounded-3xl bg-white/30 dark:bg-white/10 backdrop-blur-xl shadow-xl border border-white/30 dark:border-white/20 p-6">
        <div className="h-6 bg-white/50 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/50 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-white/50 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-white/50 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/30 dark:bg-white/10 backdrop-blur-xl shadow-xl border border-white/30 dark:border-white/20 p-6">
        <div className="h-6 bg-white/50 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/50 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-white/50 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;


