import {
  FaMoneyBillWave,
  FaLeaf,
  FaTools,
  FaBalanceScale,
  FaRulerCombined,
  FaWallet
} from "react-icons/fa";

const TechnologyRecommendation = ({ resultados, modo = "detallado" }) => {
  const {
    recommendedTechnology,
    estimatedSavings,
    returnOnInvestment,
    technologies,
    projectSize,
    budget,
  } = resultados;

  const tech = technologies?.[0];

  const nombreTecnologia =
    typeof recommendedTechnology === "string"
      ? recommendedTechnology
      : recommendedTechnology?.technologyName || "Tecnología no disponible";

  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl shadow-md border border-blue-200 dark:border-blue-700">
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
        🌟 Recomendación de Tecnología
      </h3>

      <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
        Basado en tu consumo energético y presupuesto, te recomendamos considerar{" "}
        <strong className="text-blue-800 dark:text-white">{nombreTecnologia}</strong> por su mayor ahorro a largo plazo y menor impacto ambiental.
      </p>

      {modo === "detallado" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-100">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            <span><strong>Ahorro estimado:</strong> {estimatedSavings?.toLocaleString()} €</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLeaf className="text-green-500" />
            <span><strong>Reducción de CO₂:</strong> {tech?.co2Reduction?.toLocaleString()} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTools className="text-blue-500" />
            <span><strong>Coste de instalación:</strong> {tech?.installationCost?.toLocaleString()} €</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBalanceScale className="text-purple-500" />
            <span><strong>Retorno de inversión:</strong> {returnOnInvestment} años</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRulerCombined className="text-orange-500" />
            <span><strong>Tamaño del proyecto:</strong> {projectSize ? `${projectSize.toLocaleString()} kW` : "No disponible"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaWallet className="text-yellow-500" />
            <span><strong>Presupuesto estimado:</strong> {budget ? `${budget.toLocaleString()} €` : "No disponible"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnologyRecommendation;




  


