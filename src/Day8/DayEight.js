import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import PieChart from './PieChart';

export default function DayEight() {
  const [chart, setChart] = useState();
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new PieChart(container.current));
    }
  }, [chart]);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Pie Chart with COVID-19 dataset</StyledChartTitle>
      <div className="Piechart" ref={container}></div>
    </Fragment>
  );
}
