const TechnologyRecommendation = ({ resultados }) => {
    
    console.log('Resultados:', resultados);  

    const { recommendedTechnology, estimatedSavings, returnOnInvestment, technologies } = resultados;

    const technology = technologies && technologies[0]; 
  
    return (
      <div className="bg-blue-50 p-6 rounded-xl shadow-lg mt-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">🌟 Recomendación de Tecnología</h3>
  
        <p className="text-gray-700">
          Basado en tu consumo energético y presupuesto, te recomendamos considerar {" "}
          <strong>{recommendedTechnology}</strong> por su mayor ahorro a largo plazo y menor impacto ambiental.
        </p>
  
        <ul className="mt-4 space-y-2">
          <li><strong>Ahorro estimado:</strong> {estimatedSavings ? `${estimatedSavings} €` : 'No disponible'}</li>
          <li><strong>Reducción de CO₂:</strong> {technology ? `${technology.co2Reduction} kg` : 'No disponible'}</li>
          <li><strong>Costo de instalación:</strong> {technology ? `${technology.installationCost} €` : 'No disponible'}</li>
          <li><strong>Retorno de inversión:</strong> {returnOnInvestment ? `${returnOnInvestment} años` : 'No disponible'}</li>
        </ul>
      </div>
    );
  };
  
  export default TechnologyRecommendation;  


  


