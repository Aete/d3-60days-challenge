import styled from 'styled-components';
import { StyledPageTitle } from '../atoms/headings';
import { StyledLink } from '../atoms/link';

const StyledHeader = styled.header`
  max-width: 885px;
  width: 100%;
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
