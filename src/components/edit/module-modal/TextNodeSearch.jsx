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

import CreatableSelect from "react-select/creatable";
import styles from "./TextNodeSearch.module.css";

function TextNodeSearch({
  tempNodesOrDescriptions,
  setTempNodesOrDescriptions,
  currentTree,
}) {
  function addTempNode(e) {
    e.preventDefault();
    setTempNodesOrDescriptions((array) => [...array, ""]);
  }

  function handleDeleteTempItem(index) {
    setTempNodesOrDescriptions((array) =>
      array.filter((item, i) => i !== index)
    );
  }

  const currentTreeNodeOptions = currentTree.nodes
    .filter((node) => node.type === "skill")
    .map((node) => {
      return { value: node, label: node.description };
    });

  return (
    <>
      {tempNodesOrDescriptions.map((bullet, index) => (
        <li key={index} className={styles.nodeInputGroup}>
          <span onClick={() => handleDeleteTempItem(index)}>&#10005;</span>
          <CreatableSelect
            className={styles.nodeSelect}
            placeholder="Select a node or type to create a new node..."
            styles={textSearchStyles}
            options={currentTreeNodeOptions}
            onChange={(e) => {
              setTempNodesOrDescriptions((array) =>
                array.map((item, i) => (i === index ? e.value : item))
              );
            }}
          />
        </li>
      ))}
      <button onClick={addTempNode} key="last" className={styles.addNodeButton}>
        +
      </button>
    </>
  );
}

const textSearchStyles = {
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
};

export default TextNodeSearch;
