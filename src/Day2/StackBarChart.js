import * as d3 from 'd3';

const data = [
  {
    date: 'Feb. 09',
    domestic: 414,
    inflow: 30,
  },
  {
    date: 'Feb. 10',
    domestic: 467,
    inflow: 37,
  },
  {
    date: 'Feb. 11',
    domestic: 384,
    inflow: 19,
  },
  {
    date: 'Feb. 12',
    domestic: 345,
    inflow: 17,
  },
  {
    date: 'Feb. 13',
    domestic: 304,
    inflow: 22,
  },
  {
    date: 'Feb. 14',
    domestic: 322,
    inflow: 21,
  },
  {
    date: 'Feb. 15',
    domestic: 429,
    inflow: 28,
  },
  {
    date: 'Feb. 16',
    domestic: 590,
    inflow: 31,
  },
  {
    date: 'Feb. 17',
    domestic: 290,
    inflow: 31,
  },
  {
    date: 'Feb. 18',
    domestic: 533,
    inflow: 28,
  },
];

export default function StackBarChart(element) {
  const margin = { top: 20, bottom: 50, right: 50, left: 50 };
  const height = 600 - margin.top - margin.bottom;
  const width = 800 - margin.left - margin.right;

  const colors = ['#ff5252', '#448Aff'];
  const category = ['domestic', 'inflow'];

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = container.append('g').attr('id', 'xAxis').attr('transform', `translate(0,${height})`);

  const yAxis = container.append('g').attr('id', 'yAxis');

  const bar = container.append('g');

  const anno = container.append('g');

  const legendContainer = container.append('g').attr('transform', `translate(${0.5 * width - 70}, 20)`);

  const legend = legendContainer
    .selectAll('g')
    .data(category)
    .enter()
    .append('g')
    .attr('transform', (v, i) => `translate(0,${i * 30})`);

  legend
    .append('rect')
    .attr('fill', (d, i) => colors[i])
    .attr('width', 10)
    .attr('height', 10);

  legend
    .append('text')
    .text((d) => (d === 'domestic' ? 'Domestic' : 'Inflow from Abroad'))
    .attr('x', 15)
    .attr('y', 10)
    .style('font-family', 'sans-serif')
    .style('font-size', '12px');

  this.update = () => {
    const total = data.map((v) => v.domestic + v.inflow);
    const maximum = Math.max(...total);
    const dates = data.map((v) => v.date);

    const xScale = d3.scaleBand().domain(dates).range([0, width]).paddingInner(0.3).paddingOuter(0.3);

    const xAxisFunction = d3.axisBottom(xScale).tickSizeOuter(0);
    xAxis.transition().duration(500).call(xAxisFunction);

    const yScale = d3.scaleLinear().domain([0, maximum]).range([height, 0]);
    const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0);
    yAxis.transition().duration(500).call(yAxisFunction);

    const stack = d3.stack().keys(category)(data);

    bar
      .selectAll('stackBar')
      .data(stack)
      .enter()
      .append('g')
      .attr('class', (v, i) => category[i])
      .attr('fill', (v, i) => colors[i])
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.data.date))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => yScale(d[0]) - yScale(d[1]));

    anno
      .selectAll('text')
      .data(total)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('text-anchor', 'middle')
      .attr('x', (v, i) => xScale(dates[i]) + 0.5 * xScale.bandwidth())
      .attr('y', (d) => yScale(d) - 10)
      .style('font-family', 'sans-serif')
      .style('font-size', '12px');
  };
}
