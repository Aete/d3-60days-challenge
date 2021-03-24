import styled from 'styled-components';

export const StyledSquareImg = styled.img`
  width: 95%;
  filter: grayscale(100%);
  transition: filter 0.2s ease;
  &:hover {
    filter: none;
  }
`;
