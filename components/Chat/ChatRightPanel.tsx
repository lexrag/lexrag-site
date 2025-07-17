'use client';

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import { ArrowRight, Link } from 'lucide-react';
import { CardData } from '@/types/Chat';
import { GraphLayer } from '@/types/Graph';
import { Card, CardContent } from '@/components/ui/card';
import ChatGraph2D from '@/components/Chat/ChatGraph2D';
import ChatGraph3D from '@/components/Chat/ChatGraph3D';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface ChatRightPanelProps {
    currentMessage: any;
    graphLayers: GraphLayer[];
    cardData: CardData;
    graphView: string;
    handleCardData: Dispatch<SetStateAction<CardData>>;
}

const ChatRightPanel = ({ currentMessage, graphLayers, cardData, graphView, handleCardData }: ChatRightPanelProps) => {
    const [rightPanelWidth, setRightPanelWidth] = useState<number>(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);

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
            setRightPanelWidth(Math.max(width * 0.25, Math.min(newWidth, width * 0.5)));
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
            <div onMouseDown={() => setIsResizing(true)} className="w-3 cursor-col-resize relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-12 w-2 rounded-md bg-muted-foreground/40 hover:bg-primary transition-colors cursor-pointer" />
            </div>
            <aside className="w-full pt-10">
                <Card className="h-full rounded-none border-0 shadow-none">
                    <CardContent className="p-0 pt-4 px-2">
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
                            />
                        )}

                        <Accordion
                            type="multiple"
                            className="w-full flex-none overflow-y-auto"
                            style={{ height: '50%' }}
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
                                                // onClick={() => zoomToNodeGraph({ x: node.x, y: node.y })}
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
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
};

export default ChatRightPanel;
