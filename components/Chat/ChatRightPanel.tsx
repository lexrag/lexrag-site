'use client';

import { useEffect, useMemo, useState } from 'react';
import { genHierarchicalTree } from '@/utils/genRandomTree';
import { Card, CardContent } from '@/components/ui/card';
import ChatGraph2D from '@/components/Chat/ChatGraph2D';
import ChatGraph3D from '@/components/Chat/ChatGraph3D';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface ChatRightPanelProps {
    currentRelevantContext: any;
    panelView: string;
    graphView: string;
}

const ChatRightPanel = ({ currentRelevantContext, panelView, graphView }: ChatRightPanelProps) => {
    const [rightPanelWidth, setRightPanelWidth] = useState<number>(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [selectedRelevantContext, setSelectedRelevantContext] = useState<any>();

    useEffect(() => {
        setRightPanelWidth(window.innerWidth * 0.25);
    }, []);

    useEffect(() => {
        setSelectedRelevantContext(null);
    }, [currentRelevantContext, panelView, graphView]);

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

    const data = useMemo(() => genHierarchicalTree(5, 3), []);

    return (
        <div className="hidden md:flex h-full" style={{ width: `${rightPanelWidth}px` }}>
            <div onMouseDown={() => setIsResizing(true)} className="w-3 cursor-col-resize relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-12 w-2 rounded-md bg-muted-foreground/40 hover:bg-primary transition-colors cursor-pointer" />
            </div>
            <aside className="w-full overflow-y-auto pt-10">
                <Card className="h-full rounded-none border-0 shadow-none">
                    <CardContent className="p-0 pt-4 px-2">
                        {panelView === 'card' && (
                            <Accordion type="multiple" className="w-full">
                                {currentRelevantContext?.nodes &&
                                    currentRelevantContext.nodes.map((node: any) => (
                                        <AccordionItem key={node.id} value={node.id}>
                                            <AccordionTrigger>
                                                <div className="text-left">
                                                    <div className="font-semibold">{node.labels?.[0] ?? 'Node'}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {node.number && `№ ${node.number}`}{' '}
                                                        {node.neutralCitation && `— ${node.neutralCitation}`}
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="whitespace-pre-wrap">
                                                {/* {node.date && (
                                                <div className="text-sm mb-2 text-muted-foreground">
                                                    Date: {new Date(node.date).toLocaleDateString()}
                                                </div>
                                            )} */}
                                                {node.semanticSection && (
                                                    <div className="text-sm mb-2 text-muted-foreground">
                                                        Section: {node.semanticSection}
                                                    </div>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                            </Accordion>
                        )}

                        {panelView === 'graph' && graphView === '2d' && (
                            <ChatGraph2D
                                height={window.innerHeight * 0.6}
                                width={rightPanelWidth}
                                data={data}
                                handleSelectedRelevantContext={setSelectedRelevantContext}
                            />
                        )}
                        {panelView === 'graph' && graphView === '3d' && (
                            <ChatGraph3D height={window.innerHeight * 0.6} width={rightPanelWidth} data={data} />
                        )}
                        {panelView === 'graph' && !!selectedRelevantContext && (
                            <Accordion type="multiple" className="w-full">
                                <AccordionItem value={selectedRelevantContext.id} className="border-none">
                                    <AccordionTrigger>
                                        <div className="text-left">
                                            <div className="font-semibold">
                                                {selectedRelevantContext.labels?.[0] ?? 'Node'}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {selectedRelevantContext.number &&
                                                    `№ ${selectedRelevantContext.number}`}{' '}
                                                {selectedRelevantContext.neutralCitation &&
                                                    `— ${selectedRelevantContext.neutralCitation}`}
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="whitespace-pre-wrap">
                                        {selectedRelevantContext.semanticSection && (
                                            <div className="text-sm mb-2 text-muted-foreground">
                                                Section: {selectedRelevantContext.semanticSection}
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
};

export default ChatRightPanel;
