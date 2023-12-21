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

  const { setElementsToEdit } = useSkillTreesContext();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      //search only locally. then setSelectedNodes to the search results;
      const results = searchNodes(searchQuery, universalTree);
      if (results.length > 0) {
        setCurrentNode(null); //doesn't make sense to retain previous currentNode when searching
        setSelectedNodes(results);
      } else {
        alert(
          "That didn't return any results! Consider inviting your friends who know about this topic to contribute to the wiki."
        );
      }
    }
  }

  function handleGeneratePath() {
    navigate(`/s/0/e/${currentNode.id}`);
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
          currentNode={currentNode}
        />
      )}
      <div className={styles.bottomThird}>
        {selectedNodes.length > 0 && (
          <>
            <SelectedNodesCard
              selectedNodes={selectedNodes}
              setCurrentNode={setCurrentNode}
            />
            <div className={styles.buttonsDiv}>
              <MainButton
                onClick={handleGeneratePath}
                flexValue={1}
                disabledValue={!currentNode}
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
            placeholder="What do you want to learn?"
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

// String, Tree -> Nodes
function searchNodes(query, tree) {
  const queryResults = tree.nodes.filter((node) => nodeIsMatch(node, query));
  return queryResults;
}

function nodeIsMatch(node, query) {
  if (node.type === "skill") {
    return (
      node.title?.toLowerCase().includes(query.toLowerCase()) ||
      node.description?.toLowerCase().includes(query.toLowerCase())
    );
  } else if (node.type === "module") {
    return (
      node.title?.toLowerCase().includes(query.toLowerCase()) ||
      node.learnText?.toLowerCase().includes(query.toLowerCase()) ||
      node.practiceText?.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export default Search;
