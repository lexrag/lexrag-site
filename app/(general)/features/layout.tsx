'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header/Header';
import SidebarMenuContainer from '@/components/Sidebar/SidebarMenuContainer';

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useIsMobile();

    return (
        <section className="flex flex-col w-full items-center justify-center">
            <Header onOpenSidebar={() => setSidebarOpen(true)} />
            <div className="flex flex-row w-full relative">
                <div className="h-screen hidden md:block">
                    <SidebarMenuContainer
                        isOpenMobile={sidebarOpen}
                        onOpenMobileChange={setSidebarOpen}
                        collapsed={collapsed}
                        onCollapseChange={setCollapsed}
                    />
                </div>
                <main className="flex-1 min-h-screen w-full flex justify-center">
                    <motion.div
                        className="w-full"
                        animate={{
                            marginLeft: isMobile ? 0 : collapsed ? 60 : 260,
                        }}
                        transition={{ type: 'tween', duration: 0.35 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </section>
    );
}
