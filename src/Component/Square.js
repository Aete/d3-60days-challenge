import { Fragment } from 'react';
import styled from 'styled-components';

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
`;

const StyledHeading = styled.h2`
  max-width: 200px;
  width: 22vw;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

const StyledImg = styled.img`
  width: 95%;
  filter: grayscale(100%);
  transition: filter 0.2s ease;
  &:hover {
    filter: none;
  }
`;

export default function Square({ title, img_src }) {
  return (
    <Fragment>
      <StyledSquare>
        <StyledImg src={img_src} alt="placeholder" />
      </StyledSquare>
      <StyledHeading>{title}</StyledHeading>
    </Fragment>
  );
}
