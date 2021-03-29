import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import BarChart from './BarChart';
import styled from 'styled-components';

const StyledChartContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function DayTwentyThree() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new BarChart(container.current));
    } else {
      chart.update();
      chart.redraw();
      window.addEventListener('resize', chart.redraw);
      return window.addEventListener('resize', chart.redraw);
    }
  }, [chart]);
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Bar chart + viewbox</StyledChartTitle>
      <StyledChartContainer ref={container}></StyledChartContainer>;
    </Fragment>
  );
}
