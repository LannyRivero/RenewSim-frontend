import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import SimulationService from '@/services/SimulationService';

const GlobalTechnologiesComparison = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCriteria, setSelectedCriteria] = useState("normalizedEnergyProduction");
  const [error, setError] = useState(null);
  const svgRef = useRef();

  const criteriaLabels = {
    normalizedEnergyProduction: "Generación energética (kWh)",
    normalizedInstallationCost: "Costo de instalación (€)",
    normalizedEfficiency: "Eficiencia (%)",
    normalizedCo2Reduction: "CO₂ reducido (kg)",
    score: "Score global"
  };

  const energyTypeColors = {
    solar: "#FDB813",
    wind: "#6EC6FF",
    hydro: "#1565C0",
    biomass: "#388E3C",
    geothermal: "#D84315"
  };

  // Formateador bonito de números según criterio seleccionado
  const formatValue = (value, criteria) => {
    const scaled = value * 100; // Como están normalizados de 0 a 1
    switch (criteria) {
      case "normalizedEnergyProduction":
        return `${scaled.toLocaleString('es-ES', { maximumFractionDigits: 0 })} kWh`;
      case "normalizedInstallationCost":
        return `${scaled.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €`;
      case "normalizedEfficiency":
      case "score":
        return `${scaled.toFixed(1)} %`;
      case "normalizedCo2Reduction":
        return `${scaled.toLocaleString('es-ES', { maximumFractionDigits: 0 })} kg`;
      default:
        return scaled.toLocaleString('es-ES', { maximumFractionDigits: 2 });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await SimulationService.getNormalizedTechnologies();
        setData(response);
      } catch (error) {
        console.error('Error fetching global data:', error);
        setError('Hubo un error al cargar los datos globales.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading || data.length === 0) return;

    const validData = data.filter(d => d[selectedCriteria] !== undefined && d[selectedCriteria] !== null);
    if (validData.length === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;
    const margin = { top: 60, right: 20, bottom: 80, left: 80 };

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f9f9f9');

    const xScale = d3.scaleBand()
      .domain(validData.map(d => d.technologyName))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const maxValue = d3.max(validData, d => d[selectedCriteria]) || 0;

    const yScale = d3.scaleLinear()
      .domain([0, maxValue * 1.2])
      .range([height - margin.bottom, margin.top]);

    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 0 5px rgba(0,0,0,0.3)')
      .style('font-size', '14px')
      .style('color', '#333');

    svg.selectAll('.bar')
      .data(validData)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.technologyName))
      .attr('y', d => yScale(d[selectedCriteria]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d[selectedCriteria]))
      .attr('fill', d => energyTypeColors[d.energyType] || '#ccc')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#ffa500');
        tooltip
          .style('visibility', 'visible')
          .html(`
            <strong>${d.technologyName}</strong><br/>
            ${criteriaLabels[selectedCriteria]}: ${formatValue(d[selectedCriteria], selectedCriteria)}
          `);
      })
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 50 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', energyTypeColors[d.energyType] || '#ccc');
        tooltip.style('visibility', 'hidden');
      })
      .transition()
      .duration(800)
      .attr('height', d => height - margin.bottom - yScale(d[selectedCriteria]));

    svg.selectAll('.label')
      .data(validData)
      .join('text')
      .attr('class', 'label')
      .attr('x', d => xScale(d.technologyName) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d[selectedCriteria]) - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333')
      .style('font-size', '14px')
      .text(d => formatValue(d[selectedCriteria], selectedCriteria));

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-25)')
      .style('text-anchor', 'end');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5));

  }, [data, loading, selectedCriteria]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{`Comparativa Global: ${criteriaLabels[selectedCriteria]}`}</h2>

      <div className="mb-4">
        <label htmlFor="criteria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Selecciona criterio de comparación:
        </label>
        <select
          id="criteria"
          value={selectedCriteria}
          onChange={(e) => setSelectedCriteria(e.target.value)}
          className="border rounded p-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="normalizedEnergyProduction">Generación energética (kWh)</option>
          <option value="normalizedInstallationCost">Costo de instalación (€)</option>
          <option value="normalizedEfficiency">Eficiencia (%)</option>
          <option value="normalizedCo2Reduction">Impacto medioambiental (CO₂ reducido)</option>
          <option value="score">Score global</option>
        </select>
      </div>

      {loading && <p className="text-gray-500">Cargando tecnologías...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && data.length === 0 && <p className="text-gray-500">No se encontraron tecnologías.</p>}

      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GlobalTechnologiesComparison;

