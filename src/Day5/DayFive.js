import Slider from '@material-ui/core/Slider';
import { useEffect, useRef, useState } from 'react';
import ScatterChart from './ScatterChart';

export default function DayFive() {
  const [year, setYear] = useState(1960);
  const [chart, setChart] = useState(null);
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
        Scatter Chart with Gapminder dataset
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
      <div className="scatterChart" ref={container}></div>
    </div>
  );
}
