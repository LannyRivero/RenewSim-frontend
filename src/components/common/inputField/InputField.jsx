
import { useState } from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  errorMessage,
}) => {
  const [error, setError] = useState("");

  const handleValidation = (e) => {
    const inputValue = e.target.value;
    if (required && !inputValue) {
      setError("Este campo es obligatorio.");
    } else if (pattern && !new RegExp(pattern).test(inputValue)) {
      setError(errorMessage || "Formato inválido.");
    } else {
      setError("");
    }
    onChange(e);
  };

  return (
    <div className="flex flex-col gap-2 p-4 border border-white/30 rounded-lg bg-white/10 shadow-inner">
      {label && <label htmlFor={name} className="font-bold text-white">{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleValidation}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-lg text-lg bg-white/10 text-white shadow-inner transition focus:border-green-500 focus:ring focus:ring-green-400 ${
          error ? "border-red-500 shadow-red-500" : "border-white/30"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
