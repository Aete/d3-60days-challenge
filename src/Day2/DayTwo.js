import { Fragment, useEffect, useRef, useState } from 'react';
import Header from '../Component/Header';
import StackBarChart from './StackBarChart';
import { StyledChartTitle } from '../atoms/headings';

export default function DayTwo() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new StackBarChart(container.current));
    } else {
      chart.update();
    }
  }, [chart]);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Number of Daily COVID-19 cases</StyledChartTitle>
      <div className="stackBarChart" ref={container}></div>
    </Fragment>
  );
}
