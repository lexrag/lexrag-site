'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import HeaderCornerMenu from '../Header/HeaderCornerMenu';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';

interface ChatRightSheetProps {
    isOpen: boolean;
    handleOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatRightSheet = ({ isOpen, handleOpen }: ChatRightSheetProps) => {
    const direction = useDirection();

    return (
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTitle />
            <SheetContent side="right" dir={direction} close={false} className="p-0">
                <Card className="h-full rounded-none border-0">
                    <CardHeader className="border-none p-3">
                        <div className="w-fit ml-auto">
                            <HeaderCornerMenu />
                        </div>
                    </CardHeader>
                    <CardContent className="p-3 space-y-2"></CardContent>
                </Card>
            </SheetContent>
        </Sheet>
    );
};

export default ChatRightSheet;
