
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import SimulationService from '@/services/SimulationService';

const TechnologiesComparison = ({ simulationId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!simulationId) {
          setLoading(false);
          return;
        }

        setLoading(true);
        const response = await SimulationService.getTechnologiesForSimulation(simulationId);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Hubo un error al cargar los datos de la simulación.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [simulationId]);

  useEffect(() => {
    if (loading || data.length === 0) return;

    const validData = data.filter(d => d.energyGenerated !== undefined && d.energyGenerated !== null);

    if (validData.length === 0) return;

    // Clear SVG before redraw
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f9f9f9');

    const xScale = d3
      .scaleBand()
      .domain(validData.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const maxEnergy = d3.max(validData, d => d.energyGenerated) || 0;

    const yScale = d3
      .scaleLinear()
      .domain([0, maxEnergy * 1.2])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(validData.map(d => d.name))
      .range(d3.schemeSet2);

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 0 5px rgba(0,0,0,0.3)')
      .style('font-size', '14px')
      .style('color', '#333');

    svg
      .selectAll('.bar')
      .data(validData)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.energyGenerated))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.energyGenerated))
      .attr('fill', d => colorScale(d.name))
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#ffa500');
        tooltip
          .style('visibility', 'visible')
          .html(`
            <strong>${d.name}</strong><br/>
            Energía: ${d.energyGenerated} kWh<br/>
            Costo: €${d.cost}<br/>
            Reducción CO2: ${d.co2Reduction} kg
          `);
      })
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 50 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', colorScale(d.name));
        tooltip.style('visibility', 'hidden');
      });

    // Eje X
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-25)')
      .style('text-anchor', 'end');

    // Eje Y
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  }, [data, loading]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comparación de generación energética (kWh)</h2>

      {loading && <p className="text-gray-500">Cargando datos de la simulación...</p>}

      {!loading && error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-500">No se encontraron datos para esta simulación.</p>
      )}

      {!loading && data.filter(d => d.energyGenerated !== undefined && d.energyGenerated !== null).length === 0 && (
        <p className="text-gray-500">No hay tecnologías con datos de generación energética disponibles.</p>
      )}

      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TechnologiesComparison;


