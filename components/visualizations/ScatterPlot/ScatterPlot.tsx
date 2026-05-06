'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { Neighborhood } from '@/types';
import { calculateLinearRegression, getTrendlinePoints } from '@/lib/stats';
import styles from './ScatterPlot.module.css';

export interface ScatterPlotProps {
  neighborhoods: Neighborhood[];
  width?: number;
  height?: number;
  className?: string;
}

export function ScatterPlot({
  neighborhoods,
  width = 800,
  height = 600,
  className
}: ScatterPlotProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const { xValues, yValues, regression } = useMemo(() => {
    const xValues = neighborhoods.map(n => n.sdohScores.hoiScore);
    const yValues = neighborhoods.map(n => n.healthMetrics.lifeExpectancy);
    const regression = calculateLinearRegression(xValues, yValues);
    return { xValues, yValues, regression };
  }, [neighborhoods]);

  useEffect(() => {
    if (!svgRef.current || neighborhoods.length === 0) return;

    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('role', 'img')
      .attr('aria-label', 'Scatter plot showing relationship between Health Opportunity Index and life expectancy across neighborhoods');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([70, 86])
      .range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(10)
      .tickSize(-innerHeight)
      .tickFormat(d => d.toString());

    const yAxis = d3.axisLeft(yScale)
      .ticks(8)
      .tickSize(-innerWidth)
      .tickFormat(d => `${d} yrs`);

    // X-axis
    g.append('g')
      .attr('class', styles.xAxis)
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', 'var(--neutral-300)')
        .attr('stroke-dasharray', '2,2'));

    // Y-axis
    g.append('g')
      .attr('class', styles.yAxis)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', 'var(--neutral-300)')
        .attr('stroke-dasharray', '2,2'));

    // X-axis label
    g.append('text')
      .attr('class', styles.axisLabel)
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 45)
      .attr('text-anchor', 'middle')
      .text('Health Opportunity Index (0-100)');

    // Y-axis label
    g.append('text')
      .attr('class', styles.axisLabel)
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .text('Life Expectancy (years)');

    // Calculate average values for quadrant lines
    const avgX = d3.mean(xValues) || 50;
    const avgY = d3.mean(yValues) || 78;

    // Quadrant lines (optional - subtle reference lines)
    g.append('line')
      .attr('x1', xScale(avgX))
      .attr('x2', xScale(avgX))
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'var(--neutral-400)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0.3);

    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', yScale(avgY))
      .attr('y2', yScale(avgY))
      .attr('stroke', 'var(--neutral-400)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0.3);

    // Trendline
    const trendlinePoints = getTrendlinePoints(0, 100, regression.slope, regression.intercept);
    const line = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    g.append('path')
      .datum(trendlinePoints)
      .attr('class', styles.trendline)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'var(--primary-700)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '6,6');

    // Tooltip
    const tooltip = d3.select('body')
      .selectAll('.scatter-tooltip')
      .data([null])
      .join('div')
      .attr('class', 'scatter-tooltip')
      .style('position', 'absolute')
      .style('background', 'var(--neutral-900)')
      .style('color', 'white')
      .style('padding', 'var(--space-3)')
      .style('border-radius', 'var(--radius-md)')
      .style('font-size', 'var(--font-size-sm)')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000)
      .style('box-shadow', 'var(--shadow-lg)');

    // Data points
    const dots = g.selectAll('.dot')
      .data(neighborhoods)
      .join('circle')
      .attr('class', styles.dot)
      .attr('cx', d => xScale(d.sdohScores.hoiScore))
      .attr('cy', d => yScale(d.healthMetrics.lifeExpectancy))
      .attr('r', 6)
      .attr('fill', 'var(--primary-500)')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('r', 8)
          .attr('fill', 'var(--primary-700)');

        tooltip
          .style('opacity', 1)
          .html(`
            <strong>${d.name}</strong><br/>
            HOI: ${d.sdohScores.hoiScore}<br/>
            Life Expectancy: ${d.healthMetrics.lifeExpectancy} years
          `);
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('r', 6)
          .attr('fill', 'var(--primary-500)');

        tooltip.style('opacity', 0);
      });

    // Find outliers to label (top 2 and bottom 2 by life expectancy)
    const sorted = [...neighborhoods].sort((a, b) =>
      b.healthMetrics.lifeExpectancy - a.healthMetrics.lifeExpectancy
    );
    const toLabel = [sorted[0], sorted[1], sorted[sorted.length - 2], sorted[sorted.length - 1]];

    // Smart label positioning: place labels above or below points to avoid overlap
    // Top 2 neighborhoods: place labels above
    // Bottom 2 neighborhoods: place labels below
    g.selectAll('.label')
      .data(toLabel)
      .join('text')
      .attr('class', styles.label)
      .attr('x', d => xScale(d.sdohScores.hoiScore))
      .attr('y', d => {
        const isTopOutlier = d === sorted[0] || d === sorted[1];
        const offset = isTopOutlier ? -18 : 18;
        return yScale(d.healthMetrics.lifeExpectancy) + offset;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('fill', 'var(--neutral-800)')
      .attr('font-weight', 'var(--font-weight-semibold)')
      .style('text-shadow', '0 0 3px white, 0 0 3px white, 0 0 3px white')
      .text(d => d.name);

    // Quadrant labels - positioned in corners to avoid data points
    const quadrantLabels = [
      { text: 'High opportunity,\nhigh life expectancy', x: innerWidth * 0.78, y: innerHeight * 0.08 },
      { text: 'Low opportunity,\nlow life expectancy', x: innerWidth * 0.22, y: innerHeight * 0.92 }
    ];

    quadrantLabels.forEach(label => {
      const lines = label.text.split('\n');
      const textGroup = g.append('text')
        .attr('x', label.x)
        .attr('y', label.y)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', 'var(--neutral-500)')
        .attr('font-style', 'italic')
        .attr('opacity', 0.8)
        .style('text-shadow', '0 0 4px white, 0 0 4px white');

      lines.forEach((line, i) => {
        textGroup.append('tspan')
          .attr('x', label.x)
          .attr('dy', i === 0 ? 0 : '1.2em')
          .text(line);
      });
    });

  }, [neighborhoods, width, height, xValues, yValues, regression]);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <svg ref={svgRef} className={styles.svg} />
    </div>
  );
}
