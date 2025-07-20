// Needed only for testing
export function genRandomTree(N = 300, reverse = false) {
    return {
        nodes: [...Array(N).keys()].map((i: number) => ({
            id: i,
            val: Math.random() * 5 + 1,
        })),
        links: [...Array(N).keys()]
            .filter((id: number) => id)
            .map((id: number) => ({
                [reverse ? 'target' : 'source']: id,
                [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
                color: '#007AFF',
            })),
    };
}

type TreeNode = {
    id: number;
    val: number;
    number: number;
    neutralCitation: string;
    level: number;
    collapsed: boolean;
    childLinks: Link[];
};

type Link = {
    source: number;
    target: number;
    color: string;
};

type TreeData = {
    nodes: TreeNode[];
    links: Link[];
};

export function genHierarchicalTree(levels: number = 4, childrenPerNode: number = 3): TreeData {
    const nodes: TreeNode[] = [];
    const links: Link[] = [];
    let nodeId = 0;

    const createLevel = (parentId: number | null, currentLevel: number, maxLevels: number): void => {
        if (currentLevel >= maxLevels) return;

        const childrenCount = Math.floor(Math.random() * childrenPerNode) + 1;

        for (let i = 0; i < childrenCount; i++) {
            const childId = nodeId++;

            const newNode: TreeNode = {
                id: childId,
                val: Math.random() * 5 + 1,
                number: childId,
                neutralCitation: `Node ${childId}`,
                level: currentLevel,
                collapsed: false,
                childLinks: [],
            };

            nodes.push(newNode);

            if (parentId !== null) {
                const newLink: Link = {
                    source: parentId,
                    target: childId,
                    color: '#007AFF',
                };
                links.push(newLink);
            }

            createLevel(childId, currentLevel + 1, maxLevels);
        }
    };

    const rootNode: TreeNode = {
        id: nodeId++,
        val: 10,
        number: 0,
        neutralCitation: 'Root Node',
        level: 0,
        collapsed: false,
        childLinks: [],
    };

    nodes.push(rootNode);
    createLevel(rootNode.id, 1, levels);

    return { nodes, links };
}
