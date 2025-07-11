// Needed only for testing
export function genRandomTree(N = 300, reverse = false) {
    return {
        nodes: [...Array(N).keys()].map((i) => ({
            id: i,
            val: Math.random() * 5 + 1,
        })),
        links: [...Array(N).keys()]
            .filter((id) => id)
            .map((id) => ({
                [reverse ? 'target' : 'source']: id,
                [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
                color: '#007AFF',
            })),
    };
}

export function genHierarchicalTree(levels = 4, childrenPerNode = 3) {
    const nodes = [];
    const links = [];
    let nodeId = 0;

    const createLevel = (parentId, currentLevel, maxLevels) => {
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

            // Рекурсивно створюємо дочірні рівні
            createLevel(childId, currentLevel + 1, maxLevels);
        }
    };

    // Створюємо кореневий вузол
    nodes.push({
        id: nodeId++,
        val: 10,
        number: 0,
        neutralCitation: 'Root Node',
        level: 0,
        collapsed: false,
        childLinks: [],
    });

    // Створюємо дерево
    createLevel(0, 1, levels);

    return { nodes, links };
}
