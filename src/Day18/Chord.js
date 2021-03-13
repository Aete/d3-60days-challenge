import * as d3 from 'd3';
import example from '../utils/data/chord_data.json';

export default function Chord(element) {
  const height = 900;
  const width = 900;
  const svg = d3.select(element).append('svg').attr('width', width).attr('height', height);
  const outerRadius = 380;
  const innerRadius = 370;
  const chord = d3.chord().padAngle(0.025).sortSubgroups(d3.descending).sortChords(d3.descending);

  const ribbon = d3
    .ribbon()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius);

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const names = ['Apple', 'HTC', 'Huawei', 'LG', 'Nokia', 'Samsung', 'Sony', 'Other'];
  const colors = ['#c4c4c4', '#69b40f', '#ec1d25', '#c8125c', '#008fc8', '#10218b', '#134b24', '#737373'];

  const chordData = chord(example);

  const ticks = ({ startAngle, endAngle, value }) => {
    const k = (endAngle - startAngle) / value;
    const tickStep = d3.tickStep(0, d3.sum(example.flat()), 100);
    return d3.range(0, value, tickStep).map((value) => {
      return { value, angle: value * k + startAngle };
    });
  };

  const container = svg.append('g').attr('font-size', 10).attr('font-family', 'sans-serif');
  const group = container
    .attr('transform', `translate(${width / 2},${height / 2})`)
    .selectAll('g')
    .data(chordData.groups)
    .join('g');

  group
    .append('path')
    .attr('fill', (d) => colors[d.index])
    .attr('d', arc);

  group.append('title').text(
    (d) => `${names[d.index]}
${d3.format('.1~%')(d.value)}`
  );

  const groupTick = group
    .append('g')
    .selectAll('g')
    .data(ticks)
    .join('g')
    .attr('transform', (d) => `rotate(${(d.angle * 180) / Math.PI - 90}) translate(${outerRadius},0)`);

  groupTick.append('line').attr('stroke', 'currentColor').attr('x2', 6);

  groupTick
    .append('text')
    .attr('x', 8)
    .attr('dy', '0.35em')
    .attr('transform', (d) => (d.angle > Math.PI ? 'rotate(180) translate(-16)' : null))
    .attr('text-anchor', (d) => (d.angle > Math.PI ? 'end' : null))
    .text((d) => d3.format('.1~%')(d.value));

  group
    .select('text')
    .attr('font-weight', 'bold')
    .text(function (d) {
      return this.getAttribute('text-anchor') === 'end' ? `↑ ${names[d.index]}` : `${names[d.index]} ↓`;
    });

  const ribbonPath = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
  const tooltip = svg.append('rect').attr('width', 200).attr('height', 55).style('opacity', 0).attr('fill', '#fff');
  const tooltipTextOne = svg.append('text').style('opacity', 0).style('font-size', '14px');
  const tooltipTextTwo = svg.append('text').style('opacity', 0).style('font-size', '14px');

  ribbonPath
    .selectAll('path')
    .data(chordData)
    .join('path')
    .style('mix-blend-mode', 'multiply')
    .attr('fill', (d) => colors[d.source.index])
    .attr('d', ribbon)
    .attr('fill-opacity', 0.5)
    .on('mousemove', function (event, d) {
      console.log(d);
      d3.select(this).attr('fill-opacity', 0.8);
      tooltip
        .attr('x', event.layerX + 20)
        .attr('y', event.layerY + 20)
        .style('opacity', 0.8);
      tooltipTextOne
        .attr('x', event.layerX + 25)
        .attr('y', event.layerY + 40)
        .text(`${d3.format('.1~%')(d.source.value)} ${names[d.target.index]} → ${names[d.source.index]}`)
        .style('opacity', 0.8);

      tooltipTextTwo
        .attr('x', event.layerX + 25)
        .attr('y', event.layerY + 60)
        .text(d.source.index === d.target.index ? '' : `${d3.format('.1~%')(d.target.value)} ${names[d.source.index]} → ${names[d.target.index]}`)
        .style('opacity', 0.8);
    })
    .on('mouseleave', function (event) {
      d3.select(this).attr('fill-opacity', 0.5);
      tooltip.style('opacity', 0);
      tooltipTextOne.style('opacity', 0);
      tooltipTextTwo.style('opacity', 0);
    });
}
