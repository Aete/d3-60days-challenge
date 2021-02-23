import * as d3 from 'd3';

const data = [
  {
    date: '2021-02-09',
    domestic: 414,
    inflow: 30,
  },
  {
    date: '2021-02-10',
    domestic: 467,
    inflow: 37,
  },
  {
    date: '2021-02-11',
    domestic: 384,
    inflow: 19,
  },
  {
    date: '2021-02-12',
    domestic: 345,
    inflow: 17,
  },
  {
    date: '2021-02-13',
    domestic: 304,
    inflow: 22,
  },
  {
    date: '2021-02-14',
    domestic: 322,
    inflow: 21,
  },
  {
    date: '2021-02-15',
    domestic: 429,
    inflow: 28,
  },
  {
    date: '2021-02-16',
    domestic: 590,
    inflow: 31,
  },
  {
    date: '2021-02-17',
    domestic: 290,
    inflow: 31,
  },
  {
    date: '2021-02-18',
    domestic: 533,
    inflow: 28,
  },
];

export default function LineChart(element) {
  const processedData = data.map((d) => {
    const date = d3.timeParse('%Y-%m-%d')(d.date);
    d.date = date;
    return d;
  });

  const margin = { top: 70, bottom: 50, right: 50, left: 50 };
  const height = 600 - margin.top - margin.bottom;
  const width = 800 - margin.left - margin.right;

  const colors = ['#ff5252', '#448Aff'];
  const category = ['domestic', 'inflow'];
  const maximum = Math.max(
    Math.max(...data.map((d) => d.domestic)),
    Math.max(...data.map((d) => d.inflow))
  );

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xScale = d3
    .scaleTime()
    .domain(
      d3.extent(processedData, function (d) {
        return d.date;
      })
    )
    .range([0, width]);

  const xAxis = container
    .append('g')
    .attr('transform', `translate(0,${height})`);
  const xAxisFunction = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat('%b. %d'))
    .tickSizeOuter(0);
  xAxis.call(xAxisFunction);

  const yScale = d3.scaleLinear().domain([0, maximum]).range([height, 0]);
  const yAxis = container.append('g');
  const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0);
  yAxis.call(yAxisFunction);

  container
    .append('g')
    .append('path')
    .datum(processedData)
    .attr('fill', 'none')
    .attr('stroke', colors[1])
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      d3
        .line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.inflow))
    );

  container
    .append('g')
    .append('path')
    .datum(processedData)
    .attr('fill', 'none')
    .attr('stroke', colors[0])
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      d3
        .line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.domestic))
    );

  const legendContainer = container
    .append('g')
    .attr('transform', `translate(${0.5 * width - 70}, 20)`);

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

  container
    .append('text')
    .attr('class', 'title')
    .text('Number of Daily COVID-19 cases')
    .attr('text-anchor', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', -30)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);
}
