'use client';

import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { getConversationExpandNodes } from '@/api/chat/getConversationExpandNodes';
import { subscribeToZoomToFitGraph } from '@/events/zoom-to-fit';
import { subscribeToZoomToNodeGraph } from '@/events/zoom-to-node';
import { useTheme } from 'next-themes';
import {
    GraphData,
    GraphLayer,
    GraphLinkFilter,
    GraphNodeFilter,
    GraphNodePosition,
    NodesTagsFilters,
} from '@/types/Graph';
import { track_node_expanded, track_node_collapsed, track_graph_zoomed } from '@/lib/analytics';
import ContentTimeTracker from '@/components/analytics/ContentTimeTracker';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface ChatGraph2DProps {
    height?: number;
    width?: number;
    layers: GraphLayer[];
    data: GraphData;
    handleCardData: Dispatch<SetStateAction<any>>;
    handleScrollToCardId: Dispatch<SetStateAction<string>>;
    threadId?: string; // Add thread_id prop

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
    searchQuery: string;
    nodesTagsFilters: NodesTagsFilters;
}

const ChatGraph2D = ({
    height,
    width,
    data,
    layers,
    handleCardData,
    handleScrollToCardId,
    threadId,
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
    searchQuery,
    nodesTagsFilters,
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
    const [isZooming, setisZooming] = useState(false);
    const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const filtersInitializedRef = useRef<boolean>(false);

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
    }, [width, height]); // width and height are stable props

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
        processedNodes.forEach((node) => {
            saveNodePosition(node);
        });
    };

    const getNodeDisplayInfo = useCallback((node: any) => {
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

        const paragraphNum = getParagraphNumber(node.id);
        let title = node.labels?.[0] || 'Node';

        if (paragraphNum) {
            title = `§ ${paragraphNum}`;
        } else if (node.id.includes('/SL/') && node.labels?.includes('PartOfTheLegislation')) {
            title = node.heading ? `${node.heading}` : `Regulation ${formatLegalPath(node.legalPath) || ''}`;
        } else if (node.id.includes('/SL/') && node.labels?.includes('Resource')) {
            title = 'Subsidiary Legislation';
        } else if (node.labels?.includes('PartOfTheLegislation')) {
            title = formatLegalPath(node.legalPath) || node.labels?.[0] || 'Section';
        } else if (node.heading) {
            title = node.heading;
        } else if (node.name) {
            title = node.name;
        }

        return {
            title,
            citation: node.neutralCitation || null,
            content: node.content || '',
            topics: node.topics || [],
            concepts: node.concepts || [],
            functionalObject: node.functionalObject || null,
            functionalRole: node.functionalRole || null,
        };
    }, []);

    const nodeMatchesSearch = useCallback(
        (node: any, searchLower: string): boolean => {
            const nodeInfo = getNodeDisplayInfo(node);

            return (
                nodeInfo.title.toLowerCase().includes(searchLower) ||
                nodeInfo.content.toLowerCase().includes(searchLower) ||
                (nodeInfo.citation && nodeInfo.citation.toLowerCase().includes(searchLower)) ||
                (nodeInfo.functionalObject && nodeInfo.functionalObject.toLowerCase().includes(searchLower)) ||
                (nodeInfo.functionalRole && nodeInfo.functionalRole.toLowerCase().includes(searchLower)) ||
                (nodeInfo.topics &&
                    nodeInfo.topics.some((topic: string) => topic.toLowerCase().includes(searchLower))) ||
                (nodeInfo.concepts &&
                    nodeInfo.concepts.some((concept: string) => concept.toLowerCase().includes(searchLower)))
            );
        },
        [getNodeDisplayInfo],
    );

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

    const getLinkType = (link: any): string => {
        if (link.parentChild) {
            return 'PARENT_CHILD';
        }
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
            PARENT_CHILD: 'Parent-Child',
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
            PARENT_CHILD: '#10b981',
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

    const getAllLinkTypes = useCallback((layerDataMap: any, expandedData: any): GraphLinkFilter[] => {
        const linkTypesMap = new Map<string, { count: number; examples: any[] }>();

        linkTypesMap.set('PARENT_CHILD', { count: 0, examples: [] });

        const processLinks = (links: any[], source: string) => {
            links.forEach((link: any) => {
                const linkType = getLinkType(link);
                if (!linkTypesMap.has(linkType)) {
                    linkTypesMap.set(linkType, { count: 0, examples: [] });
                }
                const existing = linkTypesMap.get(linkType)!;
                existing.count++;
                if (existing.examples.length < 3) {
                    existing.examples.push({ ...link, source_info: source });
                }
            });
        };

        Object.values(layerDataMap).forEach((layerData: any) => {
            if (layerData.links) {
                processLinks(layerData.links, 'layer');
            }
        });

        processLinks(expandedData.links, 'expanded');

        const countParentChildLinks = (nodes: any[]) => {
            nodes.forEach((node: any) => {
                if (node.parentId) {
                    const existing = linkTypesMap.get('PARENT_CHILD')!;
                    existing.count++;
                    if (existing.examples.length < 3) {
                        existing.examples.push({
                            id: `${node.id}-${node.parentId}`,
                            source: node.id,
                            target: node.parentId,
                            type: 'PARENT_CHILD',
                            parentChild: true,
                        });
                    }
                }
            });
        };

        Object.values(layerDataMap).forEach((layerData: any) => {
            if (layerData.nodes) {
                countParentChildLinks(layerData.nodes);
            }
        });

        countParentChildLinks(expandedData.nodes);

        const linkTypes: GraphLinkFilter[] = Array.from(linkTypesMap.entries()).map(([type, data], index) => ({
            id: type,
            label: getLinkTypeLabel(type),
            enabled: true,
            color: getLinkTypeColor(type, index),
            count: data.count,
        }));

        return linkTypes.sort((a, b) => b.count - a.count);
    }, []);

    useEffect(() => {
        const newLinkTypes = getAllLinkTypes(layerDataMap, expandedData);

        if (newLinkTypes.length > 0) {
            setLinkFilters((prevFilters) => {
                if (prevFilters.length === 0) {
                    filtersInitializedRef.current = true;
                    return newLinkTypes.map((newType) => ({
                        ...newType,
                        enabled: true,
                    }));
                }

                const existingFiltersMap = new Map(prevFilters.map((f) => [f.id, f]));
                const newFilters = [...prevFilters];

                newLinkTypes.forEach((newType) => {
                    if (!existingFiltersMap.has(newType.id)) {
                        newFilters.push({
                            ...newType,
                            enabled: true,
                        });
                    }
                });

                return newFilters;
            });
        }
    }, [layerDataMap, expandedData, setLinkFilters, getAllLinkTypes]);

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

    const isLinkVisible = useCallback(
        (link: any): boolean => {
            const linkType = getLinkType(link);
            const filter = linkFilters.find((f) => f.id === linkType);
            return filter ? filter.enabled : true;
        },
        [linkFilters],
    );

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

    useEffect(() => {
        const newNodeTypes = getAllNodeTypes(layerDataMap, expandedData);

        if (newNodeTypes.length > 0) {
            setNodeFilters((prevFilters) => {
                if (prevFilters.length === 0) {
                    filtersInitializedRef.current = true;
                    return newNodeTypes.map((newType) => ({
                        ...newType,
                        enabled: true,
                    }));
                }

                const existingFiltersMap = new Map(prevFilters.map((f) => [f.id, f]));
                const newFilters = [...prevFilters];

                newNodeTypes.forEach((newType) => {
                    if (!existingFiltersMap.has(newType.id)) {
                        newFilters.push({
                            ...newType,
                            enabled: true,
                        });
                    }
                });

                return newFilters;
            });
        }
    }, [layerDataMap, expandedData, setNodeFilters, getAllNodeTypes]);

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

    const isNodeVisible = useCallback(
        (node: any): boolean => {
            const nodeType = getNodeType(node);
            const filter = nodeFilters.find((f) => f.id === nodeType);
            return filter ? filter.enabled : true;
        },
        [nodeFilters],
    );

    const getSearchFilteredNodes = useCallback(
        (allNodes: any[]): any[] => {
            const searchLower = searchQuery.toLowerCase().trim();

            const hasTopicFilter = nodesTagsFilters.topic.selected.length !== nodesTagsFilters.topic.options.length;
            const hasConceptFilter =
                nodesTagsFilters.concept.selected.length !== nodesTagsFilters.concept.options.length;

            const matchingNodes = new Set<string>();
            const nodesToInclude = new Set<string>();

            const nodesByParent = new Map<string | null, any[]>();
            const nodeMap = new Map<string, any>();

            allNodes.forEach((node) => {
                nodeMap.set(node.id, node);
                const parentId = node.parentId || null;
                if (!nodesByParent.has(parentId)) {
                    nodesByParent.set(parentId, []);
                }
                nodesByParent.get(parentId)!.push(node);
            });

            const nodeMatches = (node: any) => {
                const info = getNodeDisplayInfo(node);

                const matchesSearch =
                    info.title.toLowerCase().includes(searchLower) ||
                    info.content.toLowerCase().includes(searchLower) ||
                    (info.citation && info.citation.toLowerCase().includes(searchLower)) ||
                    (info.functionalObject && info.functionalObject.toLowerCase().includes(searchLower)) ||
                    (info.functionalRole && info.functionalRole.toLowerCase().includes(searchLower)) ||
                    (info.topics && info.topics.some((t: string) => t.toLowerCase().includes(searchLower))) ||
                    (info.concepts && info.concepts.some((c: string) => c.toLowerCase().includes(searchLower)));

                const matchesTopicFilter =
                    !hasTopicFilter || info.topics?.some((t: string) => nodesTagsFilters.topic.selected.includes(t));
                const matchesConceptFilter =
                    !hasConceptFilter ||
                    info.concepts?.some((c: string) => nodesTagsFilters.concept.selected.includes(c));

                return matchesSearch && (matchesTopicFilter || matchesConceptFilter);
            };

            allNodes.forEach((node) => {
                if (nodeMatches(node)) {
                    matchingNodes.add(node.id);
                    nodesToInclude.add(node.id);

                    if (!node.parentId) {
                        const children = nodesByParent.get(node.id) || [];
                        children.forEach((child) => nodesToInclude.add(child.id));
                    } else {
                        const parent = nodeMap.get(node.parentId);
                        if (parent) {
                            nodesToInclude.add(parent.id);
                            const siblings = nodesByParent.get(node.parentId) || [];
                            siblings.forEach((sibling) => nodesToInclude.add(sibling.id));
                        }
                    }
                }
            });

            nodesByParent.forEach((children, parentId) => {
                if (parentId) {
                    const parent = nodeMap.get(parentId);
                    if (parent && nodeMatches(parent)) {
                        nodesToInclude.add(parent.id);
                        children.forEach((child) => nodesToInclude.add(child.id));
                    }
                }
            });

            return allNodes.filter((node) => nodesToInclude.has(node.id));
        },
        [searchQuery, nodesTagsFilters, getNodeDisplayInfo],
    );

    const processedNodes = useMemo(() => {
        const enabledLayers = layers.filter((layer) => layer.enabled);

        if (enabledLayers.length === 0) {
            return [];
        }

        const sortedEnabledLayers = enabledLayers.sort((a, b) => a.priority - b.priority);
        const allNodes = new Map();

        sortedEnabledLayers.forEach((layer) => {
            const layerData = layerDataMap[layer.id];
            if (!layerData) return;

            layerData.nodes.forEach((node: any) => {
                if (!isNodeVisible(node)) return;

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
        });

        expandedData.nodes.forEach((node: any) => {
            if (!isNodeVisible(node)) return;

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

        const allNodesArray = Array.from(allNodes.values());

        return getSearchFilteredNodes(allNodesArray);
    }, [layerDataMap, layers, expandedData, isNodeVisible, getSearchFilteredNodes]);

    const processedLinks = useMemo(() => {
        const enabledLayers = layers.filter((layer) => layer.enabled);

        if (enabledLayers.length === 0) {
            return [];
        }

        const visibleNodeIds = new Set(processedNodes.map((node) => node.id));
        const allLinks = new Map();

        const createParentChildLinks = (nodes: any[], source: string) => {
            nodes.forEach((node) => {
                if (node.parentId && visibleNodeIds.has(node.parentId) && visibleNodeIds.has(node.id)) {
                    const linkKey = `${node.id}-${node.parentId}`;

                    if (!allLinks.has(linkKey)) {
                        const parentChildLink = {
                            id: linkKey,
                            source: node.id,
                            target: node.parentId,
                            type: 'PARENT_CHILD',
                            relationType: 'PARENT_CHILD',
                            parentChild: true,
                            source_type: source,
                        };

                        if (isLinkVisible(parentChildLink)) {
                            allLinks.set(linkKey, parentChildLink);
                        }
                    }
                }
            });
        };

        const sortedEnabledLayers = enabledLayers.sort((a, b) => a.priority - b.priority);

        sortedEnabledLayers.forEach((layer) => {
            const layerData = layerDataMap[layer.id];
            if (!layerData) return;

            createParentChildLinks(layerData.nodes, `layer-${layer.id}`);

            if (layerData.links) {
                layerData.links.forEach((link: any) => {
                    if (isLinkVisible(link)) {
                        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

                        if (visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId)) {
                            const linkKey = `${sourceId}-${targetId}`;
                            if (!allLinks.has(linkKey)) {
                                allLinks.set(linkKey, {
                                    ...link,
                                    id: linkKey,
                                    source: sourceId,
                                    target: targetId,
                                    parentChild: false,
                                    source_type: 'explicit',
                                });
                            }
                        }
                    }
                });
            }
        });

        createParentChildLinks(expandedData.nodes, 'expanded');

        expandedData.links.forEach((link: any) => {
            if (isLinkVisible(link)) {
                const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                const targetId = typeof link.target === 'object' ? link.target.id : link.target;

                if (visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId)) {
                    const linkKey = `${sourceId}-${targetId}`;
                    if (!allLinks.has(linkKey)) {
                        allLinks.set(linkKey, {
                            ...link,
                            id: linkKey,
                            source: sourceId,
                            target: targetId,
                            parentChild: false,
                            source_type: 'expanded',
                        });
                    }
                }
            }
        });

        return Array.from(allLinks.values());
    }, [layerDataMap, layers, expandedData, processedNodes, isLinkVisible]);

    const processedData = useMemo(
        () => ({
            nodes: processedNodes,
            links: processedLinks,
        }),
        [processedNodes, processedLinks],
    );

    // Track zoom level changes for interactive events (wheel, drag)
    useEffect(() => {
        let lastZoomLevel = 1;
        let intervalId: NodeJS.Timeout | null = null;
        let isInitialized = false;

        const startZoomTracking = () => {
            if (isInitialized || !graphRef.current) return;

            isInitialized = true;

            // Initialize with current zoom level
            const initialZoom = graphRef.current.zoom();
            if (initialZoom) {
                lastZoomLevel = initialZoom;
            }

            intervalId = setInterval(() => {
                if (!graphRef.current) return;

                const currentZoom = graphRef.current.zoom();
                if (currentZoom && Math.abs(currentZoom - lastZoomLevel) > 0.05) {
                    try {
                        track_graph_zoomed({
                            thread_id: threadId || 'unknown',
                            zoom_type: 'manual',
                        });
                    } catch (e) {
                        console.error(e);
                    }
                    lastZoomLevel = currentZoom;
                }
            }, 100);
        };

        const timer = setTimeout(startZoomTracking, 1500);

        return () => {
            clearTimeout(timer);
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [processedNodes, threadId]);

    useEffect(() => {
        const unsubscribeZoomToFit = subscribeToZoomToFitGraph(() => {
            try {
                track_graph_zoomed({
                    thread_id: threadId || 'unknown',
                    zoom_type: 'fit',
                });
            } catch (e) {
                console.error(e);
            }
            graphRef.current?.zoomToFit(300);
            setHighlightedNodeId(null);
            setHighlightedLinkId(null);
        });

        const unsubscribeZoomToNode = subscribeToZoomToNodeGraph((payload) => {
            if (!graphRef.current) return;

            if (!payload.x || !payload.y) {
                const targetNode = processedNodes.find((node) => node.id === payload.id);
                if (!targetNode) return;

                payload.x = targetNode.x;
                payload.y = targetNode.y;
            }

            try {
                track_graph_zoomed({
                    thread_id: threadId || 'unknown',
                    zoom_type: 'node',
                    target_id: payload.id,
                });
            } catch (e) {
                console.error(e);
            }

            graphRef.current.centerAt(payload.x, payload.y, payload.duration || 1000);
            graphRef.current.zoom(payload.zoomLevel || 1, payload.duration || 1000);

            if (payload.id) {
                setHighlightedNodeId(payload.id);
                setisZooming(true);

                if (zoomTimeoutRef.current) {
                    clearTimeout(zoomTimeoutRef.current);
                }
                zoomTimeoutRef.current = setTimeout(() => {
                    setHighlightedNodeId(null);
                    setisZooming(false);
                    zoomTimeoutRef.current = null;
                }, 3000);
            }
        });

        return () => {
            unsubscribeZoomToFit();
            unsubscribeZoomToNode();
        };
    }, [processedNodes, threadId, setHighlightedNodeId, setHighlightedLinkId, setisZooming, zoomTimeoutRef]); // threadId is used in track_graph_zoomed calls

    useEffect(() => {
        return () => {
            if (clickTimer) {
                clearTimeout(clickTimer);
            }
        };
    }, [clickTimer]);

    const lastCardDataRef = useRef<string | null>(null);

    useEffect(() => {
        const serialized = JSON.stringify(processedData);

        if (serialized !== lastCardDataRef.current) {
            lastCardDataRef.current = serialized;
            handleCardData(processedData);
        }
    }, [processedData, handleCardData]);

    useEffect(() => {
        if (graphRef.current && processedNodes.length > 0) {
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
    }, [processedNodes]); // processedNodes is stable and only changes when needed

    useEffect(() => {
        if (graphRef.current && processedLinks.length >= 0) {
            const fg = graphRef.current;

            const linkForce = fg.d3Force('link');
            if (linkForce) {
                linkForce.distance(100).strength(0);
            }
        }
    }, [processedLinks]);

    const handleNodeClick = (node: any, event: any) => {
        if (!node || !node.id) return;

        setSelectedLinks(new Set());

        if (lastClickedNode === node.id && clickTimer) {
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
        console.log('Node selected:', node.id);
        handleScrollToCardId(node.id);

        if (clickTimer) {
            clearTimeout(clickTimer);
        }

        const timer = setTimeout(() => {
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
        }, 300);

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

        if (loadingNodes.has(node.id)) {
            console.log('Node is currently loading, ignoring double-click');
            return;
        }

        try {
            if (expandedNodes.has(node.id)) {
                console.log('Collapsing node:', node.id);
                try {
                    track_node_collapsed({
                        thread_id: threadId || 'unknown',
                        target_id: node.id,
                        by_user: true,
                    });
                } catch (e) {
                    console.error(e);
                }
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
                        ...processedNodes.map((n) => n.id),
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

                        try {
                            track_node_expanded({
                                thread_id: threadId || 'unknown',
                                target_id: node.id,
                                by_user: true,
                            });
                        } catch (e) {
                            console.error(e);
                        }

                        console.log('Successfully expanded node with', filteredNewNodes.length, 'new children');
                    } else {
                        console.log('No new nodes to add (all already exist)');
                        setExpandedNodes((prev) => new Set([...prev, node.id]));
                        try {
                            track_node_expanded({
                                thread_id: threadId || 'unknown',
                                target_id: node.id,
                                by_user: true,
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    }
                } else {
                    console.log('No children found for node:', node.id);
                    setExpandedNodes((prev) => new Set([...prev, node.id]));
                    try {
                        track_node_expanded({
                            thread_id: threadId || 'unknown',
                            target_id: node.id,
                            by_user: true,
                        });
                    } catch (e) {
                        console.error(e);
                    }
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
        if (loadingNodes.has(node.id)) {
            return { r: 245, g: 158, b: 11 };
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
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return { r: 217, g: 200, b: 174 };
            }
            if (node.labels.includes('Paragraph')) {
                return { r: 141, g: 204, b: 147 };
            }
            if (node.labels.includes('Court') || node.labels.includes('Tribunal')) {
                return { r: 218, g: 113, b: 148 };
            }
            if (node.labels.includes('Judge') || node.labels.includes('Justice')) {
                return { r: 201, g: 144, b: 192 };
            }
            if (
                node.labels.includes('Party') ||
                node.labels.includes('Plaintiff') ||
                node.labels.includes('Defendant') ||
                node.labels.includes('Appellant') ||
                node.labels.includes('Respondent')
            ) {
                return { r: 236, g: 181, b: 201 };
            }
            if (
                node.labels.includes('Act') ||
                node.labels.includes('Law') ||
                node.labels.includes('Statute') ||
                node.labels.includes('Legislation')
            ) {
                return { r: 247, g: 151, b: 103 };
            }
            if (
                node.labels.includes('Regulation') ||
                node.labels.includes('Order') ||
                node.labels.includes('Decree') ||
                node.labels.includes('Resolution') ||
                node.labels.includes('SubsidiaryLegislation')
            ) {
                return { r: 236, g: 181, b: 201 };
            }
            if (node.labels.includes('Article') || node.labels.includes('Section')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('Citation') || node.labels.includes('Reference')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('Document') || node.labels.includes('Filing')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('Resource')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('Work')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('Organization')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('Person')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('Embeddable')) {
                return { r: 165, g: 171, b: 182 };
            }
            if (node.labels.includes('MasterExpression')) {
                return { r: 241, g: 102, b: 103 };
            }
            if (node.labels.includes('SubTopic')) {
                return { r: 87, g: 199, b: 227 };
            }
            if (node.labels.includes('Expression')) {
                return { r: 241, g: 102, b: 103 };
            }
            if (node.labels.includes('Topic')) {
                return { r: 76, g: 142, b: 218 };
            }
            if (node.labels.includes('PartOfTheLegislation')) {
                return { r: 255, g: 196, b: 84 };
            }
            if (node.labels.includes('SLOpening')) {
                return { r: 165, g: 171, b: 182 };
            }
        }

        return { r: 165, g: 171, b: 182 };
    };

    const getNodeSize = (node: any) => {
        if (loadingNodes.has(node.id)) {
            return 8;
        }

        if (node.labels) {
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return 40;
            }

            if (node.labels.includes('Paragraph')) {
                return 10;
            }

            if (node.labels.includes('Act')) {
                return 40;
            }

            if (node.labels.includes('PartOfTheLegislation')) {
                return 10;
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
                return 25;
            }
        }

        return 25;
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
        if (isZooming) return;

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

        graphRef.current?.zoomToFit(300);
    };

    const getLinkColor = (link: any) => {
        if (selectedLinks.has(link)) {
            return '#fbbf24';
        }

        if (highlightedLinkId === link.id) {
            return '#00ffff';
        }

        if (link.parentChild) {
            const targetNode = processedNodes.find((n) => n.id === link.target);

            if (targetNode?.labels?.includes('Act')) {
                return '#F79767';
            } else if (targetNode?.labels?.includes('CaseLaw')) {
                return '#D9C8AE';
            } else {
                return '#10b981';
            }
        }

        const linkType = getLinkType(link);
        const filter = linkFilters.find((f) => f.id === linkType);
        if (filter) {
            return filter.color;
        }

        return resolvedTheme === 'dark' ? '#6b7280' : 'rgba(156, 163, 175, 0.2)';
    };

    const getLinkWidth = (link: any) => {
        if (selectedLinks.has(link)) {
            return 2.5;
        }

        if (highlightedLinkId === link.id) {
            return 2;
        }

        if (link.parentChild) {
            return 1.5;
        }

        return 0.5;
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

    const getNodeLabel = (node: any) => {
        let baseLabel = getNodeDisplayLabel(node);

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

        if (link.parentChild) {
            label = 'Parent-Child Relationship';
        } else {
            const linkType = getLinkType(link);
            const linkTypeLabel = getLinkTypeLabel(linkType);
            label = linkTypeLabel;

            if (link.relation && link.relation !== linkType) {
                label += `\nRelation: ${link.relation}`;
            }
        }

        if (link.weight !== undefined) {
            label += `\nWeight: ${link.weight}`;
        }

        if (link.source_type) {
            label += `\nSource: ${link.source_type}`;
        }

        return label;
    };

    const nodeCanvasObject = (node: any, ctx: any) => {
        const nodeSize = getNodeSize(node);
        const rgb = getNodeColor(node);

        const isSearchMatch = searchQuery.trim() && nodeMatchesSearch(node, searchQuery.toLowerCase().trim());

        if (highlightedNodeId === node.id || selectedNodes.has(node) || isSearchMatch) {
            ctx.save();

            const glowRadius = nodeSize * (isSearchMatch ? 4.5 : 3.5);
            const gradient = ctx.createRadialGradient(node.x, node.y, nodeSize, node.x, node.y, glowRadius);

            const glowColor =
                isSearchMatch && !selectedNodes.has(node) && highlightedNodeId !== node.id
                    ? { r: 255, g: 255, b: 0 } 
                    : rgb;

            gradient.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.6)`);
            gradient.addColorStop(0.3, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.3)`);
            gradient.addColorStop(0.6, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.1)`);
            gradient.addColorStop(1, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0)`);

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

        if (highlightedNodeId === node.id || selectedNodes.has(node)) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
            ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
            ctx.fill();
        }

        if (showNodeLabels) {
            const label = getNodeDisplayLabel(node);
            if (label) {
                ctx.save();

                const fontSize = Math.max(8, Math.min(12, nodeSize * 0.4));
                ctx.font = `${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const textColor = resolvedTheme === 'dark' ? '#ffffff' : '#000000';

                let textX = node.x;
                let textY = node.y;

                if (nodeSize < 20) {
                    textX = node.x + nodeSize + 5;
                    textY = node.y;
                    ctx.textAlign = 'left';
                }

                const textMetrics = ctx.measureText(label);
                const textWidth = textMetrics.width;
                const textHeight = fontSize;

                if (nodeSize < 20) {
                    ctx.fillStyle = resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
                    ctx.fillRect(textX - 2, textY - textHeight / 2 - 2, textWidth + 4, textHeight + 4);
                } else {
                    if (label.length > 10) {
                        ctx.fillStyle = resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
                        ctx.fillRect(
                            textX - textWidth / 2 - 2,
                            textY - textHeight / 2 - 2,
                            textWidth + 4,
                            textHeight + 4,
                        );
                    }
                }

                ctx.fillStyle = textColor;
                ctx.fillText(label, textX, textY);

                ctx.restore();
            }
        }
    };

    return (
        <div className="relative">
            {/* Track time spent viewing graph - pulses enabled with longer interval */}
            <ContentTimeTracker
                areaId="chat_graph_2d"
                extra={{
                    thread_id: threadId || 'unknown',
                    graph_view: '2d',
                }}
                disablePulses={false}
                pulseIntervalMs={300000}
                minThresholdMs={3000}
                finalMinThresholdMs={5000}
                sampleOneOutOf={10}
            />

            <ForceGraph2D
                ref={graphRef}
                width={width || dimensions.width}
                height={height || dimensions.height}
                graphData={processedData}
                backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
                nodeCanvasObject={nodeCanvasObject}
                nodeCanvasObjectMode={() => 'replace'}
                nodeVal={(node) => {
                    const nodeSize = getNodeSize(node);
                    return nodeSize * 2;
                }}
                linkColor={getLinkColor}
                linkWidth={getLinkWidth}
                linkDirectionalParticles={(link) => (link.parentChild ? 4 : 2)}
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
        </div>
    );
};

export default ChatGraph2D;
