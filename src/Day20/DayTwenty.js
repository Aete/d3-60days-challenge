import { Fragment, useEffect, useRef, useState } from 'react';
import RadialTree from './RadialTree';

export default function DayTwenty() {
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
        Radial Collapsible Tree (Click Circles!)
      </h1>
      <div ref={container}></div>
    </Fragment>
  );
}
