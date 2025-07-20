'use client';

import React from 'react';
import { getSessionStatus } from '@/utils/getSessionStatus';
import { LoginSession } from '@/types/Session';
import { TableCell, TableRow } from '@/components/ui/table';

interface LoginSessionRowProps {
    session: LoginSession;
}

const LoginSessionRow = ({ session }: LoginSessionRowProps) => {
    return (
        <TableRow>
            <TableCell>
                <span className="text-sm font-medium hover:text-primary">{session.ip_address}</span>
            </TableCell>
            <TableCell>
                <span className="text-xs text-secondary-foreground">{session.device}</span>
            </TableCell>
            <TableCell>{getSessionStatus(session)}</TableCell>
        </TableRow>
    );
};

export default LoginSessionRow;
