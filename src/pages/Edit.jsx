import styles from "./Edit.module.css";
import { useEffect, useState } from "react";
import { useSkillTreesContext } from "../contexts/SkillTreesContext";
import ModuleModal from "../components/edit/ModuleModal";
import { useNavigate, useParams } from "react-router-dom";
import EditPageChart from "../components/edit/EditPageChart";
import MainButton from "../components/MainButton";
import { useQuery } from "@tanstack/react-query";
import { fetchUniversalTree } from "../services/apiTrees";
import Loader from "../components/Loader";

// String, Tree -> Tree (nodes only)
// get nodes by id without fetching from db
function getNodesById(nodeIdString, tree) {
  if (nodeIdString === "blank") return { nodes: [], links: [] };
  else {
    const idsArray = nodeIdString.split(",");
    const nodesArray = tree.nodes.filter((node) => idsArray.includes(node.id));
    return { nodes: nodesArray, links: [] };
  }
}

function Edit() {
  const {
    isLoading,
    data: universalTree,
    error,
  } = useQuery({
    queryKey: ["universalTree"],
    queryFn: fetchUniversalTree,
  });

  const { mergeTree } = useSkillTreesContext();

  const navigate = useNavigate();
  const { nodeIds } = useParams(); // string of node IDs separated by ","

  const [currentTree, setCurrentTree] = useState(
    universalTree
      ? getNodesById(nodeIds, universalTree)
      : { nodes: [], links: [] }
  );
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isModuleModalVisible, setIsModuleModalVisible] = useState(false);

  useEffect(
    function () {
      if (universalTree) setCurrentTree(getNodesById(nodeIds, universalTree));
    },
    [universalTree, nodeIds]
  );

  async function handleSubmit() {
    // validation?
    // merge currentTree to database tree if validation passes
    await mergeTree(currentTree);
    //go back to Home page
    navigate("/");
  }

  async function handleSave() {
    // save a tree object to the Supabase PostgreSQL db containing the User's ID or smth
    navigate("/profile");
  }

  return (
    <>
      <div
        className={styles.mainDiv}
        style={
          isModuleModalVisible ? { display: "none" } : { display: "block" }
        }
      >
        <div
          className={styles.nodeDescription}
          style={{ display: currentNode ? "block" : "none" }}
        >
          <div>
            <h3>{currentNode?.title}</h3>
          </div>
          <p>{currentNode?.description}</p>
        </div>
        {isLoading && nodeIds !== "blank" && <Loader />}
        {error && <h1>{error}</h1>}
        {!isLoading && !error && currentTree && (
          <EditPageChart
            currentTree={currentTree}
            selectedNodes={selectedNodes}
            setSelectedNodes={setSelectedNodes}
            setCurrentNode={setCurrentNode}
          />
        )}

        <div className={styles.submitDiv}>
          <button
            className={styles.plusButton}
            onClick={setIsModuleModalVisible}
          >
            +
          </button>

          <div className={styles.buttonDiv}>
            <MainButton onClick={handleSave}>Save As Draft</MainButton>
            <MainButton onClick={handleSubmit}>Submit</MainButton>
          </div>
        </div>
      </div>
      {isModuleModalVisible && (
        <ModuleModal
          prerequisiteNodes={selectedNodes}
          currentTree={currentTree}
          setCurrentTree={setCurrentTree}
          setIsModuleModalVisible={setIsModuleModalVisible}
        />
      )}
    </>
  );
}

export default Edit;
