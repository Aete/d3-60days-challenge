import { useEffect, useRef, useState } from 'react';
import PieChart from './PieChart';

export default function DayEight() {
  const [chart, setChart] = useState();
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new PieChart(container.current));
    }
  }, [chart]);
  return (
    <div ref={container}>
      <h1
        style={{
          fontSize: '16px',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          marginBottom: '40px',
        }}
      >
        Pie Chart with COVID-19 dataset
      </h1>
    </div>
  );
}
