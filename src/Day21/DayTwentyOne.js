import { Fragment, useEffect, useRef } from 'react';

export default function DayTwentyOne() {
  const container = useRef();

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
