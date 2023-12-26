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

  .dark-editor {
  --accentBase: var(--tomato1);
  --accentBgSubtle: var(--tomato2);
  --accentBg: var(--tomato3);
  --accentBgHover: var(--tomato4);
  --accentBgActive: var(--tomato5);
  --accentLine: var(--tomato6);
  --accentBorder: var(--tomato7);
  --accentBorderHover: var(--tomato8);
  --accentSolid: var(--tomato9);
  --accentSolidHover: var(--tomato10);
  --accentText: var(--tomato11);
  --accentTextContrast: var(--tomato12);

  --basePageBg: black;
  --baseBase: var(--mauve1);
  --baseBgSubtle: var(--mauve2);
  --baseBg: var(--mauve3);
  --baseBgHover: var(--mauve4);
  --baseBgActive: var(--mauve5);
  --baseLine: var(--mauve6);
  --baseBorder: var(--mauve7);
  --baseBorderHover: var(--mauve8);
  --baseSolid: var(--mauve9);
  --baseSolidHover: var(--mauve10);
  --baseText: var(--mauve11);
  --baseTextContrast: var(--mauve12);

  color: var(--baseText);
  background: var(--basePageBg);
}
`;

export default DarkTheme;
