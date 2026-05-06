'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { Neighborhood } from '@/types';
import styles from './ChoroplethMap.module.css';

export interface ChoroplethMapProps {
  neighborhoods: Neighborhood[];
  metric: 'lifeExpectancy' | 'hoiScore';
  onNeighborhoodClick?: (neighborhood: Neighborhood) => void;
  selectedId?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ChoroplethMap({
  neighborhoods,
  metric = 'lifeExpectancy',
  onNeighborhoodClick,
  selectedId,
  width = 800,
  height = 600,
  className
}: ChoroplethMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || neighborhoods.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 60, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('role', 'img')
      .attr('aria-label', `Choropleth map showing ${metric === 'lifeExpectancy' ? 'life expectancy' : 'Health Opportunity Index'} by neighborhood`);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Get metric values
    const values = neighborhoods.map(n =>
      metric === 'lifeExpectancy' ? n.healthMetrics.lifeExpectancy : n.sdohScores.hoiScore
    );
    const average = d3.mean(values) || 0;

    // Create color scale (7-step sequential)
    const colorScale = d3.scaleQuantize<string>()
      .domain([d3.min(values) || 0, d3.max(values) || 100])
      .range([
        'var(--primary-50)',
        'var(--primary-200)',
        'var(--primary-300)',
        'var(--primary-500)',
        'var(--primary-600)',
        'var(--primary-700)',
        'var(--primary-900)'
      ]);

    // Create a simple grid layout for neighborhoods (5x5 grid)
    const cols = 5;
    const rows = Math.ceil(neighborhoods.length / cols);
    const cellWidth = innerWidth / cols;
    const cellHeight = innerHeight / rows;

    // Tooltip
    const tooltip = d3.select('body')
      .selectAll('.map-tooltip')
      .data([null])
      .join('div')
      .attr('class', 'map-tooltip')
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

    // Draw neighborhood cells
    const cells = g.selectAll('.neighborhood')
      .data(neighborhoods)
      .join('g')
      .attr('class', 'neighborhood')
      .attr('transform', (d, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return `translate(${col * cellWidth},${row * cellHeight})`;
      });

    // Cell rectangles
    cells.append('rect')
      .attr('class', styles.cell)
      .attr('width', cellWidth - 2)
      .attr('height', cellHeight - 2)
      .attr('rx', 4)
      .attr('fill', d => {
        const value = metric === 'lifeExpectancy' ? d.healthMetrics.lifeExpectancy : d.sdohScores.hoiScore;
        return colorScale(value);
      })
      .attr('stroke', d => d.id === selectedId ? 'var(--neutral-900)' : 'white')
      .attr('stroke-width', d => d.id === selectedId ? 3 : 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        setHoveredId(d.id);
        d3.select(this)
          .attr('stroke', 'var(--neutral-900)')
          .attr('stroke-width', 2);

        const value = metric === 'lifeExpectancy' ? d.healthMetrics.lifeExpectancy : d.sdohScores.hoiScore;
        const comparison = value > average ? 'above' : 'below';
        const diff = Math.abs(value - average).toFixed(1);
        const unit = metric === 'lifeExpectancy' ? 'years' : 'points';

        tooltip
          .style('opacity', 1)
          .html(`
            <strong>${d.name}</strong><br/>
            ${metric === 'lifeExpectancy' ? 'Life Expectancy' : 'HOI Score'}: ${value.toFixed(1)}${metric === 'lifeExpectancy' ? ' years' : ''}<br/>
            <span style="color: ${value > average ? 'var(--success-green)' : 'var(--accent-orange)'}">${diff} ${unit} ${comparison} average</span>
          `);
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function(event, d) {
        setHoveredId(null);
        if (d.id !== selectedId) {
          d3.select(this)
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
        }
        tooltip.style('opacity', 0);
      })
      .on('click', function(event, d) {
        if (onNeighborhoodClick) {
          onNeighborhoodClick(d);
        }
      });

    // Cell labels (for smaller maps, skip labels)
    if (cellWidth > 80 && cellHeight > 60) {
      cells.append('text')
        .attr('x', cellWidth / 2)
        .attr('y', cellHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', 'var(--font-size-xs)')
        .attr('fill', 'white')
        .attr('font-weight', 'var(--font-weight-semibold)')
        .attr('pointer-events', 'none')
        .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.5)')
        .text(d => {
          const value = metric === 'lifeExpectancy' ? d.healthMetrics.lifeExpectancy : d.sdohScores.hoiScore;
          return value.toFixed(0);
        });
    }

    // Legend
    const legendWidth = 300;
    const legendHeight = 20;
    const legendX = (innerWidth - legendWidth) / 2;
    const legendY = innerHeight + 20;

    const legendScale = d3.scaleLinear()
      .domain([d3.min(values) || 0, d3.max(values) || 100])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(7)
      .tickFormat(d => d.toString());

    // Legend gradient
    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'legend-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%');

    const colorStops = [
      { offset: '0%', color: 'var(--primary-50)' },
      { offset: '16.67%', color: 'var(--primary-200)' },
      { offset: '33.33%', color: 'var(--primary-300)' },
      { offset: '50%', color: 'var(--primary-500)' },
      { offset: '66.67%', color: 'var(--primary-600)' },
      { offset: '83.33%', color: 'var(--primary-700)' },
      { offset: '100%', color: 'var(--primary-900)' }
    ];

    colorStops.forEach(stop => {
      // Get computed color value
      const tempEl = document.createElement('div');
      tempEl.style.color = stop.color;
      document.body.appendChild(tempEl);
      const computedColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      linearGradient.append('stop')
        .attr('offset', stop.offset)
        .attr('stop-color', computedColor);
    });

    const legend = g.append('g')
      .attr('class', styles.legend)
      .attr('transform', `translate(${legendX},${legendY})`);

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'url(#legend-gradient)')
      .attr('stroke', 'var(--neutral-300)');

    legend.append('g')
      .attr('transform', `translate(0,${legendHeight})`)
      .call(legendAxis)
      .call(g => g.select('.domain').remove())
      .selectAll('text')
      .attr('font-size', 'var(--font-size-xs)')
      .attr('fill', 'var(--neutral-700)');

    // Legend label
    legend.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -8)
      .attr('text-anchor', 'middle')
      .attr('font-size', 'var(--font-size-sm)')
      .attr('font-weight', 'var(--font-weight-semibold)')
      .attr('fill', 'var(--neutral-900)')
      .text(metric === 'lifeExpectancy' ? 'Life Expectancy (years)' : 'Health Opportunity Index (0-100)');

  }, [neighborhoods, metric, selectedId, width, height, onNeighborhoodClick]);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div
        id="map-instructions"
        className={styles.instructions}
        role="note"
        aria-label="Map interaction instructions"
      >
        Click on any neighborhood to view detailed metrics. Use Tab to navigate between neighborhoods with keyboard.
      </div>
      <svg
        ref={svgRef}
        className={styles.svg}
        aria-describedby="map-instructions"
      />
    </div>
  );
}
