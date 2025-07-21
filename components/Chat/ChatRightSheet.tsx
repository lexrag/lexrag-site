'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import HeaderCornerMenu from '../Header/HeaderCornerMenu';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Layers, Expand, Fullscreen } from 'lucide-react';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
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
    graphLayers: any[];
    setGraphLayers: Dispatch<SetStateAction<any[]>>;
    setIsOpenGraphModal: (open: boolean) => void;
}

const ChatRightSheet = ({ isOpen, handleOpen, graphView, setGraphView, graphLayers, setGraphLayers, setIsOpenGraphModal }: ChatRightSheetProps) => {
    const direction = useDirection();

    return (
        <Sheet open={isOpen} onOpenChange={handleOpen}>
            <SheetTitle />
            <SheetContent side="right" dir={direction} close={false} className="p-0">
                <Card className="h-full rounded-none border-0">
                    <CardHeader className="border-none p-3 bg-background sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Tabs value={graphView} onValueChange={setGraphView}>
                                    <TabsList className="w-fit grid grid-cols-2">
                                        <TabsTrigger value="2d" className="text-[12px] py-1 px-2">
                                            2D
                                        </TabsTrigger>
                                        <TabsTrigger value="3d" className="text-[12px] py-1 px-2">
                                            3D
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
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
                                    >
                                        <Expand className="h-4 w-4" />
                                    </div>
                                    <div 
                                        className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                        onClick={() => zoomToFitGraph()}
                                    >
                                        <Fullscreen className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-fit">
                                <HeaderCornerMenu />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-3 space-y-2"></CardContent>
                </Card>
            </SheetContent>
        </Sheet>
    );
};

export default ChatRightSheet;
