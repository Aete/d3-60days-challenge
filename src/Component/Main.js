import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Square from './Square';
import imageDayOne from '../utils/images/DayOne.png';
import imageDayTwo from '../utils/images/DayTwo.png';
import imageDayThree from '../utils/images/DayThree.png';
import imageDayFour from '../utils/images/DayFour.png';
import imageDayFive from '../utils/images/DayFive.png';

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
        <Square title={'Day 1'} img_src={imageDayOne} />
      </StyledLink>
      <StyledLink to="/day2">
        <Square title={'Day 2'} img_src={imageDayTwo} />
      </StyledLink>
      <StyledLink to="/day3">
        <Square title={'Day 3'} img_src={imageDayThree} />
      </StyledLink>
      <StyledLink to="/day4">
        <Square title={'Day 4'} img_src={imageDayFour} />
      </StyledLink>
      <StyledLink to="/day5">
        <Square title={'Day 5'} img_src={imageDayFive} />
      </StyledLink>
      <StyledLink to="/day6">
        <Square title={'Day 6'} />
      </StyledLink>
      <StyledLink to="/day7">
        <Square title={'Day 7'} />
      </StyledLink>
      <StyledLink to="/day8">
        <Square title={'Day 8'} />
      </StyledLink>
      <StyledLink to="/day9">
        <Square title={'Day 9'} />
      </StyledLink>
      <StyledLink to="/day10">
        <Square title={'Day 10'} />
      </StyledLink>
      <StyledLink to="/day11">
        <Square title={'Day 11'} />
      </StyledLink>
      <StyledLink to="/day12">
        <Square title={'Day 12'} />
      </StyledLink>
      <StyledLink to="/day13">
        <Square title={'Day 13'} />
      </StyledLink>
      <StyledLink to="/day14">
        <Square title={'Day 14'} />
      </StyledLink>
      <StyledLink to="/day15">
        <Square title={'Day 15'} />
      </StyledLink>
      <StyledLink to="/day16">
        <Square title={'Day 16'} />
      </StyledLink>
      <StyledLink to="/day17">
        <Square title={'Day 17'} />
      </StyledLink>
      <StyledLink to="/day18">
        <Square title={'Day 18'} />
      </StyledLink>
      <StyledLink to="/day19">
        <Square title={'Day 19'} />
      </StyledLink>
      <StyledLink to="/day20">
        <Square title={'Day 20'} />
      </StyledLink>
      <StyledLink to="/day21">
        <Square title={'Day 21'} />
      </StyledLink>
    </StyledMain>
  );
}
