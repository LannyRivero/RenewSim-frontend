
import React from "react";

const InputFieldWithHint = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  hint = "",
  title = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-700 font-medium">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        title={title}
        className={`px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {hint && (
        <p className="text-sm text-gray-500 mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputFieldWithHint;
