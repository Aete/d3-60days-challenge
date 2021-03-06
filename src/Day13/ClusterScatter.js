import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function ClusterScatter(element) {
  const margin = { top: 0, bottom: 50, right: 50, left: 50 };
  const height = 500 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
  const padding = 5;

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

  const title = container
    .append('text')
    .attr('class', 'title')
    .text('GDP per Continent')
    .attr('text-anchor', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', 50)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);

  const label = container
    .append('g')
    .attr('class', 'label')
    .selectAll('text')
    .data(Object.keys(colors))
    .enter()
    .append('text')
    .attr('x', (d) => xCenter[d])
    .attr('y', 430)
    .text((d) => d)
    .attr('text-anchor', 'middle')
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);

  d3.csv(csvData).then((csv) => {
    data = csv.filter((d) => +d.year === 2019);
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
      .attr('cx', (d) => xCenter[d.continent]);

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

    function tick(e) {
      nodes
        .attr('cx', (d) => {
          return d.x;
        })
        .attr('cy', (d) => d.y + height / 2);
    }
  };
}
