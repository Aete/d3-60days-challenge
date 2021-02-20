import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import csvData from '../utils/data/seoulEmploymentByIndustry.csv';
import stackedAreaChart from './stackedAreaChart';

export default function DayThree() {
  const container = useRef();
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (!chart) {
      d3.csv(csvData).then((data) => {
        stackedAreaChart(container.current, data);
      });
    }
  }, [chart]);
  return <div className="StackedAreaChart" ref={container}></div>;
}
