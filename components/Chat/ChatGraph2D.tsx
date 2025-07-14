'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface ChatGraph2DProps {
    height?: number;
    width?: number;
    data: any;
    handleSelectedRelevantContext: Dispatch<SetStateAction<any>>;
}

const ChatGraph2D = ({ height, width, data, handleSelectedRelevantContext }: ChatGraph2DProps) => {
    const { resolvedTheme } = useTheme();

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [graphData, setGraphData] = useState(data);

    useEffect(() => {
        setGraphData(data);
    }, [data]);

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

    const initializedData = useMemo(() => {
        if (!data || !data.nodes || !data.links) return { nodes: [], links: [] };

        const enhancedNodes = data.nodes.map((node: any) => ({
            ...node,
            collapsed: false,
            childLinks: [],
        }));

        const enhancedNodesById = Object.fromEntries(enhancedNodes.map((node: any) => [node.id, node]));

        const enhancedLinks = data.links.map((link: any) => ({
            ...link,
            source: typeof link.source === 'object' ? link.source.id : link.source,
            target: typeof link.target === 'object' ? link.target.id : link.target,
        }));

        enhancedLinks.forEach((link: any) => {
            if (enhancedNodesById[link.source]) {
                enhancedNodesById[link.source].childLinks.push(link);
            }
        });

        return {
            nodes: enhancedNodes,
            links: enhancedLinks,
        };
    }, [data]);

    const getPrunedTree = (fullData: any) => {
        const visibleNodes: any[] = [];
        const visibleLinks: any[] = [];
        const visitedNodes = new Set();
        const nodesById = Object.fromEntries(fullData.nodes.map((node: any) => [node.id, node]));

        const traverseTree = (node: any) => {
            if (visitedNodes.has(node.id)) return;
            visitedNodes.add(node.id);
            visibleNodes.push(node);
            if (node.collapsed) return;
            node.childLinks.forEach((link: any) => {
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                const targetNode = nodesById[targetId];
                if (targetNode && !visitedNodes.has(targetNode.id)) {
                    visibleLinks.push(link);
                    traverseTree(targetNode);
                }
            });
        };

        const targetIds = new Set(
            fullData.links.map((link: any) => (typeof link.target === 'object' ? link.target.id : link.target)),
        );

        const rootNodes = fullData.nodes.filter((node: any) => !targetIds.has(node.id));

        if (rootNodes.length === 0) {
            fullData.nodes.forEach((node: any) => {
                if (!visitedNodes.has(node.id)) {
                    traverseTree(node);
                }
            });
        } else {
            rootNodes.forEach(traverseTree);
        }

        return { nodes: visibleNodes, links: visibleLinks };
    };

    useEffect(() => {
        const prunedData = getPrunedTree(initializedData);
        setGraphData(prunedData);
    }, [initializedData]);

    const handleNodeClick = (node: any) => {
        if (node.childLinks && node.childLinks.length > 0) {
            node.collapsed = !node.collapsed;
            setGraphData(getPrunedTree(initializedData));
        }
        handleSelectedRelevantContext(node);
    };

    const getNodeColor = (node: any) => {
        if (!node.childLinks || node.childLinks.length === 0) {
            return '#10b981';
        }
        return node.collapsed ? '#ef4444' : '#f59e0b';
    };

    const handleNodeHover = (node: any) => {
        if (node && node.childLinks && node.childLinks.length > 0) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    };

    return (
        <ForceGraph2D
            width={width || dimensions.width}
            height={height || dimensions.height}
            graphData={graphData}
            backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
            nodeColor={getNodeColor}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={() => 0.005}
            nodeLabel={(node) => {
                const baseLabel = node.neutralCitation || `№ ${node.number}`;
                if (node.childLinks && node.childLinks.length > 0) {
                    return `${baseLabel} (${node.collapsed ? 'expand' : 'collapse'})`;
                }
                return baseLabel;
            }}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onBackgroundClick={() => {
                document.body.style.cursor = 'default';
            }}
        />
    );
};

export default ChatGraph2D;
