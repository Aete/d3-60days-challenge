import { Fragment, useEffect, useRef } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import GridHeatmap from './GridHeatmap';

export default function DayNineTeen() {
  const container = useRef();
  useEffect(() => {
    GridHeatmap(container.current);
  }, []);
  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Grid Heatmap (Precipitation, Busan, 2020.07 ~ 2020.12)</StyledChartTitle>
      <div ref={container}></div>
    </Fragment>
  );
}
