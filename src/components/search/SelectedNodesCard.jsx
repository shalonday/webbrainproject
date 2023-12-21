import styled from "styled-components";

const StyledCard = styled.div`
  max-height: 18vh;
  border: 1px solid #222222;
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

const Legend = styled.p`
  margin-top: 20px;
`;

function SelectedNodesCard({ selectedNodes, setCurrentNode }) {
  function focusClickedNode(e, node) {
    console.log(node);
    setCurrentNode(node);
  }
  return (
    <StyledCard>
      <ul>
        {selectedNodes?.map((node) => (
          <ListItem key={node.id} onClick={(e) => focusClickedNode(e, node)}>
            {node.type === "skill" ? "S: " : "M: "}
            {node.title ? node.title : node.description}
          </ListItem>
        ))}
      </ul>
      <Legend>
        *Legend: S: Skill, M: Module
        <i>*Legend: S: Skill, M: Module</i>
      </Legend>
    </StyledCard>
  );
}

export default SelectedNodesCard;
