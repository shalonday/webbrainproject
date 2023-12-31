import styles from "./GraphicalNodeSearch.module.css";
import { useState } from "react";
import MainButton from "../MainButton";
import Loader from "../Loader";
import { fetchUniversalTree } from "../../services/apiTrees";
import { useQuery } from "@tanstack/react-query";
import SelectedNodesCard from "../search/SelectedNodesCard";
import toast from "react-hot-toast";
import SearchModalChart from "./SearchModalChart";

function GraphicalNodeSearch({ type, currentTree }) {
  const {
    isLoading,
    data: universalTree,
    error,
  } = useQuery({
    queryKey: ["universalTree"],
    queryFn: fetchUniversalTree,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  console.log(currentTree);
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      //search only locally. then setSelectedNodes to the search results;
      const results = searchNodes(searchQuery, universalTree);
      if (results.length > 0) {
        setCurrentNode(null); //doesn't make sense to retain previous currentNode when searching
        setSelectedNodes(results);
      } else {
        toast.error("That didn't return any results!");
      }
    }
  }

  return (
    <div className={styles.searchPage}>
      {currentNode && (
        <div className={styles.nodeDescription}>
          {currentNode.title && (
            <div>
              <h3>{currentNode.title}</h3>
            </div>
          )}
          <p>{currentNode?.description}</p>
        </div>
      )}

      {isLoading && <Loader />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <SearchModalChart
          tree={type === "edit" ? currentTree : universalTree}
          selectedNodes={selectedNodes}
          setSelectedNodes={setSelectedNodes}
          setCurrentNode={setCurrentNode}
          currentNode={currentNode}
        />
      )}
      <div className={styles.bottomThird}>
        {selectedNodes.length > 0 && (
          <SelectedNodesCard
            selectedNodes={selectedNodes}
            setCurrentNode={setCurrentNode}
            maxHeight="100%"
          />
        )}

        <div className={styles.inputDiv}>
          <input
            placeholder="Search for nodes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${styles.input} ${
              searchQuery ? styles.inputNoBackground : ""
            }`}
          />
          <div>
            <MainButton>&#x2713;</MainButton>
          </div>
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

// Node, String -> Boolean
function nodeIsMatch(node, query) {
  if (node.type === "skill") {
    return (
      node.title?.toLowerCase().includes(query.toLowerCase()) ||
      node.description?.toLowerCase().includes(query.toLowerCase())
    );
  } else return false;
}

export default GraphicalNodeSearch;
