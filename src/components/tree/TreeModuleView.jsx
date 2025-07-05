import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import styles from "./TreeModuleView.module.css";

function TreeModuleView({
    tree,
    setTreeWithActiveNodes,
    clickedNode,
    setIsModuleVisible,
}) {
    const [currentModule, setCurrentModule] = useState(clickedNode);

    const outgoingLinks = tree.links.filter(
        (link) => link.source === currentModule.id
    );
    const outgoingLinkIdsArray = outgoingLinks.map((link) => link.id);
    const incomingLinks = tree.links.filter(
        (link) => link.target === currentModule.id
    );
    const incomingLinkIdsArray = incomingLinks.map((link) => link.id);
    const objectiveNodeIdsArray = outgoingLinks.map((link) => link.target);

    const prerequisiteNodes = getPrerequisiteNodes(currentModule);
    const objectiveNodes = getObjectiveNodes();

    useEffect(
        () => {
            // Check if all prerequisite nodes are active. if yes, activate all
            // Incoming links, and this module.
            if (prerequisiteNodes.every((node) => node.active)) {
                // Activate module and incoming links
                setTreeWithActiveNodes((tree) => ({
                    nodes: tree.nodes.map((node) =>
                        node.id === currentModule.id ? { ...node, active: true } : node
                    ),
                    links: tree.links.map((link) =>
                        incomingLinkIdsArray.includes(link.id)
                            ? { ...link, active: true }
                            : link
                    ),
                }));
            }
        },
        [currentModule]
    );

    // Has a module input so that it can be used for other modules at the changeCurrentModule function
    function getPrerequisiteNodes(module) {
        const incomingLinks = tree.links.filter(
            (link) => link.target === module.id
        );
        const prerequisiteNodeIdsArray = incomingLinks.map((link) => link.source);
        const prerequisiteNodes = tree.nodes.filter((node) =>
            prerequisiteNodeIdsArray.includes(node.id)
        );
        return prerequisiteNodes;
    }

    function getObjectiveNodes() {
    //Grab links whose sources are this module, get the targets of those, then get the nodes that correspond to those targets

        const objectiveNodes = tree.nodes.filter((node) =>
            objectiveNodeIdsArray.includes(node.id)
        );
        return objectiveNodes;
    }

    function handleExit(e) {
        e.preventDefault();
        setIsModuleVisible(false);
    }

    function handleNext(e) {
        e.preventDefault();
        // Set outgoing links and skill nodes corresponding to objectiveNodes to Active.

        const arrayWithActiveNodes = tree.nodes.map((node) =>
            objectiveNodeIdsArray.includes(node.id) ? { ...node, active: true } : node
        );
        setTreeWithActiveNodes((tree) => ({
            nodes: arrayWithActiveNodes,
            links: tree.links.map((link) =>
                outgoingLinkIdsArray.includes(link.id)
                    ? { ...link, active: true }
                    : link
            ),
        }));
        // Then check modules whose prerequisiteNodes are all active. Open the first one.
        changeCurrentModule(arrayWithActiveNodes);
    // SetIsModuleVisible(false);
    }

    // Use the fact that the module being viewed is based on the clickedNode variable
    // To change the current module, even though no node was clicked.
    function changeCurrentModule(arrayWithActiveNodes) {
    // Check modules whose prerequisiteNodes are all active. Open the first one.
        const activeNodes = arrayWithActiveNodes.filter((node) => node.active);
        const activeNodeIds = activeNodes.map((node) => node.id);

        const reachableModuleNode = getOneReachableModuleNode(activeNodeIds);
        if (reachableModuleNode) {setCurrentModule(reachableModuleNode);}
        else {alert("You're finished with this skill tree, congratulations!");} // No more module nodes in Tree
    }

    function getOneReachableModuleNode(activeNodeIds) {
        const reachableModule = tree.nodes.find((node) => {
            if (
                node.type === "module" &&
        node.id !== currentModule.id &&
        !node.active
            ) {
                // A module that is not the currently open one
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
    return (
        <div>
            <form className={styles.form}>
                <div className={`${styles.exitDiv} globalDiv`}>
                    <button onClick={handleExit}>
                        &times;
                    </button>
                </div>

                <fieldset className={styles.title}>
                    <h3>
                        {currentModule.title}
                    </h3>
                </fieldset>

                <fieldset className={styles.prereqs}>
                    <h3>
                        Prerequisites
                    </h3>

                    <ul className={styles.prerequisitesList}>
                        To succeed in this module, the learner should already be able to:
                        {prerequisiteNodes.map((node, i) => (
                            <li key={i}>
                                &#x2022;
                                {node.description}
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <fieldset className={styles.targets}>
                    <h3>
                        Objectives
                    </h3>

                    <ul>
                        By the end of this module, the learner should be able to:
                        {objectiveNodes.map((node, i) => (
                            <li key={i}>
                                &#x2022;
                                {node.description}
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <fieldset className={styles.learn}>
                    <h3>
                        Learn
                    </h3>

                    <Markdown>
                        {currentModule.learnText}
                    </Markdown>
                </fieldset>

                <fieldset className={styles.practice}>
                    <h3>
                        Practice
                    </h3>

                    <Markdown>
                        {currentModule.practiceText}
                    </Markdown>
                </fieldset>

                <div className={`${styles.submitButtonDiv} globalDiv`}>
                    <button onClick={handleNext}>
                        Done! &rarr;
                    </button>
                </div>

                <div />
            </form>
        </div>
    );
}

export default TreeModuleView;

TreeModuleView.propTypes = {
    clickedNode: PropTypes.object,
    setIsModuleVisible: PropTypes.func,
    setTreeWithActiveNodes: PropTypes.func,
    tree: PropTypes.object,
}
