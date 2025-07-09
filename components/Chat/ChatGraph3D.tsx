'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { genRandomTree } from '@/utils/genRandomTree';
import { useTheme } from 'next-themes';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

interface ChatGraph3DProps {
    height?: number;
    width?: number;
}

const ChatGraph3D = ({ height, width }: ChatGraph3DProps) => {
    const { resolvedTheme } = useTheme();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const fullData = useMemo(() => genRandomTree(300, true), []);
    const rootId = 0;

    const nodesById = useMemo(() => {
        const map = Object.fromEntries(fullData.nodes.map((node) => [node.id, node]));
        fullData.nodes.forEach((node) => {
            node.collapsed = Math.random() < 0.2;
            node.childLinks = [];
        });
        fullData.links.forEach((link) => {
            const source = typeof link.source === 'object' ? link.source.id : link.source;
            map[source].childLinks.push(link);
        });
        return map;
    }, [fullData]);

    const getPrunedTree = useCallback(() => {
        const visibleNodes = [];
        const visibleLinks: any[] = [];
        (function traverse(node = nodesById[rootId]) {
            visibleNodes.push(node);
            if (node.collapsed) return;
            node.childLinks.forEach((link) => {
                visibleLinks.push(link);
                const child = typeof link.target === 'object' ? link.target : nodesById[link.target];
                traverse(child);
            });
        })();
        return { nodes: visibleNodes, links: visibleLinks };
    }, [nodesById]);

    const [prunedTree, setPrunedTree] = useState(getPrunedTree());

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth * 0.9 - 24,
                height: window.innerHeight * 0.9 - 24,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <ForceGraph3D
            width={width || dimensions.width}
            height={height || dimensions.height}
            graphData={prunedTree}
            backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
            nodeAutoColorBy="group"
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={() => 0.005}
            nodeLabel={(node) => `${node.id}`}
            nodeColor={(node) => (!node.childLinks.length ? 'green' : node.collapsed ? 'red' : 'yellow')}
            onNodeClick={(node, event) => {
                event.preventDefault?.();
                event.stopPropagation?.();

                node.collapsed = !node.collapsed;
                setPrunedTree(getPrunedTree());
            }}
        />
    );
};

export default ChatGraph3D;
