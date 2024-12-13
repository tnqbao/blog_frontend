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

    let currentParentIndex = 0; // Chỉ số cha hiện tại
    let currentLevelNodes = 0; // Số node đã xử lý trong hàng hiện tại
    let maxNodesInCurrentLevel = 2; // Số lượng tối đa node trong hàng tiếp theo
    let currentLevelStartX = -nodeSpacingX; // Vị trí X bắt đầu hàng hiện tại
    if (!Array.isArray(data)){
        return { nodes, edges };
    }
    for (let i = 0; i < data.length; i++) {
        const parentNode = nodes[currentParentIndex];

        // Tính vị trí của node mới
        const x = currentLevelStartX + currentLevelNodes * nodeSpacingX;
        const y = Math.floor(Math.log2(i + 2)) * levelSpacingY;

        const newNode = createNode(i + 1, data[i].title, x, y);
        nodes.push(newNode);

        // Kết nối node mới với node cha
        edges.push({
            id: `edge-${parentNode.id}-${newNode.id}`,
            source: parentNode.id,
            target: newNode.id,
        });

        currentLevelNodes++;

        // Nếu cha đã có 2 con, chuyển sang cha tiếp theo
        if (currentLevelNodes === 2) {
            currentParentIndex++;
            currentLevelNodes = 0;
        }

        // Nếu kết thúc hàng, cập nhật vị trí X cho hàng mới
        if (i + 1 === maxNodesInCurrentLevel) {
            maxNodesInCurrentLevel *= 2; // Gấp đôi số node cho hàng tiếp theo
            currentLevelStartX = -(maxNodesInCurrentLevel / 2) * nodeSpacingX; // Tính lại vị trí bắt đầu hàng
        }
    }

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
