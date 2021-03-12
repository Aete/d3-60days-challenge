import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function CirclePacking(element) {
  const margin = { top: 0, bottom: 20, right: 20, left: 20 };
  const width = 800 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.top},${margin.left})`);

  const continents = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];

  const data = {
    name: 'Global',
    children: continents.map((continent) => ({ name: continent, children: [] })),
  };

  const pack = (data) => {
    return d3.pack().size([width, height]).padding(3)(
      d3
        .hierarchy(data)
        .sum((d) => +d.gdp_cap)
        .sort((a, b) => +b.gdp_cap - +a.gdp_cap)
    );
  };

  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };

  const test = async () => {
    const csv = await d3.csv(csvData);
    const csv2019 = csv.filter((d) => d.year === '2019');
    csv2019.forEach((item) => {
      const { country: name, gdp_cap, continent } = item;
      const current = { name, gdp_cap, continent };
      data.children.find((d) => d.name === continent).children.push(current);
    });
    const root = pack(data);

    const rScale = d3.scaleSqrt().domain([0, root.value]).range([1, 50]);
    const node = container
      .append('g')
      .selectAll('circle')
      .data(root.descendants().slice(1))
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y - 30)
      .attr('r', (d) => d.r)
      .attr('fill', (d) => {
        return colors[d.data.name] || '#fff';
      })
      .style('opacity', 0.9);

    const label = svg
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(root.descendants())
      .join('text')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .style('font-size', '28px')
      .style('font-family', 'sans-serif')
      .style('font-weight', 700)
      .style('opacity', (d) => (d.parent === root ? 0.6 : 0))
      .style('display', (d) => (d.parent === root ? 'inline' : 'none'))
      .text((d) => d.data.name);
  };

  test();
}
