import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import styled from 'styled-components';
import Collision from './Collision';

const StyledChartContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function DayTwentyFour() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new Collision(container.current));
    }
  }, [chart]);
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>
        Collision Detection <br />
        (Clone https://observablehq.com/@d3/collision-detection/2 using svg){' '}
      </StyledChartTitle>
      <StyledChartContainer ref={container}></StyledChartContainer>;
    </Fragment>
  );
}
