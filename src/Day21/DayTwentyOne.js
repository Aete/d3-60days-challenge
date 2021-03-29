import { Fragment, useEffect, useRef } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import parallel from './parallel';

export default function DayTwentyOne() {
  const container = useRef();
  useEffect(() => {
    parallel(container.current);
  }, []);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Parallel Coordinates Chart</StyledChartTitle>
      <div ref={container}></div>
    </Fragment>
  );
}
