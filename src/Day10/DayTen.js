import { useState, useRef, useEffect } from 'react';
import ScatterChart from './ScatterChart';

export default function DayTen() {
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
  window.addEventListener('scroll', (e) => {
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    const percent = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);
    const yearGap = 2019 - 1960;
    setYear(1960 + Math.floor((yearGap * percent) / 100));
  });
  return (
    <div style={{ height: '6000px' }}>
      <div
        style={{
          position: 'fixed',
          top: `${(document.documentElement.clientHeight || document.body.clientHeight) / 2 - 300}px`,
          left: `${(document.documentElement.clientWidth || document.body.clientWidth) / 2 - 500}px`,
          width: '800px',
          height: '600px',
        }}
        ref={container}
      ></div>
    </div>
  );
}
