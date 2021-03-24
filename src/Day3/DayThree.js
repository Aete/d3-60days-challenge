import { Fragment, useEffect, useRef, useState } from 'react';
import Header from '../Component/Header';
import * as d3 from 'd3';
import csvData from '../utils/data/seoulEmploymentByIndustry.csv';
import stackedAreaChart from './stackedAreaChart';
import { StyledChartTitle } from '../atoms/headings';

export default function DayThree() {
  const container = useRef();
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (!chart) {
      d3.csv(csvData).then((data) => {
        stackedAreaChart(container.current, data);
      });
    }
  }, [chart]);
  
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Number of employments in Seoul by industries</StyledChartTitle>
      <div className="StackedAreaChart" ref={container}></div>
    </Fragment>
  );
}
