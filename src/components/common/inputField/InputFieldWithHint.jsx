
import React from "react";

const InputFieldWithHint = ({
  label,
  name,
  type = "text",          // "text", "number", "textarea", "select"
  value,
  onChange,
  placeholder = "",
  error = "",
  hint = "",
  title = "",
  icon = null,
  options = [],           // para <select>
}) => {
  const baseClasses = `px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          title={title}
          className={baseClasses}
          rows={4}
        />
      );
    }

    if (type === "select") {
      return (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={baseClasses}
          title={title}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        title={title}
        className={baseClasses}
      />
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-700 font-medium flex items-center gap-1">
        {icon && <span>{icon}</span>}
        {label}
      </label>
      {renderInput()}
      {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldWithHint;
