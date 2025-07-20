'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { getConversationExpandNodes } from '@/api/chat/getConversationExpandNodes';
import { subscribeToZoomToFitGraph } from '@/events/zoom-to-fit';
import { subscribeToZoomToNodeGraph } from '@/events/zoom-to-node';
import { useTheme } from 'next-themes';
import { GraphData, GraphLayer } from '@/types/Graph';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface ChatGraph2DProps {
    height?: number;
    width?: number;
    layers: GraphLayer[];
    data: GraphData;
    handleCardData: Dispatch<SetStateAction<any>>;
}

const ChatGraph2D = ({ height, width, data, layers, handleCardData }: ChatGraph2DProps) => {
    const { resolvedTheme } = useTheme();

    const graphRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [layerDataMap, setLayerDataMap] = useState<Record<string, { nodes: any[]; links: any[] }>>({});
    const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);

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

    useEffect(() => {
        const unsubscribeZoomToFit = subscribeToZoomToFitGraph(() => {
            graphRef.current?.zoomToFit(400);
            setHighlightedNodeId(null);
        });

        const unsubscribeZoomToNode = subscribeToZoomToNodeGraph((payload) => {
            if (graphRef.current && payload.x !== undefined && payload.y !== undefined) {
                graphRef.current.centerAt(payload.x, payload.y, payload.duration || 1000);
                graphRef.current.zoom(payload.zoomLevel || 1, payload.duration || 1000);

                if (payload.id) {
                    setHighlightedNodeId(payload.id);

                    setTimeout(() => {
                        setHighlightedNodeId(null);
                    }, 3000);
                }
            }
        });

        return () => {
            unsubscribeZoomToFit();
            unsubscribeZoomToNode();
        };
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

        return {
            nodes: Array.from(allNodes.values()),
            links: Array.from(allLinks.values()),
        };
    }, [layerDataMap, layers]);

    useEffect(() => {
        if (processedData) {
            handleCardData(processedData);
        }
    }, [processedData, handleCardData]);

    const handleNodeClick = async (node: any) => {
        const data = await getConversationExpandNodes(node.id);
        console.log(data);
    };

    const getNodeColor = (node: any) => {
        if (highlightedNodeId === node.id) {
            return '#fbbf24';
        }

        if (node.color) {
            return node.color;
        }

        if (node.labels && node.labels.includes('CaseLaw')) {
            return '#ef4444'; // Red for case law
        }
        if (node.labels && node.labels.includes('Act')) {
            return '#3b82f6'; // Blue for legislation
        }
        if (node.labels && node.labels.includes('Paragraph')) {
            return '#10b981'; // Green for paragraphs
        }
        return '#6b7280'; // Gray for unknown types
    };

    const getNodeSize = (node: any) => {
        if (node.labels && node.labels.includes('CaseLaw')) {
            return 8;
        }
        if (node.labels && node.labels.includes('Act')) {
            return 12;
        }
        if (node.labels && node.labels.includes('Paragraph')) {
            return 6;
        }
        return 6;
    };

    const handleNodeHover = (node: any) => {
        document.body.style.cursor = node ? 'pointer' : 'default';
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

        return baseLabel;
    };

    return (
        <ForceGraph2D
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
            onBackgroundClick={() => {
                document.body.style.cursor = 'default';
                setHighlightedNodeId(null);
            }}
        />
    );
};

export default ChatGraph2D;
