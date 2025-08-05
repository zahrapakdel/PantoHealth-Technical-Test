import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { MultiSeriesData } from '../types/chart';

interface MultiSeriesChartProps {
  data: MultiSeriesData;
  title: string;
}

export function MultiSeriesChart({ data, title }: MultiSeriesChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const colors = ['#3b82f6', '#10b981', '#ef4444'];

    const filteredData = data.filter(([, values]) => values !== null) as [number, number[]][];

    if (filteredData.length === 0) return;

    const allTimestamps = filteredData.map(d => d[0]);
    const allValues = filteredData.flatMap(([, values]) => values.filter(v => v !== null));

    const xScale = d3.scaleLinear()
      .domain(d3.extent(allTimestamps) as [number, number])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(allValues) as [number, number])
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

    for (let seriesIndex = 0; seriesIndex < 3; seriesIndex++) {
      const seriesData = filteredData
        .map(([timestamp, values]) => [timestamp, values[seriesIndex]] as [number, number | null])
        .filter(([, value]) => value !== null) as [number, number][];

      if (seriesData.length > 0) {
        g.append('path')
          .datum(seriesData)
          .attr('fill', 'none')
          .attr('stroke', colors[seriesIndex])
          .attr('stroke-width', 2)
          .attr('d', line);

        g.selectAll(`.dot-series-${seriesIndex}`)
          .data(seriesData)
          .attr('class', `dot-series-${seriesIndex}`)
          .attr('cx', d => xScale(d[0]))
          .attr('cy', d => yScale(d[1]))
          .attr('r', 3)
          .attr('fill', colors[seriesIndex]);
      }
    }

    const legend = g.append('g')
      .attr('transform', `translate(${width - 380}, -18)`);

    const legendItems = legend.selectAll('.legend-item')
      .data(['Series 1', 'Series 2', 'Series 3'])
      .enter().append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_d,i) => `translate(${i * 80},0)`);

    legendItems.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', (_d, i) => colors[i]);

    legendItems.append('text')
      .attr('x', 18)
      .attr('y', 9)
      .style('font-size', '12px')
      .text(d => d);

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