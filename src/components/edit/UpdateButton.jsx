import { HiOutlinePencil } from "react-icons/hi";
import styled from "styled-components";

function UpdateButton({ currentNodeType, setIsUpdatingModule }) {
  function handleUpdateClick() {
    if (currentNodeType === "module") {
      setIsUpdatingModule(true);
    }
    //if module was clicked, set module modal visible, with it displaying the currently clicked module node
    //if skill was clicked, enable editing the title and description

    if (currentNodeType === "skill") {
      setIsUpdatingModule(true);
    }
    // mutation only happens upon submission
  }

  return (
    <ToolButton onClick={handleUpdateClick}>
      <HiOutlinePencil />
    </ToolButton>
  );
}

const ToolButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1em;
  cursor: pointer;
`;

export default UpdateButton;
