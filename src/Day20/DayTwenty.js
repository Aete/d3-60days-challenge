import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
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
      <Header />
      <StyledChartTitle>Radial Collapsible Tree (Click Circles!)</StyledChartTitle>
      <div ref={container}></div>
    </Fragment>
  );
}
