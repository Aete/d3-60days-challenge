import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function ClusterScatter(element, clusterBtn) {
  const margin = { top: 50, bottom: 50, right: 50, left: 50 };
  const height = 800 - margin.top - margin.bottom;
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

  const rScale = d3.scaleSqrt().domain([0, 1430000000]).range([1, 40]);
  const xScale = d3.scaleLinear().domain([0, 100000]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

  const xAxis = container.append('g').attr('transform', `translate(0, ${height})`);
  const yAxis = container.append('g');
  const xAxisFunction = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0);
  xAxis.transition().duration(500).call(xAxisFunction);
  yAxis.transition().duration(500).call(yAxisFunction);

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
    .attr('y', 0.5 * height + 100)
    .text((d) => d)
    .attr('text-anchor', 'middle')
    .style('font-family', 'sans-serif')
    .style('font-weight', 700)
    .style('opacity', 0);

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
      .attr('r', (d) => rScale(d.pop))
      .attr('fill', (d) => colors[d.continent])
      .attr('cx', (d) => xScale(d.gdp_cap))
      .attr('cy', (d) => yScale(d.life))
      .style('opacity', 0.8);

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
        'y',
        d3
          .forceY()
          .y((d) => {
            return 0.5 * height;
          })
          .strength(0.01)
      )
      .force(
        'collision',
        d3.forceCollide().radius((d) => rScale(d.pop))
      )
      .on('end', btnActivate);
  };

  this.moveNodes = (type) => {
    if (type === 'cluster') {
      container
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y + 150);

      xAxis.transition().duration(500).style('opacity', 0);
      yAxis.transition().duration(500).style('opacity', 0);

      label.transition().duration(500).style('opacity', 1);
    } else {
      container
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cx', (d) => xScale(d.gdp_cap))
        .attr('cy', (d) => yScale(d.life));

      xAxis.transition().duration(500).style('opacity', 1);
      yAxis.transition().duration(500).style('opacity', 1);

      label.transition().duration(500).style('opacity', 0);
    }
  };

  function btnActivate() {
    clusterBtn.disabled = false;
  }
}
