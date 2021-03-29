import { Fragment } from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import Tree from './Tree';

export default function DayTwelve() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new Tree(container.current));
    } else {
      chart.update();
    }
  }, [chart]);
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>GDP per Continent</StyledChartTitle>
      <div ref={container}></div>
    </Fragment>
  );
}
