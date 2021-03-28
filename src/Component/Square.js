import { Fragment } from 'react';
import styled from 'styled-components';
import { StyledSquareTitle, StyledSquareDate } from '../atoms/headings';
import { StyledSquareImg } from '../atoms/image';

const StyledSquare = styled.div`
  max-width: 250px;
  max-height: 250px;
  margin-top: 20px;
  width: 200px;
  height: 200px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  visibility: ${(props) => (props.image ? 'visible' : 'hidden')};

  @media screen and (max-width: 750px) {
    width: 28vw;
    height: 28vw;
    margin: 15px 0 0;
  }

  @media screen and (max-width: 600px) {
    width: 42vw;
    height: 42vw;
  }

  @media screen and (max-width: 450px) {
    width: 80vw;
    height: 80vw;
  }
`;

export default function Square({ title, date, img_src }) {
  return (
    <Fragment>
      <StyledSquare image={img_src}>
        <StyledSquareImg src={img_src} alt="placeholder" />
      </StyledSquare>
      <StyledSquareTitle>{title}</StyledSquareTitle>
      <StyledSquareDate>{date}</StyledSquareDate>
    </Fragment>
  );
}
