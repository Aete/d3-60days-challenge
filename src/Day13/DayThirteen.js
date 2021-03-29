import { Fragment, useEffect, useState, useRef } from 'react';
import ClusterScatter from './ClusterScatter';
import Header from '../Component/Header';
import { StyledChartTitle } from '../atoms/headings';

export default function DayThirteen() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new ClusterScatter(container.current));
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
