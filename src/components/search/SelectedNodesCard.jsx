import styled from "styled-components";

const StyledCard = styled.div`
  max-height: 18vh;
  border: 1px solid #222222;
  border-radius: 8px;
  padding: 8px 8px;
  flex: 0.5;
  overflow: auto;
`;

const Title = styled.p`
  font-weight: bold;
  font-style: italic;
  line-height: 3;
`;

const ListItem = styled.li`
  list-style-position: inside;
  max-height: 1.5rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function focusClickedNode(e, node) {
  console.log(e.target);
  console.log(node);
}

function SelectedNodesCard({ selectedNodes }) {
  return (
    <StyledCard>
      <Title>Selected Nodes</Title>
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
