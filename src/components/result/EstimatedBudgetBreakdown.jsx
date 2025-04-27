import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const EstimatedBudgetBreakdown = ({ energyType, projectSize, budget }) => {
  const ref = useRef();

  if (!energyType || !projectSize || !budget) return null;

  const fixedCost = 500;
  const variableCost = budget - fixedCost;

  const data = [
    { name: "Base cost per kW", value: variableCost, color: getColor(energyType) },
    { name: "Fixed costs", value: fixedCost, color: "#D1D5DB" },
  ];

  function getColor(type) {
    const map = {
      solar: "#FDB813",
      wind: "#87CEEB",
      hydro: "#3B82F6",
    };
    return map[type] || "#CCCCCC";
  }

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);

    g.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .style("fill", "#333");
  }, [data]);

  return (
    <div className="text-center mt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        💰 Estimated Budget Breakdown
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Energy type: <strong>{energyType}</strong> | Project size: <strong>{projectSize} kW</strong>
      </p>
      <svg ref={ref}></svg>
    </div>
  );
};

export default EstimatedBudgetBreakdown;
