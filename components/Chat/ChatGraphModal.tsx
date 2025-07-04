'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import DialogContent, { Dialog, DialogBody, DialogHeader } from '../ui/dialog';
import ChatGraph2D from './ChatGraph2D';
import ChatGraph3D from './ChatGraph3D';

interface ChatGraphModalProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    graphType: string;
}

const ChatGraphModal = ({ open, onOpenChange, graphType }: ChatGraphModalProps) => {
    const direction = useDirection();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-fit" dir={direction}>
                <DialogHeader />
                <DialogBody>
                    {graphType === '2d' && <ChatGraph2D />}
                    {graphType === '3d' && <ChatGraph3D />}
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
};

export default ChatGraphModal;
