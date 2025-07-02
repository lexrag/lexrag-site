import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RowProps } from '@/types/Rows';

const Row = ({ label, children, actionIcon = <FaRegEdit /> }: RowProps) => (
    <div className="flex items-center justify-between gap-2 py-4 border-b border-dashed last:border-none text-sm">
        <div className="w-[25%] font-medium">{label}</div>
        <div className="flex-1 w-[55%] truncate ">{children}</div>
        <div className="w-[10%] flex justify-center text-gray-500 hover:text-primary cursor-pointer">{actionIcon}</div>
    </div>
);

export default Row;
