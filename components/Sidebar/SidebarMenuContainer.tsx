'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { SidebarMenu } from './SidebarMenu';

interface SidebarMenuContainerProps {
    isOpenMobile?: boolean;
    onOpenMobileChange?: (open: boolean) => void;
    collapsed?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
}

export const SidebarMenuContainer: React.FC<SidebarMenuContainerProps> = ({
    isOpenMobile,
    onOpenMobileChange,
    collapsed: collapsedProp,
    onCollapseChange,
}) => {
    const isMobile = useIsMobile();
    const [internalOpen, setInternalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const open = typeof isOpenMobile === 'boolean' ? isOpenMobile : internalOpen;
    const setOpen = onOpenMobileChange || setInternalOpen;
    const isCollapsed = typeof collapsedProp === 'boolean' ? collapsedProp : collapsed;

    const handleCollapse = () => {
        if (onCollapseChange) onCollapseChange(true);
        else setCollapsed(true);
    };
    const handleExpand = () => {
        if (onCollapseChange) onCollapseChange(false);
        else setCollapsed(false);
    };

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="p-0 w-[80vw] max-w-xs border-0 dark:border-none">
                    <SheetTitle></SheetTitle>
                    <SidebarMenu onOpenMobileChange={setOpen} />
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 60 : 260 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="h-[calc(100vh-82px)] min-w-0 bg-background border-r flex flex-col z-30 fixed left-0 overflow-hidden top-[82px]"
        >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-end'} p-2`}>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    onClick={() => {
                        if (isCollapsed) handleExpand();
                        else handleCollapse();
                    }}
                >
                    {isCollapsed ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
                </Button>
            </div>
            <SidebarMenu collapsed={isCollapsed} />
        </motion.aside>
    );
};

export default SidebarMenuContainer;
