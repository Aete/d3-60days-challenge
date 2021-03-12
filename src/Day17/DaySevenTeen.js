import { Fragment, useEffect, useRef } from 'react';
import CirclePacking from './CirclePacking';

export default function DaySeventeen() {
  const container = useRef();
  useEffect(() => {
    CirclePacking(container.current);
  }, []);

  return (
    <Fragment>
      <h1
        style={{
          fontSize: '16px',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          marginBottom: '0',
        }}
      >
        Circle Packing diagram of GDP
      </h1>
      <div ref={container}></div>
    </Fragment>
  );
}
