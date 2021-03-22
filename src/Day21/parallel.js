import { Container } from '@material-ui/core';
import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function parallel(element) {
  const margin = { top: 10, bottom: 50, right: 100, left: 100 };
  const height = 500 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;
  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
  let data;
  let dimensions = ['pop', 'gdp_cap', 'life'];
  let scales = {};
  let pathes = {};
  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };
  const xScale = d3.scalePoint().range([0, width]).domain(dimensions);

  const update = (year) => {
    for (const dimension of dimensions) {
      scales[dimension] = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d[dimension];
          }),
        ])
        .range([height, 0]);
    }
    function path(d) {
      return d3.line()(
        dimensions.map(function (p) {
          return [xScale(p), scales[p](d[p])];
        })
      );
    }

    container
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', (d) => colors[d.continent])
      .style('opacity', '0.05');

    const axis = container.selectAll('.axis').data(dimensions).enter();

    axis
      .append('g')
      .attr('transform', (d) => `translate(${xScale(d)}, 0)`)
      .each(function (d) {
        d3.select(this).call(d3.axisLeft().scale(scales[d]));
      });

    const titles = ['Population', 'GDP per capita', 'Life Expectancy'];

    const axisTitle = container
      .selectAll('.axisTitle')
      .data(dimensions)
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${xScale(d)}, ${height + 20})`)
      .attr('text-anchor', 'middle')
      .text((d, i) => titles[i])
      .style('font-family', 'sans-serif')
      .style('font-size', '12px');
  };

  d3.csv(csvData).then((csv) => {
    data = csv;
    update(2019);
  });
}
