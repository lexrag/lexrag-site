'use client';

import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { getConversationExpandNodes } from '@/api/chat/getConversationExpandNodes';
import { subscribeToZoomToFitGraph } from '@/events/zoom-to-fit';
import { subscribeToZoomToNodeGraph } from '@/events/zoom-to-node';
import { useTheme } from 'next-themes';
import { GraphData, GraphLayer, GraphLinkFilter, GraphNodeFilter } from '@/types/Graph';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

let CSS2DRenderer: any = null;
let CSS2DObject: any = null;

if (typeof window !== 'undefined') {
    // @ts-expect-error - Dynamic import for CSS2DRenderer from Three.js
    import('three/examples/jsm/renderers/CSS2DRenderer.js').then(module => {
        CSS2DRenderer = module.CSS2DRenderer;
        CSS2DObject = module.CSS2DObject;
    });
}

interface ChatGraph3DProps {
    height?: number;
    width?: number;
    layers: GraphLayer[];
    data: GraphData;
    handleCardData: Dispatch<SetStateAction<any>>;
    handleScrollToCardId?: Dispatch<SetStateAction<string>>;
    isOrbitEnabled?: boolean;
    setIsOrbitEnabled?: Dispatch<SetStateAction<boolean>>;

    expandedNodes: Set<string>;
    setExpandedNodes: Dispatch<SetStateAction<Set<string>>>;
    nodeHierarchy: Record<string, Set<string>>;
    setNodeHierarchy: Dispatch<SetStateAction<Record<string, Set<string>>>>;
    expandedData: { nodes: any[]; links: any[] };
    setExpandedData: Dispatch<SetStateAction<{ nodes: any[]; links: any[] }>>;
    loadingNodes: Set<string>;
    setLoadingNodes: Dispatch<SetStateAction<Set<string>>>;

    linkFilters: GraphLinkFilter[];
    setLinkFilters: Dispatch<SetStateAction<GraphLinkFilter[]>>;
    nodeFilters: GraphNodeFilter[];
    setNodeFilters: Dispatch<SetStateAction<GraphNodeFilter[]>>;
    showNodeLabels?: boolean;
}

const ChatGraph3D = ({
    height,
    width,
    data,
    layers,
    handleCardData,
    handleScrollToCardId,
    isOrbitEnabled: externalIsOrbitEnabled,
    setIsOrbitEnabled,
    expandedNodes,
    setExpandedNodes,
    nodeHierarchy,
    setNodeHierarchy,
    expandedData,
    setExpandedData,
    loadingNodes,
    setLoadingNodes,
    linkFilters,
    setLinkFilters,
    nodeFilters,
    setNodeFilters,
    showNodeLabels = true,
}: ChatGraph3DProps) => {
    const { resolvedTheme } = useTheme();

    const graphRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [layerDataMap, setLayerDataMap] = useState<Record<string, { nodes: any[]; links: any[] }>>({});
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
    const [lastClickedNode, setLastClickedNode] = useState<string | null>(null);
    const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
    const [highlightedLinkId, setHighlightedLinkId] = useState<string | null>(null);
    const highlightedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const orbitIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const bloomPassRef = useRef<any>(null);

    const [selectedNodes, setSelectedNodes] = useState<Set<any>>(new Set());
    const [selectedLinks, setSelectedLinks] = useState<Set<any>>(new Set());
    const [draggedNode, setDraggedNode] = useState<any>(null);
    const [dragStartPositions, setDragStartPositions] = useState<Map<any, { x: number; y: number; z: number }>>(
        new Map(),
    );
    const [canvasClickCount, setCanvasClickCount] = useState<number>(0);

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
        let frameId: number;

        if (!isOrbitEnabled) return;

        const rotateGraph = () => {
            const scene = graphRef.current?.scene();
            if (!scene) {
                frameId = requestAnimationFrame(rotateGraph);
                return;
            }

            const graphObj = scene.children[3];

            if (graphObj) {
                graphObj.rotation.y -= 0.009;
            }

            frameId = requestAnimationFrame(rotateGraph);
        };

        rotateGraph();

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [isOrbitEnabled]);

    useEffect(() => {
        if (isOrbitEnabled) {
            setCanvasClickCount(0);
        }
    }, [isOrbitEnabled]);
    useEffect(() => {
        if (bloomPassRef.current) {
            if (highlightedNodeId) {
                bloomPassRef.current.strength = 3.0;
                bloomPassRef.current.radius = 1.2;
                bloomPassRef.current.threshold = 0;
            } else {
                bloomPassRef.current.strength = 1.5;
                bloomPassRef.current.radius = 1;
                bloomPassRef.current.threshold = 0.1;
            }
        }
    }, [highlightedNodeId]);

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

    const getAllLinkTypes = useCallback((layerDataMap: any, expandedData: any): GraphLinkFilter[] => {
        const linkTypesMap = new Map<string, { count: number; examples: any[] }>();

        Object.values(layerDataMap).forEach((layerData: any) => {
            if (layerData.links) {
                layerData.links.forEach((link: any) => {
                    const linkType = getLinkType(link);
                    if (!linkTypesMap.has(linkType)) {
                        linkTypesMap.set(linkType, { count: 0, examples: [] });
                    }
                    const existing = linkTypesMap.get(linkType)!;
                    existing.count++;
                    if (existing.examples.length < 3) {
                        existing.examples.push(link);
                    }
                });
            }
        });

        expandedData.links.forEach((link: any) => {
            const linkType = getLinkType(link);
            if (!linkTypesMap.has(linkType)) {
                linkTypesMap.set(linkType, { count: 0, examples: [] });
            }
            const existing = linkTypesMap.get(linkType)!;
            existing.count++;
            if (existing.examples.length < 3) {
                existing.examples.push(link);
            }
        });

        const linkTypes: GraphLinkFilter[] = Array.from(linkTypesMap.entries()).map(([type, data], index) => ({
            id: type,
            label: getLinkTypeLabel(type),
            enabled: true,
            color: getLinkTypeColor(type, index),
            count: data.count,
        }));

        return linkTypes.sort((a, b) => b.count - a.count);
    }, []);

    const getLinkType = (link: any): string => {
        if (link.relationType) {
            return link.relationType;
        }
        if (link.relation) {
            return link.relation;
        }
        if (link.type) {
            return link.type;
        }
        return 'default';
    };

    const getLinkTypeLabel = (type: string): string => {
        const labelMap: Record<string, string> = {
            CITES: 'Citations',
            REFERENCED_BY: 'References',
            PART_OF: 'Part of',
            CONTAINS: 'Contains',
            RELATES_TO: 'Related to',
            FOLLOWS: 'Follows',
            PRECEDES: 'Precedes',
            SIMILAR_TO: 'Similar to',
            CONTRADICTS: 'Contradicts',
            SUPPORTS: 'Supports',
            default: 'Other',
        };
        return labelMap[type] || type;
    };

    const getLinkTypeColor = (type: string, index: number): string => {
        const colors = [
            '#3b82f6', // blue
            '#ef4444', // red
            '#10b981', // green
            '#f59e0b', // amber
            '#8b5cf6', // violet
            '#ec4899', // pink
            '#06b6d4', // cyan
            '#84cc16', // lime
            '#f97316', // orange
            '#6366f1', // indigo
        ];

        const colorMap: Record<string, string> = {
            CITES: '#3b82f6',
            REFERENCED_BY: '#ef4444',
            PART_OF: '#10b981',
            CONTAINS: '#f59e0b',
            RELATES_TO: '#8b5cf6',
            FOLLOWS: '#ec4899',
            PRECEDES: '#06b6d4',
            SIMILAR_TO: '#84cc16',
            CONTRADICTS: '#f97316',
            SUPPORTS: '#6366f1',
        };

        return colorMap[type] || colors[index % colors.length];
    };

    const isLinkVisible = useCallback((link: any): boolean => {
        const linkType = getLinkType(link);
        const filter = linkFilters.find((f) => f.id === linkType);
        return filter ? filter.enabled : true;
    }, [linkFilters]);

    const getAllNodeTypes = useCallback((layerDataMap: any, expandedData: any): GraphNodeFilter[] => {
        const nodeTypesMap = new Map<string, { count: number; examples: any[] }>();

        Object.values(layerDataMap).forEach((layerData: any) => {
            if (layerData.nodes) {
                layerData.nodes.forEach((node: any) => {
                    const nodeType = getNodeType(node);
                    if (!nodeTypesMap.has(nodeType)) {
                        nodeTypesMap.set(nodeType, { count: 0, examples: [] });
                    }
                    const existing = nodeTypesMap.get(nodeType)!;
                    existing.count++;
                    if (existing.examples.length < 3) {
                        existing.examples.push(node);
                    }
                });
            }
        });

        expandedData.nodes.forEach((node: any) => {
            const nodeType = getNodeType(node);
            if (!nodeTypesMap.has(nodeType)) {
                nodeTypesMap.set(nodeType, { count: 0, examples: [] });
            }
            const existing = nodeTypesMap.get(nodeType)!;
            existing.count++;
            if (existing.examples.length < 3) {
                existing.examples.push(node);
            }
        });

        const nodeTypes: GraphNodeFilter[] = Array.from(nodeTypesMap.entries()).map(([type, data], index) => ({
            id: type,
            label: getNodeTypeLabel(type),
            enabled: true,
            color: getNodeTypeColor(type, index),
            count: data.count,
        }));

        return nodeTypes.sort((a, b) => b.count - a.count);
    }, []);

    const getNodeType = (node: any): string => {
        if (node.labels && node.labels.length > 0) {
            return node.labels[0];
        }
        return 'default';
    };

    const getNodeTypeLabel = (type: string): string => {
        const labelMap: Record<string, string> = {
            CaseLaw: 'Case Law',
            Case: 'Case',
            Paragraph: 'Paragraph',
            Court: 'Court',
            Tribunal: 'Tribunal',
            Judge: 'Judge',
            Justice: 'Justice',
            Party: 'Party',
            Plaintiff: 'Plaintiff',
            Defendant: 'Defendant',
            Appellant: 'Appellant',
            Respondent: 'Respondent',
            Act: 'Act',
            Law: 'Law',
            Statute: 'Statute',
            Legislation: 'Legislation',
            Regulation: 'Regulation',
            Order: 'Order',
            Decree: 'Decree',
            Resolution: 'Resolution',
            SubsidiaryLegislation: 'Subsidiary Legislation',
            Article: 'Article',
            Section: 'Section',
            Citation: 'Citation',
            Reference: 'Reference',
            Document: 'Document',
            Filing: 'Filing',
            Resource: 'Resource',
            Work: 'Work',
            Organization: 'Organization',
            Person: 'Person',
            Embeddable: 'Embeddable',
            MasterExpression: 'Master Expression',
            SubTopic: 'Sub Topic',
            Expression: 'Expression',
            Topic: 'Topic',
            PartOfTheLegislation: 'Part of Legislation',
            SLOpening: 'SL Opening',
            default: 'Other',
        };
        return labelMap[type] || type;
    };

    const getNodeTypeColor = (type: string, index: number): string => {
        const colors = [
            '#3b82f6', // blue
            '#ef4444', // red
            '#10b981', // green
            '#f59e0b', // amber
            '#8b5cf6', // violet
            '#ec4899', // pink
            '#06b6d4', // cyan
            '#84cc16', // lime
            '#f97316', // orange
            '#6366f1', // indigo
        ];

        const colorMap: Record<string, string> = {
            CaseLaw: '#D9C8AE',
            Case: '#D9C8AE',
            Paragraph: '#8DCC93',
            Court: '#DA7194',
            Tribunal: '#DA7194',
            Judge: '#C990C0',
            Justice: '#C990C0',
            Party: '#ECB5C9',
            Plaintiff: '#ECB5C9',
            Defendant: '#ECB5C9',
            Appellant: '#ECB5C9',
            Respondent: '#ECB5C9',
            Act: '#F79767',
            Law: '#F79767',
            Statute: '#F79767',
            Legislation: '#F79767',
            Regulation: '#ECB5C9',
            Order: '#ECB5C9',
            Decree: '#ECB5C9',
            Resolution: '#ECB5C9',
            SubsidiaryLegislation: '#ECB5C9',
            Article: '#A5ABB6',
            Section: '#A5ABB6',
            Citation: '#A5ABB6',
            Reference: '#A5ABB6',
            Document: '#A5ABB6',
            Filing: '#A5ABB6',
            Resource: '#A5ABB6',
            Work: '#A5ABB6',
            Organization: '#A5ABB6',
            Person: '#A5ABB6',
            Embeddable: '#A5ABB6',
            MasterExpression: '#F16667',
            SubTopic: '#57C7E3',
            Expression: '#F16667',
            Topic: '#4C8EDA',
            PartOfTheLegislation: '#FFC454',
            SLOpening: '#A5ABB6',
        };

        return colorMap[type] || colors[index % colors.length];
    };

    const isNodeVisible = useCallback((node: any): boolean => {
        const nodeType = getNodeType(node);
        const filter = nodeFilters.find((f) => f.id === nodeType);
        return filter ? filter.enabled : true;
    }, [nodeFilters]);

    useEffect(() => {
        const newLinkTypes = getAllLinkTypes(layerDataMap, expandedData);

        if (newLinkTypes.length > 0) {
            setLinkFilters((prevFilters) => {
                const existingFiltersMap = new Map(prevFilters.map((f) => [f.id, f]));

                return newLinkTypes.map((newType) => {
                    const existing = existingFiltersMap.get(newType.id);
                    return {
                        ...newType,
                        enabled: existing ? existing.enabled : true,
                    };
                });
            });
        }
    }, [layerDataMap, expandedData, setLinkFilters, getAllLinkTypes]);

    useEffect(() => {
        const newNodeTypes = getAllNodeTypes(layerDataMap, expandedData);

        if (newNodeTypes.length > 0) {
            setNodeFilters((prevFilters) => {
                const existingFiltersMap = new Map(prevFilters.map((f) => [f.id, f]));

                return newNodeTypes.map((newType) => {
                    const existing = existingFiltersMap.get(newType.id);
                    return {
                        ...newType,
                        enabled: existing ? existing.enabled : true,
                    };
                });
            });
        }
    }, [layerDataMap, expandedData, setNodeFilters, getAllNodeTypes]);

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
                if (!isNodeVisible(node)) return;

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
                    if (isLinkVisible(link)) {
                        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                        
                        // Check if both nodes (source and target) are visible
                        if (allNodes.has(sourceId) && allNodes.has(targetId)) {
                            const linkKey = `${sourceId}-${targetId}`;
                            if (!allLinks.has(linkKey)) {
                                allLinks.set(linkKey, {
                                    ...link,
                                    id: linkKey,
                                    source: sourceId,
                                    target: targetId,
                                });
                            }
                        }
                    }
                });
            }
        });

        // Add expanded data
        expandedData.nodes.forEach((node: any) => {
            if (!isNodeVisible(node)) return;

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
            if (isLinkVisible(link)) {
                const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                
                // Check if both nodes (source and target) are visible
                if (allNodes.has(sourceId) && allNodes.has(targetId)) {
                    const linkKey = `${sourceId}-${targetId}`;
                    if (!allLinks.has(linkKey)) {
                        allLinks.set(linkKey, {
                            ...link,
                            id: linkKey,
                            source: sourceId,
                            target: targetId,
                        });
                    }
                }
            }
        });

        return {
            nodes: Array.from(allNodes.values()),
            links: Array.from(allLinks.values()),
        };
    }, [layerDataMap, layers, expandedData, isLinkVisible, isNodeVisible]);

    const applyForces = useCallback(() => {
        const fg = graphRef.current;
        if (!fg || !fg.d3Force) return;

        const nodeCount = processedData?.nodes?.length || 0;
        
        // Dynamically adjust forces based on the number of nodes
        const chargeStrength = Math.max(-40, -25 - (nodeCount * 0.3));
        const linkDistance = Math.max(5, 7 + (nodeCount * 1.05));
        const collideRadius = (d: any) => {
            const nodeSize = getNodeSize(d);
            return nodeSize + Math.max(5, 10 - (nodeCount * 0.02));
        };

        fg.d3Force('charge')?.strength(chargeStrength);

        fg.d3Force('link')?.distance(linkDistance);

        fg.d3Force('center')?.strength(0.02);
        fg.d3Force('collide')?.radius(collideRadius).strength(0.7);
    }, [processedData]);

    // Function to calculate optimal zoom distance based on container size and node count
    const calculateOptimalZoomDistance = useCallback(() => {
        const nodeCount = processedData?.nodes?.length || 0;
        const containerWidth = dimensions.width;
        const containerHeight = dimensions.height;
        
        // Base distance calculation based on container size
        let baseDistance = Math.min(containerWidth, containerHeight) * 0.15;
        
        // Adjust based on node count
        if (nodeCount > 0) {
            // More nodes = closer zoom to fit them all
            const nodeCountFactor = Math.max(0.4, 1 - (nodeCount * 0.008));
            baseDistance *= nodeCountFactor;
        }
        
        // Calculate average node size to adjust zoom
        if (processedData?.nodes && processedData.nodes.length > 0) {
            const avgNodeSize = processedData.nodes.reduce((sum, node) => {
                return sum + getNodeSize(node);
            }, 0) / processedData.nodes.length;
            
            // Larger nodes need more space
            const nodeSizeFactor = Math.max(0.6, Math.min(2.0, avgNodeSize / 18));
            baseDistance *= nodeSizeFactor;
        }
        
        // Ensure minimum and maximum bounds
        const minDistance = 60; // Было 80, стало 60
        const maxDistance = Math.min(containerWidth, containerHeight) * 0.95;
        
        return Math.max(minDistance, Math.min(maxDistance, baseDistance));
    }, [processedData, dimensions]); // eslint-disable-line react-hooks/exhaustive-deps

    // Function to initialize node positions in a wider space
    const initializeNodePositions = useCallback(() => {
        if (!processedData || !processedData.nodes) return;

        const nodes = processedData.nodes;
        const links = processedData.links || [];
        const radius = Math.max(100, nodes.length * 5); // Decreased radius for more compact distribution

        // Create a map of connections for each node
        const nodeConnections = new Map();
        nodes.forEach(node => {
            nodeConnections.set(node.id, []);
        });

        links.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            
            if (nodeConnections.has(sourceId)) {
                nodeConnections.get(sourceId).push(targetId);
            }
            if (nodeConnections.has(targetId)) {
                nodeConnections.get(targetId).push(sourceId);
            }
        });

        nodes.forEach((node: any, index: number) => {
            if (node.x === undefined || node.y === undefined || node.z === undefined) {
                // If the node has connections, try to place it closer to the connected nodes
                const connections = nodeConnections.get(node.id) || [];
                
                if (connections.length > 0) {
                    // Find the average position of the connected nodes
                    let avgX = 0, avgY = 0, avgZ = 0;
                    let connectedCount = 0;
                    
                    connections.forEach((connectedId: string) => {
                        const connectedNode = nodes.find(n => n.id === connectedId);
                        if (connectedNode && connectedNode.x !== undefined) {
                            avgX += connectedNode.x;
                            avgY += connectedNode.y;
                            avgZ += connectedNode.z || 0;
                            connectedCount++;
                        }
                    });
                    
                    if (connectedCount > 0) {
                        // Place the node near the connected nodes
                        const offset = radius * 0.2;
                        node.x = (avgX / connectedCount) + (Math.random() - 0.5) * offset;
                        node.y = (avgY / connectedCount) + (Math.random() - 0.5) * offset;
                        node.z = (avgZ / connectedCount) + (Math.random() - 0.5) * offset;
                        return;
                    }
                }
                
                // If there are no connections or the connected nodes are not yet placed, use spherical distribution
                const phi = Math.acos(-1 + (2 * index) / nodes.length);
                const theta = Math.sqrt(nodes.length * Math.PI) * phi;
                
                // Add a small randomness to prevent perfect symmetry
                const randomOffset = 0.2;
                const randomX = (Math.random() - 0.5) * radius * randomOffset;
                const randomY = (Math.random() - 0.5) * radius * randomOffset;
                const randomZ = (Math.random() - 0.5) * radius * randomOffset;

                node.x = radius * Math.cos(theta) * Math.sin(phi) + randomX;
                node.y = radius * Math.sin(theta) * Math.sin(phi) + randomY;
                node.z = radius * Math.cos(phi) + randomZ;
            }
        });
    }, [processedData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!processedData) return;
        handleCardData(processedData);
        initializeNodePositions();
        applyForces();
        
        // Auto zoom to fit after data is processed
        setTimeout(() => {
            const optimalDistance = calculateOptimalZoomDistance();
            graphRef.current?.zoomToFit(optimalDistance);
        }, 1000);
    }, [processedData, handleCardData, applyForces, calculateOptimalZoomDistance, initializeNodePositions]);

    useEffect(() => {
        const unsubscribeZoomToFit = subscribeToZoomToFitGraph(() => {
            const optimalDistance = calculateOptimalZoomDistance();
            graphRef.current?.zoomToFit(optimalDistance);
        });
        const unsubscribeZoomToNode = subscribeToZoomToNodeGraph(async (payload) => {
            if (!graphRef.current) return;

            const targetNode = processedData.nodes.find((node) => node.id === payload.id);
            if (!targetNode) return;

            const nodeX = targetNode.x || payload.x || 0;
            const nodeY = targetNode.y || payload.y || 0;
            const nodeZ = targetNode.z || payload.z || 0;

            await animateCameraAndRotation({ x: nodeX, y: nodeY, z: nodeZ });

            const viewDistance = payload.distance || 400;
            const duration = payload.duration || 1000;

            graphRef.current.cameraPosition(
                {
                    x: nodeX,
                    y: nodeY,
                    z: nodeZ + viewDistance,
                },
                {
                    x: nodeX,
                    y: nodeY,
                    z: nodeZ,
                },
                duration,
            );

            if (payload.id) {
                setHighlightedNodeId(payload.id);

                if (highlightedTimeoutRef.current) {
                    clearTimeout(highlightedTimeoutRef.current);
                }

                highlightedTimeoutRef.current = setTimeout(() => {
                    setHighlightedNodeId(null);
                    highlightedTimeoutRef.current = null;
                }, 3000);
            }
        });

        return () => {
            unsubscribeZoomToFit();
            unsubscribeZoomToNode();
        };
    }, [processedData, calculateOptimalZoomDistance]);

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
    }, [applyForces]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (clickTimer) {
                clearTimeout(clickTimer);
            }
        };
    }, [clickTimer]);

    const animateCameraAndRotation = (target: { x: number; y: number; z: number }) => {
        return new Promise<void>((resolve) => {
            const graphObj = graphRef.current?.scene()?.children[3];
            const camera = graphRef.current?.camera();
            if (!graphObj || !camera) return resolve();

            const startRotationY = graphObj.rotation.y;
            const startPos = { ...camera.position };
            const startLookAt = graphRef.current?.controls().target.clone();

            const endRotationY = 0;
            const endPos = {
                x: target.x,
                y: target.y,
                z: target.z + 400,
            };
            const endLookAt = {
                x: target.x,
                y: target.y,
                z: target.z,
            };

            const duration = 1000;
            const startTime = performance.now();

            const animate = (time: number) => {
                const t = Math.min((time - startTime) / duration, 1);

                const ease = t * (2 - t);

                graphObj.rotation.y = startRotationY + (endRotationY - startRotationY) * ease;

                camera.position.x = startPos.x + (endPos.x - startPos.x) * ease;
                camera.position.y = startPos.y + (endPos.y - startPos.y) * ease;
                camera.position.z = startPos.z + (endPos.z - startPos.z) * ease;

                const controls = graphRef.current?.controls();
                if (controls) {
                    controls.target.x = startLookAt.x + (endLookAt.x - startLookAt.x) * ease;
                    controls.target.y = startLookAt.y + (endLookAt.y - startLookAt.y) * ease;
                    controls.target.z = startLookAt.z + (endLookAt.z - startLookAt.z) * ease;
                    controls.update();
                }

                if (t < 1) {
                    requestAnimationFrame(animate);
                } else {
                    graphObj.rotation.y = 0;
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    };

    const handleNodeClick = (node: any, event: any) => {
        if (!node || !node.id) return;

        setSelectedLinks(new Set());

        if (isOrbitEnabled && setIsOrbitEnabled) {
            setIsOrbitEnabled(false);
        }

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

        // Clear any existing timer
        if (clickTimer) {
            clearTimeout(clickTimer);
        }

        // Set timer for potential double click
        const timer = setTimeout(async () => {
            // Single click confirmed - select node
            if (handleScrollToCardId) {
                handleScrollToCardId(node.id);
            }

            if (node.x !== undefined && node.y !== undefined) {
                await animateCameraAndRotation({ x: node.x, y: node.y, z: node.z || 0 });

                graphRef.current.cameraPosition(
                    {
                        x: node.x,
                        y: node.y,
                        z: (node.z || 0) + 400,
                    },
                    {
                        x: node.x,
                        y: node.y,
                        z: node.z || 0,
                    },
                    1000,
                );
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
                        const parentNode = processedData.nodes.find((n) => n.id === node.id);
                        const positionedNodes = filteredNewNodes.map((newNode: any, index: number) => {
                            if (
                                parentNode &&
                                parentNode.x !== undefined &&
                                parentNode.y !== undefined &&
                                parentNode.z !== undefined
                            ) {
                                const angle = (index / filteredNewNodes.length) * 2 * Math.PI;
                                const baseRadius = 120;
                                const randomRadius = baseRadius + (Math.random() - 0.5) * 40;
                                const randomAngle = angle + (Math.random() - 0.5) * 0.5;

                                const finalX = parentNode.x + randomRadius * Math.cos(randomAngle);
                                const finalY = parentNode.y + randomRadius * Math.sin(randomAngle);
                                const finalZ = parentNode.z + (Math.random() - 0.5) * 60;

                                return {
                                    ...newNode,
                                    x: finalX,
                                    y: finalY,
                                    z: finalZ,
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
                            const optimalDistance = calculateOptimalZoomDistance();
                            graphRef.current?.zoomToFit(optimalDistance);
                        }, 500);

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

    // Updated getNodeColor function - same as 2D but converted to hex
    const getNodeColor = (node: any) => {
        if (selectedNodes.has(node)) {
            return '#fbbf24'; // #fbbf24 (rgb(251, 191, 36))
        }

        if (highlightedNodeId === node.id) {
            return '#00ffff';
        }

        if (loadingNodes.has(node.id)) {
            return '#f59e0b'; // #f59e0b (rgb(245, 158, 11))
        }

        if (node.color && (!node.labels || node.labels.length === 0)) {
            return node.color;
        }

        if (node.labels) {
            // Updated color mapping based on the 2D graph
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return '#D9C8AE'; // rgb(217, 200, 174)
            }

            if (node.labels.includes('Paragraph')) {
                return '#8DCC93'; // rgb(141, 204, 147)
            }

            if (node.labels.includes('Court') || node.labels.includes('Tribunal')) {
                return '#DA7194'; // rgb(218, 113, 148)
            }

            if (node.labels.includes('Judge') || node.labels.includes('Justice')) {
                return '#C990C0'; // rgb(201, 144, 192)
            }

            if (
                node.labels.includes('Party') ||
                node.labels.includes('Plaintiff') ||
                node.labels.includes('Defendant') ||
                node.labels.includes('Appellant') ||
                node.labels.includes('Respondent')
            ) {
                return '#ECB5C9'; // rgb(236, 181, 201)
            }

            if (
                node.labels.includes('Act') ||
                node.labels.includes('Law') ||
                node.labels.includes('Statute') ||
                node.labels.includes('Legislation')
            ) {
                return '#F79767'; // rgb(247, 151, 103)
            }

            if (
                node.labels.includes('Regulation') ||
                node.labels.includes('Order') ||
                node.labels.includes('Decree') ||
                node.labels.includes('Resolution') ||
                node.labels.includes('SubsidiaryLegislation')
            ) {
                return '#ECB5C9'; // rgb(236, 181, 201)
            }

            if (node.labels.includes('Article') || node.labels.includes('Section')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            if (node.labels.includes('Citation') || node.labels.includes('Reference')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            if (node.labels.includes('Document') || node.labels.includes('Filing')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            // New labels from the table
            if (node.labels.includes('Resource')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            if (node.labels.includes('Work')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            if (node.labels.includes('Organization')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            if (node.labels.includes('Person')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            if (node.labels.includes('Embeddable')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }

            if (node.labels.includes('MasterExpression')) {
                return '#F16667'; // rgb(241, 102, 103)
            }

            if (node.labels.includes('SubTopic')) {
                return '#57C7E3'; // rgb(87, 199, 227)
            }

            if (node.labels.includes('Expression')) {
                return '#F16667'; // rgb(241, 102, 103)
            }

            if (node.labels.includes('Topic')) {
                return '#4C8EDA'; // rgb(76, 142, 218)
            }

            if (node.labels.includes('PartOfTheLegislation')) {
                return '#FFC454'; // rgb(255, 196, 84)
            }

            if (node.labels.includes('SLOpening')) {
                return '#A5ABB6'; // rgb(165, 171, 182)
            }
        }

        return '#A5ABB6'; // Default rgb(165, 171, 182)
    };

    // Updated getNodeSize function - same as 2D graph
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

    const handleNodeDrag = (node: any) => {
        setDraggedNode(node);
        if (selectedNodes.has(node) && selectedNodes.size > 1) {
            if (dragStartPositions.size === 0) {
                const initialPositions = new Map();
                [...selectedNodes].forEach((selNode) => {
                    initialPositions.set(selNode, {
                        x: selNode.x,
                        y: selNode.y,
                        z: selNode.z,
                    });
                });
                setDragStartPositions(initialPositions);
            }

            const draggedInitial = dragStartPositions.get(node);
            if (draggedInitial) {
                const offsetX = node.x - draggedInitial.x;
                const offsetY = node.y - draggedInitial.y;
                const offsetZ = node.z - draggedInitial.z;

                [...selectedNodes].forEach((selNode) => {
                    if (selNode !== node) {
                        const initialPos = dragStartPositions.get(selNode);
                        if (initialPos) {
                            selNode.fx = initialPos.x + offsetX;
                            selNode.fy = initialPos.y + offsetY;
                            selNode.fz = initialPos.z + offsetZ;
                        }
                    }
                });
            }
        }
    };

    const handleNodeDragEnd = (node: any) => {
        if (selectedNodes.has(node) && selectedNodes.size > 1 && draggedNode === node) {
            const finalX = node.x;
            const finalY = node.y;
            const finalZ = node.z;

            const originalPositions = [...selectedNodes].map((selNode) => ({
                node: selNode,
                originalX: selNode.x,
                originalY: selNode.y,
                originalZ: selNode.z,
            }));

            const draggedOriginal = originalPositions.find((p) => p.node === node);

            if (draggedOriginal) {
                const offsetX = finalX - draggedOriginal.originalX;
                const offsetY = finalY - draggedOriginal.originalY;
                const offsetZ = finalZ - draggedOriginal.originalZ;

                [...selectedNodes].forEach((selNode) => {
                    const original = originalPositions.find((p) => p.node === selNode);
                    if (original) {
                        selNode.fx = original.originalX + offsetX;
                        selNode.fy = original.originalY + offsetY;
                        selNode.fz = original.originalZ + offsetZ;
                    }
                });
            }
        } else {
            if (node && node.x !== undefined && node.y !== undefined && node.z !== undefined) {
                node.fx = node.x;
                node.fy = node.y;
                node.fz = node.z;
            }
        }

        setDraggedNode(null);
    };

    const handleBackgroundClick = () => {
        document.body.style.cursor = 'default';
        setHighlightedNodeId(null);
        setHighlightedLinkId(null);
        setSelectedNodes(new Set());
        setSelectedLinks(new Set());

        if (isOrbitEnabled && setIsOrbitEnabled) {
            setIsOrbitEnabled(false);
            setCanvasClickCount(1);
        } else if (canvasClickCount === 1) {
            const optimalDistance = calculateOptimalZoomDistance();
            graphRef.current?.zoomToFit(optimalDistance);
            setCanvasClickCount(0);
        } else {
            const optimalDistance = calculateOptimalZoomDistance();
            graphRef.current?.zoomToFit(optimalDistance);
        }
    };

    const getLinkColor = (link: any) => {
        if (selectedLinks.has(link)) {
            return '#fbbf24';
        }

        if (highlightedLinkId === link.id) {
            return '#00ffff';
        }

        const linkType = getLinkType(link);
        const filter = linkFilters.find((f) => f.id === linkType);
        if (filter) {
            return filter.color;
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

    const extractActCode = (node: any): string => {
        if (node.url) {
            const urlMatch = node.url.match(/[A-Z]{2,}\d{4}/);
            if (urlMatch) {
                return urlMatch[0];
            }
        }

        if (node.content) {
            const actMatch = node.content.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+Act\s+(\d{4})/);
            if (actMatch) {
                const words = actMatch[1].split(' ');
                const year = actMatch[2];
                const abbreviation = words.map((word: string) => word[0]).join('') + year;
                return abbreviation;
            }
        }

        return '';
    };

    const formatSectionReference = (node: any): string => {
        let result = '';

        if (node.part) {
            result += `Part ${node.part}`;
        }

        if (node.section) {
            if (result) result += ', ';
            result += `s ${node.section}`;
        }

        if (node.subsection) {
            result += `(${node.subsection})`;
        }

        return result;
    };

    const getNodeLabel = (node: any) => {
        let baseLabel = '';

        if (node.labels && node.labels.includes('CaseLaw')) {
            baseLabel = node.neutralCitation || node.content || node.id;
        } else if (node.labels && node.labels.includes('Act')) {
            const actCode = extractActCode(node);
            baseLabel = actCode || node.content || node.id;
        } else if (node.labels && node.labels.includes('Paragraph')) {
            baseLabel = `§ ${node.number || node.id}`;
        } else if (node.labels && (node.labels.includes('Article') || node.labels.includes('Section'))) {
            const sectionRef = formatSectionReference(node);
            const actCode = extractActCode(node);

            if (sectionRef && actCode) {
                baseLabel = `${sectionRef} ${actCode}`;
            } else if (sectionRef) {
                baseLabel = sectionRef;
            } else if (actCode) {
                baseLabel = actCode;
            } else {
                baseLabel = node.content || node.id;
            }
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

        const linkType = getLinkType(link);
        const linkTypeLabel = getLinkTypeLabel(linkType);
        
        label = linkTypeLabel;

        if (link.relation && link.relation !== linkType) {
            label += `\nRelation: ${link.relation}`;
        }

        if (link.weight !== undefined) {
            label += `\nWeight: ${link.weight}`;
        }

        return label;
    };

    // Function to create text objects in nodes
    const createNodeTextObject = useCallback((node: any) => {
        if (!CSS2DObject || !showNodeLabels) return null;

        const nodeEl = document.createElement('div');
        const label = getNodeDisplayLabel(node);
        
        if (!label) return null;

        const nodeSize = getNodeSize(node);
        const fontSize = Math.max(8, Math.min(12, nodeSize * 0.5));
        const textColor = resolvedTheme === 'dark' ? '#ffffff' : '#000000';
        
        let textAlign = 'center';
        let textX = 0;
        let textY = 0;
        
        if (nodeSize < 20) {
            textAlign = 'left';
            textX = nodeSize + 5;
            textY = 0;
        }
        
        let backgroundColor = 'transparent';
        let padding = '2px 6px';
        
        if (nodeSize < 20) {
            backgroundColor = resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
            padding = '2px 4px';
        } else if (label.length > 10) {
            backgroundColor = resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
            padding = '2px 6px';
        }
        
        let borderColor = resolvedTheme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
        let boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        
        if (highlightedNodeId === node.id || selectedNodes.has(node)) {
            borderColor = '#fbbf24';
            boxShadow = '0 0 8px rgba(251, 191, 36, 0.6)';
        }
        
        nodeEl.textContent = label;
        nodeEl.className = 'node-label';
        nodeEl.style.cssText = `
            font-size: ${fontSize}px;
            font-family: Arial, sans-serif;
            color: ${textColor};
            background-color: ${backgroundColor};
            padding: ${padding};
            border-radius: 4px;
            user-select: none;
            white-space: nowrap;
            pointer-events: none;
            text-align: ${textAlign};
            transform: translate(${textX}px, ${textY}px);
            box-shadow: ${boxShadow};
            border: 1px solid ${borderColor};
        `;

        return new CSS2DObject(nodeEl);
    }, [resolvedTheme, showNodeLabels, highlightedNodeId, selectedNodes]); // eslint-disable-line react-hooks/exhaustive-deps

    // Function to get the displayed node text
    const getNodeDisplayLabel = (node: any): string => {
        const paragraphNum = getParagraphNumber(node.id);
        let label = node.labels?.[0] || 'Node';

        if (paragraphNum) {
            label = `§ ${paragraphNum}`;
        } else if (node.labels && node.labels.includes('CaseLaw')) {
            label = node.neutralCitation || node.content || node.id;
        } else if (node.labels && node.labels.includes('Act')) {
            const actCode = extractActCode(node);
            label = actCode || node.content || node.id;
        } else if (node.id.includes('/SL/') && node.labels?.includes('PartOfTheLegislation')) {
            label = node.heading ? `${node.heading}` : `Regulation ${formatLegalPath(node.legalPath) || ''}`;
        } else if (node.id.includes('/SL/') && node.labels?.includes('Resource')) {
            label = 'Subsidiary Legislation';
        } else if (node.labels?.includes('PartOfTheLegislation')) {
            label = formatLegalPath(node.legalPath) || node.labels?.[0] || 'Section';
        } else if (node.heading) {
            label = node.heading;
        } else if (node.name) {
            label = node.name;
        } else if (node.content) {
            label = node.content;
        } else {
            label = node.id;
        }

        return label;
    };

    const getParagraphNumber = (nodeId: string) => {
        if (nodeId.includes('#[')) {
            const match = nodeId.match(/#\[(\d+)\]/);
            return match ? match[1] : null;
        }
        return null;
    };

    const formatLegalPath = (legalPath: string) => {
        if (!legalPath) return '';

        const parts = legalPath.split(' -> ').map((part) => part.trim());
        const pathParts = parts.slice(1).map((part) => part.replace(/-$/, ''));

        if (pathParts.length === 0) return '';

        const [first, ...rest] = pathParts;
        if (rest.length === 0) return first;

        return `${first}(${rest.join(')(')})`;
    };

    const extraRenderers = useMemo(() => {
        if (CSS2DRenderer) {
            return [new CSS2DRenderer()];
        }
        return [];
    }, []);

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
            onBackgroundClick={handleBackgroundClick}
            cooldownTicks={100}
            cooldownTime={15000}
            enableNodeDrag={true}
            enableNavigationControls={true}
            // opacity of nodes and links
            nodeOpacity={1}
            linkOpacity={0.2}
            // Additional parameters for better distribution
            d3AlphaDecay={0.01}
            d3VelocityDecay={0.4}
            warmupTicks={300}
            extraRenderers={extraRenderers}
            nodeThreeObject={createNodeTextObject}
            nodeThreeObjectExtend={true}
        />
    );
};

export default ChatGraph3D;