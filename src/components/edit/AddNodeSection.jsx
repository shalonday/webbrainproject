import { useState } from "react";
import styles from "./AddNodeSection.module.css";
import SearchNodeModal from "./SearchNodeModal";
import ReactSelect from "react-select";
import MainButton from "../MainButton";
import TextNodeSearch from "./TextNodeSearch";
function AddNodeSection({
  nodes,
  setNodes,
  handleDeleteItem,
  handleAddItem,
  currentTree,
  type,
}) {
  const [searchMode, setSearchMode] = useState("");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [tempNodes, setTempNodes] = useState([]);

  const options = [
    { value: "text", label: "Select from a dropdown or create a new node" },
    { value: "edit", label: "Pick a node from current draft" },
    { value: "univ", label: "Pick a node from universal tree" },
  ];

  function openNodeSearch(e) {
    e.preventDefault();
    setIsSearchBoxVisible(true);
  }

  console.log(currentTree);

  return (
    <fieldset className={styles.addNodesSection}>
      <h3>{type === "obj" ? "Objectives" : "Prerequisites"}</h3>
      {type === "obj"
        ? "By the end of this module, the learner should be able to:"
        : "Before starting this module, the learner should already be able to:"}
      <ul className={styles.nodeList}>
        {nodes.map((bullet, index) => (
          <li key={index} className={styles.nodeInputGroup}>
            <span onClick={() => handleDeleteItem(index)}>&#10005;</span>
            <textarea
              className={styles.nodeTextarea}
              rows={1}
              value={bullet}
              onChange={(e) => {
                setNodes((array) =>
                  array.map((item, i) => (i === index ? e.target.value : item))
                ); // array == targetNodes; "item" is a bullet. This allows for changing the text in the current bullet
              }}
            >
              [Phrase starting with a verb representing the skill that will be
              learned]
            </textarea>
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
                console.log(option.value);
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
              <SearchNodeModal type="edit" currentTree={currentTree} />
            )}
            {searchMode === "univ" && <SearchNodeModal type="univ" />}
            <div className={styles.mainButtons}>
              <MainButton>Cancel</MainButton>
              <MainButton onClick={handleAddItem}>Add</MainButton>
            </div>
          </>
        )}
      </ul>
    </fieldset>
  );
}

export default AddNodeSection;
