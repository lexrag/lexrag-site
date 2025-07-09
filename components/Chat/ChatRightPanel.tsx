'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ChatGraph2D from '@/components/Chat/ChatGraph2D';
import ChatGraph3D from '@/components/Chat/ChatGraph3D';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface ChatRightPanelProps {
    panelView: string;
    graphView: string;
}

const ChatRightPanel = ({ panelView, graphView }: ChatRightPanelProps) => {
    const [rightPanelWidth, setRightPanelWidth] = useState<number>(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);

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
            <aside className="w-full overflow-y-auto pt-10">
                <Card className="h-full rounded-none border-0 shadow-none">
                    <CardContent className="p-0 pt-4 px-2">
                        {panelView === 'card' &&
                            [1, 2, 3].map((item) => (
                                <Accordion key={item} type="single" collapsible className="w-full lg:w-[75%]">
                                    <AccordionItem value="reui-1">
                                        <AccordionTrigger>What is ReUI?</AccordionTrigger>
                                        <AccordionContent>
                                            ReUI provides ready-to-use CRUD examples for developers.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))}
                        {panelView === 'graph' && graphView === '2d' && (
                            <ChatGraph2D height={window.innerHeight * 0.6} width={rightPanelWidth} />
                        )}
                        {panelView === 'graph' && graphView === '3d' && (
                            <ChatGraph3D height={window.innerHeight * 0.6} width={rightPanelWidth} />
                        )}
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
};

export default ChatRightPanel;
