import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function ClusterScatter(element) {
  const margin = { top: 20, bottom: 50, right: 50, left: 100 };
  const height = 600 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
  const padding = 5;

  const simulation = d3
    .forceSimulation()
    .alpha(0.3)
    .force(
      'center',
      d3
        .forceCenter()
        .x(width / 2)
        .y(height / 2)
    )
    .force(
      'collide',
      d3.forceCollide((d) => d.radius + padding)
    );

  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };

  const rScale = d3.scaleSqrt().domain([0, 100000]).range([1, 10]);

  let data = [];

  d3.csv(csvData).then((csv) => {
    data = csv.filter((d) => +d.year === 2019);
    this.update();
  });

  this.update = () => {
    const node = container
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data, (d) => d.country)
      .enter()
      .append('circle')
      .attr('r', (d) => rScale(d.gdp_cap))
      .attr('fill', (d) => colors(d.continent));

    simulation.nodes(data, (d) => d.country).on('tick', this.ticked);
  };

  this.ticked = () => {};
}
