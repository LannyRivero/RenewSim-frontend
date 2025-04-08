import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse mt-6 space-y-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mx-auto"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
    </div>
  );
};

export default SkeletonLoader;
