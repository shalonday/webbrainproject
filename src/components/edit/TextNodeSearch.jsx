import CreatableSelect from "react-select/creatable";
import styles from "./TextNodeSearch.module.css";

function TextNodeSearch({ tempNodes, setTempNodes, currentTree }) {
  function addTempNode(e) {
    e.preventDefault();
    setTempNodes((array) => [...array, ""]);
  }

  function handleDeleteTempItem(index) {
    setTempNodes((array) => array.filter((item, i) => i !== index));
  }

  const currentTreeNodeOptions = currentTree.nodes.map((node) => {
    return { value: node.description, label: node.description };
  });

  return (
    <>
      {tempNodes.map((bullet, index) => (
        <li key={index} className={styles.nodeInputGroup}>
          <span onClick={() => handleDeleteTempItem(index)}>&#10005;</span>
          <CreatableSelect
            className={styles.nodeSelect}
            placeholder="Select a node or type to create a new node..."
            styles={textSearchStyles}
            options={currentTreeNodeOptions}
            onChange={(e) => {
              setTempNodes((array) =>
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
