'use client';

import { useEffect, useState } from 'react';
import { getMeClient } from '@/api/auth/getMeClient';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/providers/user-provider';
import Header from '@/components/Header/Header';
import SidebarMenuContainer from '@/components/Sidebar/SidebarMenuContainer';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useIsMobile();
    const { setUser } = useUser();

    useEffect(() => {
        (async () => {
            const user = await getMeClient();
            if (user) {
                setUser(user);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="flex flex-col w-full items-center justify-center">
            <Header onOpenSidebar={() => setSidebarOpen(true)} />
            <div className="flex flex-row w-full relative">
                <div className="hidden md:block h-screen">
                    <SidebarMenuContainer
                        isOpenMobile={sidebarOpen}
                        onOpenMobileChange={setSidebarOpen}
                        collapsed={collapsed}
                        onCollapseChange={setCollapsed}
                    />
                </div>

                <main className="flex-1 min-h-screen w-full flex justify-center">
                    <motion.div
                        className="w-full max-w-5xl px-4"
                        animate={{
                            marginLeft: isMobile ? 0 : collapsed ? 0 : 260,
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
