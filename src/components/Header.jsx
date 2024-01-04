import styled from "styled-components";
import { HiUser } from "react-icons/hi";

const StyledHeader = styled.header`
  background-color: transparent;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid white;
  height: 10vh;
`;

function Header() {
  return (
    <StyledHeader>
      <HiUser />
    </StyledHeader>
  );
}

export default Header;
