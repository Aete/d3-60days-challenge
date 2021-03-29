import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import styled from 'styled-components';
import Flower from './Flower';

const StyledChartContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function DayTwentySix() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new Flower(container.current));
    } else {
      chart.update();
    }
  }, [chart]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://api.github.com/users/aete/repos?sort=created`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
    };
    getData();
  }, []);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Github Flower Prototype 2nd</StyledChartTitle>
      <StyledChartContainer ref={container}></StyledChartContainer>;
    </Fragment>
  );
}
