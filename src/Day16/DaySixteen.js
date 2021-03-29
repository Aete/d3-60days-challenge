import { Slider } from '@material-ui/core';
import { Fragment, useEffect, useRef, useState } from 'react';
import Histogram from './Histogram';
import Header from '../Component/Header';
import { StyledChartTitle } from '../atoms/headings';
import styled from 'styled-components';

const StyledSlider = styled(Slider)`
  max-width: 1000px;
  margin: 0 10px;
`;

export default function DaySixteen() {
  const [chart, setChart] = useState(null);
  const [binCount, setBinCount] = useState(30);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new Histogram(container.current));
    } else {
      chart.update(binCount);
    }
  }, [chart, binCount]);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Scatter Chart with Gapminder dataset</StyledChartTitle>
      <StyledSlider
        defaultValue={30}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={5}
        max={80}
        onChange={(e, val) => {
          if (val !== binCount) {
            setBinCount(val);
          }
        }}
      />
      <div className="scatterChart" ref={container}></div>
    </Fragment>
  );
}
