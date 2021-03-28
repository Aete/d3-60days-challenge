import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import ScatterChart from './ScatterChart';

export default function DayNine() {
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
      <div className="ScatterChart" ref={container}></div>
    </Fragment>
  );
}
