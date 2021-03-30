import { Fragment, useEffect, useRef, useState } from 'react';
import { StyledChartTitle } from '../atoms/headings';
import Header from '../Component/Header';
import styled from 'styled-components';
import Flower from './Flower';

const StyledChartContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function DayTwentySix() {
  const [chart, setChart] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!chart) {
      setChart(new Flower(container.current));
    } else {
      chart.update();
    }
  }, [chart]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://api.github.com/users/aete/repos?sort=created`, {
        method: 'GET',
        headers: {
          Authorization: `add token`,
        },
      });
      const data = await response.json();
      const processedData = await Promise.all(
        data.map(async (repo) => {
          const languageRes = await fetch(repo.languages_url, {
            method: 'GET',
            headers: {
              Authorization: `add token`,
            },
          });
          const languages = await languageRes.json();
          const contributerRes = await fetch(repo.contributors_url, {
            method: 'GET',
            headers: {
              Authorization: `add token`,
            },
          });
          const contributers = await contributerRes.json();
          const commits = contributers.reduce((acc, curr) => acc + curr.contributions, 0);
          return { ...languages, commits, contributors: contributers.length };
        })
      );
      console.log(processedData);
      return processedData;
    };
    console.log(getData());
  }, []);

  return (
    <Fragment>
      <Header />
      <StyledChartTitle>Github Flower Prototype 2nd</StyledChartTitle>
      <StyledChartContainer ref={container}></StyledChartContainer>;
    </Fragment>
  );
}
