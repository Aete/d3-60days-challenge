import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function RadialTree(element) {
  const margin = { top: 0, bottom: 50, right: 50, left: 50 };
  const height = 800 - margin.top - margin.bottom;
  const width = 800 - margin.left - margin.right;
  const continents = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];

  const data = {
    name: 'Global',
    children: continents.map((continent) => ({ name: continent, children: [] })),
  };

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);

  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };

  const barScale = d3.scaleLinear().domain([0, 100000]).range([0, 50]);

  d3.csv(csvData).then((csv) => {
    const data2019 = csv.filter((d) => +d.year === 2019);
    data2019.forEach((item) => {
      const { country: name, gdp_cap, continent } = item;
      const current = { name, gdp_cap };
      data.children.find((d) => d.name === continent).children.push(current);
    });
    this.update();
  });

  this.update = () => {
    if (data.children[0].children.length === 0) {
      return;
    }

    const root = tree(data);

    const link = container
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('stroke', (d) => {
        const strokeColor = colors[d.source.data.name] || colors[d.target.data.name];
        return strokeColor || '#212121';
      })
      .attr(
        'd',
        d3
          .linkRadial()
          .radius((d) => d.y)
          .angle((d) => d.x)
      );

    const node = container
      .append('g')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr(
        'transform',
        (d) => `
      rotate(${(d.x * 180) / Math.PI - 90})
      translate(${d.y},0)
    `
      );

    node
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 3)
      .attr('fill', (d) => {
        if (d.children) {
          return colors[d.data.name] || '#212121';
        } else {
          return colors[d.parent.data.name];
        }
      });

    const countries = root.descendants().filter((d) => !d.children);

    const bars = container
      .selectAll('rect')
      .data(countries)
      .enter()
      .append('rect')
      .attr(
        'transform',
        (d) => `
      rotate(${(d.x * 180) / Math.PI - 90})
      translate(${d.y + 8},0)
    `
      )
      .attr('x', 0)
      .attr('y', -3)
      .attr('width', (d) => barScale(d.data.gdp_cap))
      .attr('height', 6)
      .attr('fill', (d) => {
        if (d.children) {
          return colors[d.data.name] || '#212121';
        } else {
          return colors[d.parent.data.name];
        }
      });

    container
      .selectAll('text')
      .data(countries)
      .enter()
      .append('text')
      .attr(
        'transform',
        (d) => `
        rotate(${(d.x * 180) / Math.PI - 90}) 
        translate(${d.y + barScale(d.data.gdp_cap) + 15},0) 
        rotate(${d.x >= Math.PI ? 180 : 0})
      `
      )
      .attr('text-anchor', (d) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
      .attr('y', 3)
      .text((d) => d.data.name)
      .style('font-family', 'sans-serif')
      .style('font-size', 10);
  };

  function tree(data) {
    const root = d3.hierarchy(data);
    return d3
      .tree()
      .size([2 * Math.PI, (width * 0.75) / 2])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)(root);
  }
}
