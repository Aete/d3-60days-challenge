import { useEffect, useState, useRef } from 'react';
import ClusterScatter from './ClusterScatter';

export default function DayThirteen() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new ClusterScatter(container.current));
    }
  }, [chart]);
  return <div ref={container}></div>;
}
