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

import "@mdxeditor/editor/style.css";
import { Suspense, useState } from "react";
import styles from "./ModuleModal.module.css";
import AddNodeSection from "./AddNodeSection";
import MainTextSection from "./MainTextSection";
import { uuidv4 } from "../../utils";
import Loader from "../Loader";

function ModuleModal({
  prerequisiteNodes,
  currentTree,
  setCurrentTree,
  setIsModuleModalVisible,
}) {
  const [title, setTitle] = useState("");
  const [targetNodeDescriptions, setTargetNodeDescriptions] = useState([]);
  const [prerequisiteNodeDescriptions, setPrerequisiteNodeDescriptions] =
    useState(prerequisiteNodes.map((node) => node.description));
  const [learnText, setLearnText] = useState("");
  const [practiceText, setPracticeText] = useState("");

  // Array of links added onto Learn and Practice sections.
  const [resourcesArray, setResourcesArray] = useState([]);

  // Int -> Effect
  // delete item in bullets array that corresponds to index
  function handleDeleteTargetItem(index) {
    setTargetNodeDescriptions((array) =>
      array.filter((item, i) => i !== index)
    );
  }

  // Int -> Effect
  // delete item in bullets array that corresponds to index
  function handleDeletePrereqItem(index) {
    setPrerequisiteNodeDescriptions((array) =>
      array.filter((item, i) => i !== index)
    );
  }

  // Open a SearchNodeModal
  function handleAddItem(e) {
    e.preventDefault();
    setTargetNodeDescriptions((array) => [...array, ""]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const id = uuidv4();

    // create a module object and target nodes objects
    const newModule = {
      id: id,
      type: "module",
      title: title ? title : "untitled",
      learnText: learnText,
      practiceText: practiceText,
      resourcesArray: resourcesArray,
    };

    const newIsPrerequisiteToLinks = prerequisiteNodes.map((prereqNode) => {
      const newLink = {
        id: uuidv4(),
        source: prereqNode.id,
        target: id,
      };
      return newLink;
    });

    const targetNodes = targetNodeDescriptions.map((description) => {
      const newTargetNode = {
        id: uuidv4(),
        title: "",
        type: "skill",
        description: description,
      };
      return newTargetNode;
    });

    const newTeachesLinks = targetNodes.map((targetNode) => {
      const newLink = {
        id: uuidv4(),
        source: id,
        target: targetNode.id,
      };
      return newLink;
    });
    const newLinks = newIsPrerequisiteToLinks.concat(newTeachesLinks);
    const newNodes = targetNodes.concat([newModule]);

    // set the currentTree value by adding the new nodes and links to it
    setCurrentTree((tree) => {
      const newTree = {
        nodes: tree.nodes.concat(newNodes),
        links: tree.links.concat(newLinks),
      };

      return newTree;
    });

    // close the modal
    setIsModuleModalVisible(false);
  }

  return (
    <Suspense fallback={<Loader />}>
      <form className={styles.form}>
        <fieldset className={styles.title}>
          <h3>
            <input
              placeholder="[optional title]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </h3>
        </fieldset>
        <AddNodeSection
          nodes={prerequisiteNodeDescriptions}
          setNodes={setPrerequisiteNodeDescriptions}
          handleDeleteItem={handleDeletePrereqItem}
          handleAddItem={handleAddItem}
          currentTree={currentTree}
          type="prereq"
        />

        <AddNodeSection
          nodes={targetNodeDescriptions}
          setTNodes={setTargetNodeDescriptions}
          handleDeleteItem={handleDeleteTargetItem}
          handleAddItem={handleAddItem}
          currentTree={currentTree}
          type="obj"
        />

        <MainTextSection
          setLearnText={setLearnText}
          setPracticeText={setPracticeText}
          setResourcesArray={setResourcesArray}
        />
        <div className={styles.submitButtonDiv}>
          <button onClick={handleSubmit}>Submit &rarr;</button>
        </div>
        <div></div>
      </form>
    </Suspense>
  );
}

export default ModuleModal;
