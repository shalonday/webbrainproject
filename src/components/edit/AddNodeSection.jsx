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

import { useState } from "react";
import styles from "./AddNodeSection.module.css";
import GraphicalNodeSearch from "./GraphicalNodeSearch";
import ReactSelect from "react-select";
import MainButton from "../MainButton";
import TextNodeSearch from "./TextNodeSearch";
function AddNodeSection({
  nodeDescriptions,
  setNodeDescriptions,
  currentTree,
  type,
}) {
  const [searchMode, setSearchMode] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [tempNodes, setTempNodes] = useState([]);

  const options = [
    { value: "text", label: "Select from a dropdown or create a new node" },
    // { value: "edit", label: "Pick a node from current draft" },
    // { value: "univ", label: "Pick a node from universal tree" },
  ];

  function openNodeSearch(e) {
    e.preventDefault();
    setIsSearchBoxVisible(true);
  }

  // Int -> Effect
  // delete item in bullets array that corresponds to index
  function handleDeleteItem(index) {
    setNodeDescriptions((array) => array.filter((item, i) => i !== index));
  }

  function handleAddItem(e) {
    e.preventDefault();
    setNodeDescriptions((array) => array.concat(tempNodes));
    setIsSearchBoxVisible(false);
    setTempNodes([]);
  }

  function handleCancel(e) {
    e.preventDefault();
    setIsSearchBoxVisible(false);
    setTempNodes([]);
  }

  return (
    <fieldset className={styles.addNodesSection}>
      <h3>{type === "obj" ? "Objectives" : "Prerequisites"}</h3>
      {type === "obj"
        ? "By the end of this module, the learner should be able to:"
        : "Before starting this module, the learner should already be able to:"}
      <ul className={styles.nodeList}>
        {nodeDescriptions.map((bullet, index) => (
          <li key={index} className={styles.nodeInputGroup}>
            <span onClick={() => handleDeleteItem(index)}>&#10005;</span>
            <p>{bullet}</p>
          </li>
        ))}
        {!isSearchBoxVisible && (
          <button
            onClick={openNodeSearch}
            key="last"
            className={styles.addNodeButton}
          >
            +
          </button>
        )}
        {isSearchBoxVisible && (
          <>
            <ReactSelect
              defaultValue={"text"}
              placeholder="How do you want to search for a skill node?"
              options={options}
              onChange={(option) => {
                setSearchMode(option.value);
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "black",
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "black",
                  border: "1px solid white",
                }),
                option: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "black",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "white",
                }),
              }}
            />
            {searchMode === "text" && (
              <TextNodeSearch
                tempNodes={tempNodes}
                setTempNodes={setTempNodes}
                currentTree={currentTree}
              />
            )}
            {searchMode === "edit" && (
              <GraphicalNodeSearch type="edit" currentTree={currentTree} />
            )}
            {searchMode === "univ" && <GraphicalNodeSearch type="univ" />}
            <div className={styles.mainButtons}>
              <MainButton onClick={handleCancel}>Cancel</MainButton>
              <MainButton onClick={handleAddItem}>Add</MainButton>
            </div>
          </>
        )}
      </ul>
    </fieldset>
  );
}

export default AddNodeSection;
