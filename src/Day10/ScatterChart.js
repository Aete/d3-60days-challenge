import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function ScatterChart(element) {
  const margin = { top: 20, bottom: 50, right: 50, left: 100 };
  const height = 600 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = container.append('g').attr('transform', `translate(0, ${height})`);

  const yAxis = container.append('g');

  const xScale = d3.scaleLinear().domain([0, 100000]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  const rScale = d3.scaleSqrt().domain([140000, 1430000000]).range([2, 20]);

  const xAxisFunction = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0);

  xAxis.transition().duration(500).call(xAxisFunction);
  yAxis.transition().duration(500).call(yAxisFunction);

  const dotContainer = container.append('g');

  let data;

  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };

  const xAxisTitle = container
    .append('text')
    .text('GDP per capita')
    .attr('text-anchor', 'middle')
    .attr('x', width)
    .attr('y', height + 35)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700)
    .style('font-size', '12px');

  const yAxisTitle = container
    .append('text')
    .text('Life Expectancy')
    .attr('text-anchor', 'end')
    .attr('x', 0)
    .attr('y', -10)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700)
    .style('font-size', '12px');

  const yearText = svg.append('text').attr('x', 900).attr('y', 500).style('font-family', 'sans-serif').style('font-weight', 700).style('font-size', '30px');

  d3.csv(csvData).then((csv) => {
    data = csv;
    for (let i = 1960; i <= 2019; i++) {
      data[i] = data.filter((d) => +d.year === i);
    }
    this.update(1960);
  });

  this.update = (year) => {
    if (!data) {
      return;
    }
    const current = data[year];

    const dots = dotContainer.selectAll('circle').data(current, (d) => d.country);

    dots.exit().remove();

    dots
      .enter()
      .append('circle')
      .attr('fill', (d) => colors[d.continent])
      .attr('fill-opacity', '0.5')
      .attr('cx', (d) => xScale(d.gdp_cap))
      .attr('cy', (d) => yScale(d.life))
      .merge(dots)
      .transition()
      .duration(500)
      .attr('r', (d) => rScale(d.pop))
      .attr('cx', (d) => xScale(d.gdp_cap))
      .attr('cy', (d) => yScale(d.life));

    yearText.text(year);
  };
}
