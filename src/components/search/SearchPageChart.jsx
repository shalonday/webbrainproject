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

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import { useSkillTreesContext } from "../../contexts/SkillTreesContext";
import D3Chart from "../D3Chart";

function SearchPageChart({
    universalTree,
    selectedNodes,
    setSelectedNodes,
    setCurrentNode,
    currentNode,
}) {
    const { searchResult, pathResult } = useSkillTreesContext();
    const [displayedTree, setDisplayedTree] = useState(universalTree);
    let timer;
    const touchduration = 500;

    const selectedNodeIds = useRef();
    selectedNodeIds.current = selectedNodes.map((node) => node.id);

    useEffect(
        () => {
            Object.keys(searchResult).length === 0 &&
        Object.keys(pathResult).length === 0 &&
        setDisplayedTree(universalTree);

            Object.keys(searchResult).length > 0 &&
        Object.keys(pathResult).length === 0 &&
        setDisplayedTree(searchResult);

            Object.keys(searchResult).length === 0 &&
        Object.keys(pathResult).length > 0 &&
        setDisplayedTree(pathResult);

            if (
                Object.keys(searchResult).length > 0 &&
        Object.keys(pathResult).length > 0
            )
            {console.err(
                "both pathResult and searchResult are non-null. There is a bug"
            );}
        },
        [universalTree, searchResult, pathResult]
    );

    // Click uses "e.target.__data__" while touch uses "e.subject"; this is because of how the click events are handled at D3Chart.jsx
    function handleNodeClick(e) {
    // Ctrl + click
        if (e.ctrlKey) {
            // Allow for multiple selection
            toggleSelect(e.target.__data__);
        }
        // Select only one node at a time if normal clicking / normal touching
        else if (selectedNodes.length === 0) {
            toggleSelect(e.target.__data__);
        } else if (selectedNodes.length === 1) {
            if (e.target.__data__ === selectedNodes[0])
            {toggleSelect(e.target.__data__);}
            else {
                setSelectedNodes([]);
                toggleSelect(e.target.__data__);
            }
        } else if (selectedNodes.length > 1) {
            setSelectedNodes([e.target.__data__]);
        }
    }

    function handleNodeTouchStart(e) {
    // !!! still need to test on actual phone.
    //Do on longtouch
        if (window.matchMedia("(pointer: coarse)").matches) {
            //https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
            // Touchscreen
            timer = setTimeout(() => {
                toggleSelect(e.subject); //
            }, touchduration);
        }
    }

    // SVGElement -> Effect
    // Adds or removes target from selectedNodes
    function toggleSelect(target) {
        if (!selectedNodeIds.current.includes(target.id)) {
            setCurrentNode(target);
            setSelectedNodes((arr) => [...arr, target]);
        } else {
            setSelectedNodes((arr) => arr.filter((el) => el.id !== target.id));
            setCurrentNode(null);
        }
    }

    function handleNodeTouchEnd() {
    //Stops short touches from firing the event
        if (timer) {clearTimeout(timer);} // https://stackoverflow.com/questions/6139225/how-to-detect-a-long-touch-pressure-with-javascript-for-android-and-iphone
    }

    return (
        <D3Chart
            currentNode={currentNode}
            onNodeClick={handleNodeClick}
            onNodeTouchEnd={handleNodeTouchEnd}
            onNodeTouchStart={handleNodeTouchStart}
            selectedNodeIds={selectedNodeIds.current}
            tree={displayedTree}
        />
    );
}

export default SearchPageChart;

SearchPageChart.propTypes = {
    currentNode: PropTypes.object,
    selectedNodes: PropTypes.arrayOf(PropTypes.object),
    setCurrentNode: PropTypes.func,
    setSelectedNodes: PropTypes.func,
    universalTree: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
}