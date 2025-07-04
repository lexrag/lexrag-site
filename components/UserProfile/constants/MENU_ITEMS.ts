'use client';

import {
    ArrowDown,
    ArrowUp,
    FileDown,
    FileSpreadsheet,
    FileText,
    Mail,
    MessageSquare,
    Plus,
    Send,
    Settings,
    Upload,
} from 'lucide-react';
import { FaBell, FaEdit, FaFile, FaTrash } from 'react-icons/fa';
import { MenuItem } from '@/types/MenuItem';

export const MENU_ITEMS_TRUSTED_DEVICES: MenuItem[] = [
    {
        icon: FaFile,
        label: 'View',
    },
    {
        icon: FaBell,
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
        icon: FaEdit,
        label: 'Edit',
    },
    {
        icon: FaTrash,
        label: 'Delete',
    },
];

export const MENU_ITEMS_LOGIN_SESSIONS: MenuItem[] = [
    {
        icon: Plus,
        label: 'Add',
    },
    {
        icon: Upload,
        label: 'Import',
    },
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
