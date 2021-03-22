import { Fragment, useEffect, useRef } from 'react';
import parallel from './parallel';

export default function DayTwentyOne() {
  const container = useRef();
  useEffect(() => {
    parallel(container.current);
  }, []);

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
        Parallel Coordinates Chart
      </h1>
      <div ref={container}></div>
    </Fragment>
  );
}
