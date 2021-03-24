import * as d3 from 'd3';
export default function BarChart(element) {
  const margin = { top: 20, bottom: 50, right: 100, left: 100 };
  const height = 600 - margin.top - margin.bottom;
  const width = 1000 - margin.left - margin.right;
  const annoTextSize = 12;
  const axisTextSize = 11;

  const svg = d3
    .select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('viewBox', `0,0,${width + margin.left + margin.right}, ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMinYMin meet');

  const container = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  const xAxis = container.append('g').attr('id', 'xAxis').attr('transform', `translate(0,${height})`).style('font-size', `${axisTextSize}px`);

  const yAxis = container.append('g').attr('id', 'yAxis').style('font-size', `${axisTextSize}px`);

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

  this.update = () => {
    const xScale = d3.scaleBand().domain(cities).range([0, width]).paddingInner(0.3).paddingOuter(0.3);

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

  this.redraw = () => {
    const currentWidth = parseInt(svg.style('width'), 10);

    svg.attr('width', currentWidth + margin.right + margin.left);
    svg.selectAll('.anno').style('font-size', `${annoTextSize * (1000 / currentWidth)}px`);
    svg.selectAll('.tick text').style('font-size', `${axisTextSize * (1000 / currentWidth)}px`);
  };
}
