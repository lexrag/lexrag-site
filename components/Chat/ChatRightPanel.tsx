'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import { Expand, Fullscreen, Layers } from 'lucide-react';
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
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

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

    // const truncateText = (text: string, maxWords: number = 5) => {
    //     if (!text) return text;

    //     const words = text.split(' ');
    //     if (words.length <= maxWords) {
    //         return text;
    //     }

    //     return words.slice(0, maxWords).join(' ') + '...';
    // };

    const getGroupDisplayName = (groupKey: string, nodes: any[]) => {
        // First, try to find a CaseLaw node (main case node)
        const caseNode = nodes.find((node) => node.labels?.includes('CaseLaw'));
        if (caseNode) {
            return caseNode.content;
            // return truncateText(caseNode.content, 5);
        }

        // For legislation nodes
        const firstNode = nodes[0];
        if (firstNode.id.includes('sso.agc.gov.sg')) {
            return firstNode.content || groupKey;
            // return truncateText(firstNode.content || groupKey, 5);
        }

        // For other custom nodes
        return firstNode.labels?.[0] || firstNode.content || groupKey;
        // return truncateText(firstNode.labels?.[0] || firstNode.content || groupKey, 5);
    };

    // Group nodes by their group keys and filter out unwanted nodes
    const groupedNodes = useMemo(() => {
        if (!cardData.nodes || cardData.nodes.length === 0) {
            return {};
        }

        const groups: { [key: string]: any[] } = {};

        cardData.nodes.forEach((node) => {
            // Skip PartOfTheLegislation nodes
            if (node.labels?.includes('PartOfTheLegislation')) {
                return;
            }

            const groupKey = getGroupKey(node.id);
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(node);
        });

        // Filter out CaseLaw nodes from being displayed as individual items
        // but keep them in the group for title extraction
        Object.keys(groups).forEach((groupKey) => {
            const filteredNodes = groups[groupKey].filter((node) => !node.labels?.includes('CaseLaw'));
            if (filteredNodes.length > 0) {
                groups[groupKey] = filteredNodes;
            } else {
                // If only CaseLaw node exists, keep the group but with empty nodes array
                groups[groupKey] = [];
            }
        });

        return groups;
    }, [cardData.nodes]);

    const handleGroupClick = (groupKey: string) => {
        setSelectedItem(selectedItem === groupKey ? null : groupKey);
    };

    const handleNodeClick = (nodeId: string, node: any) => {
        setSelectedItem(nodeId);
        if (node.x !== undefined && node.y !== undefined) {
            zoomToNodeGraph({
                id: nodeId,
                x: node.x,
                y: node.y,
            });
        }
    };

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
                                    const allGroupNodes =
                                        cardData.nodes?.filter(
                                            (node) =>
                                                !node.labels?.includes('PartOfTheLegislation') &&
                                                getGroupKey(node.id) === groupKey,
                                        ) || [];

                                    const groupDisplayName = getGroupDisplayName(groupKey, allGroupNodes);

                                    if (
                                        nodes.length === 0 &&
                                        !allGroupNodes.some((node) => node.labels?.includes('CaseLaw'))
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <AccordionItem
                                            key={groupKey}
                                            value={groupKey}
                                            // className={`transition-all duration-300 ${
                                            //     selectedItem === groupKey
                                            //         ? 'border-l-2 border-l-primary bg-primary/5'
                                            //         : 'hover:bg-muted/30'
                                            // }`}
                                        >
                                            <AccordionTrigger
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleGroupClick(groupKey);
                                                }}
                                                className="hover:no-underline"
                                            >
                                                <div className="text-left flex items-center gap-2 w-full">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-semibold">{groupDisplayName}</div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-sm text-muted-foreground">
                                                                    ({nodes.length} node{nodes.length !== 1 ? 's' : ''})
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-4">
                                                {nodes.length === 0 ? (
                                                    <div className="text-sm text-muted-foreground italic">
                                                        No detailed nodes available
                                                    </div>
                                                ) : (
                                                    nodes.map((node: any) => (
                                                        <div
                                                            key={node.id}
                                                            className={`border-l-2 border-muted pl-4 cursor-pointer transition-all duration-200 ${
                                                                selectedItem === node.id
                                                                    ? 'bg-primary/10 border-l-primary shadow-sm'
                                                                    : 'hover:bg-muted/20 hover:border-l-muted-foreground/50'
                                                            }`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleNodeClick(node.id, node);
                                                            }}
                                                        >
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
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground mb-2">
                                                                        {node.number && `№ ${node.number}`}{' '}
                                                                        {node.neutralCitation &&
                                                                            `— ${node.neutralCitation}`}
                                                                    </div>
                                                                    <div className="text-sm whitespace-pre-wrap mb-3">
                                                                        {node.content}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
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
