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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import MainButton from "../components/MainButton";
import NodeDescription from "../components/NodeDescription";
import TreeModuleView from "../components/tree/TreeModuleView";
import TreePageChart from "../components/tree/TreePageChart";
import { useSkillTreesContext } from "../contexts/SkillTreesContext";
import styles from "./Tree.module.css";

// Page for viewing "themed" trees or "branches" of the universal tree
function Tree() {
    const { startNodeId, endNodeId } = useParams();
    const { pathResult, searchPath, isLoading, error } = useSkillTreesContext(); // I think I'd rather render based on params instead
    const [clickedNode, setClickedNode] = useState(null);
    const [treeWithActiveNodes, setTreeWithActiveNodes] = useState(null);
    const [isModuleVisible, setIsModuleVisible] = useState(false);
    const activeNodesIdList = treeWithActiveNodes
        ? treeWithActiveNodes.nodes
            .filter((node) => node.active)
            .map((node) => node.id)
        : [startNodeId];
    // !!! while there is no user auth yet, use just start with the start node as active node.

    // Generate the path upon opening this page. I do this here instead of at
    // The Generate Path button on Search.jsx so that the path is based on url
    // Params, making the same path easily shareable.
    // Scenario 1: A user w/o an account accesses the page and sees the path w/o any active nodes
    // Scenario 2: activeNodesIdList is updated from user account (or some uploaded json?) then treeWithActiveNodes is set from this
    useEffect(() => {
        searchPath(startNodeId, endNodeId);
    }, []);

    useEffect(
        () => {
            // Set the active nodes once the pathResult is ready
            if (Object.keys(pathResult).length > 0)
            {setTreeWithActiveNodes({
                nodes: pathResult.nodes.map((node) => activeNodesIdList?.includes(node.id)
                    ? { ...node, active: true }
                    : node),
                links: pathResult.links,
            });}
        },
        [pathResult, startNodeId]
    );

    function handlePlayClick() {
    // Play animation and then set activeNode to the next node. If it is a module node,
    // Display the module view, and fold the Chart.
        setIsModuleVisible(true);
        const nextModule = getNextModule(activeNodesIdList);
        setClickedNode(nextModule); // Set this even though no node was clicked, since "clickedNode" determines what's displayed
    }

    function getNextModule(activeNodeIds) {
        const reachableModule = treeWithActiveNodes.nodes.find((node) => {
            if (node.type === "module" && !node.active) {
                const prerequisiteNodes = getPrerequisiteNodes(node);
                const prereqIds = prerequisiteNodes.map((node) => node.id);

                const isPrereqActiveArray = prereqIds.map((id) =>
                    activeNodeIds.includes(id)
                );
                const areAllPrereqsActive = isPrereqActiveArray.reduce(
                    (acc, cur) => cur && acc
                );
                return areAllPrereqsActive;
            }
            return false;
        });
        return reachableModule;
    }

    function getPrerequisiteNodes(module) {
        const incomingLinks = treeWithActiveNodes.links.filter(
            (link) => link.target === module.id
        );
        const prerequisiteNodeIdsArray = incomingLinks.map((link) => link.source);
        const prerequisiteNodes = treeWithActiveNodes.nodes.filter((node) =>
            prerequisiteNodeIdsArray.includes(node.id)
        );
        return prerequisiteNodes;
    }

    return (
        <div>
            {clickedNode ? <NodeDescription currentNode={clickedNode} /> : null}

            {isLoading ? <Loader /> : null}

            {error ? <h1>
                {error}
                     </h1> : null}

            {!isLoading && !error && treeWithActiveNodes ? <TreePageChart
                branch={treeWithActiveNodes}
                clickedNode={clickedNode}
                setClickedNode={setClickedNode}
                setIsModuleVisible={setIsModuleVisible}
                                                           /> : null}

            {/* <div>divider button</div> */}

            {isModuleVisible ? <TreeModuleView
                clickedNode={clickedNode}
                setIsModuleVisible={setIsModuleVisible}
                setTreeWithActiveNodes={setTreeWithActiveNodes}
                tree={treeWithActiveNodes}
                               /> : null}

            {!isModuleVisible && (
                <div className={styles.playButtonDiv}>
                    <MainButton onClick={handlePlayClick}>
                        {activeNodesIdList.length > 1 ? "Continue" : "Start!"}
                    </MainButton>
                </div>
            )}
        </div>
    );
}

export default Tree;
