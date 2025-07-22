import React from 'react';

interface SidebarMenuGroupProps {
    label: string;
    children: React.ReactNode;
}

export function SidebarMenuGroup({ label, children }: SidebarMenuGroupProps) {
    return (
        <div className="mb-1">
            <div className="px-2 py-1.5 text-xs font-medium text-default">{label}</div>
            <ul className="flex flex-col gap-[0.35rem]">{children}</ul>
        </div>
    );
}
