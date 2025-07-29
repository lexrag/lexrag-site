'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import { GraphData, GraphLayer } from '@/types/Graph';
import DialogContent, { Dialog, DialogBody, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ChatGraph2D from './ChatGraph2D';
import ChatGraph3D from './ChatGraph3D';

interface ChatGraphModalProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    graphView: string;
    graphLayers: GraphLayer[];
    data: GraphData;
    handleCardData: Dispatch<SetStateAction<any>>;
}

const ChatGraphModal = ({ open, onOpenChange, graphView, graphLayers, data, handleCardData }: ChatGraphModalProps) => {
    const direction = useDirection();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [scrollToCardId, setScrollToCardId] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false);

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [nodeHierarchy, setNodeHierarchy] = useState<Record<string, Set<string>>>({});
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-fit" dir={direction}>
                <Tabs defaultValue={graphView} className="w-full text-sm text-muted-foreground">
                    <DialogHeader className="flex-row items-center gap-2">
                        <DialogTitle className="sr-only">Chat Graph Modal</DialogTitle>
                        <TabsList className="grid w-fit grid-cols-2">
                            <TabsTrigger value="2d" title="Switch to 2D Graph View">2D</TabsTrigger>
                            <TabsTrigger value="3d" title="Switch to 3D Graph View">3D</TabsTrigger>
                        </TabsList>
                    </DialogHeader>
                    <DialogBody>
                        <TabsContent value="2d">
                            <ChatGraph2D 
                                data={data} 
                                layers={graphLayers} 
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
                        </TabsContent>
                        <TabsContent value="3d">
                            <ChatGraph3D 
                                data={data} 
                                layers={graphLayers} 
                                handleCardData={handleCardData} 
                                handleScrollToCardId={setScrollToCardId}
                                isOrbitEnabled={isOrbitEnabled}
                                expandedNodes={expandedNodes}
                                setExpandedNodes={setExpandedNodes}
                                nodeHierarchy={nodeHierarchy}
                                setNodeHierarchy={setNodeHierarchy}
                                expandedData={expandedData}
                                setExpandedData={setExpandedData}
                                loadingNodes={loadingNodes}
                                setLoadingNodes={setLoadingNodes}
                            />
                        </TabsContent>
                    </DialogBody>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ChatGraphModal;
