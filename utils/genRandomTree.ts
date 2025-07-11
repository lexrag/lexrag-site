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

export function genHierarchicalTree(levels = 4, childrenPerNode = 3) {
    const nodes: Array<{
        id: number;
        val: number;
        number: number;
        neutralCitation: string;
        level: number;
        collapsed: boolean;
        childLinks: any[];
    }> = [];
    const links: Array<{
        source: number;
        target: number;
        color: string;
    }> = [];
    let nodeId = 0;

    const createLevel = (parentId: number | null, currentLevel: number, maxLevels: number): void => {
        if (currentLevel >= maxLevels) return;

        const childrenCount = Math.floor(Math.random() * childrenPerNode) + 1;

        for (let i = 0; i < childrenCount; i++) {
            const childId = nodeId++;

            nodes.push({
                id: childId,
                val: Math.random() * 5 + 1,
                number: childId,
                neutralCitation: `Node ${childId}`,
                level: currentLevel,
                collapsed: false,
                childLinks: [],
            });

            if (parentId !== null) {
                links.push({
                    source: parentId,
                    target: childId,
                    color: '#007AFF',
                });
            }

            // Recursively create child levels
            createLevel(childId, currentLevel + 1, maxLevels);
        }
    };

    // Create root node
    nodes.push({
        id: nodeId++,
        val: 10,
        number: 0,
        neutralCitation: 'Root Node',
        level: 0,
        collapsed: false,
        childLinks: [],
    });

    // Create the tree
    createLevel(0, 1, levels);

    return { nodes, links };
}
