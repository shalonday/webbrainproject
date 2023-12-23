import styled from "styled-components";

const StyledMainButton = styled.button`
  border: 1px solid #222222;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 8px 8px;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  user-select: none;
  -webkit-user-select: none;
  width: min(100%, 200px);

  &:focus-visible {
    box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
    transition: box-shadow 0.2s;

    &:active {
      background-color: #f7f7f7;
      border-color: #000000;
      transform: scale(0.96);
    }

    &:disabled {
      border-color: #dddddd;
      color: #dddddd;
      cursor: not-allowed;
      opacity: 1;
    }
  }
`;

function MainButton({
  onClick,
  children,
  flexValue = "0 1 auto",
  disabledValue = false,
  className,
}) {
  return (
    <StyledMainButton
      onClick={onClick}
      style={{ flex: flexValue }}
      disabled={disabledValue}
      className={className}
    >
      {children}
    </StyledMainButton>
  );
}

export default MainButton;
