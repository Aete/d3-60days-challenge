import { useEffect, useRef, useState } from 'react';
import Tree from './Tree';

export default function DayTwelve() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  useEffect(() => {
    if (!chart) {
      setChart(new Tree(container.current));
    } else {
      chart.update();
    }
  }, [chart]);
  return <div ref={container}></div>;
}
