'use client';

import { MoreVertical } from 'lucide-react';
import { MenuItem } from '@/types/MenuItem';
import { Button } from '../../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const RecursiveMenuItem = ({ item }: { item: MenuItem }) => {
    if (item.items) {
        return (
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <item.icon />
                    <span>{item.label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    {item.items.map((subItem, index) => (
                        <RecursiveMenuItem key={index} item={subItem} />
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        );
    }

    return (
        <DropdownMenuItem onClick={item.onClick}>
            <item.icon />
            <span>{item.label}</span>
        </DropdownMenuItem>
    );
};

const RecursiveDropdown = ({ items }: { items: MenuItem[] }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
                {items.map((item, index) => (
                    <RecursiveMenuItem key={index} item={item} />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default RecursiveDropdown;
