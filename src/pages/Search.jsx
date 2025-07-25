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

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import MainButton from "../components/MainButton";
import NodeDescription from "../components/NodeDescription";
import SearchPageChart from "../components/search/SearchPageChart";
import SelectedNodesCard from "../components/search/SelectedNodesCard";
import { fetchUniversalTree } from "../services/apiTrees";
import styles from "./Search.module.css";

function BottomThird(){
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            //Search, then setSelectedNodes to the search results;
            const results = searchNodes(searchQuery, universalTree);
            if (results.length > 0) {
                setCurrentNode(null); //Doesn't make sense to retain previous currentNode when searching
                setSelectedNodes(results);
            } else {
                toast.error("That didn't return any results!");
            }
        }
    }

    function handleGeneratePath() {
        navigate(`/s/0/e/${currentNode.id}`);
    }
    return (
        <div className={styles.bottomThird}>
            {selectedNodes.length > 0 && (
                <SelectedNodesCard
                    selectedNodes={selectedNodes}
                    setCurrentNode={setCurrentNode}
                />
            )}
            <div className={styles.buttonsDiv}>
                <MainButton
                    disabled={!currentNode}
                    onClick={handleGeneratePath}
                >
                    Generate Path
                </MainButton>
            </div>
            <div className={styles.inputDiv}>
                <input
                    className={`${styles.input} ${
                        searchQuery ? styles.inputNoBackground : ""
                    }`}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you want to learn?"
                    value={searchQuery}
                />
            </div>
        </div>
    )
}

function Search() {
    const { isLoading,data: universalTree,error,} = useQuery({queryFn: fetchUniversalTree, queryKey: ["universalTree"],});
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);

    

    return (
        <div className={styles.searchPage}>
            {currentNode ? <NodeDescription currentNode={currentNode} /> : null}
            {isLoading ? <Loader /> : null}
            {error ? 
                <h1>
                    {error}
                </h1> : null}
            {!isLoading && !error && (
                <SearchPageChart
                    currentNode={currentNode}
                    selectedNodes={selectedNodes}
                    setCurrentNode={setCurrentNode}
                    setSelectedNodes={setSelectedNodes}
                    universalTree={universalTree}
                />
            )}
            {BottomThird}    
        </div>
    );
}

// String, Tree -> Nodes
function searchNodes(query, tree) {
    // Search locally
    const queryResults = tree.nodes.filter((node) => nodeIsMatch(node, query));
    return queryResults;
}

// Node, String -> Boolean
function nodeIsMatch(node, query) {
    if (node.type === "skill") {
        return (
            node.name?.toLowerCase().includes(query.toLowerCase())
        );
    } return false;
}

export default Search;
