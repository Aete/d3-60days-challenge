import { Fragment, useEffect, useRef } from 'react';
import GridHeatmap from './GridHeatmap';

export default function DayNineTeen() {
  const container = useRef();
  useEffect(() => {
    GridHeatmap(container.current);
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
        Grid Heatmap (Precipitation, Busan, 2020.07 ~ 2020.12)
      </h1>
      <div ref={container}></div>
    </Fragment>
  );
}
