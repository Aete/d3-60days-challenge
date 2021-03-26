import * as d3 from 'd3';

const capstone = {
  contributer: 3,
  languages: {
    'Jupyter Notebook': 8861243,
    JavaScript: 27762,
    HTML: 9252,
    CSS: 7445,
  },
  commits: 90,
};

export default function Flower(element) {
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

  const container = svg.append('g').attr('transform', `translate(${margin.left},${margin.top - 300})`);

  const colors = {
    'Jupyter Notebook': '#F44336',
    JavaScript: '#2196F3',
    HTML: '#673AB7',
    CSS: '#FFC107',
  };

  const tooltip = svg.append('rect').attr('width', 80).attr('height', 80).style('opacity', 0).attr('fill', '#fff');
  const tooltipTextOne = svg.append('text').style('opacity', 0).style('font-size', '14px');
  const tooltipTextTwo = svg.append('text').style('opacity', 0).style('font-size', '14px');

  this.update = () => {
    container
      .append('line')
      .attr('fill', 'none')
      .attr('stroke', '#969696')
      .attr('stroke-width', 1.5)
      .attr('x1', 0.5 * width)
      .attr('x2', 0.5 * width)
      .attr('y1', 360)
      .attr('y2', 720);

    const rScale = d3.scaleSqrt().domain([0, 8861243]).range([10, 40]);
    const circles = container.append('g').attr('transform', `translate(${width * 0.5},${360})`);
    const data = Object.entries(capstone.languages);

    circles
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', (d) => rScale(d[1]))
      .attr('fill', (d) => colors[d[0]])
      .on('mouseover', function (e, d) {
        console.log(e, d);
      });

    const simulation = d3
      .forceSimulation(data)
      .force('x', d3.forceX().strength(0.01))
      .force('y', d3.forceY().strength(0.01))
      .force(
        'collide',
        d3.forceCollide().radius((d) => {
          console.log(d);
          return rScale(d[1]) + 0.05;
        })
      )
      .on('tick', ticked);

    function ticked() {
      circles
        .selectAll('circle')
        .attr('cx', (d) => {
          //console.log(d);
          return d.x;
        })
        .attr('cy', (d) => d.y);
    }
  };
}
