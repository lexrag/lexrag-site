'use client';

import React from 'react';
// import { Button } from '@/components/ui/button';
import { LoginSession } from '@/types/Session';
import { TableCell, TableRow } from '@/components/ui/table';
// import RecursiveDropdown from '@/components/UserProfile/components/RecursiveDropdown';
// import { MENU_ITEMS_LOGIN_SESSIONS } from '@/components/UserProfile/constants/MENU_ITEMS';


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
