import { Fragment, useState, useEffect, useRef } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import ScatterChart from './ScatterPlot';

export default function DayTwentyTwo() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new ScatterChart(container.current));
    } else {
      chart.redraw();
      window.addEventListener('resize', chart.redraw);
      return window.addEventListener('resize', chart.redraw);
    }
  }, [chart]);
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Scatterplot with the Gapminder dataset (responsive, resize a width of the webpage)</StyledChartTitle>
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
        }}
        ref={container}
      ></div>
    </Fragment>
  );
}
