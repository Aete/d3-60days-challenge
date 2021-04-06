import * as d3 from 'd3';
import { gitData } from './_data';

export default function Flower(element) {
  const margin = { top: 20, bottom: 20, right: 0, left: 50 };
  const height = 1200 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('viewBox', `0,0, ${width + margin.left + margin.right}, ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMinYMin meet');

  const container = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const tooltipContainer = svg.append('g').style('opacity', 0);
  tooltipContainer.append('rect').attr('width', 140).attr('height', 50).attr('fill', '#fff').style('opacity', 0.8).attr('stroke', '#212121');
  const tooltipTextOne = tooltipContainer.append('text').style('font-size', '14px').attr('x', 10).attr('y', 20).style('font-weight', 700);
  const tooltipTextTwo = tooltipContainer.append('text').style('font-size', '14px').attr('x', 10).attr('y', 40);

  const colors = {
    'Jupyter Notebook': '#F44336',
    JavaScript: '#2196F3',
    HTML: '#673AB7',
    CSS: '#FFC107',
    Python: '#4CAF50',
  };

  this.update = () => {
    gitData.sort((a, b) => b.commits - a.commits);
    const maximumCommits = Math.max(...gitData.map((d) => d.commits));
    const yScale = d3.scaleLinear().domain([0, maximumCommits]).range([800, 500]);
    const rScale = d3.scaleSqrt().domain([0, 8861243]).range([10, 80]);

    const flowerContainers = container
      .selectAll('.flower-container')
      .data(gitData)
      .enter()
      .append('g')
      .attr('class', 'flower-container')
      .attr('transform', (d, i) => {
        return `translate(${(i % 4) * 230}, ${Math.floor(i / 4) * 300 - 400})`;
      });

    flowerContainers.each(function (d, i) {
      const flower = d3.select(this);
      const title = d.name;
      const languages = Object.entries(d).filter((entry) => entry[0] !== 'contributors' && entry[0] !== 'commits');

      flower
        .append('line')
        .attr('fill', 'none')
        .attr('stroke', '#969696')
        .attr('stroke-width', 1.5)
        .attr('x1', 135)
        .attr('x2', 135)
        .attr('y1', yScale(0))
        .attr('y2', yScale(d.commits))
        .attr('stroke-width', d.contributors * 2)
        .on('mousemove', function (e, data) {
          tooltipContainer.style('opacity', 1).attr('transform', `translate(${e.layerX < 800 ? e.layerX + 20 : e.layerX - 160},${e.layerY + 20})`);
          tooltipTextOne.text(`Commits: ${data.commits}`);
          tooltipTextTwo.text(`${data.contributors} Contributers`);
        })
        .on('mouseout', function () {
          tooltipContainer.style('opacity', 0);
          tooltipContainer.style('pointer-events', 'none');
        });

      const circles = flower.append('g').attr('transform', `translate(${135},${yScale(d.commits)})`);

      circles
        .selectAll('circle')
        .data(languages)
        .enter()
        .append('circle')
        .attr('r', (d) => rScale(d[1]))
        .attr('fill', (d) => colors[d[0]])
        .attr('fill-opacity', 0.8)
        .on('mousemove', function (e, d) {
          tooltipContainer.style('opacity', 1).attr('transform', `translate(${e.layerX < 800 ? e.layerX + 20 : e.layerX - 160},${e.layerY + 20})`);
          tooltipTextOne.text(d[0]);
          tooltipTextTwo.text(d[1].toLocaleString());
        })
        .on('mouseout', function () {
          tooltipContainer.style('opacity', 0);
          tooltipContainer.style('pointer-events', 'none');
        });

      flower
        .append('text')
        .text(title)
        .attr('transform', `translate(${135}, ${830})`)
        .attr('text-anchor', 'middle')
        .style('font-family', 'sans-serif')
        .style('font-size', '14px')
        .style('font-weight', 600);

      const simulation = d3
        .forceSimulation(languages)
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
            return d.x;
          })
          .attr('cy', (d) => d.y);
      }
    });

    const yScaleSub = d3
      .scaleLinear()
      .domain([0, 50])
      .range([800, yScale(50)]);

    for (let i = 0; i < 3; i++) {
      const grid = container.append('g').attr('transform', `translate(-10, ${Math.floor(i) * 300 - 400})`);
      const axisLeft = d3.axisLeft(yScaleSub).ticks(4);
      grid.transition().duration(500).call(axisLeft);
      const ticks = [10, 30, 50];

      grid
        .selectAll('.grid')
        .data(ticks)
        .enter()
        .append('line')
        .attr('x1', 10)
        .attr('x2', width)
        .attr('y1', (d) => yScale(d))
        .attr('y2', (d) => yScale(d))
        .attr('stroke', '#969696')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '2 2');

      grid
        .append('line')
        .attr('x1', 10)
        .attr('x2', width)
        .attr('y1', yScale(0))
        .attr('y2', yScale(0))
        .attr('stroke', '#212121')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '2 2');
    }
  };
}
