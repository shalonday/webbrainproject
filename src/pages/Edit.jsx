/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Online Brain Project

The Online Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Online Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Online
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import styles from "./Edit.module.css";
import { useEffect, useState } from "react";
import { useSkillTreesContext } from "../contexts/SkillTreesContext";
import ModuleModal from "../components/edit/ModuleModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditPageChart from "../components/edit/EditPageChart";
import MainButton from "../components/MainButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUniversalTree } from "../services/apiTrees";
import Loader from "../components/Loader";
import {
  createDraftBranch,
  createDraftLinks,
  createDraftNodes,
  getLinksByIdsArray,
  getNodesByIdsArray,
} from "../services/apiBranches";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";

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

  const [currentTree, setCurrentTree] = useState({ nodes: [], links: [] });
  const [branchTitle, setBranchTitle] = useState("");
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isModuleModalVisible, setIsModuleModalVisible] = useState(false);

  const { user } = useUser();

  // this value is set when entering the Edit screen by clicking a draft item from the user's Profile screen
  const { state } = useLocation();

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
          setCurrentTree(getNodesById(nodeIds, universalTree));
        }
      }
      setDisplayedTree();
    },
    [universalTree, nodeIds, state?.draft]
  );

  // mutate functions for saving a branch draft
  const { mutate: mutateDraftNodes, error: nodesError } = useMutation({
    mutationFn: createDraftNodes,
    onError: (err) => console.error(err.message),
  });
  const { mutate: mutateDraftLinks, error: linksError } = useMutation({
    mutationFn: createDraftLinks,
    onError: (err) => console.error(err.message),
  });
  const { mutate: mutateDraftBranch, error: branchError } = useMutation({
    mutationFn: createDraftBranch,
    onSuccess: () =>
      toast.success("Branch draft has been saved to your account"),
    onError: (err) => console.error(err.message),
  });

  async function handleSubmit() {
    // validation?
    // merge currentTree to database tree if validation passes
    await mergeTree(currentTree);
    //go back to Home page
    navigate("/");
  }

  async function handleSave() {
    const draftBranch = {
      title: branchTitle,
      nodeIds: currentTree.nodes.map((node) => node.id),
      linkIds: currentTree.links.map((link) => link.id),
      authorId: user.id,
      status: "draft",
    };
    // save a tree object to the Supabase PostgreSQL db containing the User's ID or smth
    await mutateDraftNodes(currentTree.nodes); // if need ng validation, just fill in empty columns with null
    await mutateDraftLinks(currentTree.links);
    await mutateDraftBranch(draftBranch);

    if (!nodesError && !linksError && !branchError) navigate("/profile");
  }

  return (
    <>
      <div className={styles.inputDiv}>
        <input
          className={styles.input}
          placeholder="Type a title for this branch (to be displayed in your profile page)"
          value={branchTitle}
          onChange={(e) => setBranchTitle(e.target.value)}
        />
      </div>
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
