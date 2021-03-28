import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Square from './Square';
import { StyledLink } from '../atoms/link';
import imageDayOne from '../utils/images/DayOne.png';
import imageDayTwo from '../utils/images/DayTwo.png';
import imageDayThree from '../utils/images/DayThree.png';
import imageDayFour from '../utils/images/DayFour.png';
import imageDayFive from '../utils/images/DayFive.png';
import imageDaySix from '../utils/images/DaySix.png';
import imageDaySeven from '../utils/images/DayFive.png';
import imageDayEight from '../utils/images/DayEight.png';
import imageDayNine from '../utils/images/DayFour.png';
import imageDayTen from '../utils/images/DayFive.png';
import imageDayEleven from '../utils/images/DayEleven.png';
import imageDayTwelve from '../utils/images/DayTwelve.png';
import imageDayThirteen from '../utils/images/DayThirteen.png';
import imageDayFourteen from '../utils/images/DayThirteen.png';
import imageDayFifteen from '../utils/images/DayFifteen.png';
import imageDaySixteen from '../utils/images/DaySixteen.png';
import imageDaySeventeen from '../utils/images/DaySeventeen.png';
import imageDayEighteen from '../utils/images/DayEighteen.png';
import imageDayNineteen from '../utils/images/DayNineteen.png';
import imageDayTwenty from '../utils/images/DayTwenty.png';
import imageDayTwentyOne from '../utils/images/DayTwentyOne.png';
import imageDayTwentyTwo from '../utils/images/DayFive.png';
import imageDayTwentyThree from '../utils/images/DayOne.png';
import imageDayTwentyFour from '../utils/images/DayTwentyFour.png';
import imageDayTwentyFive from '../utils/images/DayTwentyFive.png';
import imageDayTwentySix from '../utils/images/DayTwentySix.png';
import { StyledSquareDate } from '../atoms/headings';

const StyledMain = styled.main`
  max-width: 885px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 0.7rem;
`;

const Placeholder = styled.div``;

export default function Main() {
  return (
    <StyledMain>
      <StyledLink to="/day1">
        <Square title={'Bar chart'} date={'Day 1'} img_src={imageDayOne} />
      </StyledLink>
      <StyledLink to="/day2">
        <Square title={'Stacked Bar chart'} date={'Day 2'} img_src={imageDayTwo} />
      </StyledLink>
      <StyledLink to="/day3">
        <Square title={'Stacked Area chart'} date={'Day 3'} img_src={imageDayThree} />
      </StyledLink>
      <StyledLink to="/day4">
        <Square title={'Scatterplot'} date={'Day 4'} img_src={imageDayFour} />
      </StyledLink>
      <StyledLink to="/day5">
        <Square title={'Scatterplot + Slider'} date={'Day 5'} img_src={imageDayFive} />
      </StyledLink>
      <StyledLink to="/day6">
        <Square title={'Line chart'} date={'Day 6'} img_src={imageDaySix} />
      </StyledLink>
      <StyledLink to="/day7">
        <Square title={`Scatterplot + Pan, Zoom`} date={'Day 7'} img_src={imageDaySeven} />
      </StyledLink>
      <StyledLink to="/day8">
        <Square title={'Pie Chart'} date={'Day 8'} img_src={imageDayEight} />
      </StyledLink>
      <StyledLink to="/day9">
        <Square title={'Scatterplot + Brush'} date={'Day 9'} img_src={imageDayNine} />
      </StyledLink>
      <StyledLink to="/day10">
        <Square title={'Scatterplot + Scroll'} date={'Day 10'} img_src={imageDayTen} />
      </StyledLink>
      <StyledLink to="/day11">
        <Square title={'Scatterplot * 2 + Brush'} date={'Day 11'} img_src={imageDayEleven} />
      </StyledLink>
      <StyledLink to="/day12">
        <Square title={'Tree + Bar chart'} date={'Day 12'} img_src={imageDayTwelve} />
      </StyledLink>
      <StyledLink to="/day13">
        <Square title={'Cluster'} date={'Day 13'} img_src={imageDayThirteen} />
      </StyledLink>
      <StyledLink to="/day14">
        <Square title={'Cluster + Scatterplot'} date={'Day 14'} img_src={imageDayFourteen} />
      </StyledLink>
      <StyledLink to="/day15">
        <Square title={'Radial Tree + Bar chart'} date={'Day 15'} img_src={imageDayFifteen} />
      </StyledLink>
      <StyledLink to="/day16">
        <Square title={'Histogram'} date={'Day 16'} img_src={imageDaySixteen} />
      </StyledLink>
      <StyledLink to="/day17">
        <Square title={'Circle Packing'} date={'Day 17'} img_src={imageDaySeventeen} />
      </StyledLink>
      <StyledLink to="/day18">
        <Square title={'Chord + Hover'} date={'Day 18'} img_src={imageDayEighteen} />
      </StyledLink>
      <StyledLink to="/day19">
        <Square title={'Grid Heatmap'} date={'Day 19'} img_src={imageDayNineteen} />
      </StyledLink>
      <StyledLink to="/day20">
        <Square title={'Radial Collapsible Tree'} date={'Day 20'} img_src={imageDayTwenty} />
      </StyledLink>
      <StyledLink to="/day21">
        <Square title={'Parallel Coordinates Chart'} date={'Day 21'} img_src={imageDayTwentyOne} />
      </StyledLink>
      <StyledLink to="/day22">
        <Square title={'Scatterplot + responsive(width)'} date={'Day 22'} img_src={imageDayTwentyTwo} />
      </StyledLink>
      <StyledLink to="/day23">
        <Square title={'Bar chart + responsive'} date={'Day 23'} img_src={imageDayTwentyThree} />
      </StyledLink>
      <StyledLink to="/day24">
        <Square title={'Collision Detection'} date={'Day 24'} img_src={imageDayTwentyFour} />
      </StyledLink>
      <StyledLink to="/day25">
        <Square title={'Github Flower Prototype'} date={'Day 25'} img_src={imageDayTwentyFive} />
      </StyledLink>
      <StyledLink to="/day26">
        <Square title={'Github Flower Prototype2'} date={'Day 26'} img_src={imageDayTwentySix} />
      </StyledLink>
      <Placeholder>
        <Square />
      </Placeholder>
      <Placeholder>
        <Square />
      </Placeholder>
    </StyledMain>
  );
}
