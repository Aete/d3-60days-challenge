import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

const continents = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];

export default function Tree(element) {
  const data = {
    name: 'Global',
    children: continents.map((continent) => ({ name: continent, children: [] })),
  };

  d3.csv(csvData).then((csv) => {
    const data2019 = csv.filter((d) => +d.year === 2015);
    const topFifteen = data2019.sort((a, b) => b.gdp_cap - a.gdp_cap).slice(0, 15);
    topFifteen.forEach((item) => {
      const { country: name, gdp_cap, continent } = item;
      const current = { name, gdp_cap };
      data.children.find((d) => d.name === continent).children.push(current);
    });
    const africaExamples = data2019
      .filter((d) => d.continent === 'Africa')
      .sort((a, b) => b.gdp_cap - a.gdp_cap)
      .slice(0, 3);

    africaExamples.forEach((item) => {
      const { country: name, gdp_cap, continent } = item;
      const current = { name, gdp_cap };
      data.children.find((d) => d.name === continent).children.push(current);
    });
    this.update();
  });

  const margin = { top: 500, bottom: 50, right: 50, left: 50 };
  const height = 1000 - margin.top - margin.bottom;
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

  const barWidth = 10;

  const xScale = d3.scaleLinear().domain([0, 100000]).range([0, 300]);

  const xGrid = [];

  for (let i = 1; i <= 10; i++) {
    xGrid.push(10000 * i);
  }

  const title = container
    .append('text')
    .attr('class', 'title')
    .text('GDP per Continent')
    .attr('text-anchor', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', -380)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);

  this.update = () => {
    if (data.children[0].children.length === 0) {
      return;
    }
    const root = tree(data);
    let x0 = Infinity;
    let x1 = -x0;
    root.each((d) => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const link = container
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    const node = container
      .append('g')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', (d) => `translate(${d.y},${d.x})`);

    node
      .append('circle')
      .attr('fill', (d) => {
        if (d.children) {
          return colors[d.data.name] || '#212121';
        } else {
          return colors[d.parent.data.name];
        }
      })
      .attr('r', 5);

    const countries = root.descendants().filter((d) => !d.children);
    const xAxis = container.append('g').attr('transform', `translate(${countries[0].y + 20},${330})`);

    const bars = container.append('g').attr('transform', `translate(${countries[0].y + 20},${barWidth * -0.5})`);

    const xAxisFunction = d3.axisBottom(xScale).tickFormat(d3.format('~s'));
    xAxis.call(xAxisFunction);

    xAxis
      .selectAll('.grid')
      .data(xGrid)
      .enter()
      .append('line')
      .attr('class', 'grid')
      .attr('y1', -10)
      .attr('y2', -670)
      .attr('x1', (d) => xScale(d))
      .attr('x2', (d) => xScale(d))
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '3,3');

    bars
      .selectAll('rect')
      .data(countries)
      .enter()
      .append('rect')
      .attr('y', (d) => d.x)
      .attr('width', (d) => xScale(d.data.gdp_cap))
      .attr('height', 10)
      .attr('fill', (d) => colors[d.parent.data.name]);

    bars
      .selectAll('text')
      .data(countries)
      .enter()
      .append('text')
      .attr('y', (d) => d.x + 7)
      .attr('x', (d) => xScale(d.data.gdp_cap) + 6)
      .text((d) => d.data.name)
      .style('font-family', 'sans-serif')
      .style('font-size', '12px');
  };

  function tree(data) {
    const root = d3.hierarchy(data);
    root.dx = 30;
    root.dy = width / (root.height + 1);
    return d3.tree().nodeSize([root.dx, root.dy])(root);
  }
}
