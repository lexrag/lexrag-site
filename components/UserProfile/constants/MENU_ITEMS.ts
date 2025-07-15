'use client';

import {
    ArrowDown,
    ArrowUp,
    Bell,
    Edit,
    File,
    FileDown,
    FileSpreadsheet,
    FileText,
    Mail,
    MessageSquare,
    Send,
    Settings,
    Trash,
} from 'lucide-react';
import { MenuItem } from '@/types/MenuItem';

export const MENU_ITEMS_TRUSTED_DEVICES: MenuItem[] = [
    {
        icon: File,
        label: 'View',
    },
    {
        icon: Bell,
        label: 'Export',
        items: [
            {
                icon: Mail,
                label: 'Email',
            },
            {
                icon: MessageSquare,
                label: 'SMS',
            },
            {
                icon: Send,
                label: 'Push',
            },
        ],
    },
    {
        icon: Edit,
        label: 'Edit',
    },
    {
        icon: Trash,
        label: 'Delete',
    },
];

export const MENU_ITEMS_LOGIN_SESSIONS: MenuItem[] = [
    {
        icon: FileDown,
        label: 'Export',
        items: [
            {
                icon: FileText,
                label: 'PDF',
            },
            {
                icon: FileSpreadsheet,
                label: 'CSV',
            },
            {
                icon: FileSpreadsheet,
                label: 'Excel',
            },
        ],
    },
    {
        icon: Settings,
        label: 'Settings',
    },
];

export const getSortMenuItems = (
    columnKey: string,
    currentDirection: 'asc' | 'desc',
    onSort: (key: string, direction: 'asc' | 'desc') => void,
) => [
    {
        label: 'Sort Ascending',
        onClick: () => onSort(columnKey, 'asc'),
        icon: ArrowUp,
        active: currentDirection === 'asc',
    },
    {
        label: 'Sort Descending',
        onClick: () => onSort(columnKey, 'desc'),
        icon: ArrowDown,
        active: currentDirection === 'desc',
    },
];
