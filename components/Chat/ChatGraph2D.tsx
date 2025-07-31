'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { getConversationExpandNodes } from '@/api/chat/getConversationExpandNodes';
import { subscribeToZoomToFitGraph } from '@/events/zoom-to-fit';
import { subscribeToZoomToNodeGraph } from '@/events/zoom-to-node';
import { useTheme } from 'next-themes';
import { GraphData, GraphLayer, GraphNodePosition } from '@/types/Graph';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface ChatGraph2DProps {
    height?: number;
    width?: number;
    layers: GraphLayer[];
    data: GraphData;
    handleCardData: Dispatch<SetStateAction<any>>;
    handleScrollToCardId: Dispatch<SetStateAction<string>>;

    expandedNodes: Set<string>;
    setExpandedNodes: Dispatch<SetStateAction<Set<string>>>;
    nodeHierarchy: Record<string, Set<string>>;
    setNodeHierarchy: Dispatch<SetStateAction<Record<string, Set<string>>>>;
    expandedData: { nodes: any[]; links: any[] };
    setExpandedData: Dispatch<SetStateAction<{ nodes: any[]; links: any[] }>>;
    loadingNodes: Set<string>;
    setLoadingNodes: Dispatch<SetStateAction<Set<string>>>;
}

const ChatGraph2D = ({
    height,
    width,
    data,
    layers,
    handleCardData,
    handleScrollToCardId,
    expandedNodes,
    setExpandedNodes,
    nodeHierarchy,
    setNodeHierarchy,
    expandedData,
    setExpandedData,
    loadingNodes,
    setLoadingNodes,
}: ChatGraph2DProps) => {
    const { resolvedTheme } = useTheme();

    const graphRef = useRef<any>(null);
    const nodePositionsRef = useRef<Record<string, GraphNodePosition>>({});

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [layerDataMap, setLayerDataMap] = useState<Record<string, { nodes: any[]; links: any[] }>>({});
    const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
    const [highlightedLinkId, setHighlightedLinkId] = useState<string | null>(null);

    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
    const [lastClickedNode, setLastClickedNode] = useState<string | null>(null);

    const [selectedNodes, setSelectedNodes] = useState<Set<any>>(new Set());
    const [selectedLinks, setSelectedLinks] = useState<Set<any>>(new Set());
    const [dragStartPositions, setDragStartPositions] = useState<Record<string, { x: number; y: number }>>({});
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
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
    }, [width, height]);

    const saveNodePosition = (node: any) => {
        if (node && node.x !== undefined && node.y !== undefined) {
            node.fx = node.x;
            node.fy = node.y;

            nodePositionsRef.current[node.id] = {
                x: node.x,
                y: node.y,
                vx: node.vx,
                vy: node.vy,
                fx: node.fx,
                fy: node.fy,
            };
        }
    };

    const handleNodeDrag = (node: any, translate: any) => {
        if (selectedNodes.has(node)) {
            if (!isDragging) {
                const positions: Record<string, { x: number; y: number }> = {};
                [...selectedNodes].forEach((selNode) => {
                    positions[selNode.id] = { x: selNode.x, y: selNode.y };
                });
                setDragStartPositions(positions);
                setIsDragging(true);
            }

            [...selectedNodes].forEach((selNode) => {
                const startPos = dragStartPositions[selNode.id];
                if (startPos) {
                    selNode.fx = startPos.x + translate.x;
                    selNode.fy = startPos.y + translate.y;
                }
            });
        }
    };

    const handleNodeDragEnd = (node: any) => {
        if (selectedNodes.has(node)) {
            [...selectedNodes].forEach((selNode) => {
                saveNodePosition(selNode);
            });
            setDragStartPositions({});
            setIsDragging(false);
        } else {
            saveNodePosition(node);
            setIsDragging(false);
        }
    };

    const handleEngineStop = () => {
        processedData.nodes.forEach((node) => {
            saveNodePosition(node);
        });
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

                let nodeData = {
                    ...node,
                    color: node.layerColor || layer.color,
                    layerId: layer.id,
                    layerName: layer.name,
                };

                if (existingNode) {
                    nodeData = {
                        ...existingNode,
                        ...nodeData,
                    };
                }

                const savedPosition = nodePositionsRef.current[node.id];
                if (savedPosition) {
                    nodeData = {
                        ...nodeData,
                        x: savedPosition.x,
                        y: savedPosition.y,
                        vx: savedPosition.vx,
                        vy: savedPosition.vy,
                        fx: savedPosition.fx,
                        fy: savedPosition.fy,
                    };
                }

                allNodes.set(node.id, nodeData);
            });

            if (layerData.links) {
                layerData.links.forEach((link: any) => {
                    const linkKey = `${link.source}-${link.target}`;
                    if (!allLinks.has(linkKey)) {
                        allLinks.set(linkKey, {
                            ...link,
                            id: linkKey,
                            source: typeof link.source === 'object' ? link.source.id : link.source,
                            target: typeof link.target === 'object' ? link.target.id : link.target,
                        });
                    }
                });
            }
        });

        expandedData.nodes.forEach((node: any) => {
            const existingNode = allNodes.get(node.id);

            let nodeData = {
                ...node,
                color: node.layerColor || '#d3d3d3',
                layerId: 'expanded',
                layerName: 'Expanded',
            };

            if (existingNode) {
                nodeData = {
                    ...existingNode,
                    ...nodeData,
                };
            }

            const savedPosition = nodePositionsRef.current[node.id];
            if (savedPosition) {
                nodeData = {
                    ...nodeData,
                    x: savedPosition.x,
                    y: savedPosition.y,
                    vx: savedPosition.vx,
                    vy: savedPosition.vy,
                    fx: savedPosition.fx,
                    fy: savedPosition.fy,
                };
            }

            allNodes.set(node.id, nodeData);
        });

        expandedData.links.forEach((link: any) => {
            const linkKey = `${link.source}-${link.target}`;
            if (!allLinks.has(linkKey)) {
                allLinks.set(linkKey, {
                    ...link,
                    id: linkKey,
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
        const unsubscribeZoomToFit = subscribeToZoomToFitGraph(() => {
            graphRef.current?.zoomToFit(300);
            setHighlightedNodeId(null);
            setHighlightedLinkId(null);
        });

        const unsubscribeZoomToNode = subscribeToZoomToNodeGraph((payload) => {
            if (!graphRef.current) return;

            if (!payload.x || !payload.y) {
                const targetNode = processedData.nodes.find((node) => node.id === payload.id);
                if (!targetNode) return;

                payload.x = targetNode.x;
                payload.y = targetNode.y;
            }

            graphRef.current.centerAt(payload.x, payload.y, payload.duration || 1000);
            graphRef.current.zoom(payload.zoomLevel || 1, payload.duration || 1000);

            if (payload.id) {
                setHighlightedNodeId(payload.id);

                setTimeout(() => {
                    setHighlightedNodeId(null);
                }, 3000);
            }
        });

        return () => {
            unsubscribeZoomToFit();
            unsubscribeZoomToNode();
        };
    }, [processedData]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (clickTimer) {
                clearTimeout(clickTimer);
            }
        };
    }, [clickTimer]);

    useEffect(() => {
        if (processedData) {
            handleCardData(processedData);
        }
    }, [processedData, handleCardData]);

    useEffect(() => {
        if (graphRef.current && processedData.nodes.length > 0) {
            const fg = graphRef.current;

            const linkForce = fg.d3Force('link');

            if (linkForce) {
                linkForce.distance(100).strength(0);
            }

            const chargeForce = fg.d3Force('charge');
            if (chargeForce) {
                chargeForce.strength(-200).distanceMax(200);
            }

            fg.d3ReheatSimulation();

            setTimeout(() => {
                fg.zoomToFit(300);
            }, 500);
        }
    }, [processedData]);

    const handleNodeClick = (node: any, event: any) => {
        if (!node || !node.id) return;

        setSelectedLinks(new Set());

        // Check if this is a double click
        if (lastClickedNode === node.id && clickTimer) {
            // Double click detected - expand/collapse node
            clearTimeout(clickTimer);
            setClickTimer(null);
            setLastClickedNode(null);
            handleNodeDoubleClick(node);
            return;
        }

        if (event.shiftKey) {
            const newSelectedNodes = new Set(selectedNodes);
            if (newSelectedNodes.has(node)) {
                newSelectedNodes.delete(node);
            } else {
                newSelectedNodes.add(node);
            }
            setSelectedNodes(newSelectedNodes);
            return;
        }

        setSelectedNodes(new Set([node]));

        // Single click - select node
        console.log('Node selected:', node.id);
        handleScrollToCardId(node.id);

        // Clear any existing timer
        if (clickTimer) {
            clearTimeout(clickTimer);
        }

        // Set timer for potential double click
        const timer = setTimeout(() => {
            // Single click confirmed - select node
            if (node.x !== undefined && node.y !== undefined) {
                graphRef.current?.centerAt(node.x, node.y, 1000);
                graphRef.current?.zoom(1.5, 1000);
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

    const handleLinkClick = (link: any, event: any) => {
        if (!link) return;

        setSelectedNodes(new Set());
        setHighlightedNodeId(null);

        if (event.shiftKey) {
            const newSelectedLinks = new Set(selectedLinks);
            if (newSelectedLinks.has(link)) {
                newSelectedLinks.delete(link);
            } else {
                newSelectedLinks.add(link);
            }
            setSelectedLinks(newSelectedLinks);
        } else {
            setSelectedLinks(new Set([link]));
        }

        console.log('Link selected:', link.id, link);
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
                        setExpandedData((prev) => ({
                            nodes: [...prev.nodes, ...filteredNewNodes],
                            links: [...prev.links, ...newLinks],
                        }));

                        setExpandedNodes((prev) => new Set([...prev, node.id]));

                        setNodeHierarchy((prev) => ({
                            ...prev,
                            [node.id]: new Set(filteredNewNodes.map((n: any) => n.id)),
                        }));

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
        if (selectedNodes.has(node)) {
            return { r: 251, g: 191, b: 36 }; // #fbbf24
        }

        if (loadingNodes.has(node.id)) {
            return { r: 245, g: 158, b: 11 }; // #f59e0b
        }

        if (node.color && (!node.labels || node.labels.length === 0)) {
            const hex = node.color.replace('#', '');
            const bigint = parseInt(hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255,
            };
        }

        if (node.labels) {
            // Updated color mapping based on the provided table
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return { r: 217, g: 200, b: 174 }; // #D9C8AE
            }

            if (node.labels.includes('Paragraph')) {
                return { r: 141, g: 204, b: 147 }; // #8DCC93
            }

            if (node.labels.includes('Court') || node.labels.includes('Tribunal')) {
                return { r: 218, g: 113, b: 148 }; // #DA7194
            }

            if (node.labels.includes('Judge') || node.labels.includes('Justice')) {
                return { r: 201, g: 144, b: 192 }; // #C990C0
            }

            if (
                node.labels.includes('Party') ||
                node.labels.includes('Plaintiff') ||
                node.labels.includes('Defendant') ||
                node.labels.includes('Appellant') ||
                node.labels.includes('Respondent')
            ) {
                return { r: 236, g: 181, b: 201 }; // #ECB5C9
            }

            if (
                node.labels.includes('Act') ||
                node.labels.includes('Law') ||
                node.labels.includes('Statute') ||
                node.labels.includes('Legislation')
            ) {
                return { r: 247, g: 151, b: 103 }; // #F79767
            }

            if (
                node.labels.includes('Regulation') ||
                node.labels.includes('Order') ||
                node.labels.includes('Decree') ||
                node.labels.includes('Resolution') ||
                node.labels.includes('SubsidiaryLegislation')
            ) {
                return { r: 236, g: 181, b: 201 }; // #ECB5C9
            }

            if (node.labels.includes('Article') || node.labels.includes('Section')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            if (node.labels.includes('Citation') || node.labels.includes('Reference')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            if (node.labels.includes('Document') || node.labels.includes('Filing')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            // New labels from the table
            if (node.labels.includes('Resource')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            if (node.labels.includes('Work')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            if (node.labels.includes('Organization')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            if (node.labels.includes('Person')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            if (node.labels.includes('Embeddable')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }

            if (node.labels.includes('MasterExpression')) {
                return { r: 241, g: 102, b: 103 }; // #F16667
            }

            if (node.labels.includes('SubTopic')) {
                return { r: 87, g: 199, b: 227 }; // #57C7E3
            }

            if (node.labels.includes('Expression')) {
                return { r: 241, g: 102, b: 103 }; // #F16667
            }

            if (node.labels.includes('Topic')) {
                return { r: 76, g: 142, b: 218 }; // #4C8EDA
            }

            if (node.labels.includes('PartOfTheLegislation')) {
                return { r: 255, g: 196, b: 84 }; // #FFC454
            }

            if (node.labels.includes('SLOpening')) {
                return { r: 165, g: 171, b: 182 }; // #A5ABB6
            }
        }

        return { r: 165, g: 171, b: 182 }; // Default #A5ABB6
    };

    const getNodeSize = (node: any) => {
        if (loadingNodes.has(node.id)) {
            return 8;
        }

        if (node.labels) {
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return 40; // 80px diameter / 2
            }

            if (node.labels.includes('Paragraph')) {
                return 10; // 20px diameter / 2
            }

            if (node.labels.includes('Act')) {
                return 40; // 80px diameter / 2
            }

            if (node.labels.includes('PartOfTheLegislation')) {
                return 10; // 20px diameter / 2
            }

            if (
                node.labels.includes('Court') ||
                node.labels.includes('Tribunal') ||
                node.labels.includes('Judge') ||
                node.labels.includes('Justice') ||
                node.labels.includes('Party') ||
                node.labels.includes('Plaintiff') ||
                node.labels.includes('Defendant') ||
                node.labels.includes('Appellant') ||
                node.labels.includes('Respondent') ||
                node.labels.includes('Legislation') ||
                node.labels.includes('Regulation') ||
                node.labels.includes('Order') ||
                node.labels.includes('Decree') ||
                node.labels.includes('Resolution') ||
                node.labels.includes('Article') ||
                node.labels.includes('Section') ||
                node.labels.includes('Citation') ||
                node.labels.includes('Reference') ||
                node.labels.includes('Document') ||
                node.labels.includes('Filing') ||
                node.labels.includes('Resource') ||
                node.labels.includes('Work') ||
                node.labels.includes('Organization') ||
                node.labels.includes('Person') ||
                node.labels.includes('Embeddable') ||
                node.labels.includes('MasterExpression') ||
                node.labels.includes('SubTopic') ||
                node.labels.includes('Expression') ||
                node.labels.includes('Topic') ||
                node.labels.includes('SubsidiaryLegislation') ||
                node.labels.includes('SLOpening')
            ) {
                return 25; // 50px diameter / 2
            }
        }

        return 25; // Default 50px diameter / 2
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

    const handleLinkHover = (link: any) => {
        if (link) {
            document.body.style.cursor = 'pointer';
            setHighlightedLinkId(link.id);
        } else {
            document.body.style.cursor = 'default';
            setHighlightedLinkId(null);
        }
    };

    const handleBackgroundClick = () => {
        document.body.style.cursor = 'default';
        setHighlightedNodeId(null);
        setHighlightedLinkId(null);
        setSelectedNodes(new Set());
        setSelectedLinks(new Set());
    };

    const getLinkColor = (link: any) => {
        if (selectedLinks.has(link)) {
            return '#fbbf24';
        }

        if (highlightedLinkId === link.id) {
            return '#00ffff';
        }

        return resolvedTheme === 'dark' ? '#6b7280' : '#9ca3af';
    };

    const getLinkWidth = (link: any) => {
        if (selectedLinks.has(link)) {
            return 3; 
        }

        if (highlightedLinkId === link.id) {
            return 2.5; 
        }

        return 1.5; 
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

    const getLinkLabel = (link: any) => {
        let label = '';

        if (link.relation) {
            label += `Relation: ${link.relation}`;
        }

        if (link.relationType) {
            label += label ? `\nType: ${link.relationType}` : `Type: ${link.relationType}`;
        }

        if (link.weight !== undefined) {
            label += label ? `\nWeight: ${link.weight}` : `Weight: ${link.weight}`;
        }

        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        if (label) {
            label += `\nFrom: ${sourceId}\nTo: ${targetId}`;
        } else {
            label = `From: ${sourceId}\nTo: ${targetId}`;
        }

        return label;
    };

    const nodeCanvasObject = (node: any, ctx: any) => {
        const nodeSize = getNodeSize(node);
        const rgb = getNodeColor(node);

        if (highlightedNodeId === node.id) {
            ctx.save();

            const glowRadius = nodeSize * 3.5;
            const gradient = ctx.createRadialGradient(node.x, node.y, nodeSize, node.x, node.y, glowRadius);

            gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
            gradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
            gradient.addColorStop(0.6, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
            gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

            ctx.beginPath();
            ctx.arc(node.x, node.y, glowRadius, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        ctx.fill();

        if (highlightedNodeId === node.id) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
            ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
            ctx.fill();
        }
    };

    return (
        <ForceGraph2D
            ref={graphRef}
            width={width || dimensions.width}
            height={height || dimensions.height}
            graphData={processedData}
            backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
            nodeCanvasObject={nodeCanvasObject}
            nodeCanvasObjectMode={() => 'replace'}
            // nodeVal={(node) => {
            //     const nodeSize = getNodeSize(node);
            //     return nodeSize * nodeSize;
            // }}
            linkColor={getLinkColor}
            linkWidth={getLinkWidth}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={() => 0.005}
            nodeLabel={getNodeLabel}
            linkLabel={getLinkLabel}
            onNodeClick={handleNodeClick}
            onLinkClick={handleLinkClick}
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}
            onNodeDrag={handleNodeDrag}
            onNodeDragEnd={handleNodeDragEnd}
            onEngineStop={handleEngineStop}
            onBackgroundClick={handleBackgroundClick}
            cooldownTicks={100}
            cooldownTime={15000}
        />
    );
};

export default ChatGraph2D;
