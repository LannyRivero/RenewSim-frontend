import React from "react";

const SearchBar = ({ searchTerm, onChange, inputRef }) => {
  return (
    <div className="mb-6 flex justify-end animate-fade-in">
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar usuario..."
        className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        value={searchTerm}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;

