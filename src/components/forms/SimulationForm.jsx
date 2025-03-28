import React, { useState } from "react";

const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: "",
    energyType: "solar",
    projectSize: "",
    budget: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.projectSize || isNaN(formData.projectSize))
      newErrors.projectSize = "Enter a valid project size";
    if (!formData.budget || isNaN(formData.budget))
      newErrors.budget = "Enter a valid budget";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5 mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-center text-green-700">Simulation Data</h2>

      <div>
        <label className="block font-medium text-gray-700">Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-4 py-2 mt-1 border rounded-md ${
            errors.location ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Energy Type:</label>
        <select
          name="energyType"
          value={formData.energyType}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="solar">Solar</option>
          <option value="wind">Wind</option>
          <option value="hydro">Hydroelectric</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700">Project Size (kW):</label>
        <input
          type="number"
          name="projectSize"
          value={formData.projectSize}
          onChange={handleChange}
          className={`w-full px-4 py-2 mt-1 border rounded-md ${
            errors.projectSize ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.projectSize && (
          <p className="text-sm text-red-500">{errors.projectSize}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Estimated Budget (€):</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`w-full px-4 py-2 mt-1 border rounded-md ${
            errors.budget ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.budget && (
          <p className="text-sm text-red-500">{errors.budget}</p>
        )}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
        >
          Simulate
        </button>
      </div>
    </form>
  );
};

export default SimulationForm;
