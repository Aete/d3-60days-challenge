import { Fragment, useEffect, useRef } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import CirclePacking from './CirclePacking';

export default function DaySeventeen() {
  const container = useRef();
  useEffect(() => {
    CirclePacking(container.current);
  }, []);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Circle Packing diagram of GDP</StyledChartTitle>
      <div ref={container}></div>
    </Fragment>
  );
}
