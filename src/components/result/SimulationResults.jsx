import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SimulationResults = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data) return;

    const chartData = [
      { label: "Energia (kWh)", value: data.energyGenerated },
      { label: "Ahorro (€)", value: data.estimatedSavings },
    ];

    const width = 400;
    const height = 200;
    const margin = { top: 30, right: 20, bottom: 50, left: 50 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value) * 1.1])
      .range([height - margin.bottom, margin.top]);

    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    svg
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    const tooltip = d3.select(tooltipRef.current);

    svg.selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.label))
      .attr("width", xScale.bandwidth())
      .attr("y", yScale(0))
      .attr("height", 0)
      .attr("fill", "#38bdf8")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.label}</strong><br/>${d.value.toFixed(2)}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      })
      .transition()
      .duration(800)
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - margin.bottom - yScale(d.value));

  }, [data]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 relative">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Simulation Results</h3>
      <p><strong>Energia Generada al Año:</strong> {data.energyGenerated?.toFixed(2)} kWh</p>
      <p><strong>Ahorros Estimados:</strong> {data.estimatedSavings?.toFixed(2)} €</p>
      <p><strong>Retorno de Inversión(ROI):</strong> {data.returnOnInvestment} years</p>

      <div className="mt-6 w-full">
        <svg ref={svgRef}></svg>
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none bg-gray-700 text-white text-xs px-2 py-1 rounded shadow opacity-0 transition-opacity duration-200"
          style={{ position: "absolute" }}
        ></div>
      </div>
    </div>
  );
};

export default SimulationResults;


