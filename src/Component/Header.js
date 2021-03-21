import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 885px;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledHeading = styled.h1``;

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledHeading>D3 practices</StyledHeading>
      </StyledLink>
    </StyledHeader>
  );
}
