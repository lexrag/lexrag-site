'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import { ArrowRight, Link, Layers, Expand, Fullscreen, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
import { CardData } from '@/types/Chat';
import { GraphLayer } from '@/types/Graph';
import ChatGraph2D from '@/components/Chat/ChatGraph2D';
import ChatGraph3D from '@/components/Chat/ChatGraph3D';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface ChatRightSheetProps {
    isOpen: boolean;
    handleOpen: Dispatch<SetStateAction<boolean>>;
    graphView: string;
    setGraphView: (view: string) => void;
    graphLayers: GraphLayer[];
    setGraphLayers: Dispatch<SetStateAction<GraphLayer[]>>;
    setIsOpenGraphModal: (open: boolean) => void;
    currentMessage: any;
    cardData: CardData;
    handleCardData: Dispatch<SetStateAction<CardData>>;
}

const ChatRightSheet = ({
    isOpen,
    handleOpen,
    graphView,
    setGraphView,
    graphLayers,
    setGraphLayers,
    setIsOpenGraphModal,
    currentMessage,
    cardData,
    handleCardData,
}: ChatRightSheetProps) => {
    const direction = useDirection();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [scrollToCardId, setScrollToCardId] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false);

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [nodeHierarchy, setNodeHierarchy] = useState<Record<string, Set<string>>>({});
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());

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
        if (!scrollToCardId || !cardData.nodes) return;

        const targetNode = cardData.nodes.find((node) => node.id === scrollToCardId);
        if (targetNode && targetNode.x !== undefined && targetNode.y !== undefined) {
            zoomToNodeGraph({
                id: scrollToCardId,
                x: targetNode.x,
                y: targetNode.y,
                z: targetNode.z,
                duration: 1000,
            });
        }
    }, [scrollToCardId, cardData.nodes]);

    return (
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTitle />
            <SheetContent side="right" dir={direction} close={false} className="p-0 w-full max-w-none">
                <Card className="h-full rounded-none border-0">
                    <CardHeader className="border-none p-3 bg-background sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Tabs value={graphView} onValueChange={setGraphView}>
                                    <TabsList className="w-fit grid grid-cols-2">
                                        <TabsTrigger value="2d" className="text-[12px] py-1 px-2" title="Switch to 2D Graph View">
                                            2D
                                        </TabsTrigger>
                                        <TabsTrigger value="3d" className="text-[12px] py-1 px-2" title="Switch to 3D Graph View">
                                            3D
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div 
                                            className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                            title="Toggle Graph Layers"
                                        >
                                            <Layers className="h-4 w-4" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48">
                                        {graphLayers.map(({ id, enabled, name }) => {
                                            const enabledLayersCount = graphLayers.filter((layer) => layer.enabled).length;
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
                                                                layer.id === id ? { ...layer, enabled: checked } : layer,
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
                                            title="Expand Graph to Full Screen"
                                        >
                                            <Expand className="h-4 w-4" />
                                        </div>
                                        <div 
                                            className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                            onClick={() => zoomToFitGraph()}
                                            title="Zoom to Fit All Nodes"
                                        >
                                            <Fullscreen className="h-4 w-4" />
                                        </div>
                                    </div>
                                    
                                    {/* Close button */}
                                    <div 
                                        className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                        onClick={() => handleOpen(false)}
                                        title="Close Panel"
                                    >
                                        <X className="h-4 w-4" />
                                    </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 relative flex flex-col h-full">
                        {/* Graph content - 50% height */}
                        <div className="w-full h-1/2 relative overflow-hidden">
                            {graphView === '2d' && (
                                <ChatGraph2D
                                    height={window.innerHeight * 0.5}
                                    width={window.innerWidth * 1}
                                    layers={graphLayers}
                                    data={currentMessage}
                                    handleCardData={handleCardData}
                                    handleScrollToCardId={setScrollToCardId}
                                    expandedNodes={expandedNodes}
                                    setExpandedNodes={setExpandedNodes}
                                    nodeHierarchy={nodeHierarchy}
                                    setNodeHierarchy={setNodeHierarchy}
                                    expandedData={expandedData}
                                    setExpandedData={setExpandedData}
                                    loadingNodes={loadingNodes}
                                    setLoadingNodes={setLoadingNodes}
                                />
                            )}
                            {graphView === '3d' && (
                                <ChatGraph3D
                                    height={window.innerHeight * 0.5}
                                    width={window.innerWidth * 1}
                                    data={currentMessage}
                                    layers={graphLayers}
                                    handleCardData={handleCardData}
                                    handleScrollToCardId={setScrollToCardId}
                                    isOrbitEnabled={isOrbitEnabled}
                                    setIsOrbitEnabled={setIsOrbitEnabled}
                                    expandedNodes={expandedNodes}
                                    setExpandedNodes={setExpandedNodes}
                                    nodeHierarchy={nodeHierarchy}
                                    setNodeHierarchy={setNodeHierarchy}
                                    expandedData={expandedData}
                                    setExpandedData={setExpandedData}
                                    loadingNodes={loadingNodes}
                                    setLoadingNodes={setLoadingNodes}
                                />
                            )}
                        </div>

                        {/* Accordion with padding - 50% height */}
                        <div className="flex-1 px-3 py-2 overflow-hidden">
                            <Accordion
                                type="multiple"
                                className="w-full h-full overflow-y-auto"
                            >
                                {cardData.nodes.map((node: any) => {
                                    const linkedNodes = nodeConnections[node.id] || [];
                                    const hasLinkedNodes = linkedNodes.length > 0;

                                    return (
                                        <AccordionItem
                                            key={node.id}
                                            value={node.id}
                                            className="transition-all duration-300"
                                        >
                                            <AccordionTrigger>
                                                <div
                                                    className="text-left flex items-center gap-2 w-full"
                                                >
                                                    {node.layerColor && (
                                                        <div
                                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                                            style={{ backgroundColor: node.layerColor }}
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-semibold">
                                                                {node.labels?.[0] ?? 'Node'}
                                                            </div>
                                                            {hasLinkedNodes && (
                                                                <div className="flex items-center gap-1">
                                                                    <Link className="w-4 h-4 text-blue-500" />
                                                                    <span className="text-sm text-blue-500">
                                                                        {linkedNodes.length}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {node.number && `№ ${node.number}`}{' '}
                                                            {node.neutralCitation && `— ${node.neutralCitation}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="whitespace-pre-wrap">
                                                <div className="mb-4">{node.content}</div>

                                                {hasLinkedNodes && (
                                                    <div className="border-t pt-4">
                                                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                                                            <Link className="w-4 h-4" />
                                                            Related Nodes ({linkedNodes.length})
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {linkedNodes.map((linkedNode) => (
                                                                <div
                                                                    key={linkedNode.id}
                                                                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
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
                                                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                                                            style={{
                                                                                backgroundColor: linkedNode.layerColor,
                                                                            }}
                                                                        />
                                                                    )}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-medium text-sm truncate">
                                                                            {linkedNode.labels?.[0] ?? 'Node'}
                                                                        </div>
                                                                        <div className="text-xs text-muted-foreground truncate">
                                                                            {linkedNode.neutralCitation ||
                                                                                (linkedNode.content &&
                                                                                linkedNode.content.length > 100
                                                                                    ? linkedNode.content.substring(0, 100) +
                                                                                      '...'
                                                                                    : linkedNode.content)}
                                                                        </div>
                                                                    </div>
                                                                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </div>
                    </CardContent>
                </Card>
            </SheetContent>
        </Sheet>
    );
};

export default ChatRightSheet;
