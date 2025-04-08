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
  const baseClasses = `
    w-full px-4 py-2 pl-10 rounded-lg shadow-md 
    bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm
    border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
    focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500
    focus:border-green-400 dark:focus:border-green-500
    transition-all duration-300
    placeholder-gray-400 dark:placeholder-gray-500
    text-gray-700 dark:text-white
  `;

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
    <div className="flex flex-col gap-1 relative">
      {/* Etiqueta del campo */}
      <label htmlFor={name} className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-1 mb-1">
        {icon && <span className="text-gray-400 dark:text-gray-500">{icon}</span>}
        {label}
      </label>

      {/* Renderizado del campo */}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </span>
        )}
        {renderInput()}
      </div>

      {/* Hint o error */}
      {hint && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{hint}</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldWithHint;

