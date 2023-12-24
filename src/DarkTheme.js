import { createGlobalStyle } from "styled-components";

const BG_COLOR = "black";
const DarkTheme = createGlobalStyle`
  *{
    color: white;    
  }
  svg, form, html, .globalDiv{    
    background-color: ${BG_COLOR};
  }
  button, input {
    background-color: ${BG_COLOR};
    color: white;
    border: 1px solid #fff;
  }

  input::placeholder {
    background-color: transparent;
    color: white;
  }
`;

export default DarkTheme;
