import { useEffect, useRef, useState } from 'react';
import BarChart from './BarChart';

export default function WeekOne() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new BarChart(container.current));
    } else {
      chart.update();
    }
  }, [chart]);
  return <div className="barChart" ref={container}></div>;
}
