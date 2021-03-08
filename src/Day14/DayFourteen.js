import { Fragment, Fregment, useEffect, useState, useRef, useCallback } from 'react';
import ClusterScatter from './ClusterScatter';

export default function DayFourTeen() {
  const [chart, setChart] = useState(null);
  const container = useRef();
  const clusterBtn = useRef();

  useEffect(() => {
    if (!chart) {
      clusterBtn.current.disabled = true;
      setChart(new ClusterScatter(container.current, clusterBtn.current));
    }
  }, [chart]);

  const moveNodes = (e) => {
    chart.moveNodes(e.target.className);
  };

  return (
    <div>
      <h1
        style={{
          fontSize: '16px',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          marginBottom: '40px',
        }}
      >
        Clustering Animation
      </h1>
      <button className="cluster" onClick={moveNodes} ref={clusterBtn}>
        Clustering
      </button>
      <button className="scatter" onClick={moveNodes}>
        Scatter Chart
      </button>
      <div ref={container}></div>
    </div>
  );
}
