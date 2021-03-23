import { Fragment, useState, useEffect, useRef } from 'react';
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
      <h1
        style={{
          fontSize: '16px',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          marginBottom: '40px',
        }}
      >
        Scatterplot with the Gapminder dataset (responsive, resize a width of the webpage)
      </h1>
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
