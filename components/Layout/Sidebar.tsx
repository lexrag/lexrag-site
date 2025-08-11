'use client';

import React from 'react';

interface SidebarProps {
    header?: React.ReactNode;
    menu?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    width?: string;
    zIndex?: string;
}

export function Sidebar({ header, menu, footer, className = '', width = 'w-64', zIndex = 'z-20' }: SidebarProps) {
    return (
        <div
            className={`fixed top-0 bottom-0 ${zIndex} lg:flex flex-col shrink-0 ${width} bg-background dark:bg-background ${className}`}
        >
            {header && <div className="flex-shrink-0">{header}</div>}
            {menu && <div className="flex-1 overflow-hidden">{menu}</div>}
            {footer && <div className="flex-shrink-0">{footer}</div>}
        </div>
    );
}
