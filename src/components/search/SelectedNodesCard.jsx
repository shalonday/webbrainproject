import styled from "styled-components";

const StyledCard = styled.div`
  max-height: 18vh;
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
`;

function SelectedNodesCard({ selectedNodes, setCurrentNode }) {
  function focusClickedNode(e, node) {
    setCurrentNode(node);
  }
  return (
    <StyledCard>
      <ul>
        {selectedNodes?.map((node) => (
          <ListItem key={node.id} onClick={(e) => focusClickedNode(e, node)}>
            {node.title ? node.title : node.description}
          </ListItem>
        ))}
      </ul>
    </StyledCard>
  );
}

export default SelectedNodesCard;
