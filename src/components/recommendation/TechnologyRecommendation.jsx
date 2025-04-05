import React from "react";

// Componente de Recomendación de Tecnología
const TechnologyRecommendation = ({ resultados }) => {

    const { energyGenerated, estimatedSavings, returnOnInvestment, technologies } = resultados;

    // Ordenamos las tecnologías en base a "impacto-beneficio"
    const recommendedTech = technologies.sort((a, b) => {
        const aImpactBenefit = a.costInstallation / (a.co2Reduction + a.savings);
        const bImpactBenefit = b.costInstallation / (b.co2Reduction + b.savings);

        return aImpactBenefit - bImpactBenefit;
    })[0]; // Seleccionamos la tecnología con el mejor balance de impacto-beneficio

    return (
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg mt-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">🌟 Recomendación de Tecnología</h3>

            <p className="text-gray-700">
                Basado en tu consumo energético y presupuesto, te recomendamos considerar la{" "}
                <strong>{recommendedTech.name}</strong> por su mayor ahorro a largo plazo y menor impacto ambiental.
            </p>

            <ul className="mt-4 space-y-2">
                <li><strong>Ahorro estimado:</strong> {recommendedTech.savings} €</li>
                <li><strong>Reducción de CO₂:</strong> {recommendedTech.co2Reduction} kg</li>
                <li><strong>Costo de instalación:</strong> {recommendedTech.costInstallation} €</li>
                <li><strong>Retorno de inversión:</strong> {recommendedTech.returnOnInvestment} años</li>
            </ul>
        </div>
    );
};

export default TechnologyRecommendation;
