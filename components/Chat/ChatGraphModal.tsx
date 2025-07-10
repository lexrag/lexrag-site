'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import DialogContent, { Dialog, DialogBody, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ChatGraph2D from './ChatGraph2D';
import ChatGraph3D from './ChatGraph3D';

interface ChatGraphModalProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    graphView: string;
    currentRelevantContext: any;
}

const ChatGraphModal = ({ open, onOpenChange, graphView, currentRelevantContext }: ChatGraphModalProps) => {
    const direction = useDirection();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-fit" dir={direction}>
                <Tabs defaultValue={graphView} className="w-full text-sm text-muted-foreground">
                    <DialogHeader className="flex-row items-center gap-2">
                        <DialogTitle className="sr-only">Chat Graph Modal</DialogTitle>
                        <TabsList className="grid w-fit grid-cols-2">
                            <TabsTrigger value="2d">2D</TabsTrigger>
                            <TabsTrigger value="3d">3D</TabsTrigger>
                        </TabsList>
                    </DialogHeader>
                    <DialogBody>
                        <TabsContent value="2d">
                            <ChatGraph2D data={currentRelevantContext} />
                        </TabsContent>
                        <TabsContent value="3d">
                            <ChatGraph3D data={currentRelevantContext} />
                        </TabsContent>
                    </DialogBody>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ChatGraphModal;
