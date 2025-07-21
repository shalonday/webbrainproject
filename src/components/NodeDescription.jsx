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
import styles from "./NodeDescription.module.css";

function NodeDescription({
    children, // Probably always the update/delete buttons if not null
    currentNode,
    className = styles.nodeDescription,
}) {
    return (
        <div className={className}>
            <div>
                <h3>
                    {currentNode?.title}
                </h3>
            </div>
            <p>
                {currentNode?.description}
            </p>
            {children}
        </div>
    );
}

export default NodeDescription;

NodeDescription.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    currentNode: PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
}

NodeDescription.defaultProps = {
    className: styles.nodeDescription
}