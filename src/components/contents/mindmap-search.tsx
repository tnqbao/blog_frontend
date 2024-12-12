import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
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
}

interface MindmapProps {
    data: MindmapDataTypes[];
    rootKeyword: string;
}

// Hàm tạo node
const createNode = (index: number, label: string, x: number, y: number): Node => {
    return { id: `node-${index}`, data: { label }, position: { x, y } };
};

// Hàm xây dựng cây nhị phân với node gốc và các node con
const buildBinaryTree = (data: MindmapDataTypes[], rootKeyword: string) => {
    const rootNode = createNode(0, rootKeyword, 0, 0); // Node gốc "Content search"
    const nodes: Node[] = [rootNode]; // Danh sách các node
    const edges: Edge[] = []; // Danh sách các cạnh (connections)

    // Hàm đệ quy để thêm node con vào cây
    const addChildren = (parentIndex: number, depth: number) => {
        const leftIndex = 2 * parentIndex + 1;
        const rightIndex = 2 * parentIndex + 2;

        const parentNode = nodes[parentIndex];

        if (leftIndex < data.length) {
            const leftNode = createNode(leftIndex, data[leftIndex].title, depth * 200, parentNode.position.y + 150);
            nodes.push(leftNode);
            edges.push({ id: `edge-${parentNode.id}-${leftNode.id}`, source: parentNode.id, target: leftNode.id });
            addChildren(leftIndex, depth + 1); // Đệ quy cho node con trái
        }

        if (rightIndex < data.length) {
            const rightNode = createNode(rightIndex, data[rightIndex].title, (depth + 1) * 200, parentNode.position.y + 150);
            nodes.push(rightNode);
            edges.push({ id: `edge-${parentNode.id}-${rightNode.id}`, source: parentNode.id, target: rightNode.id });
            addChildren(rightIndex, depth + 1); // Đệ quy cho node con phải
        }
    };

    addChildren(0, 1); // Bắt đầu từ node gốc

    return { nodes, edges };
};

const Mindmap: React.FC<MindmapProps> = ({ data, rootKeyword }) => {
    const { nodes, edges } = buildBinaryTree(data, rootKeyword);

    return (
        <div className={"w-full min-h-[50vh]"}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
            </ReactFlow>
        </div>
    );
};

export default Mindmap;
