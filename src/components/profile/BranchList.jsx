import styled from "styled-components";

const StyledBranchList = styled.ul`
  margin: 0 auto 30px;
  border: 1px solid white;
  border-radius: 8px;
  box-sizing: border-box;
  list-style: none;
  padding: 10px;
  font-size: 1em;
  line-height: 20px;
  position: relative;
  touch-action: manipulation;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  width: 50%;
`;

function BranchList({ children, title }) {
  return (
    <StyledBranchList>
      <h2>{title}</h2>
      {children}
    </StyledBranchList>
  );
}

export default BranchList;
