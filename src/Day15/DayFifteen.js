import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import RadialTree from './RadialTree';
import Header from '../Component/Header';

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
      <Header />
      <StyledChartTitle>Radial Tree (GDP per capita)</StyledChartTitle>
      <div ref={container}></div>
    </Fragment>
  );
}
