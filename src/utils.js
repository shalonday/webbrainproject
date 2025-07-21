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

// Build comma separated string of node ids that will be used as url params
export function buildParamStringFromArray(array) {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        if (i < array.length - 1) {string += `${array[i]  },`;}
        else {string += array[i];} // Last element, so don't put an & at the end.
    }
    if (array.length === 0) {string = "blank";}
    return string;
}

// Node (Type Module), Tree/Branch -> Node[] (Type Skill)
export function getPrerequisiteNodes(module, tree) {
    const incomingLinks = tree.links.filter((link) => link.target === module.id);
    const prerequisiteNodeIdsArray = incomingLinks.map((link) => link.source);
    const prerequisiteNodes = tree.nodes.filter((node) =>
        prerequisiteNodeIdsArray.includes(node.id)
    );
    return prerequisiteNodes;
}

// Node (Type Module), Tree/Branch -> Node[] (Type Skill)
export function getObjectiveNodes(module, tree) {
    const outgoingLinks = tree.links.filter((link) => link.source === module.id)
    const objectiveNodeIdsArray = outgoingLinks.map((link) => link.target)
    const objectiveNodes = tree.nodes.filter((node) =>
        objectiveNodeIdsArray.includes(node.id)
    );
    return objectiveNodes;
}
