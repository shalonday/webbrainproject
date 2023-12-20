import styles from "./Search.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSkillTreesContext } from "../contexts/SkillTreesContext";
import { useState } from "react";
import SearchPageChart from "../components/search/SearchPageChart";
import MainButton from "../components/MainButton";
import Loader from "../components/Loader";
import { fetchUniversalTree } from "../services/apiTrees";
import { useQuery } from "@tanstack/react-query";
import NodeDescription from "../components/NodeDescription";
import { buildParamStringFromArray } from "../utils";
import SelectedNodesCard from "../components/search/SelectedNodesCard";

function Search() {
  const {
    isLoading,
    data: universalTree,
    error,
  } = useQuery({
    queryKey: ["universalTree"],
    queryFn: fetchUniversalTree,
  });

  const navigate = useNavigate();

  const { setElementsToEdit, searchNodes } = useSkillTreesContext();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  function handleKeyDown(e) {
    if (e.key === "Enter") searchNodes(e.target.value);

    // setSelectedNodes to the search results; search only locally.
    // display a small scrollable card that contains the search result names.
  }

  function handleGeneratePath() {
    console.log(selectedNodes[0].id);
    navigate(`/s/0/e/${selectedNodes[0].id}`); // selectedNodes should only contain 1 element here.
  }

  function handlePlusClick() {
    console.log(selectedNodes);
    setElementsToEdit({
      nodes: selectedNodes,
      links: [],
    });
  }

  return (
    <div className={styles.searchPage}>
      {currentNode && <NodeDescription currentNode={currentNode} />}

      {isLoading && <Loader />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <SearchPageChart
          universalTree={universalTree}
          selectedNodes={selectedNodes}
          setSelectedNodes={setSelectedNodes}
          setCurrentNode={setCurrentNode}
        />
      )}
      <div className={styles.bottomThird}>
        {selectedNodes.length > 0 && (
          <>
            <SelectedNodesCard selectedNodes={selectedNodes} />
            <div className={styles.buttonsDiv}>
              <MainButton
                onClick={handleGeneratePath}
                flexValue={1}
                disabledValue={selectedNodes.length !== 1}
              >
                Generate Path
              </MainButton>

              <Link
                to={`/edit/${buildParamStringFromArray(
                  selectedNodes.map((node) => node.id)
                )}`}
                className={styles.linkFlexItem}
              >
                <MainButton onClick={handlePlusClick}>Add a Branch</MainButton>
              </Link>
            </div>
          </>
        )}

        <div className={styles.inputDiv}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${styles.input} ${
              searchQuery ? styles.inputNoBackground : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
