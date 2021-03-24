import { Fragment } from 'react';
import styled from 'styled-components';
import { StyledSquareTitle, StyledSquareDate } from '../atoms/headings';
import { StyledSquareImg } from '../atoms/image';

const StyledSquare = styled.div`
  max-width: 200px;
  max-height: 200px;
  margin-top: 20px;
  width: 22vw;
  height: 22vw;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  visibility: ${(props) => (props.image ? 'visible' : 'hidden')};
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
