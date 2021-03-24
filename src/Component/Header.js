import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledPageTitle } from '../atoms/headings';
import { StyledLink } from '../atoms/link';

const StyledHeader = styled.header`
  width: 885px;
  display: flex;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledPageTitle>D3 practices</StyledPageTitle>
      </StyledLink>
    </StyledHeader>
  );
}
