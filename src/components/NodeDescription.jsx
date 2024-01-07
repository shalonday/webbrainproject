/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Online Brain Project

The Online Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Online Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Online
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import styled from "styled-components";
import styles from "./NodeDescription.module.css";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
function NodeDescription({ currentNode, isEditing = false }) {
  return (
    <div
      className={
        isEditing ? styles.nodeDescriptionEditing : styles.nodeDescription
      }
    >
      <div>
        <h3>{currentNode?.title}</h3>
      </div>
      <p>{currentNode?.description}</p>
      {currentNode && isEditing && (
        <ButtonsDiv>
          <ToolButton>
            <HiOutlinePencil />
          </ToolButton>
          <ToolButton>
            <HiOutlineTrash />
          </ToolButton>
        </ButtonsDiv>
      )}
    </div>
  );
}

const ButtonsDiv = styled.div`
  position: relative;
  top: 0px;
  left: 50px;
`;

const ToolButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1em;
  cursor: pointer;
`;

export default NodeDescription;
