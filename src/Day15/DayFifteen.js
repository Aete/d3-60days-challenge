import { Fragment, useEffect, useRef, useState } from 'react';
import RadialTree from './RadialTree';

export default function DayFifteen() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new RadialTree(container.current));
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
        Radial Tree (GDP per capita)
      </h1>
      <div ref={container}></div>
    </Fragment>
  );
}
