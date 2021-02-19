import { useEffect, useRef, useState } from 'react';
import StackBarChart from './StackBarChart';

export default function DayTwo() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new StackBarChart(container.current));
    } else {
      chart.update();
    }
  }, [chart]);

  return <div className="stackBarChart" ref={container}></div>;
}
