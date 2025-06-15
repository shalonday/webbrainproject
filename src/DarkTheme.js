/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

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
