'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import { GraphData, GraphLayer } from '@/types/Graph';
import DialogContent, { Dialog, DialogBody, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Globe } from 'lucide-react';
import ChatGraph2D from './ChatGraph2D';
import ChatGraph3D from './ChatGraph3D';

interface ChatGraphModalProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    graphView: string;
    setGraphView: (view: string) => void;
    graphLayers: GraphLayer[];
    data: GraphData;
    handleCardData: Dispatch<SetStateAction<any>>;
}

const ChatGraphModal = ({ open, onOpenChange, graphView, setGraphView, graphLayers, data, handleCardData }: ChatGraphModalProps) => {
    const direction = useDirection();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [scrollToCardId, setScrollToCardId] = useState<string>('');
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false);

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [nodeHierarchy, setNodeHierarchy] = useState<Record<string, Set<string>>>({});
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-fit" dir={direction}>
                <Tabs value={graphView} onValueChange={setGraphView} className="w-full text-sm text-muted-foreground">
                    <DialogHeader className="flex-row items-center gap-2">
                        <DialogTitle className="sr-only">Chat Graph Modal</DialogTitle>
                        <div className="flex items-center gap-2">
                            <TabsList className="grid w-fit grid-cols-2">
                                <TabsTrigger value="2d" title="Switch to 2D Graph View">2D</TabsTrigger>
                                <TabsTrigger value="3d" title="Switch to 3D Graph View">3D</TabsTrigger>
                            </TabsList>
                            {graphView === '3d' && (
                                <div
                                    onClick={() => setIsOrbitEnabled(!isOrbitEnabled)}
                                    className={`flex items-center justify-center w-8 h-8 rounded-md border transition-colors cursor-pointer ${
                                        isOrbitEnabled
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-background border-input hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                    title={isOrbitEnabled ? 'Disable Camera Orbit' : 'Enable Camera Orbit'}
                                >
                                    <Globe className={`h-4 w-4 ${isOrbitEnabled ? 'animate-spin' : ''}`} />
                                </div>
                            )}
                        </div>
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
                        </TabsContent>
                    </DialogBody>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ChatGraphModal;
