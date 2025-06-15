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

import styles from "./Edit.module.css";
import { useEffect, useState } from "react";
import { useSkillTreesContext } from "../contexts/SkillTreesContext";
import ModuleModal from "../components/edit/ModuleModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditPageChart from "../components/edit/EditPageChart";
import Loader from "../components/Loader";
import {
  getLinksByIdsArray,
  getNodesByIdsArray,
} from "../services/apiBranches";
import NodeDescription from "../components/NodeDescription";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi";
import { useUniversalTree } from "../hooks/useUniversalTree";
import SaveAsDraftButton from "../components/edit/SaveAsDraftButton";
import styled from "styled-components";
import UpdateButton from "../components/edit/UpdateButton";
import DeleteModal from "../components/edit/DeleteModal";
import AlertDialog from "../components/AlertDialog";
import SubmitBranchButton from "../components/edit/SubmitBranchButton";
import { useSave } from "../hooks/useSave";

function Edit() {
  const { isLoading, universalTree, error } = useUniversalTree();
  // this value is set when entering the Edit screen by clicking a draft item from the user's Profile screen
  const { state } = useLocation();

  const { mergeTree } = useSkillTreesContext();

  const navigate = useNavigate();
  const { nodeIds } = useParams(); // string of node IDs separated by ","

  const [currentTree, setCurrentTree] = useState({ nodes: [], links: [] });
  const [branchTitle, setBranchTitle] = useState(
    state?.draft?.title ? state.draft.title : ""
  );
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isAddingModule, setIsAddingModule] = useState(false); // true when the plus button was pressed. if true open an empty ModuleModal or with selectedNodes as preset prerequisites
  const [isUpdatingModule, setIsUpdatingModule] = useState(false); // true when Update button was clicked while a module is selected. if true open ModuleModal with preset values
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [disconnectedSkillNodeDescriptions, setDisconnectedSkillNodeDescriptions] = useState([])

  const {save} = useSave();

  useEffect(
    function () {
      async function setDisplayedTree() {
        if (nodeIds === "blank" && state?.draft) {
          // set displayed tree to the branch draft represented in state.draft.
          // state.draft is set when going to /edit/blank (hence nodeIds === "blank") from Profile page

          const draftNodes = await getNodesByIdsArray(state.draft.nodeIds);
          const draftLinks = await getLinksByIdsArray(state.draft.linkIds);
          const draftBranch = { nodes: draftNodes, links: draftLinks };

          // set current tree to the branch represented by the state.draft object
          setCurrentTree(draftBranch);
        } else if (universalTree) {
          // set displayed tree to nodes in param
          setCurrentTree(getRootedNodes(nodeIds, universalTree));
        }
      }
      setDisplayedTree();
    },
    [universalTree, nodeIds, state?.draft]
  );

  function handleDeleteClick() {
    //open an alert or modal to ask user if they're sure because this will delete relationships too
    //upon clicking ok on that modal, delete the node and relationships attached to it (not yet at the database because database mutation should only happen upon submit)
    setIsDeleteModalOpen(true);
  }
  
  return (
    <>
  {isAlertDialogOpen && <AlertDialog
    open={isAlertDialogOpen}
    setOpen={setIsAlertDialogOpen}
    title="Warning"
    negBtnText="No"
    posBtnText="Yes"
    onNegBtnClick={() => {
      setIsAlertDialogOpen(false)}}
    onPosBtnClick={() =>{
      save({...currentTree, branchTitle}, "submission")
      setIsAlertDialogOpen(false)
    }}>
      The following skill nodes will be added to Requests because they are disconnected from the main tree. Is this what you want?
      <br/>{disconnectedSkillNodeDescriptions.toString()}
   </AlertDialog>}
      <div className={styles.inputDiv}>
        <input
          className={styles.input}
          placeholder={
            branchTitle
              ? branchTitle
              : "Type a title for this branch (to be displayed in your profile page)"
          }
          value={branchTitle}
          onChange={(e) => setBranchTitle(e.target.value)}
        />
      </div>
      <div>
        <NodeDescription
          currentNode={currentNode}
          className={styles.nodeDescriptionEditing}
        >
          {currentNode && (
            <ButtonsDiv>
              <UpdateButton
                currentNodeType={currentNode.type}
                setIsUpdatingModule={setIsUpdatingModule}
              />
              <ToolButton onClick={handleDeleteClick}>
                <HiOutlineTrash />
              </ToolButton>
            </ButtonsDiv>
          )}
        </NodeDescription>
      </div>
      <div
        className={styles.mainDiv}
        style={
          isAddingModule || isUpdatingModule // don't display if ModuleModal is open
            ? { display: "none" }
            : { display: "block" }
        }
      >
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
          <div className={styles.buttonDiv}>
            <PlusButton onClick={setIsAddingModule}>
              <HiOutlinePlusCircle />
            </PlusButton>
          </div>
          <div className={styles.buttonDiv}>
            <SaveAsDraftButton
              state={state}
              currentTree={currentTree}
              branchTitle={branchTitle}
            />
            <SubmitBranchButton
              setDisconnectedSkillNodeDescriptions={setDisconnectedSkillNodeDescriptions}
              setIsAlertDialogOpen={setIsAlertDialogOpen}
              disconnectedSkillNodeDescriptions={disconnectedSkillNodeDescriptions}
              state={state}
              currentTree={currentTree}
              branchTitle={branchTitle}
              save={save}/>
          </div>
        </div>
      </div>
      {isUpdatingModule && (
        <ModuleModal
          moduleToUpdate={currentNode.type === "module" ? currentNode : null}
          currentTree={currentTree}
          setCurrentTree={setCurrentTree}
          setIsModuleModalVisible={setIsUpdatingModule}
        />
      )}
      {isAddingModule && (
        <ModuleModal
          prerequisiteNodes={selectedNodes}
          currentTree={currentTree}
          setCurrentTree={setCurrentTree}
          setIsModuleModalVisible={setIsAddingModule}
        />
      )}
      {isDeleteModalOpen && <DeleteModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} currentNode={currentNode} setCurrentTree={setCurrentTree}/>}
    </>
  );
}

const PlusButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 3em;
  cursor: pointer;
`;

const ButtonsDiv = styled.div`
  position: relative;
  top: 0px;
  left: 50px;
`;

const ToolButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1em;
  cursor: pointer;
`;

// String, Tree -> Tree (nodes only)
// rooted nodes are nodes that are connected to the universalTree
function getRootedNodes(nodeIdString, tree) {
    const idsArray = nodeIdString.split(",");
    let nodesArray = tree.nodes.filter((node) => idsArray.includes(node.id));
    nodesArray = nodesArray.map(node => {
      return {...node, is_rooted: true}
    })

    return { nodes: nodesArray, links: [] };
}

export default Edit;
