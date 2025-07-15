'use client';

import React from 'react';
import { LoginSession } from '@/types/Session';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';

interface LoginSessionRowProps {
    session: LoginSession;
}

const LoginSessionRow = ({ session }: LoginSessionRowProps) => {
    console.log(session);
    return (
        <TableRow>
            <TableCell>
                <span className="text-sm font-medium hover:text-primary">{session.ip_address}</span>
            </TableCell>
            <TableCell>
                <span className="text-xs text-secondary-foreground">{session.device}</span>
            </TableCell>
            <TableCell>{formatDistanceToNow(new Date(session.last_seen), { addSuffix: true })}</TableCell>
        </TableRow>
    );
};

export default LoginSessionRow;
