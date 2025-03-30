import React from "react";

const InputWithButton = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  buttonLabel = "",
  onButtonClick,
  disabled = false,
  title = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-700 font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          title={title}
          className={`flex-1 px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={onButtonClick}
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm shadow-md transition"
          title={title}
        >
          {buttonLabel}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputWithButton;
