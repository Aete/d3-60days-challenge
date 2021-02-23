import { useEffect, useRef } from 'react';
import LineChart from './LineChart';

export default function DaySix() {
  const container = useRef();

  useEffect(() => {
    LineChart(container.current);
  }, []);
  return <div ref={container}> </div>;
}
