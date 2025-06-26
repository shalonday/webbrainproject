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

import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledMainButton = styled.button`
  border-radius: 8px;
  box-sizing: border-box;
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
  width: min(100%, 400px);

  &:focus-visible {
    box-shadow: #fff 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
    transition: box-shadow 0.2s;
  }
  &:active {
    background-color: #333;
    border-color: #fff;
    transform: scale(0.96);
  }

  &:disabled {
    border-color: #333;
    color: #333;
    cursor: not-allowed;
    opacity: 1;
  }
`;

function MainButton({ onClick, children, disabled = false, className }) {
  return (
    <StyledMainButton
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </StyledMainButton>
  );
}

export default MainButton;

MainButton.propTypes = {
  onClick: PropTypes.func, 
  children: PropTypes.node, 
  disabled: PropTypes.bool, 
  className: PropTypes.string 
}
