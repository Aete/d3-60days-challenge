import { Fragment, useState, useEffect, useRef } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import ScatterChart from './ScatterChart';

export default function DayFour() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new ScatterChart(container.current));
    }
  }, []);
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>GDP vs Life Expectancy</StyledChartTitle>
      <div lassName="ScatterChart" ref={container}></div>
    </Fragment>
  );
}
