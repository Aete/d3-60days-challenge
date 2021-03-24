import Home from './Component/Home';
import styled, { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';

import './App.css';
import DayOne from './Day1/DayOne';
import DayTwo from './Day2/DayTwo';
import DayThree from './Day3/DayThree';
import DayFour from './Day4/DayFour';
import DayFive from './Day5/DayFive';
import DaySix from './Day6/DaySix';
import DaySeven from './Day7/DaySeven';
import DayEight from './Day8/DayEight';
import DayNine from './Day9/DayNine';
import DayTen from './Day10/DayTen';
import DayEleven from './Day11/DayEleven';
import DayTwelve from './Day12/DayTwelve';
import DayThirteen from './Day13/DayThirteen';
import DayFourTeen from './Day14/DayFourteen';
import DayFifteen from './Day15/DayFifteen';
import DaySixteen from './Day16/DaySixteen';
import DaySeventeen from './Day17/DaySevenTeen';
import DayEighteen from './Day18/DayEighteen';
import DayNineTeen from './Day19/DayNineteen';
import DayTwenty from './Day20/DayTwenty';
import DayTwentyOne from './Day21/DayTwentyOne';
import DayTwentyTwo from './Day22/DayTwentyTwo';

createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato');
`;

const StyledBody = styled.div`
  font-family: 'Lato', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <StyledBody>
      <Route path="/" component={Home} exact />
      <Route path="/day1" component={DayOne} />
      <Route path="/day2" component={DayTwo} />
      <Route path="/day3" component={DayThree} />
      <Route path="/day4" component={DayFour} />
      <Route path="/day5" component={DayFive} />
      <Route path="/day6" component={DaySix} />
      <Route path="/day7" component={DaySeven} />
      <Route path="/day8" component={DayEight} />
      <Route path="/day9" component={DayNine} />
      <Route path="/day10" component={DayTen} />
      <Route path="/day11" component={DayEleven} />
      <Route path="/day12" component={DayTwelve} />
      <Route path="/day13" component={DayThirteen} />
      <Route path="/day14" component={DayFourTeen} />
      <Route path="/day15" component={DayFifteen} />
      <Route path="/day16" component={DaySixteen} />
      <Route path="/day17" component={DaySeventeen} />
      <Route path="/day18" component={DayEighteen} />
      <Route path="/day19" component={DayNineTeen} />
      <Route path="/day20" component={DayTwenty} />
      <Route path="/day21" component={DayTwentyOne} />
      <Route path="/day22" component={DayTwentyTwo} />
    </StyledBody>
  );
}

export default App;
