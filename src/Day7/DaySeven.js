import { Slider } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import ScatterChart from './ScatterChart';

export default function DaySeven() {
  const [chart, setChart] = useState(null);
  const [year, setYear] = useState(1960);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new ScatterChart(container.current));
    } else {
      chart.update(year);
    }
  }, [chart, year]);

  return (
    <div
      className="scatterChartAnimation"
      style={{ maxWidth: '1000px', width: '1000px' }}
    >
      <h1
        style={{
          fontSize: '16px',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          marginBottom: '40px',
        }}
      >
        Scatter Chart with Gapminder dataset (Panning + Zooming)
      </h1>
      <Slider
        defaultValue={1960}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1960}
        max={2019}
        onChange={(e, val) => {
          if (val !== year) {
            setYear(val);
          }
        }}
      />
      <div ref={container}></div>
    </div>
  );
}
