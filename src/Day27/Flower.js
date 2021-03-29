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

  const tooltipContainer = svg.append('g').style('opacity', 0);
  const tooltip = tooltipContainer.append('rect').attr('width', 140).attr('height', 50).attr('fill', '#fff').style('opacity', 0.8).attr('stroke', '#212121');
  const tooltipTextOne = tooltipContainer.append('text').style('font-size', '14px').attr('x', 10).attr('y', 20).style('font-weight', 700);
  const tooltipTextTwo = tooltipContainer.append('text').style('font-size', '14px').attr('x', 10).attr('y', 40);

  this.update = () => {
    container
      .append('line')
      .attr('fill', 'none')
      .attr('stroke', '#969696')
      .attr('stroke-width', 1.5)
      .attr('x1', 0.5 * width)
      .attr('x2', 0.5 * width)
      .attr('y1', 360)
      .attr('y2', 720)
      .attr('stroke-width', 3)
      .on('mousemove', function (e, d) {
        tooltipContainer.style('opacity', 1).attr('transform', `translate(${e.layerX + 20},${e.layerY + 20})`);
        tooltipTextOne.text(`Commits: ${90}`);
        tooltipTextTwo.text(`3 Contributers`);
      })
      .on('mouseout', function () {
        tooltipContainer.style('opacity', 0);
        tooltipContainer.style('pointer-events', 'none');
      });

    const rScale = d3.scaleSqrt().domain([0, 8861243]).range([3, 40]);
    const circles = container.append('g').attr('transform', `translate(${width * 0.5},${360})`);
    const data = Object.entries(capstone.languages);

    circles
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', (d) => rScale(d[1]))
      .attr('fill', (d) => colors[d[0]])
      .on('mousemove', function (e, d) {
        tooltipContainer.style('opacity', 1).attr('transform', `translate(${e.layerX + 20},${e.layerY + 20})`);
        tooltipTextOne.text(d[0]);
        tooltipTextTwo.text(d[1].toLocaleString());
      })
      .on('mouseout', function () {
        tooltipContainer.style('opacity', 0);
        tooltipContainer.style('pointer-events', 'none');
      });

    const simulation = d3
      .forceSimulation(data)
      .force('x', d3.forceX().strength(0.01))
      .force('y', d3.forceY().strength(0.01))
      .force(
        'collide',
        d3.forceCollide().radius((d) => {
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
