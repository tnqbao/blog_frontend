import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { MindmapDataTypes } from "@/utils/types";

interface Node {
    id: string;
    data: {
        label: string;
    };
    position: {
        x: number;
        y: number;
    };
}

interface Edge {
    id: string;
    source: string;
    target: string;
    type: string;
}

interface MindmapProps {
    data: MindmapDataTypes[];
    rootKeyword: string;
}

const createNode = (index: number, label: string, x: number, y: number): Node => {
    return { id: `node-${index}`, data: { label }, position: { x, y } };
};

const buildBinaryTree = (data: MindmapDataTypes[], rootKeyword: string) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const levelSpacingY = 100; // Khoảng cách hàng dọc
    const nodeSpacingX = 150; // Khoảng cách hàng ngang

    // Tạo node gốc
    const rootNode = createNode(0, rootKeyword, 0, 0);
    nodes.push(rootNode);

    let currentParentIndex = 0;
    let currentLevelNodes = 0;
    let maxNodesInCurrentLevel = 2;
    let currentLevelStartX = -nodeSpacingX;
    if (!Array.isArray(data)){
        return { nodes, edges };
    }
    for (let i = 0; i < data.length; i++) {
        const parentNode = nodes[currentParentIndex];

        const x = currentLevelStartX + currentLevelNodes * nodeSpacingX;
        const y = Math.floor(Math.log2(i + 2)) * levelSpacingY;

        const newNode = createNode(i + 1, data[i].title, x, y);
        nodes.push(newNode);

        edges.push({
            id: `edge-${parentNode.id}-${newNode.id}`,
            source: parentNode.id,
            target: newNode.id,
            type: 'straight'
        });

        currentLevelNodes++;

        if (currentLevelNodes === 2) {
            currentParentIndex++;
            currentLevelNodes = 0;
        }

        if (i + 1 === maxNodesInCurrentLevel) {
            maxNodesInCurrentLevel *= 2;
            currentLevelStartX = -(maxNodesInCurrentLevel / 2) * nodeSpacingX;
        }
    }

    return { nodes, edges };
};

const Mindmap: React.FC<MindmapProps> = ({ data, rootKeyword }) => {
    const { nodes, edges } = buildBinaryTree(data, rootKeyword);

    return (
        <div className={"w-full min-h-[60vh]"}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
            </ReactFlow>
        </div>
    );
};

export default Mindmap;