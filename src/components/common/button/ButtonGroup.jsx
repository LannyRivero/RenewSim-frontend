import React from "react";

const ButtonGroup = ({ children }) => {
  return (
    <div className="inline-flex gap-2 bg-white/20 dark:bg-white/10 backdrop-blur-md p-2 rounded-lg shadow-inner">
      {children}
    </div>
  );
};

export default ButtonGroup;

