import { Fragment, useEffect, useRef, useState } from 'react';
import Header from '../Component/Header';
import BarChart from './BarChart';
import { StyledChartTitle } from '../atoms/headings';

export default function WeekOne() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new BarChart(container.current));
    } else {
      chart.update();
    }
  }, [chart]);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Cumulative number of COVID-19 cases (2/18/2021)</StyledChartTitle>
      <div ref={container}></div>;
    </Fragment>
  );
}
