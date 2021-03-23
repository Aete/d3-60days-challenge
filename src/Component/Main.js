import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Square from './Square';
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

const StyledMain = styled.main`
  width: 885px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 0.7rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

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
        <Square title={'Chord'} date={'Day 18'} img_src={imageDayEighteen} />
      </StyledLink>
      <StyledLink to="/day19">
        <Square title={'Grid Heatmap'} date={'Day 19'} img_src={imageDayNineteen} />
      </StyledLink>
      <StyledLink to="/day20">
        <Square date={'Day 20'} />
      </StyledLink>
      <StyledLink to="/day21">
        <Square date={'Day 21'} />
      </StyledLink>
    </StyledMain>
  );
}
