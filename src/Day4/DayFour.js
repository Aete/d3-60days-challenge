import { useState, useEffect, useRef } from 'react';
import ScatterChart from './ScatterChart';

export default function DayFour() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new ScatterChart(container.current));
    }
  }, []);
  return <div className="ScatterChart" ref={container}></div>;
}
