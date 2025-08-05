import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { SingleSeriesData } from '../types/chart';

interface SingleSeriesChartProps {
  data: SingleSeriesData;
  title: string;
}

export function SingleSeriesChart({ data, title }: SingleSeriesChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const filteredData = data.filter(([, value]) => value !== null) as [number, number][];

    if (filteredData.length === 0) return;

    const xScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => d[0]) as [number, number])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => d[1]) as [number, number])
      .range([height, 0]);

    const line = d3.line<[number, number]>()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .call(d3.axisLeft(yScale));

    g.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

    g.selectAll('.dot')
      .data(filteredData)
      .attr('class', 'dot')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 3)
      .attr('fill', '#3b82f6');

  }, [data]);

  return (
    <div className="mb-8 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <svg
        ref={svgRef}
        width={600}
        height={400}
        className="border border-gray-300"
      ></svg>
      
    </div>
  );
}