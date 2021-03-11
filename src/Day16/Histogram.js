import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function Histogram(element) {
  const margin = { top: 50, bottom: 50, right: 50, left: 50 };
  const height = 800 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;

  let data = [];

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = container.append('g').attr('transform', `translate(0,${height})`);
  const yAxis = container.append('g');

  const xScale = d3.scaleLinear().domain([0, 100000]).range([0, width]);
  const xAxisFunction = d3.axisBottom(xScale).tickSizeOuter(0);

  xAxis.call(xAxisFunction);

  const yScale = d3.scaleLinear().domain([100, 0]).range([0, height]);

  const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0);

  yAxis.call(yAxisFunction);

  d3.csv(csvData).then((csv) => {
    data = csv.filter((d) => +d.year === 2019);
    this.update(30);
  });

  this.update = (bin) => {
    const histogram = d3
      .bin()
      .thresholds(bin)
      .value((d) => +d.gdp_cap)(data);

    container.selectAll('rect').remove();

    container
      .selectAll('rect')
      .data(histogram)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.x0) + 1)
      .attr('width', (d) => xScale(d.x1) - xScale(d.x0) - 1)
      .attr('y', (d) => yScale(d.length))
      .attr('height', (d) => yScale(0) - yScale(d.length))
      .attr('fill', '#f44336')
      .style('opacity', 0.8);
  };
}
