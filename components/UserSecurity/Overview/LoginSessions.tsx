'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RecursiveDropdown from '../components/RecursiveDropdown';
import { MENU_ITEMS_LOGIN_SESSIONS } from '../constants/MENU_ITEMS';
import { SESSIONS } from '../constants/SESSIONS';
import LoginSessionRow from './components/LoginSessionRow';

const MAX_SESSIONS_TO_SHOW = 3;

const LoginSessions = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleSessions = showAll ? SESSIONS : SESSIONS.slice(0, MAX_SESSIONS_TO_SHOW);

    return (
        <CardWrapper title="Login Sessions" headerActions={<RecursiveDropdown items={MENU_ITEMS_LOGIN_SESSIONS} />}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Location</TableHead>
                        <TableHead className="text-right">Recent activity</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {visibleSessions.map((session) => (
                        <LoginSessionRow key={session.name} session={session} />
                    ))}
                </TableBody>
            </Table>
            {SESSIONS.length > MAX_SESSIONS_TO_SHOW && (
                <div className="flex justify-center m-4">
                    <Button variant="link" size="sm" onClick={() => setShowAll((v) => !v)}>
                        {showAll ? 'Show Less' : 'Show All'}
                    </Button>
                </div>
            )}
        </CardWrapper>
    );
};

export default LoginSessions;
