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

import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";
import styles from "./D3Chart.module.css";

const RADIUS = 7;
const MINOR_RADIUS = RADIUS / 2;
const ACTIVE_SKILL_FILL = "hsl(315 100% 60%)";
const INACTIVE_SKILL_FILL = "hsl(240 100% 30%)";
const ACTIVE_MODULE_FILL = "hsl(180 100% 50%)";
const INACTIVE_MODULE_FILL = "hsl(60 10% 20%)";
const ACTIVE_LINK_COLOR = "hsl(180 100% 50%)";
const INACTIVE_LINK_COLOR = "hsl(60 10% 20%)";

function ForceGraph(
    data,
    svgRef,
    gNodeAndLinkRef,
    gLinkRef,
    gNodeRef,
    viewBoxWidth = 400,
    viewBoxHeight = 400
    // OnNodeClick,
    // OnNodeTouchStart,
    // OnNodeTouchEnd
) {
    // Specify the dimensions of the chart.

    // The force simulation mutates links and nodes, so create a copy
    // So that re-evaluating this cell produces the same result.
    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    // Create a simulation with several forces.
    const simulation = d3
        .forceSimulation(nodes)
        .force(
            "link",
            d3.forceLink(links).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-30))
        .force("x", d3.forceX(viewBoxWidth / 2))
        .force("y", d3.forceY(viewBoxHeight / 2))
        .on("tick", ticked);

    const link = d3
        .select(gLinkRef.current)
        .selectAll("line")
        .data(links)
        .attr("stroke", (d) => {
            if (!d.active) {return INACTIVE_LINK_COLOR;}
            else if (d.active) {return ACTIVE_LINK_COLOR;}
        })
        .attr("marker-end", (d) => `url(#arrow-${d.id})`);

    d3.select(gLinkRef.current)
        .selectAll("marker")
        .data(links)
        .attr("fill", (d) => {
            if (!d.active) {return INACTIVE_LINK_COLOR;}
            else if (d.active) {
                return ACTIVE_LINK_COLOR;
            }
        })
        .attr("id", (d) => `arrow-${d.id}`);

    const node = d3
        .select(gNodeRef.current)
        .selectAll("circle")
        .data(nodes)
        .attr("id", (d) => d.id)
        .attr("fill", (d) => {
            if (d.type === "url" && !d.active) {return INACTIVE_MODULE_FILL;}
            else if (d.type === "url" && d.active) {return ACTIVE_MODULE_FILL;}
            else if (d.type === "skill" && d.active) {return ACTIVE_SKILL_FILL;}
            else if (d.type === "skill" && !d.active) {return INACTIVE_SKILL_FILL;}
        })
        .attr("r", (d) => {
            if (d.type === "url") {return RADIUS / 2;}
            return RADIUS / 2;
        })
    // .on("click", onNodeClick) // has to be before the "call" in order to work for some reason.
        .call(drag(simulation));
    function ticked() {
        link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    // It seems the call to d3.zoom() is added to the svg element, while
    // A transform attribute is added to the g element inside it that we
    // Want to be able to pan. So I added a new g that contains both the
    // Nodes and links. Refactored from
    // https://observablehq.com/@d3/drag-zoom
    const gNodesAndLinks = d3
        .select(gNodeAndLinkRef.current)
        .attr("cursor", "grab");

    d3.select(svgRef.current).call(
        d3
            .zoom()
            .extent([
                [0, 0],
                [viewBoxWidth, viewBoxHeight],
            ])
            .scaleExtent([1, 8])
            .on("zoom", zoomed)
    );

    function zoomed({ transform }) {
        gNodesAndLinks.attr("transform", transform);
    }

    // Taken from https://observablehq.com/@d3/force-directed-graph-component
    // This allows the nodes to be draggable.
    function drag(simulation) {
        function dragstarted(event) {
            // OnNodeTouchStart(event); // put the touch events within the drag events because I don't know how to trigger the longtouch otherwise
            if (!event.active) {simulation.alphaTarget(0.3).restart();}
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            // OnNodeTouchEnd(event);
            if (!event.active) {simulation.alphaTarget(0);}
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
}

export default function D3Chart({
    tree,
    onNodeClick = () => {},
    onNodeTouchStart = () => {},
    onNodeTouchEnd = () => {},
    selectedNodeIds = [],
    currentNode = null,
}) {
    const gLinkRef = useRef();
    const gNodeRef = useRef();
    const svgRef = useRef();
    const gNodeAndLinkRef = useRef();
    const svgContainerRef = useRef();
    const viewBoxWidth = svgContainerRef.current?.clientWidth;
    const viewBoxHeight = svgContainerRef.current?.clientHeight;

    useEffect(() => {
    // This if clause removes the distracting "bouncing" of graph
    // That happens when these variables change from undefined to
    // A value.

        ForceGraph(
            tree,
            svgRef,
            gNodeAndLinkRef,
            gLinkRef,
            gNodeRef,
            viewBoxWidth,
            viewBoxHeight,
            onNodeClick,
            onNodeTouchStart,
            onNodeTouchEnd
        );
    }, [tree]); // That viewBoxWidth and Height are here is probs the reason the chart always restarts when I click stuff

    return (
        <div
            className={styles.svgContainer}
            ref={svgContainerRef}
        >
            <svg
                ref={svgRef}
                style={{ width: "100%", height: "100%" }}
                viewBox="0 0 400 400"
            >
                <g ref={gNodeAndLinkRef}>
                    <g ref={gLinkRef}>
                        {tree.links.map((link) => (
                            <marker
                                id="arrow"
                                key={`m${  link.id}`}
                                markerHeight="3"
                                markerWidth="3"
                                orient="auto-start-reverse"
                                refX="15"
                                refY="5"
                                viewBox="0 0 10 10"
                            >
                                <path d="M 0 0 L 10 5 L 0 10 z" />
                            </marker>
                        ))}

                        {tree.links.map((link) => (
                            <line
                                key={link.id}
                                markerEnd="url(#arrow)"
                                strokeWidth={1.5}
                            />
                        ))}
                    </g>

                    <g ref={gNodeRef}>
                        {tree.nodes.map((node) => (
                            <circle
                                className={
                                    selectedNodeIds.includes(node.id) ? styles.selected : ""
                                }
                                key={node.id}
                                onClick={onNodeClick}
                                onTouchEnd={onNodeTouchEnd}
                                onTouchStart={onNodeTouchStart}
                                strokeWidth={1.5}
                            >
                                {currentNode && currentNode?.id === node.id ? <animate
                                    attributeName="r"
                                    begin="0s"
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                    values={
                                        currentNode?.type === "skill"
                                            ? `${MINOR_RADIUS};${
                                                MINOR_RADIUS * 2
                                            };${MINOR_RADIUS}`
                                            : `${MINOR_RADIUS};${
                                                MINOR_RADIUS * 2
                                            };${MINOR_RADIUS}`
                                    }
                                                                              /> : null}
                            </circle>
                        ))}
                    </g>
                </g>
            </svg>
        </div>
    );
}

D3Chart.propTypes = {
    currentNode: PropTypes.object,
    onNodeClick: PropTypes.func,
    onNodeTouchEnd: PropTypes.func,
    onNodeTouchStart: PropTypes.func,
    selectedNodeIds: PropTypes.array,
    tree: PropTypes.object
}