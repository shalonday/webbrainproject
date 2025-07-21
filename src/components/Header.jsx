import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { useUser } from "../hooks/useUser";

const StyledHeader = styled.header`
  background-color: transparent;
  padding: 0 30px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled.h2`
  cursor: pointer;
`;

const IconDiv = styled.div`
  cursor: pointer;
`;

const MenuItem = styled.li`
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const { user } = useUser();

  function toggleOptions() {
    setAreOptionsVisible((val) => !val);
  }

  function handleLogoutClick() {
    logout();
  }
  return (
    <StyledHeader>
      <H1 onClick={() => navigate("/")}>The Web Brain Project</H1>
      <IconDiv>{user && <HiUser onClick={toggleOptions} />}</IconDiv>
      {user && areOptionsVisible && (
        <ul>
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={handleLogoutClick} disabled={isLoggingOut}>
            Logout
          </MenuItem>
        </ul>
      )}
      {/* {!user && ( // temporarily disable while I focus on main features for MVP, which are search and path with local storage.
        <ButtonsDiv>
          <Button variant="contained" onClick={() => navigate("/login")}>Log In</Button>
          <Button variant="outlined" onClick={() => navigate("/signup")}>Sign Up</Button>
        </ButtonsDiv>
      )} */}
    </StyledHeader>
  );
}

export default Header;
