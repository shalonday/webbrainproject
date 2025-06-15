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

import D3Chart from "../D3Chart";

function EditPageChart({
  currentTree,
  selectedNodes,
  setSelectedNodes,
  setCurrentNode,
}) {
  let timer;
  const touchduration = 500;

  // click uses "e.target.__data__" while touch uses "e.subject"; this is because of how the click events are handled at D3Chart.jsx
  function handleNodeClick(e) {
    if (e.target.__data__.type === "module") {
      toggleSelectModuleNode(e.target.__data__);
    } else if (e.target.__data__.type === "skill") {
      handleSkillNodeClick(e);
    }
  }

  // necessary for handling long touches on touchscreen
  function handleNodeTouchStart(e) {
    if (window.matchMedia("(pointer: coarse)").matches) {
      //https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
      timer = setTimeout(() => {
        if (e.subject.type === "skill") toggleSelectSkillNode(e.subject);
        else if (e.subject.type === "module") toggleSelectModuleNode(e.subject);
      }, touchduration);
    }
  }

  function handleNodeTouchEnd() {
    //stops short touches from firing the event
    if (timer) clearTimeout(timer); // https://stackoverflow.com/questions/6139225/how-to-detect-a-long-touch-pressure-with-javascript-for-android-and-iphone
  }

  function handleSkillNodeClick(e) {
    if (e.ctrlKey) {
      // allow for multiple selection
      toggleSelectSkillNode(e.target.__data__);
    } else {
      selectOneSkillNodeAtATime(e.target.__data__);
    }
  }

  function selectOneSkillNodeAtATime(targetSkillNode) {
    if (selectedNodes.length === 0) {
      toggleSelectSkillNode(targetSkillNode);
    } else if (selectedNodes.length === 1) {
      if (targetSkillNode === selectedNodes[0])
        toggleSelectSkillNode(targetSkillNode);
      else {
        setSelectedNodes([]);
        toggleSelectSkillNode(targetSkillNode); // necessary bec this sets node description visibility (vs just doing setSelectedNodes([target]))
      }
    } else if (selectedNodes.length > 1) {
      setSelectedNodes([targetSkillNode]);
    }
  }

  // SkillNode -> Effect
  // unselects modules and toggles selection of skill nodes
  function toggleSelectSkillNode(targetSkillNode) {
    if (selectedNodes[0]?.type === "module") {
      setCurrentNode(targetSkillNode);
      setSelectedNodes([targetSkillNode]);
    } else if (!selectedNodes.includes(targetSkillNode)) {
      // cases: selectedNodes is empty, or contains other skills,
      setCurrentNode(targetSkillNode);
      setSelectedNodes((arr) => [...arr, targetSkillNode]);
    } else {
      // selectedNodes includes target and this unselects it
      setSelectedNodes((arr) =>
        arr.filter((el) => el.id !== targetSkillNode.id)
      );
      setCurrentNode(null);
    }
  }

  //ModuleNode -> Effect
  //select only one module at a time, cancelling selected skill nodes
  function toggleSelectModuleNode(target) {
    if (selectedNodes.includes(target)) {
      setSelectedNodes([]);
      setCurrentNode(null);
    } //toggle
    else {
      setSelectedNodes([target]);
      setCurrentNode(target);
    }
  }

  return (
    <>
      <D3Chart
        tree={currentTree}
        onNodeClick={handleNodeClick}
        onNodeTouchStart={handleNodeTouchStart}
        onNodeTouchEnd={handleNodeTouchEnd}
        selectedNodeIds={selectedNodes.map((node) => node.id)}
      />
    </>
  );
}

export default EditPageChart;
