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
    isOrbitEnabled?: boolean;
}

const ChatGraph3D = ({
    height,
    width,
    data,
    layers,
    handleCardData,
    handleScrollToCardId,
    isOrbitEnabled: externalIsOrbitEnabled,
}: ChatGraph3DProps) => {
    const { resolvedTheme } = useTheme();

    const graphRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [layerDataMap, setLayerDataMap] = useState<Record<string, { nodes: any[]; links: any[] }>>({});
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [nodeHierarchy, setNodeHierarchy] = useState<Record<string, Set<string>>>({});
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
    const [lastClickedNode, setLastClickedNode] = useState<string | null>(null);
    const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
    const orbitIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const orbitAngleRef = useRef<number>(0);

    const isOrbitEnabled = externalIsOrbitEnabled ?? false;

    useEffect(() => {
        console.log(data);
        const updateDimensions = () => {
            const effectiveWidth = width || window.innerWidth * 0.9 - 24;
            const effectiveHeight = height || window.innerHeight * 0.9 - 24;
            
            setDimensions({
                width: effectiveWidth,
                height: effectiveHeight,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [data, width, height]);



    useEffect(() => {
        const unsubscribe = subscribeToZoomToFitGraph(() => graphRef.current?.zoomToFit(400));
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (orbitIntervalRef.current) {
            clearInterval(orbitIntervalRef.current);
            orbitIntervalRef.current = null;
        }

        if (!isOrbitEnabled) {
            return;
        }

        const waitForGraph = () => {
            if (!graphRef.current) {
                setTimeout(waitForGraph, 100);
                return;
            }

            const distance = 1400;

            orbitIntervalRef.current = setInterval(() => {
                if (graphRef.current) {
                    graphRef.current.cameraPosition({
                        x: distance * Math.sin(orbitAngleRef.current),
                        z: distance * Math.cos(orbitAngleRef.current),
                    });
                    orbitAngleRef.current += Math.PI / 300;
                }
            }, 10);
        };

        waitForGraph();

        return () => {
            if (orbitIntervalRef.current) {
                clearInterval(orbitIntervalRef.current);
                orbitIntervalRef.current = null;
            }
        };
    }, [isOrbitEnabled]);

    useEffect(() => {
        return () => {
            if (orbitIntervalRef.current) {
                clearInterval(orbitIntervalRef.current);
                orbitIntervalRef.current = null;
            }
        };
    }, []);

    const getAllDescendants = (nodeId: string): Set<string> => {
        const descendants = new Set<string>();
        const visited = new Set<string>();
        const queue = [nodeId];

        while (queue.length > 0) {
            const currentNodeId = queue.shift()!;

            if (visited.has(currentNodeId)) {
                continue;
            }

            visited.add(currentNodeId);
            const children = nodeHierarchy[currentNodeId];

            if (children && children.size > 0) {
                children.forEach((childId) => {
                    if (!visited.has(childId) && !descendants.has(childId)) {
                        descendants.add(childId);
                        queue.push(childId);
                    }
                });
            }
        }

        return descendants;
    };

    const removeNodeDescendants = (nodeId: string) => {
        console.log('Removing descendants for:', nodeId);

        try {
            const descendantsToRemove = getAllDescendants(nodeId);
            console.log('Descendants to remove:', descendantsToRemove.size, Array.from(descendantsToRemove));

            setExpandedNodes((prev) => {
                const newSet = new Set(prev);
                newSet.delete(nodeId);
                descendantsToRemove.forEach((id) => newSet.delete(id));
                return newSet;
            });

            setExpandedData((prev) => {
                return {
                    nodes: prev.nodes.filter((node) => !descendantsToRemove.has(node.id)),
                    links: prev.links.filter((link) => {
                        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                        return !descendantsToRemove.has(sourceId) && !descendantsToRemove.has(targetId);
                    }),
                };
            });

            setNodeHierarchy((prev) => {
                const newHierarchy = { ...prev };

                descendantsToRemove.forEach((id) => {
                    delete newHierarchy[id];
                });

                delete newHierarchy[nodeId];

                Object.keys(newHierarchy).forEach((parentId) => {
                    if (newHierarchy[parentId]) {
                        descendantsToRemove.forEach((descendantId) => {
                            newHierarchy[parentId].delete(descendantId);
                        });
                    }
                });

                return newHierarchy;
            });

            console.log('Successfully removed descendants');
        } catch (error) {
            console.error('Error removing descendants:', error);
        }
    };

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

    const applyForces = () => {
        const fg = graphRef.current;
        if (!fg || !fg.d3Force) return;

        fg.d3Force('charge')?.strength(-8);
        fg.d3Force('link')?.distance(90);
        fg.d3Force('center')?.strength(0.08);

        fg.d3Force('collide')?.radius(15).strength(0.4);
    };

    useEffect(() => {
        if (!processedData) return;
        handleCardData(processedData);
        applyForces();
    }, [processedData, handleCardData]);

    useEffect(() => {
        let animationFrame: number;

        const waitForGraph = () => {
            const fg = graphRef.current;
            if (fg && fg.d3Force) {
                applyForces();
            } else {
                animationFrame = requestAnimationFrame(waitForGraph);
            }
        };

        animationFrame = requestAnimationFrame(waitForGraph);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

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
                console.log('Collapsing node:', node.id);
                removeNodeDescendants(node.id);
            } else {
                console.log('Expanding node:', node.id);
                setLoadingNodes((prev) => new Set([...prev, node.id]));

                const response = await getConversationExpandNodes(node.id);
                console.log('Expand response:', response);

                if (
                    response &&
                    response.neighbors &&
                    Array.isArray(response.neighbors) &&
                    response.neighbors.length > 0
                ) {
                    const newNodes = response.neighbors;
                    const newLinks = response.links || [];

                    console.log('Adding nodes:', newNodes.length, 'Adding links:', newLinks.length);

                    const existingNodeIds = new Set([
                        ...processedData.nodes.map((n) => n.id),
                        ...expandedData.nodes.map((n) => n.id),
                    ]);

                    const filteredNewNodes = newNodes.filter((n: any) => !existingNodeIds.has(n.id));

                    if (filteredNewNodes.length > 0) {
                        const parentNode = processedData.nodes.find((n) => n.id === node.id);
                        const positionedNodes = filteredNewNodes.map((newNode: any, index: number) => {
                            if (
                                parentNode &&
                                parentNode.x !== undefined &&
                                parentNode.y !== undefined &&
                                parentNode.z !== undefined
                            ) {
                                const angle = (index / filteredNewNodes.length) * 2 * Math.PI;
                                const radius = 50;

                                return {
                                    ...newNode,
                                    x: parentNode.x + radius * Math.cos(angle),
                                    y: parentNode.y + radius * Math.sin(angle),
                                    z: parentNode.z + (Math.random() - 0.5) * 20,
                                    fx: parentNode.x + radius * Math.cos(angle),
                                    fy: parentNode.y + radius * Math.sin(angle),
                                    fz: parentNode.z + (Math.random() - 0.5) * 20,
                                };
                            }
                            return newNode;
                        });

                        setExpandedData((prev) => ({
                            nodes: [...prev.nodes, ...positionedNodes],
                            links: [...prev.links, ...newLinks],
                        }));

                        setExpandedNodes((prev) => new Set([...prev, node.id]));

                        setNodeHierarchy((prev) => ({
                            ...prev,
                            [node.id]: new Set(filteredNewNodes.map((n: any) => n.id)),
                        }));

                        setTimeout(() => {
                            graphRef.current?.zoomToFit(800);
                        }, 500);

                        setTimeout(() => {
                            setExpandedData((prev) => ({
                                nodes: prev.nodes.map((n) => {
                                    if (positionedNodes.some((pn: any) => pn.id === n.id)) {
                                        const newNode = { ...n };
                                        delete newNode.fx;
                                        delete newNode.fy;
                                        delete newNode.fz;
                                        return newNode;
                                    }
                                    return n;
                                }),
                                links: prev.links,
                            }));
                        }, 1000);

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
            console.error('Error expanding/collapsing node:', error);
        } finally {
            setLoadingNodes((prev) => {
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

    const handleNodeDragEnd = (node: any) => {
        if (node && node.x !== undefined && node.y !== undefined && node.z !== undefined) {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
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
            onNodeDragEnd={handleNodeDragEnd}
            onBackgroundClick={handleBackgroundClick}
            cooldownTicks={100}
            cooldownTime={15000}
            enableNodeDrag={true}
            enableNavigationControls={true}
        />
    );
};

export default ChatGraph3D;
