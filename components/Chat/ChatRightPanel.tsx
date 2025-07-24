'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import { ArrowRight, Expand, Fullscreen, Layers, Link } from 'lucide-react';
import { CardData } from '@/types/Chat';
import { GraphLayer } from '@/types/Graph';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatGraph2D from '@/components/Chat/ChatGraph2D';
import ChatGraph3D from '@/components/Chat/ChatGraph3D';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface ChatRightPanelProps {
    currentMessage: any;
    graphLayers: GraphLayer[];
    setGraphLayers: Dispatch<SetStateAction<GraphLayer[]>>;
    cardData: CardData;
    graphView: string;
    setGraphView: (view: string) => void;
    handleCardData: Dispatch<SetStateAction<CardData>>;
    setIsOpenGraphModal: (open: boolean) => void;
}

const ChatRightPanel = ({
    currentMessage,
    graphLayers,
    setGraphLayers,
    cardData,
    graphView,
    setGraphView,
    handleCardData,
    setIsOpenGraphModal,
}: ChatRightPanelProps) => {
    console.log(cardData);
    const [rightPanelWidth, setRightPanelWidth] = useState<number>(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    // Function to extract group key from node ID
    const getGroupKey = (nodeId: string) => {
        if (nodeId.includes('lawnet.com/openlaw/cases/citation/')) {
            // Extract case code: everything before the # symbol
            const match = nodeId.match(/cases\/citation\/([^#]+)/);
            return match ? decodeURIComponent(match[1]) : nodeId;
        } else if (nodeId.includes('sso.agc.gov.sg/Act/')) {
            // Extract act code: everything after /Act/
            const match = nodeId.match(/\/Act\/([^?]+)/);
            return match ? match[1] : nodeId;
        } else if (nodeId.includes('sso.agc.gov.sg/SL/')) {
            // Extract subsidiary legislation code: everything after /SL/ until ?
            const match = nodeId.match(/\/SL\/([^?]+)/);
            return match ? match[1] : nodeId;
        }
        // For custom nodes, return the full ID as group key
        return nodeId;
    };

    // Function to get group display name
    const getGroupDisplayName = (groupKey: string, nodes: any[]) => {
        const firstNode = nodes[0];

        if (firstNode.id.includes('lawnet.com')) {
            // For case law, use the case title if available
            return firstNode.neutralCitation || groupKey;
        } else if (firstNode.id.includes('sso.agc.gov.sg')) {
            // For legislation, use the content or a formatted name
            return firstNode.content || groupKey;
        }

        // For custom nodes, use the first node's label or content
        return firstNode.labels?.[0] || firstNode.content || groupKey;
    };

    // Group nodes by their group keys
    const groupedNodes = useMemo(() => {
        if (!cardData.nodes || cardData.nodes.length === 0) {
            return {};
        }

        const groups: { [key: string]: any[] } = {};

        cardData.nodes.forEach((node) => {
            const groupKey = getGroupKey(node.id);
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(node);
        });

        return groups;
    }, [cardData.nodes]);

    const nodeConnections = useMemo(() => {
        const connections: { [key: string]: any[] } = {};

        if (!cardData.links || !cardData.nodes || cardData.links.length === 0) {
            return connections;
        }

        cardData.links.forEach((link) => {
            let sourceId, targetId;

            if (link.source && typeof link.source === 'object') {
                sourceId = link.source.id;
            } else if (typeof link.source === 'string') {
                sourceId = link.source;
            }

            if (link.target && typeof link.target === 'object') {
                targetId = link.target.id;
            } else if (typeof link.target === 'string') {
                targetId = link.target;
            }

            if (!sourceId || !targetId) return;

            if (!connections[sourceId]) connections[sourceId] = [];
            if (!connections[targetId]) connections[targetId] = [];

            const targetNode = cardData.nodes.find((n) => n.id === targetId);
            const sourceNode = cardData.nodes.find((n) => n.id === sourceId);

            if (targetNode && !connections[sourceId].some((n) => n.id === targetId)) {
                connections[sourceId].push(targetNode);
            }
            if (sourceNode && !connections[targetId].some((n) => n.id === sourceId)) {
                connections[targetId].push(sourceNode);
            }
        });

        return connections;
    }, [cardData.links, cardData.nodes]);

    useEffect(() => {
        setRightPanelWidth(window.innerWidth * 0.25);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;

            const width = window.innerWidth;
            const newWidth = window.innerWidth - e.clientX;
            setRightPanelWidth(Math.max(width * 0.15, Math.min(newWidth, width * 0.5)));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'col-resize';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [isResizing]);

    const truncateText = (text: string, maxWords: number = 5) => {
        if (!text) return text;

        const words = text.split(' ');
        if (words.length <= maxWords) {
            return text;
        }

        return words.slice(0, maxWords).join(' ') + '...';
    };

    return (
        <div className="hidden md:flex h-full" style={{ width: `${rightPanelWidth}px` }}>
            <div onMouseDown={() => setIsResizing(true)} className="w-3 cursor-col-resize relative z-30">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-12 w-2 rounded-md bg-muted-foreground/40 hover:bg-primary transition-colors cursor-pointer" />
            </div>
            <aside className="w-full flex flex-col overflow-hidden">
                <Card className="flex-1 rounded-none border-0 shadow-none overflow-hidden">
                    <CardContent className="p-0 relative flex flex-col h-full">
                        {/* Graph content - 50% height */}
                        <div className="w-full h-1/2 relative overflow-hidden">
                            {graphView === '2d' && (
                                <ChatGraph2D
                                    height={window.innerHeight * 0.5}
                                    width={rightPanelWidth}
                                    layers={graphLayers}
                                    data={currentMessage}
                                    handleCardData={handleCardData}
                                />
                            )}
                            {graphView === '3d' && (
                                <ChatGraph3D
                                    height={window.innerHeight * 0.5}
                                    width={rightPanelWidth}
                                    data={currentMessage}
                                    layers={graphLayers}
                                    handleCardData={handleCardData}
                                />
                            )}

                            {/* Menu overlay on graph */}
                            <div className="absolute top-3 left-3 right-3 z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Tabs value={graphView} onValueChange={setGraphView}>
                                            <TabsList className="w-fit grid grid-cols-2">
                                                <TabsTrigger value="2d" className="text-[12px] py-1 px-2">
                                                    2D
                                                </TabsTrigger>
                                                <TabsTrigger value="3d" className="text-[12px] py-1 px-2">
                                                    3D
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                {graphLayers.map(({ id, enabled, name }) => {
                                                    const enabledLayersCount = graphLayers.filter(
                                                        (layer) => layer.enabled,
                                                    ).length;
                                                    const isLastEnabled = enabled && enabledLayersCount === 1;

                                                    return (
                                                        <DropdownMenuCheckboxItem
                                                            key={id}
                                                            checked={enabled}
                                                            onSelect={(event) => event.preventDefault()}
                                                            onCheckedChange={(checked) => {
                                                                if (!checked && isLastEnabled) return;

                                                                setGraphLayers((prevLayers) =>
                                                                    prevLayers.map((layer) =>
                                                                        layer.id === id
                                                                            ? { ...layer, enabled: checked }
                                                                            : layer,
                                                                    ),
                                                                );
                                                            }}
                                                            disabled={isLastEnabled}
                                                        >
                                                            {name}
                                                        </DropdownMenuCheckboxItem>
                                                    );
                                                })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="flex items-center gap-1">
                                            <div
                                                className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                                onClick={() => setIsOpenGraphModal(true)}
                                            >
                                                <Expand className="h-4 w-4" />
                                            </div>
                                            <div
                                                className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                                onClick={() => zoomToFitGraph()}
                                                title="Zoom to Fit Graph"
                                            >
                                                <Fullscreen className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accordion with padding - 50% height */}
                        <div className="flex-1 px-3 py-2 overflow-hidden">
                            <Accordion type="multiple" className="w-full h-full overflow-y-auto">
                                {Object.entries(groupedNodes).map(([groupKey, nodes]) => {
                                    const groupDisplayName = getGroupDisplayName(groupKey, nodes);
                                    const totalLinkedNodes = nodes.reduce((acc, node) => {
                                        return acc + (nodeConnections[node.id] || []).length;
                                    }, 0);

                                    return (
                                        <AccordionItem
                                            key={groupKey}
                                            value={groupKey}
                                            className="transition-all duration-300"
                                        >
                                            <AccordionTrigger>
                                                <div className="text-left flex items-center gap-2 w-full">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-semibold">
                                                                {truncateText(groupDisplayName)}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-sm text-muted-foreground">
                                                                    ({nodes.length} node{nodes.length !== 1 ? 's' : ''})
                                                                </span>
                                                                {totalLinkedNodes > 0 && (
                                                                    <>
                                                                        <Link className="w-4 h-4 text-blue-500" />
                                                                        <span className="text-sm text-blue-500">
                                                                            {totalLinkedNodes}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-4">
                                                {nodes.map((node: any) => {
                                                    const linkedNodes = nodeConnections[node.id] || [];
                                                    const hasLinkedNodes = linkedNodes.length > 0;

                                                    return (
                                                        <div key={node.id} className="border-l-2 border-muted pl-4">
                                                            <div className="flex items-start gap-2 mb-2">
                                                                {node.layerColor && (
                                                                    <div
                                                                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                                                                        style={{ backgroundColor: node.layerColor }}
                                                                    />
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <div className="font-medium text-sm">
                                                                            {node.labels?.[0] ?? 'Node'}
                                                                        </div>
                                                                        {hasLinkedNodes && (
                                                                            <div className="flex items-center gap-1">
                                                                                <Link className="w-3 h-3 text-blue-500" />
                                                                                <span className="text-xs text-blue-500">
                                                                                    {linkedNodes.length}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground mb-2">
                                                                        {node.number && `№ ${node.number}`}{' '}
                                                                        {node.neutralCitation &&
                                                                            `— ${node.neutralCitation}`}
                                                                    </div>
                                                                    <div className="text-sm whitespace-pre-wrap mb-3">
                                                                        {node.content}
                                                                    </div>

                                                                    {hasLinkedNodes && (
                                                                        <div className="border-t pt-3 mt-3">
                                                                            <h5 className="font-medium text-xs mb-2 flex items-center gap-1">
                                                                                <Link className="w-3 h-3" />
                                                                                Related ({linkedNodes.length})
                                                                            </h5>
                                                                            <div className="space-y-1">
                                                                                {linkedNodes.map((linkedNode) => (
                                                                                    <div
                                                                                        key={linkedNode.id}
                                                                                        className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs hover:bg-muted/50 transition-colors cursor-pointer"
                                                                                        onClick={() => {
                                                                                            zoomToNodeGraph({
                                                                                                id: linkedNode.id,
                                                                                                x: linkedNode.x,
                                                                                                y: linkedNode.y,
                                                                                            });
                                                                                        }}
                                                                                    >
                                                                                        {linkedNode.layerColor && (
                                                                                            <div
                                                                                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                                                style={{
                                                                                                    backgroundColor:
                                                                                                        linkedNode.layerColor,
                                                                                                }}
                                                                                            />
                                                                                        )}
                                                                                        <div className="flex-1 min-w-0">
                                                                                            <div className="font-medium truncate">
                                                                                                {linkedNode
                                                                                                    .labels?.[0] ??
                                                                                                    'Node'}
                                                                                            </div>
                                                                                            {linkedNode.neutralCitation && (
                                                                                                <div className="text-muted-foreground truncate">
                                                                                                    {
                                                                                                        linkedNode.neutralCitation
                                                                                                    }
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                        <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
};

export default ChatRightPanel;
