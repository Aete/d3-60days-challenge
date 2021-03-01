import { Fragment, useEffect, useRef, useState } from 'react';
import ScatterChartOne from './ScatterChartOne';
import ScatterChartTwo from './ScatterChartTwo';

export default function DayEleven() {
  const [chartOne, setChartOne] = useState(null);
  const [chartTwo, setChartTwo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const containerOne = useRef();
  const containerTwo = useRef();

  const countryFilter = (countryList) => {
    setSelectedCountry(countryList);
  };

  useEffect(() => {
    if (!chartOne) {
      setChartOne(new ScatterChartOne(containerOne.current, countryFilter));
    } else {
      chartOne.update(2019, selectedCountry);
    }
  }, [chartOne, selectedCountry]);

  useEffect(() => {
    if (!chartTwo) {
      setChartTwo(new ScatterChartTwo(containerOne.current, countryFilter));
    } else {
      chartTwo.update(2019, selectedCountry);
    }
  }, [chartTwo, selectedCountry]);

  return (
    <Fragment>
      <div ref={containerOne}></div>
      <div ref={containerTwo}></div>
    </Fragment>
  );
}
