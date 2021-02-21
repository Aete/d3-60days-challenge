import * as d3 from 'd3';
import lifeData from '../utils/data/life_expectancy_years_2019.csv';
import gdpData from '../utils/data/gdppercapita_us_inflation_adjusted_2019.csv';

export default function ScatterChart(element) {
  const margin = { top: 70, bottom: 50, right: 50, left: 100 };
  const height = 600 - margin.top - margin.bottom;
  const width = 800 - margin.left - margin.right;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const container = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = container
    .append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0,${height})`);

  const yAxis = container.append('g').attr('class', 'yAxis');

  const dots = container.append('g').attr('class', 'dots');

  const title = container
    .append('text')
    .attr('class', 'title')
    .text('GDP vs Life Expectancy')
    .attr('text-anchor', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', -30)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);

  const xAxisTitle = container
    .append('text')
    .text('GDP')
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
    .attr('y', -5)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700)
    .style('font-size', '12px');

  Promise.all([d3.csv(lifeData), d3.csv(gdpData)]).then(([life, gdp]) => {
    const gdpCities = gdp.reduce(
      (acc, curr) => {
        if (curr['2019'] > 0) {
          acc.countries.add(curr.country);
          acc[curr.country] = +curr['2019'];
        }
        return acc;
      },
      { countries: new Set() }
    );
    const data = life.reduce((acc, curr) => {
      if (gdpCities.countries.has(curr.country) && curr['2019'] > 0) {
        const temp = { country: curr.country };
        temp.lifeExp = +curr['2019'];
        temp.gdp = gdpCities[curr.country];
        acc.push(temp);
      }
      return acc;
    }, []);

    const xMax = Math.max(...data.map((d) => d.gdp));
    const yMax = Math.max(...data.map((d) => d.lifeExp));

    const xScale = d3.scaleLinear().domain([0, xMax]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

    const xAxisFunction = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxisFunction = d3.axisLeft(yScale).tickSizeOuter(0);

    xAxis.call(xAxisFunction);
    yAxis.call(yAxisFunction);

    dots
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 3)
      .attr('cx', (d) => xScale(d.gdp))
      .attr('cy', (d) => yScale(d.lifeExp))
      .attr('fill', '#2196F3')
      .attr('fill-opacity', '0.5');
  });
}
