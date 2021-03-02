import * as d3 from 'd3';
import csvData from '../utils/data/gapminder.csv';

export default function ScatterChartOne(element, countryFilter) {
  const margin = { top: 50, bottom: 50, right: 50, left: 100 };
  const height = 300 - margin.top - margin.bottom;
  const width = 500 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = container.append('g').attr('transform', `translate(0, ${height})`);

  const yAxis = container.append('g');

  const xScale = d3.scaleLinear().domain([0, 100000]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

  const xAxisFunction = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0);

  xAxis.transition().duration(500).call(xAxisFunction);
  yAxis.transition().duration(500).call(yAxisFunction);

  const dotContainer = container.append('g');

  const data = [];

  const colors = {
    Asia: '#F44336',
    Americas: '#2196F3',
    Oceania: '#673AB7',
    Europe: '#4CAF50',
    Africa: '#FFC107',
  };

  const xAxisTitle = container
    .append('text')
    .text('GDP per capita')
    .attr('text-anchor', 'middle')
    .attr('x', width)
    .attr('y', height + 35)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700)
    .style('font-size', '12px');

  const yAxisTitle = container
    .append('text')
    .text('Life Expectancy')
    .attr('text-anchor', 'end')
    .attr('x', 0)
    .attr('y', -10)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700)
    .style('font-size', '12px');

  const title = container
    .append('text')
    .attr('class', 'title')
    .text('GDP vs Life Expectancy')
    .attr('text-anchor', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', -30)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);

  d3.csv(csvData).then((csv) => {
    for (let i = 1960; i <= 2019; i++) {
      data[i - 1960] = csv.filter((d) => +d.year === i);
    }
    this.update(2019, []);
  });

  this.update = (year, countryList) => {
    if (data.length === 0) {
      return;
    }
    const current = data[year - 1960];

    const dots = dotContainer.selectAll('circle').data(current, (d) => d.country);

    dots.exit().remove();

    dots
      .enter()
      .append('circle')
      .attr('fill-opacity', '0.5')
      .attr('cx', (d) => xScale(d.gdp_cap))
      .attr('cy', (d) => yScale(d.life))
      .merge(dots)
      .transition()
      .duration(500)
      .attr('fill', (d) => {
        return countryList.includes(d.country) ? '#f44336' : '#ccc';
      })
      .attr('r', (d) => 5);

    const dot = dotContainer.selectAll('circle');

    const brush = d3.brush().on('start brush end', brushed);

    dotContainer.call(brush);

    function brushed({ selection }) {
      let values = [];
      if (selection) {
        const [[x0, y0], [x1, y1]] = selection;
        values = dot.filter((d) => x0 <= xScale(d.gdp_cap) && xScale(d.gdp_cap) < x1 && y0 <= yScale(d.life) && yScale(d.life) < y1).data();
        console.log(values);
        countryFilter(values.map((d) => d.country));
      } else {
        dot.attr('fill', '#2196F3');
      }
    }
  };
}
