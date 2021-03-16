import * as d3 from 'd3';
import { precipitaion } from './precipitation';

export default function GridHeatmap(element) {
  const margin = { top: 80, bottom: 20, right: 20, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const cScale = d3
    .scaleLinear()
    .interpolate(() => d3.interpolateYlGnBu)
    .domain([0, 50]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  console.log(d3.schemeYlGnBu);
  const colorScale = d3.schemeYlGnBu[9];
  const colors = colorScale.map((color, index) => {
    return [index, color];
  });

  const defs = svg.append('defs');
  const linearGradient = defs.append('linearGradient').attr('id', 'myGradient');
  linearGradient
    .selectAll('stop')
    .data(colors)
    .enter()
    .append('stop')
    .attr('offset', (d) => ((d[0] - 0) / 10) * 100 + '%')
    .attr('stop-color', (d) => d[1]);

  container
    .selectAll('rect')
    .data(precipitaion)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
      return Math.floor((i + 3) / 7) * 25;
    })
    .attr('y', (d, i) => ((i + 3) % 7) * 25)
    .attr('width', 22)
    .attr('height', 22)
    .attr('fill', (d) => (d === 0 ? '#eee' : cScale(d)))
    .attr('stroke', '#ccc');

  svg
    .selectAll('text')
    .data(days)
    .enter()
    .append('text')
    .attr('x', 10)
    .attr('y', (d, i) => i * 25 + 94)
    .text((d) => d)
    .style('font-family', 'sans-serif')
    .style('font-size', '12px');

  svg.append('rect').attr('x', 10).attr('y', 30).attr('width', 200).attr('height', 15).attr('fill', 'url(#myGradient)');

  const xAxis = svg.append('g').attr('transform', `translate(10,${48})`);
  const xScale = d3.scaleLinear().domain([0, 50]).range([0, 200]);
  const xAxisFunction = d3.axisBottom(xScale).ticks(10);
  xAxis.call(xAxisFunction);

  xAxis.selectAll('.tick>line').attr('stroke', '#121212');
  xAxis.selectAll('.tick>text').attr('fill', '#121212');
  xAxis.select('.tick:last-child>text').text('50 ≤');
  container.select('.domain').remove();
}
