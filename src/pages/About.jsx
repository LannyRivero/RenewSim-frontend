import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Acerca del Simulador de Energías Renovables
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Esta plataforma te permite analizar, comparar y optimizar el uso de energías limpias
          como la solar, eólica e hidroeléctrica. Ya seas un particular, empresa o institución,
          puedes tomar decisiones más informadas sobre tu futuro energético.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-2">💡 Simulación Inteligente</h3>
            <p className="text-gray-600">
              El sistema analiza tu consumo y te sugiere soluciones personalizadas basadas en tus datos.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🌍 Impacto Ambiental</h3>
            <p className="text-gray-600">
              Calculamos la reducción estimada de CO₂ y otros beneficios ambientales con cada simulación.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📈 Resultados Claros</h3>
            <p className="text-gray-600">
              Obtén reportes detallados con datos sobre inversión, retorno y eficiencia energética.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-green-600 mb-4">¿Qué tecnologías se incluyen?</h2>
          <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
            <li>Paneles solares fotovoltaicos</li>
            <li>Turbinas eólicas de eje horizontal</li>
            <li>Microcentrales hidroeléctricas</li>
            <li>(Próximamente: Biomasa y geotermia)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
