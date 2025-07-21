import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";

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
  return (
    <StyledHeader>
      <H1 onClick={() => navigate("/")}>The Web Brain Project</H1>
    </StyledHeader>
  );
}

export default Header;
