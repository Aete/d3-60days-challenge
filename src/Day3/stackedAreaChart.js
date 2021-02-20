import * as d3 from 'd3';

export default function StackedAReaChart(element, data) {
  const years = data.columns.slice(1);

  const dataTranspose = years.map((year) => {
    const current = { year: year };
    data.forEach((d) => {
      const industry = d.Industry;
      current[industry] = d[year];
    });
    return current;
  });

  const industries = Object.keys(dataTranspose[0]).filter(
    (column) => column !== 'year'
  );

  const stackedData = d3.stack().keys(industries)(dataTranspose);
  const maximum = Math.max(
    ...stackedData[stackedData.length - 1].map((v) => v[1])
  );

  const margin = { top: 70, bottom: 50, right: 600, left: 50 };
  const height = 600 - margin.top - margin.bottom;
  const width = 1200 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xAxis = container
    .append('g')
    .attr('transform', `translate(0,${height})`);

  const xScale = d3.scaleLinear().domain([2009, 2019]).range([0, width]);
  const xAxisFunction = d3
    .axisBottom(xScale)
    .tickSizeOuter(0)
    .tickFormat(d3.format('d'));

  xAxis.call(xAxisFunction);

  const yAxis = container.append('g');

  const yScale = d3.scaleLinear().domain([0, maximum]).range([height, 0]);
  const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0).tickFormat(d3.format(".2s"));
  yAxis.call(yAxisFunction);

  const areaFunction = d3
    .area()
    .x((d) => xScale(d.data.year))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  const colors = [
    '#9E9E9E',
    '#F44336',
    '#607D8B',
    '#4CAF50',
    '#FFC107',
    '#E91E63',
    '#2196F3',
    '#8BC34A',
    '#795548',
    '#9227B0',
    '#009688',
    '#673AB7',
    '#FF5722',
    '#00BCD4',
    '#3F51B5',
    '#FF9800',
    '#CDDC39',
  ];

  const area = container.append('g');

  area
    .selectAll('path')
    .data(stackedData)
    .enter()
    .append('path')
    .attr('fill', (v, i) => colors[i])
    .attr('d', areaFunction)
    .append('title')
    .text(({ key }) => key);

  const legend = container
    .append('g')
    .attr('transform', `translate(${width + 15},0)`);

  legend
    .selectAll('rect')
    .data(industries)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (v, i) => 25 * i)
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill',(v,i)=>colors[i]);

  legend.selectAll('text')
  .data(industries)
  .enter()
  .append('text')
  .attr('x', 13)
  .attr('y', (v, i) => 25 * i + 9)
  .text(d=>d)
      .style('font-family', 'sans-serif')
    .style('font-size', '12px');

  const title = container
    .append('text')
    .attr('class', 'title')
    .text('Number of employments in Seoul by industries')
    .attr('text-anchor', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', -30)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);
}
