import { Fragment, useEffect, useRef } from 'react';
import Chord from './Chord';

export default function DayEighteen() {
  const container = useRef();
  useEffect(() => {
    Chord(container.current);
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
        Chord Diagram
      </h1>
      <div ref={container}></div>
    </Fragment>
  );
}
