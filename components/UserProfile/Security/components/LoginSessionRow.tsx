'use client';

import React from 'react';
import { LoginSession } from '@/types/Session';
import { TableCell, TableRow } from '@/components/ui/table';

interface LoginSessionRowProps {
    session: LoginSession;
}

const LoginSessionRow = ({ session }: LoginSessionRowProps) => {
    return (
        <TableRow key={session.ip}>
            <TableCell>
                <span className="text-sm font-medium hover:text-primary">{session.ip}</span>
            </TableCell>
            <TableCell>
                <span className="text-xs text-secondary-foreground">{session.device}</span>
            </TableCell>
            <TableCell>{session.last_seen}</TableCell>
        </TableRow>
    );
};

export default LoginSessionRow;
