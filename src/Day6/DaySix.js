import { Fragment, useEffect, useRef } from 'react';
import LineChart from './LineChart';
import styled from 'styled-components';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';

export default function DaySix() {
  const container = useRef();
  useEffect(() => {
    LineChart(container.current);
  }, []);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Number of Daily COVID-19 cases</StyledChartTitle>
      <div className="Linechart" ref={container}></div>
    </Fragment>
  );
}
