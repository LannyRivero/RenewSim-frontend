import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, onChange, inputRef, showNoResults }) => {
  return (
    <div className="mb-6 flex flex-col items-end gap-2 animate-fade-in">
      <div className="relative w-full md:w-1/2">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400" data-testid="search-icon">
          <Search size={18} />
        </span>

        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar usuario..."
          className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={onChange}
        />
      </div>

      {showNoResults && (
        <p className="text-red-500 text-sm font-medium">
          No se encontraron usuarios con ese nombre.
        </p>
      )}
    </div>
  );
};

export default SearchBar;


