import { Fragment, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { StyledChartTitle } from '../atoms/headings';
import ClusterScatter from './ClusterScatter';
import Header from '../Component/Header';

const ButtonContainer = styled.div``;

export default function DayFourTeen() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  const clusterBtn = useRef();

  useEffect(() => {
    if (!chart) {
      clusterBtn.current.disabled = true;
      setChart(new ClusterScatter(container.current, clusterBtn.current));
    }
  }, [chart]);

  const moveNodes = (e) => {
    chart.moveNodes(e.target.className);
  };

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Clustering Animation</StyledChartTitle>
      <ButtonContainer>
        <button className="cluster" onClick={moveNodes} ref={clusterBtn}>
          Clustering
        </button>
        <button className="scatter" onClick={moveNodes}>
          Scatter Chart
        </button>
      </ButtonContainer>
      <div ref={container}></div>
    </Fragment>
  );
}
