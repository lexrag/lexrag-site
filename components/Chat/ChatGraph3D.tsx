'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { getConversationExpandNodes } from '@/api/chat/getConversationExpandNodes';
import { subscribeToZoomToFitGraph } from '@/events/zoom-to-fit';
import { useTheme } from 'next-themes';
import { GraphData, GraphLayer } from '@/types/Graph';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

interface ChatGraph3DProps {
    height?: number;
    width?: number;
    layers: GraphLayer[];
    data: GraphData;
    handleCardData: Dispatch<SetStateAction<any>>;
    handleScrollToCardId?: Dispatch<SetStateAction<string>>;
}

const ChatGraph3D = ({ height, width, data, layers, handleCardData, handleScrollToCardId }: ChatGraph3DProps) => {
    const { resolvedTheme } = useTheme();

    const graphRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [layerDataMap, setLayerDataMap] = useState<Record<string, { nodes: any[]; links: any[] }>>({});
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
    const [lastClickedNode, setLastClickedNode] = useState<string | null>(null);
    const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);

    useEffect(() => {
        console.log(data);
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth * 0.9 - 24,
                height: window.innerHeight * 0.9 - 24,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [data]);

    useEffect(() => {
        const unsubscribe = subscribeToZoomToFitGraph(() => graphRef.current?.zoomToFit(400));
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!data) return;

        const newLayerDataMap: Record<string, { nodes: any[]; links: any[] }> = {};

        const dataKeyToLayerId: Record<string, string> = {
            allRetrievedNodes: 'all_retrieved_nodes',
            allRetrievedNodesWithNeighbors: 'all_retrieved_nodes_with_neighbors',
            relevantRetrievedNodes: 'relevant_retrieved_nodes',
            relevantContext: 'relevant_context',
        };

        Object.keys(data).forEach((dataKey) => {
            const layerId = dataKeyToLayerId[dataKey];
            const layerData = data[dataKey as keyof GraphData];

            if (layerId && layerData) {
                if (layerData.nodes && Array.isArray(layerData.nodes)) {
                    const layerConfig = layers.find((l) => l.id === layerId);
                    const nodesWithLayerColor = layerData.nodes.map((node: any) => ({
                        ...node,
                        layerColor: layerConfig?.color || '#d3d3d3',
                        layerId: layerId,
                    }));

                    newLayerDataMap[layerId] = {
                        nodes: nodesWithLayerColor,
                        links: layerData.links || [],
                    };
                }
            }
        });

        setLayerDataMap(newLayerDataMap);
    }, [data, layers]);

    const processedData = useMemo(() => {
        const enabledLayers = layers.filter((layer) => layer.enabled);

        if (enabledLayers.length === 0) {
            return { nodes: [], links: [] };
        }

        const sortedEnabledLayers = enabledLayers.sort((a, b) => a.priority - b.priority);

        const allNodes = new Map();
        const allLinks = new Map();

        sortedEnabledLayers.forEach((layer) => {
            const layerData = layerDataMap[layer.id];
            if (!layerData) return;

            layerData.nodes.forEach((node: any) => {
                const existingNode = allNodes.get(node.id);
                if (existingNode) {
                    allNodes.set(node.id, {
                        ...existingNode,
                        ...node,
                        color: node.layerColor || layer.color,
                        layerId: layer.id,
                        layerName: layer.name,
                    });
                } else {
                    allNodes.set(node.id, {
                        ...node,
                        color: node.layerColor || layer.color,
                        layerId: layer.id,
                        layerName: layer.name,
                    });
                }
            });

            if (layerData.links) {
                layerData.links.forEach((link: any) => {
                    const linkKey = `${link.source}-${link.target}`;
                    if (!allLinks.has(linkKey)) {
                        allLinks.set(linkKey, {
                            ...link,
                            source: typeof link.source === 'object' ? link.source.id : link.source,
                            target: typeof link.target === 'object' ? link.target.id : link.target,
                        });
                    }
                });
            }
        });

        // Add expanded data
        expandedData.nodes.forEach((node: any) => {
            const existingNode = allNodes.get(node.id);
            if (existingNode) {
                allNodes.set(node.id, {
                    ...existingNode,
                    ...node,
                    color: node.layerColor || '#d3d3d3',
                    layerId: 'expanded',
                    layerName: 'Expanded',
                });
            } else {
                allNodes.set(node.id, {
                    ...node,
                    color: node.layerColor || '#d3d3d3',
                    layerId: 'expanded',
                    layerName: 'Expanded',
                });
            }
        });

        expandedData.links.forEach((link: any) => {
            const linkKey = `${link.source}-${link.target}`;
            if (!allLinks.has(linkKey)) {
                allLinks.set(linkKey, {
                    ...link,
                    source: typeof link.source === 'object' ? link.source.id : link.source,
                    target: typeof link.target === 'object' ? link.target.id : link.target,
                });
            }
        });

        return {
            nodes: Array.from(allNodes.values()),
            links: Array.from(allLinks.values()),
        };
    }, [layerDataMap, layers, expandedData]);

    useEffect(() => {
        if (processedData) {
            handleCardData(processedData);
        }
    }, [processedData, handleCardData]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (clickTimer) {
                clearTimeout(clickTimer);
            }
        };
    }, [clickTimer]);

    const handleNodeClick = (node: any) => {
        if (!node || !node.id) return;

        // Check if this is a double click
        if (lastClickedNode === node.id && clickTimer) {
            // Double click detected - expand/collapse node
            clearTimeout(clickTimer);
            setClickTimer(null);
            setLastClickedNode(null);
            handleNodeDoubleClick(node);
            return;
        }

        // Single click - select node
        console.log('Node selected:', node.id);

        // Clear any existing timer
        if (clickTimer) {
            clearTimeout(clickTimer);
        }

        // Set timer for potential double click
        const timer = setTimeout(() => {
            // Single click confirmed - select node
            if (handleScrollToCardId) {
                handleScrollToCardId(node.id);
            }
            
            setHighlightedNodeId(node.id);

            setTimeout(() => {
                setHighlightedNodeId(null);
            }, 3000);

            setClickTimer(null);
            setLastClickedNode(null);
        }, 300); // 300ms delay to detect double click

        setClickTimer(timer);
        setLastClickedNode(node.id);
    };

    const handleNodeDoubleClick = async (node: any) => {
        if (!node || !node.id) return;

        console.log('Node double-clicked:', node.id, 'Currently expanded:', expandedNodes.has(node.id));

        // Prevent clicking on already loading nodes
        if (loadingNodes.has(node.id)) {
            console.log('Node is currently loading, ignoring double-click');
            return;
        }

        try {
            if (expandedNodes.has(node.id)) {
                console.log('Node already expanded:', node.id);
                return;
            } else {
                console.log('Expanding node:', node.id);
                setLoadingNodes(prev => new Set([...prev, node.id]));
                
                const response = await getConversationExpandNodes(node.id);
                console.log('Expand response:', response);

                if (response && response.neighbors && Array.isArray(response.neighbors) && response.neighbors.length > 0) {
                    const newNodes = response.neighbors;
                    const newLinks = response.links || [];

                    console.log('Adding nodes:', newNodes.length, 'Adding links:', newLinks.length);

                    const existingNodeIds = new Set([
                        ...processedData.nodes.map((n) => n.id),
                        ...expandedData.nodes.map((n) => n.id),
                    ]);

                    const filteredNewNodes = newNodes.filter((n: any) => !existingNodeIds.has(n.id));

                    if (filteredNewNodes.length > 0) {
                        setExpandedData((prev) => ({
                            nodes: [...prev.nodes, ...filteredNewNodes],
                            links: [...prev.links, ...newLinks],
                        }));

                        setExpandedNodes((prev) => new Set([...prev, node.id]));

                        console.log('Successfully expanded node with', filteredNewNodes.length, 'new children');
                    } else {
                        console.log('No new nodes to add (all already exist)');
                        setExpandedNodes((prev) => new Set([...prev, node.id]));
                    }
                } else {
                    console.log('No children found for node:', node.id);
                    // Mark node as expanded even if no children to prevent repeated API calls
                    setExpandedNodes((prev) => new Set([...prev, node.id]));
                }
            }
        } catch (error) {
            console.error('Error expanding node:', error);
        } finally {
            setLoadingNodes(prev => {
                const newSet = new Set(prev);
                newSet.delete(node.id);
                return newSet;
            });
        }
    };

    const getNodeColor = (node: any) => {
        if (highlightedNodeId === node.id) {
            return '#fbbf24'; // Gold for highlighted
        }

        if (loadingNodes.has(node.id)) {
            return '#f59e0b'; // Orange for loading
        }

        if (node.color && (!node.labels || node.labels.length === 0)) {
            return node.color;
        }

        if (node.labels) {
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return '#dc2626'; // Red for case/lawsuit
            }

            if (node.labels.includes('Paragraph')) {
                return '#eab308'; // Yellow for paragraphs
            }

            if (node.labels.includes('Court') || node.labels.includes('Tribunal')) {
                return '#16a34a'; // Green for court
            }

            if (node.labels.includes('Judge') || node.labels.includes('Justice')) {
                return '#ef4444'; // Lighter red for judge
            }

            if (
                node.labels.includes('Party') ||
                node.labels.includes('Plaintiff') ||
                node.labels.includes('Defendant') ||
                node.labels.includes('Appellant') ||
                node.labels.includes('Respondent')
            ) {
                return '#06b6d4'; // Cyan for parties
            }

            if (
                node.labels.includes('Act') ||
                node.labels.includes('Law') ||
                node.labels.includes('Statute') ||
                node.labels.includes('Legislation')
            ) {
                return '#2563eb'; // Blue for legislation
            }

            if (
                node.labels.includes('Regulation') ||
                node.labels.includes('Order') ||
                node.labels.includes('Decree') ||
                node.labels.includes('Resolution')
            ) {
                return '#7c3aed'; // Purple for regulations
            }

            if (node.labels.includes('Article') || node.labels.includes('Section')) {
                return '#4f46e5'; // Indigo for articles
            }

            if (node.labels.includes('Citation') || node.labels.includes('Reference')) {
                return '#ec4899'; // Pink for citations
            }

            if (node.labels.includes('Document') || node.labels.includes('Filing')) {
                return '#a3a3a3'; // Gray for documents
            }
        }

        return '#6b7280'; // Gray for unknown types
    };

    const getNodeSize = (node: any) => {
        if (loadingNodes.has(node.id)) {
            return 8;
        }

        if (node.labels) {
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return 12; // Large for cases
            }

            if (node.labels.includes('Court') || node.labels.includes('Tribunal')) {
                return 10; // Large for courts
            }

            if (
                node.labels.includes('Act') ||
                node.labels.includes('Law') ||
                node.labels.includes('Statute') ||
                node.labels.includes('Legislation')
            ) {
                return 8; // Medium for legislation
            }

            if (node.labels.includes('Judge') || node.labels.includes('Justice')) {
                return 7; // Medium for judges
            }

            if (
                node.labels.includes('Party') ||
                node.labels.includes('Plaintiff') ||
                node.labels.includes('Defendant') ||
                node.labels.includes('Appellant') ||
                node.labels.includes('Respondent')
            ) {
                return 5; // Small for parties
            }

            // Маленькие узлы - параграфы
            if (node.labels.includes('Paragraph')) {
                return 6; // Small for paragraphs
            }

            if (
                node.labels.includes('Regulation') ||
                node.labels.includes('Order') ||
                node.labels.includes('Decree') ||
                node.labels.includes('Resolution')
            ) {
                return 7; // Medium for regulations
            }

            if (
                node.labels.includes('Article') ||
                node.labels.includes('Section') ||
                node.labels.includes('Citation') ||
                node.labels.includes('Reference')
            ) {
                return 5; // Small for articles/citations
            }
        }

        return 6;
    };

    const handleNodeHover = (node: any) => {
        if (node && loadingNodes.has(node.id)) {
            document.body.style.cursor = 'wait';
        } else if (node) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    };

    const handleBackgroundClick = () => {
        document.body.style.cursor = 'default';
        setHighlightedNodeId(null);
    };

    const getLinkColor = () => {
        return resolvedTheme === 'dark' ? '#374151' : '#9ca3af';
    };

    const getNodeLabel = (node: any) => {
        let baseLabel = '';

        if (node.labels && node.labels.includes('CaseLaw')) {
            baseLabel = `${node.content}\n${node.neutralCitation || ''}`;
        } else if (node.labels && node.labels.includes('Act')) {
            baseLabel = node.content;
        } else if (node.labels && node.labels.includes('Paragraph')) {
            baseLabel = `¶${node.number}: ${node.content.substring(0, 100)}...`;
        } else {
            baseLabel = node.content || node.id;
        }

        if (node.layerName) {
            baseLabel += `\n[${node.layerName}]`;
        }

        if (expandedNodes.has(node.id)) {
            baseLabel += '\n[Expanded]';
        }

        if (loadingNodes.has(node.id)) {
            baseLabel += '\n[Loading...]';
        }

        return baseLabel;
    };

    return (
        <ForceGraph3D
            ref={graphRef}
            width={width || dimensions.width}
            height={height || dimensions.height}
            graphData={processedData}
            backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
            nodeColor={getNodeColor}
            nodeVal={getNodeSize}
            linkColor={getLinkColor}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={() => 0.005}
            nodeLabel={getNodeLabel}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onBackgroundClick={handleBackgroundClick}
        />
    );
};

export default ChatGraph3D;
