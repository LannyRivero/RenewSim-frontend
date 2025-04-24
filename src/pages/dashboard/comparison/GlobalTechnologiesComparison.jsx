import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import SimulationService from '@/services/SimulationService';
import Button from '@/components/common/button/Button';

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

  const formatValue = (value, criteria) => {
    const scaled = value * 100;
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

  const getColorByName = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('solar')) return '#FDB813';       // Amarillo
    if (lower.includes('eólica') || lower.includes('eolica') || lower.includes('wind')) return '#6EC6FF'; // Azul
    if (lower.includes('hidro')) return '#1565C0';        // Azul oscuro
    if (lower.includes('biomasa') || lower.includes('bio')) return '#388E3C';  // Verde
    if (lower.includes('geot')) return '#D84315';         // Naranja
    return '#ccc'; // Default gris
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || data.length === 0) return;

    const validData = data.filter(d =>
      d[selectedCriteria] !== undefined &&
      d[selectedCriteria] !== null &&
      d[selectedCriteria] >= 0
    );

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
      .style('padding', '10px')
      .style('border-radius', '6px')
      .style('box-shadow', '0 0 10px rgba(0,0,0,0.4)')
      .style('font-size', '14px')
      .style('color', '#333')
      .style('pointer-events', 'none');

    svg.selectAll('.bar')
      .data(validData)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.technologyName))
      .attr('y', d => yScale(d[selectedCriteria]))
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', d => getColorByName(d.technologyName))
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#ffa500');
        tooltip
          .style('visibility', 'visible')
          .html(`
            <strong>${d.technologyName}</strong><br/>
            🌟 ${criteriaLabels[selectedCriteria]}: ${formatValue(d[selectedCriteria], selectedCriteria)}
          `);
      })
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 50 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', getColorByName(d.technologyName));
        tooltip.style('visibility', 'hidden');
      })
      .transition()
      .duration(800)
      .attr('height', d => height - margin.bottom - yScale(d[selectedCriteria]))
      .attr('y', d => yScale(d[selectedCriteria]));

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
      .style('text-anchor', 'end')
      .style('fill', '#333');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .style('fill', '#333');

  }, [data, loading, selectedCriteria]);

  const handleDownload = (format) => {
    const svgElement = svgRef.current;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });

    if (format === 'svg') {
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'global-technologies-comparison.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    if (format === 'png') {
      const canvas = document.createElement('canvas');
      canvas.width = svgElement.clientWidth;
      canvas.height = svgElement.clientHeight;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'global-technologies-comparison.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      img.src = url;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-16 transition-colors duration-500">
      <div className="w-full max-w-5xl p-8 rounded-3xl shadow-2xl border border-white/30 bg-white/30 backdrop-blur-xl transition-all duration-500">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 animate-fade-in-down flex items-center justify-center gap-2">
          ⚡ Comparación Global de Energías Renovables
        </h2>

        <div className="mb-6 flex flex-wrap gap-4 items-center justify-center">
          <label htmlFor="criteria" className="text-sm font-medium text-gray-700">
            Selecciona criterio de comparación:
          </label>
          <select
            id="criteria"
            value={selectedCriteria}
            onChange={(e) => setSelectedCriteria(e.target.value)}
            className="border rounded p-2"
          >
            {Object.entries(criteriaLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <Button variant="secondary" onClick={() => handleDownload('svg')}>
            Descargar SVG
          </Button>
          <Button variant="secondary" onClick={() => handleDownload('png')}>
            Descargar PNG
          </Button>
        </div>
        

        {loading && <p className="text-gray-500 text-center">Cargando tecnologías...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && data.length === 0 && <p className="text-gray-500 text-center">No se encontraron tecnologías.</p>}

        <svg ref={svgRef} className="mx-auto block"></svg>
      </div>    
        
    </div>

    
  );
};

export default GlobalTechnologiesComparison;









