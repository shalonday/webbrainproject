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

import { useState } from "react";
import ReactSelect from "react-select";
import { useUser } from "../../../hooks/useUser";
import { nanoid } from "nanoid";
import MainButton from "../../MainButton";
import styles from "./AddNodeSection.module.css";
import GraphicalNodeSearch from "./GraphicalNodeSearch";
import TextNodeSearch from "./TextNodeSearch";
function AddNodeSection({ nodes, setNodes, currentTree, type }) {
    const [searchMode, setSearchMode] = useState(""),
        [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false),

        // Array containing either node objects (picked from existing tree) or description strings (created) obtained via the search area before pressing Add.
        [tempNodesOrDescriptions, setTempNodesOrDescriptions] = useState([]),

        { user } = useUser(),

        options = [
            { value: "text", label: "Select from a dropdown or create a new node" },
            // { value: "edit", label: "Pick a node from current draft" },
            // { value: "univ", label: "Pick a node from universal tree" },
        ];

    function openNodeSearch(e) {
        e.preventDefault();
        setIsSearchBoxVisible(true);
    }

    // Int -> Effect
    // Delete item in bullets array that corresponds to index
    function handleDeleteItem(index) {
        setNodes((array) => array.filter((item, i) => i !== index));
    }

    // Add a node object (not just description) to array
    function handleAddItem(e) {
        e.preventDefault();
        const nodesToAdd = tempNodesOrDescriptions.map((nodeOrDesc) => {
            if (nodeOrDesc.id) {
                //Node
                return nodeOrDesc;
            } 
            //Description string
            return {
                id: nanoid(),
                type: "skill",
                title: "",
                description: nodeOrDesc,
                major: false,
                author_id: user.id,
            };
      
        });

        setNodes((array) => array.concat(nodesToAdd));
        setIsSearchBoxVisible(false);
        setTempNodesOrDescriptions([]);
    }

    function handleCancel(e) {
        e.preventDefault();
        setIsSearchBoxVisible(false);
        setTempNodesOrDescriptions([]);
    }

    return (
        <fieldset className={styles.addNodesSection}>
            <h3>
                {type === "obj" ? "Objectives" : "Prerequisites"}
            </h3>

            {type === "obj"
                ? "By the end of this module, the learner should be able to:"
                : "Before starting this module, the learner should already be able to:"}

            <ul className={styles.nodeList}>
                {nodes.map((node, index) => (
                    <li
                        className={styles.nodeInputGroup}
                        key={index}
                    >
                        <span onClick={() => handleDeleteItem(index)}>
                            &#10005;
                        </span>

                        <p>
                            {node.description}
                        </p>
                    </li>
                ))}

                {!isSearchBoxVisible && (
                    <button
                        className={styles.addNodeButton}
                        key="last"
                        onClick={openNodeSearch}
                    >
                        +
                    </button>
                )}

                {isSearchBoxVisible ? <>
                    <ReactSelect
                        defaultValue="text"
                        onChange={(option) => {
                            setSearchMode(option.value);
                        }}
                        options={options}
                        placeholder="How do you want to search for a skill node?"
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
                            currentTree={currentTree}
                            setTempNodesOrDescriptions={setTempNodesOrDescriptions}
                            tempNodesOrDescriptions={tempNodesOrDescriptions}
                        />
                    )}

                    {searchMode === "edit" && (
                        <GraphicalNodeSearch
                            currentTree={currentTree}
                            type="edit"
                        />
                    )}

                    {searchMode === "univ" && <GraphicalNodeSearch type="univ" />}

                    <div className={styles.mainButtons}>
                        <MainButton onClick={handleCancel}>
                            Cancel
                        </MainButton>

                        <MainButton onClick={handleAddItem}>
                            Add
                        </MainButton>
                    </div>
                                      </> : null}
            </ul>
        </fieldset>
    );
}

export default AddNodeSection;
