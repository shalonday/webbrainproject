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

const StyledCard = styled.div`
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 8px 8px;
  flex: 0.5;
  overflow: auto;
`;

const ListItem = styled.li`
  list-style-position: inside;
  max-height: 1.5rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 2;
  cursor: pointer;
`;

function SelectedNodesCard({
  selectedNodes,
  setCurrentNode,
  maxHeight = "18vh",
}) {
  function focusClickedNode(e, node) {
    setCurrentNode(node);
  }
  return (
    <StyledCard style={{ maxHeight: maxHeight }}>
      <ul>
        {selectedNodes?.map((node) => (
          <ListItem key={node.id} onClick={(e) => focusClickedNode(e, node)}>
            {node.name}
          </ListItem>
        ))}
      </ul>
    </StyledCard>
  );
}

export default SelectedNodesCard;

SelectedNodesCard.propTypes = {
  selectedNodes: PropTypes.arrayOf(PropTypes.object),
  setCurrentNode: PropTypes.func,
  maxHeight: PropTypes.string
}
