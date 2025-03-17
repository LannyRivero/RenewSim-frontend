
import { useState } from "react";
import Button from "../button/Button";
import InputField from "../inputField/InputField";

const SimulationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    energyType: "solar",
    location: "",
    projectSize: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg border border-white/30 text-white"
    >
      <label className="block text-lg font-bold mb-2">
        Tipo de fuente de energía:
        <select
          name="energyType"
          value={formData.energyType}
          onChange={handleChange}
          className="w-full mt-2 p-3 border rounded-md bg-white/20 text-white shadow-inner focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
        >
          <option value="solar" className="text-black">Solar</option>
          <option value="eolica" className="text-black">Eólica</option>
          <option value="hidroelectrica" className="text-black">Hidroeléctrica</option>
        </select>
      </label>

      <InputField
        label="Ubicación:"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Introduce la ubicación"
        required
      />
      <InputField
        label="Tamaño del proyecto (kW):"
        type="number"
        name="projectSize"
        value={formData.projectSize}
        onChange={handleChange}
        placeholder="Introduce el tamaño"
        required
      />
      <InputField
        label="Presupuesto (€):"
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Introduce el presupuesto"
        required
      />

      <div className="mt-6 flex justify-center">
        <Button text="Simular" type="primary" />
      </div>
    </form>
  );
};

export default SimulationForm;
