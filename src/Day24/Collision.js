import * as d3 from 'd3';

export default function Collision(element) {
  const margin = { top: 20, bottom: 20, right: 20, left: 20 };
  const height = 800 - margin.top - margin.bottom;
  const width = 800 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('viewBox', `0,0, ${width + margin.left + margin.right}, ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMinYMin meet');

  const container = svg.append('g').attr('transform', `translate(${0.5 * width + margin.left}, ${0.5 * height + margin.top})`);
  const k = width / 200;
  const data = Array(200)
    .fill()
    .map((_) => ({ r: d3.randomUniform(k, k * 8)(), group: Math.floor(Math.random() * 5) }));

  const colors = ['#F44336', '#2196F3', '#673AB7', '#4CAF50', '#FFC107'];

  container
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', (d) => d.r)
    .attr('fill', (d, i) => (i ? colors[d.group] : 'transparent'))
    .attr('cx', 0.5 * width)
    .attr('cy', 0.5 * height);

  const simulation = d3
    .forceSimulation(data)
    .alphaTarget(0.3) // stay hot
    .velocityDecay(0.1) // low friction
    .force('x', d3.forceX().strength(0.01))
    .force('y', d3.forceY().strength(0.01))
    .force(
      'collide',
      d3
        .forceCollide()
        .radius((d) => d.r + 2)
        .iterations(5)
    )
    .force(
      'charge',
      d3.forceManyBody().strength((d, i) => (i ? 0 : -500))
    )
    .on('tick', ticked);

  svg.on('mouseover', function (e) {
    const [x, y] = d3.pointer(e);
    data[0].fx = x - width / 2;
    data[0].fy = y - height / 2;
  });

  function ticked() {
    container
      .selectAll('circle')
      .data(data)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);
  }
}
