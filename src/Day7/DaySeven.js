import Slider from '@material-ui/core/Slider';
import { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import ScatterChart from './ScatterChart';

const StyledSlider = styled(Slider)`
  max-width: 1000px;
  margin: 0 10px;
`;

export default function DaySeven() {
  const [chart, setChart] = useState(null);
  const [year, setYear] = useState(1960);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new ScatterChart(container.current));
    } else {
      chart.update(year);
    }
  }, [chart, year]);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Scatter Chart with Gapminder dataset</StyledChartTitle>
      <StyledSlider
        defaultValue={1960}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1960}
        max={2019}
        onChange={(e, val) => {
          if (val !== year) {
            setYear(val);
          }
        }}
      />
      <div className="scatterChart" ref={container}></div>
    </Fragment>
  );
}
