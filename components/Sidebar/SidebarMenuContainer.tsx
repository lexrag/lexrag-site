import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const open = typeof isOpenMobile === 'boolean' ? isOpenMobile : internalOpen;
    const setOpen = onOpenMobileChange || setInternalOpen;
    const isCollapsed = typeof collapsedProp === 'boolean' ? collapsedProp : collapsed;

    useEffect(() => {
        if (!isCollapsed) setSidebarVisible(true);
    }, [isCollapsed]);

    const handleCollapse = () => {
        if (onCollapseChange) onCollapseChange(true);
        else setCollapsed(true);
    };
    const handleExpand = () => {
        setSidebarVisible(true);
        if (onCollapseChange) onCollapseChange(false);
        else setCollapsed(false);
    };

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="p-0 w-[80vw] max-w-xs">
                    <SheetTitle></SheetTitle>
                    <SidebarMenu />
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <>
            {isCollapsed && !isSidebarVisible && (
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Expand sidebar"
                    onClick={handleExpand}
                    className="fixed top-24 left-0 z-40 bg-background border border-r-0 rounded-r-md shadow p-2 flex items-center justify-center hover:bg-accent h-10"
                >
                    <ChevronRight className="size-5" />
                </Button>
            )}

            <AnimatePresence>
                {isSidebarVisible && (
                    <motion.aside
                        className="h-full min-w-0 max-w-[260px] bg-background border-r flex flex-col z-30 fixed top-[82px] left-0"
                        initial={{ x: -260, opacity: 0 }}
                        animate={{ x: isCollapsed ? -260 : 0, opacity: 1, width: isCollapsed ? 0 : 260 }}
                        exit={{ x: -260, opacity: 0, width: 0 }}
                        transition={{ type: 'tween', duration: 0.35 }}
                        onAnimationComplete={() => {
                            if (isCollapsed) setSidebarVisible(false);
                        }}
                    >
                        <div className="flex items-center justify-end p-2">
                            <Button variant="ghost" size="icon" aria-label="Collapse sidebar" onClick={handleCollapse}>
                                <ChevronRight className="size-5 rotate-180" />
                            </Button>
                        </div>
                        <SidebarMenu />
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default SidebarMenuContainer;
