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
            <motion.div
                className="px-2 py-1.5 text-xs font-medium text-default"
                animate={{ opacity: collapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            >
                {label}
            </motion.div>
            <ul className="flex flex-col gap-[0.35rem]">{children}</ul>
        </div>
    );
}
