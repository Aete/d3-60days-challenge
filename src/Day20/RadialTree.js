import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function RadialTree(element) {
  const margin = { top: 0, bottom: 50, right: 50, left: 50 };
  const height = 975 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;
  const continents = ['Europe', 'Africa', 'Americas', 'Oceania', 'Asia'];

  const data = {
    name: 'Global',
    children: continents.map((continent) => ({ name: continent, children: [], altChildren: [] })),
  };

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left + width / 2}, ${margin.top + height / 2 - 50})`);

  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };

  const barScale = d3.scaleLinear().domain([0, 100000]).range([0, 50]);

  const linkGroup = container.append('g').attr('fill', 'none').attr('stroke', '#555').attr('stroke-opacity', 0.4).attr('stroke-width', 1.5);
  const nodeGroup = container.append('g');

  d3.csv(csvData).then((csv) => {
    const data2019 = csv.filter((d) => +d.year === 2019);
    data2019.forEach((item) => {
      const { country: name, gdp_cap, continent } = item;
      const current = { name, gdp_cap };
      data.children.find((d) => d.name === continent).altChildren.push(current);
    });

    this.update();
  });

  this.update = () => {
    const root = tree(data);

    linkGroup
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

    const nodes = nodeGroup.selectAll('g').data(root.descendants(), (d) => d.data.name);

    nodes.exit().selectAll('g>circle').transition().duration(500).style('opacity', 0);
    nodes.exit().selectAll('g>text').transition().duration(500).style('opacity', 0);
    setTimeout(() => {
      nodes.exit().remove();
    }, 500);

    const newNodes = nodes
      .enter()
      .append('g')
      .attr('transform', (d) => {
        return `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `;
      });

    newNodes
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 7)
      .attr('fill', (d) => {
        if (d.data.name === 'Global') {
          return colors[d.data.name] || '#212121';
        } else {
          return colors[d.data.name] || colors[d.parent.data.name];
        }
      })
      .style('opacity', 1)
      .on('click', (e, d) => {
        [d.data.children, d.data.altChildren] = [d.data.altChildren, d.data.children];
        this.update();
      });

    newNodes
      .append('text')
      .attr('x', (d) => (d.x < Math.PI ? 10 : -10))
      .attr('y', 3)
      .text((d) => d.data.name)
      .style('font-family', 'sans-serif')
      .style('font-size', 10)
      .attr('text-anchor', (d) => (d.x < Math.PI ? 'start' : 'end'))
      .attr('transform', (d) => (d.x >= Math.PI ? 'rotate(180)' : null));

    const allNodes = nodeGroup.selectAll('g').transition().duration(1000);

    allNodes
      .attr(
        'transform',
        (d) => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
      )
      .style('opacity', 1);
  };

  function tree(data) {
    const root = d3.hierarchy(data);
    return d3
      .tree()
      .size([2 * Math.PI, (width * 0.7) / 2])
      .separation((a, b) => {
        if (a.parent.data.name === 'Global') {
          return (a.parent.data.name === b.parent.data.name ? 1 : 2) / a.depth;
        }
        return ((a.parent.data.name === b.parent.data.name ? 1 : 2) * 2 * Math.PI) / 63;
      })(root);
  }
}
