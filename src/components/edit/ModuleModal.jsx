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

import "@mdxeditor/editor/style.css";

import { Suspense, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { getObjectiveNodes, getPrerequisiteNodes } from "../../utils";
import AlertDialog from "../AlertDialog";
import Loader from "../Loader";
import AddNodeSection from "./module-modal/AddNodeSection";
import MainTextSection from "./module-modal/MainTextSection";
import styles from "./ModuleModal.module.css";

function ModuleModal({
    moduleToUpdate = null,
    currentTree,
    setCurrentTree,
    setIsModuleModalVisible,
}) {
    const presetPrereqNodes = moduleToUpdate
            ? getPrerequisiteNodes(moduleToUpdate, currentTree)
            : null,
        presetObjNodes = moduleToUpdate
            ? getObjectiveNodes(moduleToUpdate, currentTree)
            : null,

        [title, setTitle] = useState(
            moduleToUpdate ? moduleToUpdate.title : ""
        ),
        [objectiveNodes, setObjectiveNodes] = useState(
            moduleToUpdate ? presetObjNodes : []
        ),
        [prerequisiteNodes, setPrerequisiteNodes] = useState(
            moduleToUpdate ? presetPrereqNodes : []
        ),
        [learnText, setLearnText] = useState(
            moduleToUpdate ? moduleToUpdate.learnText : ""
        ),
        [practiceText, setPracticeText] = useState(
            moduleToUpdate ? moduleToUpdate.practiceText : ""
        ),

        // Array of links added onto Learn and Practice sections.
        [resourcesArray, setResourcesArray] = useState(
            moduleToUpdate?.resources_array ? moduleToUpdate.resources_array : []
        ),

        isModuleRooted = prerequisiteNodes.some(node => node.is_rooted === true),

        { user } = useUser(),

        [errorMessage, setErrorMessage] = useState('')

    // Add module, skill nodes (prereq and objective), and links to currentTree
    function handleSubmit(e) {
        e.preventDefault();

        const isSubmissionValid = validateSubmission();
        if (!isSubmissionValid) {
            return
        }

        const newPrereqNodes = prerequisiteNodes.filter(
                (node) =>
                    !currentTree.nodes
                        .map((existingNode) => existingNode.id)
                        .includes(node.id)
            ).map(node => 
                ({...node, is_rooted:false}) // Note that newly created prereqs are unrooted because they don't have a rooted node linking them to the world tree
            ),

            newTargetNodes = objectiveNodes.filter( // Filter the new nodes
                (node) =>
                    !currentTree.nodes
                        .map((existingNode) => existingNode.id)
                        .includes(node.id)
            ).map(node =>  // Add is_rooted property to new nodes. We assume that all preexisting objectiveNodes are already rooted (otherwise they wouldnt be in the universalTree)  
            //If module is_rooted then ALL newTargetNodes is_rooted = true. 
                ({...node, is_rooted:isModuleRooted})
            );

        if (moduleToUpdate) {
            submitUpdatedModule(newPrereqNodes.concat(newTargetNodes));
        } else {
            submitNewModule(newPrereqNodes.concat(newTargetNodes));
        }

        // Close the modal
        setIsModuleModalVisible(false);
    }


    function validateSubmission(){
        setErrorMessage("")
        let isValid = true;
    
        if (!prerequisiteNodes.length > 0){
            isValid = false
            setErrorMessage("There should be at least one prerequisite node.")
            setIsAlertOpen(true)
        }
    
        if (!objectiveNodes.length > 0){
            isValid = false
            setErrorMessage("There should be at least one objective node.")
            setIsAlertOpen(true)
        }
    
        if (learnText.length === 0 && practiceText.length === 0){
            isValid = false
            setErrorMessage("At least one of Learn and Practice should have text content.")
            setIsAlertOpen(true)
        }

        return isValid
    }

    function submitUpdatedModule(newNodes) {
        const moduleId = moduleToUpdate.id,
            updatedModule = {
                ...moduleToUpdate,
                title,
                learnText,
                practiceText,
                resources_array: resourcesArray,
                is_rooted: isModuleRooted
            },

            // Add links for each node in prerequisiteNodes that doesn't have an isPrerequisiteTo link to this module
            newIsPrerequisiteToLinks = prerequisiteNodes
                .filter(
                    (prereqNode) =>
                        !isNodeLinkedAsPrereqToModule(prereqNode, moduleToUpdate, currentTree)
                )
                .map((prereqNode) => {
                    const newLink = {
                        id: nanoid(),
                        source: prereqNode.id,
                        target: moduleId,
                    };
                    return newLink;
                }),

            newTeachesLinks = objectiveNodes
                .filter(
                    (objNode) =>
                        !isNodeLinkedAsObjToModule(objNode, moduleToUpdate, currentTree)
                )
                .map((targetNode) => {
                    const newLink = {
                        id: nanoid(),
                        source: moduleId,
                        target: targetNode.id,
                    };
                    return newLink;
                }),

            newLinks = newIsPrerequisiteToLinks.concat(newTeachesLinks),

            removedPrereqNodes = presetPrereqNodes.filter(
                (presetNode) =>
                    !prerequisiteNodes.map((node) => node.id).includes(presetNode.id)
            ),

            removedObjNodes = presetObjNodes.filter(
                (presetNode) =>
                    !objectiveNodes.map((node) => node.id).includes(presetNode.id)
            ),

            // Links connected to prereqNodes that were removed. We can delete links because they don't contain data,
            // But nodes should be deleted in another way.
            isPrerequisiteToLinksToDelete = currentTree.links.filter(
                (link) =>
                    removedPrereqNodes.map((node) => node.id).includes(link.source) &&
        link.target === moduleId
            ),

            // Links connected to objNodes that were removed
            teachesLinksToDelete = currentTree.links.filter(
                (link) =>
                    removedObjNodes.map((node) => node.id).includes(link.target) &&
        link.source === moduleId
            ),

            linksToDelete =
      isPrerequisiteToLinksToDelete.concat(teachesLinksToDelete);

        setCurrentTree((tree) => {
            const newTree = { 
                ...tree, // Any other keys within the tree should stay the same
                nodes: tree.nodes
                    .map((node) => (node.id === moduleId ? updatedModule : node)) // Add this updated module
                    .concat(newNodes),
                links: tree.links
                    .filter((link) => !linksToDelete.map((i) => i.id).includes(link.id))
                    .concat(newLinks)
            };
            return newTree;
        });
    }

    function submitNewModule(newSkillNodes) {
    //Creating a new module !!!
        const moduleId = nanoid(),

            newModule = {
                id: moduleId,
                author_id: user.id,
                type: "module",
                title: title ? title : "untitled",
                learnText,
                practiceText,
                resources_array: resourcesArray,
                is_rooted: isModuleRooted
            },

            newIsPrerequisiteToLinks = prerequisiteNodes.map((prereqNode) => {
                const newLink = {
                    id: nanoid(),
                    source: prereqNode.id,
                    target: moduleId,
                };
                return newLink;
            }),

            newTeachesLinks = objectiveNodes.map((targetNode) => {
                const newLink = {
                    id: nanoid(),
                    source: moduleId,
                    target: targetNode.id,
                };
                return newLink;
            }),
            newLinks = newIsPrerequisiteToLinks.concat(newTeachesLinks),
            newNodes = newSkillNodes.concat([newModule]);

        setCurrentTree((tree) => {
            const newTree = {
                nodes: tree.nodes.concat(newNodes),
                links: tree.links.concat(newLinks),
            };
            return newTree;
        });
    }

    function handleExit(e) {
        e.preventDefault();
        setIsModuleModalVisible(false);
    }
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    return (
        <Suspense fallback={<Loader />}>
            <AlertDialog
                negBtnText="Close"
                onNegBtnClick={()=>setIsAlertOpen(false)}
                onPosBtnClick={()=>setIsAlertOpen(false)}
                open={isAlertOpen}
                posBtnText="Ok"
                setOpen={setIsAlertOpen}
                title="Error"
            >
                Error:
                {errorMessage}
            </AlertDialog>

            <form className={styles.form}>
                <div className={styles.exitDiv}>
                    <button
                        onClick={handleExit}
                        style={{ cursor: "pointer" }}
                    >
                        &larr;
                    </button>
                </div>

                <fieldset className={styles.title}>
                    <h3>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="[optional title]"
                            value={title}
                        />
                    </h3>
                </fieldset>

                <AddNodeSection
                    currentTree={currentTree}
                    nodes={prerequisiteNodes}
                    setNodes={setPrerequisiteNodes}
                    type="prereq"
                />

                <AddNodeSection
                    currentTree={currentTree}
                    nodes={objectiveNodes}
                    setNodes={setObjectiveNodes}
                    type="obj"
                />

                <MainTextSection
                    learnText={learnText}
                    practiceText={practiceText}
                    setLearnText={setLearnText}
                    setPracticeText={setPracticeText}
                    setResourcesArray={setResourcesArray}
                />

                <div className={styles.submitButtonDiv}>
                    <button onClick={handleSubmit}>
                        Submit &rarr;
                    </button>
                </div>

                <div />
            </form>
        </Suspense>
    );
}

function isNodeLinkedAsPrereqToModule(node, module, tree) {
    return (
        tree.links.filter((link) => {
            link.source === node.id && link.target === module.id;
        }).length > 0
    );
}

function isNodeLinkedAsObjToModule(node, module, tree) {
    return (
        tree.links.filter((link) => {
            link.target === node.id && link.source === module.id;
        }).length > 0
    );
}

export default ModuleModal;
