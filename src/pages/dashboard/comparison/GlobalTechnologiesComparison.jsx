import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import SimulationService from '@/services/SimulationService';

const GlobalTechnologiesComparison = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SimulationService.getAllTechnologies();
        setData(response);
      } catch (error) {
        console.error('Error fetching global technologies:', error);
        setError('Hubo un error al cargar las tecnologías.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading || data.length === 0) return;

    const validData = data.filter(d => d.energyProduction !== undefined && d.energyProduction !== null);

    if (validData.length === 0) return;

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
      .domain(validData.map(d => d.technologyName))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const maxEnergy = d3.max(validData, d => d.energyProduction) || 0;

    const yScale = d3
      .scaleLinear()
      .domain([0, maxEnergy * 1.2])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(validData.map(d => d.technologyName))
      .range(d3.schemeSet2);

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
      .attr('y', d => yScale(d.energyProduction))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.bottom - yScale(d.energyProduction))
      .attr('fill', d => colorScale(d.technologyName))
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#ffa500');
        tooltip
          .style('visibility', 'visible')
          .html(`
            <strong>${d.technologyName}</strong><br/>
            Energía: ${d.energyProduction} kWh<br/>
            Costo instalación: €${d.installationCost}<br/>
            Impacto ambiental: ${d.environmentalImpact}
          `);
      })
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 50 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', colorScale(d.technologyName));
        tooltip.style('visibility', 'hidden');
      });

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-25)')
      .style('text-anchor', 'end');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  }, [data, loading]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comparativa Global de Tecnologías (kWh)</h2>

      {loading && <p className="text-gray-500">Cargando tecnologías...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && data.length === 0 && <p className="text-gray-500">No se encontraron tecnologías.</p>}

      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GlobalTechnologiesComparison;
