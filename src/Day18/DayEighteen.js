import { Fragment, useEffect, useRef } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import Chord from './Chord';

export default function DayEighteen() {
  const container = useRef();
  useEffect(() => {
    Chord(container.current);
  }, []);
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Chord Diagram</StyledChartTitle>
      <div ref={container}></div>
    </Fragment>
  );
}
