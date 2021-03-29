import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function ClusterScatter(element) {
  const margin = { top: -150, bottom: 50, right: 50, left: 50 };
  const height = 500 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };

  const rScale = d3.scaleSqrt().domain([0, 100000]).range([1, 30]);

  const xCenter = {
    Asia: 50,
    Americas: 250,
    Oceania: 450,
    Europe: 650,
    Africa: 850,
  };

  let data = [];

  const label = container
    .append('g')
    .attr('class', 'label')
    .selectAll('text')
    .data(Object.keys(colors))
    .enter()
    .append('text')
    .attr('x', (d) => xCenter[d])
    .attr('y', 500)
    .text((d) => d)
    .attr('text-anchor', 'middle')
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);

  d3.csv(csvData).then((csv) => {
    data = csv
      .filter((d) => +d.year === 2019)
      .map((d) => {
        d.x = xCenter[d.continent];
        return d;
      });
    this.update();
  });

  this.update = () => {
    const nodes = container
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data, (d) => d.country)
      .enter()
      .append('circle')
      .attr('r', (d) => rScale(d.gdp_cap))
      .attr('fill', (d) => colors[d.continent])
      .attr('cx', (d) => xCenter[d.continent])
      .attr('cy', height / 2)
      .attr('fill-opacity', 0.1);

    const simulation = d3
      .forceSimulation(data)
      .force('charge', d3.forceManyBody().strength(5))
      .force(
        'x',
        d3.forceX().x((d) => {
          return xCenter[d.continent];
        })
      )
      .force(
        'collision',
        d3.forceCollide().radius((d) => rScale(d.gdp_cap))
      )
      .on('tick', tick);

    function tick() {
      container
        .selectAll('circle')
        .attr('cx', (d) => {
          return d.x || xCenter[d.continent];
        })
        .attr('cy', (d) => d.y + height / 2)
        .attr('fill-opacity', 0.8);
    }
  };
}
