import React from 'react';
import { motion } from 'framer-motion';

interface SidebarMenuGroupProps {
    label: string;
    children: React.ReactNode;
    collapsed?: boolean;
}

export function SidebarMenuGroup({ label, children, collapsed = false }: SidebarMenuGroupProps) {
    return (
        <div className="mb-1">
            <div className="flex items-center px-2 min-h-[32px]">
                <motion.div
                    className="text-xs font-medium text-default"
                    animate={{ opacity: collapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                    {label}
                </motion.div>
            </div>
            <ul className="flex flex-col gap-[0.35rem]">{children}</ul>
        </div>
    );
}
