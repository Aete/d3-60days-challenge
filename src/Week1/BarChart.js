import * as d3 from 'd3';
export default function BarChart(element) {
  const margin = { top: 70, bottom: 50, right: 50, left: 50 };
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
    .attr('id', 'xAxis')
    .attr('transform', `translate(0,${height})`);

  const yAxis = container.append('g').attr('id', 'yAxis');

  const bar = container.append('g');

  const anno = container.append('g');

  const data = {
    Seoul: 26927,
    Busan: 3101,
    Daegu: 8526,
    Daejeon: 1169,
    Gwangju: 1970,
    Ulsan: 981,
    Incheon: 4207,
    Sejong: 213,
  };

  const cities = Object.keys(data);

  const title = container
    .append('text')
    .attr('class', 'title')
    .text('Cumulative number of COVID-19 cases (2/18/2021)')
    .attr('text-anchor', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', -30)
    .style('font-family', 'sans-serif')
    .style('font-weight', 700);

  this.update = () => {
    const xScale = d3
      .scaleBand()
      .domain(cities)
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const xAxisFunction = d3.axisBottom(xScale);
    xAxis.transition().duration(500).call(xAxisFunction);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...Object.values(data))])
      .range([height, 0]);
    const yAxisFunction = d3.axisLeft(yScale);
    yAxis.transition().duration(500).call(yAxisFunction);

    bar
      .selectAll('rect')
      .data(Object.entries(data))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('width', xScale.bandwidth())
      .attr('height', ([key, value]) => height - yScale(value))
      .attr('x', ([key, value]) => xScale(key))
      .attr('y', ([key, value]) => yScale(value))
      .attr('fill', '#ff5252');

    anno
      .selectAll('text')
      .data(Object.entries(data))
      .enter()
      .append('text')
      .attr('class', 'anno')
      .text(([key, value]) => value)
      .attr('text-anchor', 'middle')
      .attr('x', ([key, value]) => xScale(key) + 0.5 * xScale.bandwidth())
      .attr('y', ([key, value]) => yScale(value) - 10)
      .style('font-family', 'sans-serif')
      .style('font-size', '12px');
  };
}
