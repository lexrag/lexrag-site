'use client';

import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { RowProps } from '@/types/Rows';

const Row = ({
    label,
    children,
    actionIcon = (
        <Link href="/profile/settings">
            <FaRegEdit />
        </Link>
    ),
    onClick,
}: RowProps) => (
    <div className="flex items-center justify-between gap-2 p-4 text-sm border-b last:border-none">
        <div className="w-[25%] font-medium">{label}</div>
        <div className="flex-1 w-[55%] truncate ">{children}</div>
        <div className="w-[10%] flex justify-center text-gray-500 hover:text-primary cursor-pointer" onClick={onClick}>
            {actionIcon as React.ReactNode}
        </div>
    </div>
);

export default Row;
