import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SimulationResults = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // limpiar SVG antes de redibujar

    const chartData = [
      { label: "Energy (kWh)", value: data.energiaGenerada },
      { label: "Savings (€)", value: data.ahorroEstimado },
    ];

    const width = 300;
    const height = 150;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    svg
      .attr("width", width)
      .attr("height", height);

    // Ejes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Barras
    svg
      .selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d.value))
      .attr("fill", "#38bdf8");
  }, [data]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Simulation Results</h3>
      <p><strong>Annual Energy Generated:</strong> {data.energiaGenerada?.toFixed(2)} kWh</p>
      <p><strong>Estimated Savings:</strong> {data.ahorroEstimado?.toFixed(2)} €</p>
      <p><strong>Return on Investment:</strong> {data.retornoInversion} years</p>

      <div className="mt-6">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default SimulationResults;

