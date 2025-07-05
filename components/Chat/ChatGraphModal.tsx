'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import { Expand, Shrink } from 'lucide-react';
import DialogContent, { Dialog, DialogBody, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import ChatGraph2D from './ChatGraph2D';
import ChatGraph3D from './ChatGraph3D';

interface ChatGraphModalProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const ChatGraphModal = ({ open, onOpenChange }: ChatGraphModalProps) => {
    const direction = useDirection();

    const [graphType, setGraphType] = useState<string>('2d');
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    useEffect(() => {
        if (!open) {
            setGraphType('2d');
            setIsFullScreen(false);
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-fit" dir={direction}>
                <DialogHeader className="flex-row items-center gap-2">
                    <DialogTitle className="sr-only">Chat Graph Modal</DialogTitle>
                    {isFullScreen ? (
                        <Shrink onClick={() => setIsFullScreen(false)} />
                    ) : (
                        <Expand onClick={() => setIsFullScreen(true)} />
                    )}
                    <div className="flex items-center gap-2 justify-between">
                        2D
                        <Switch size="sm" onCheckedChange={(chacked) => setGraphType(chacked ? '3d' : '2d')} />
                        3D
                    </div>
                </DialogHeader>
                <DialogBody>
                    {graphType === '2d' && <ChatGraph2D isFullScreen={isFullScreen} />}
                    {graphType === '3d' && <ChatGraph3D isFullScreen={isFullScreen} />}
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
};

export default ChatGraphModal;
