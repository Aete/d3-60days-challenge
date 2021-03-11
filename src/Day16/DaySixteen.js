import { Slider } from '@material-ui/core';
import { Fragment, useEffect, useRef, useState } from 'react';
import Histogram from './Histogram';

export default function DaySixteen() {
  const [chart, setChart] = useState(null);
  const [binCount, setBinCount] = useState(30);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new Histogram(container.current));
    } else {
      chart.update(binCount);
    }
  }, [chart, binCount]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1
        style={{
          fontSize: '16px',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          marginBottom: '40px',
        }}
      >
        Histogram of GDP
      </h1>
      <div style={{ width: '100%', display: 'flex' }}>
        <label style={{ marginRight: '20px', whiteSpace: 'nowrap' }}>Bin number:</label>
        <Slider
          defaultValue={30}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={5}
          max={80}
          onChange={(e, val) => {
            if (val !== binCount) {
              setBinCount(val);
            }
          }}
        />
      </div>
      <div ref={container}></div>
    </div>
  );
}
