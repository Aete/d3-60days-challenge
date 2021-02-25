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

export default function PieChart(element) {
  const margin = { top: 100, bottom: 50, right: 50, left: 100 };
  const height = 600 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const pie = d3.pie().value((d) => d.value);
  const processedData = data.map((d) => {
    const current = {};
    current.date = d.date;
    current.data = [];
    current.data.push({ label: 'domestic', value: d.domestic });
    current.data.push({ label: 'inflow', value: d.inflow });
    return current;
  });

  const arcLabel = d3.arc().innerRadius(60).outerRadius(60);

  const pies = container
    .selectAll('g')
    .data(processedData)
    .enter()
    .append('g')
    .attr(
      'transform',
      (d, i) => `translate(${(i % 5) * 200},${Math.floor(i / 5) * 250})`
    );

  pies
    .selectAll('path')
    .data((d) => pie(d.data))
    .enter()
    .append('path')
    .attr('d', d3.arc().innerRadius(0).outerRadius(80))
    .attr('fill', (d) => (d.data.label === 'domestic' ? '#f44336' : '#2196f3'))
    .attr('fill-opacity', '0.8');

  pies
    .selectAll('text')
    .data((d) => pie(d.data))
    .enter()
    .append('text')
    .attr('transform', (d) => `translate(${arcLabel.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text((d) => d.data.value)
    .style('font-family', 'sans-script')
    .style('font-size', '15px');

  pies
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('y', 100)
    .text((d) => {
      const time = d3.timeParse('%Y-%m-%d')(d.date);
      return d3.timeFormat('%b. %d')(time);
    })
    .style('font-family', 'sans-serif')
    .style('font-size', '13px');

  const legendContainer = container
    .append('g')
    .attr('transform', `translate(${0.5 * width - 70}, 400)`);

  const legend = legendContainer
    .selectAll('g')
    .data(['domestic', 'inflow'])
    .enter()
    .append('g')
    .attr('transform', (v, i) => `translate(0,${i * 30})`);

  legend
    .append('rect')
    .attr('fill', (d) => (d === 'domestic' ? '#f44336' : '#2196f3'))
    .attr('fill-opacity', 0.8)
    .attr('width', 10)
    .attr('height', 10);

  legend
    .append('text')
    .text((d) => (d === 'domestic' ? 'Domestic' : 'Inflow from Abroad'))
    .attr('x', 15)
    .attr('y', 10)
    .style('font-family', 'sans-serif')
    .style('font-size', '12px');
}
