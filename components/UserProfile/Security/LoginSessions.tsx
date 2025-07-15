'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RecursiveDropdown from '@/components/UserProfile/components/RecursiveDropdown';
import { MENU_ITEMS_LOGIN_SESSIONS } from '@/components/UserProfile/constants/MENU_ITEMS';
import LoginSessionRow from './components/LoginSessionRow';
import { useEffect, useState } from 'react';
import { LoginSession } from '@/types/Session';
import { getSessions } from '@/api/user/getSessions';
import { Loader2 } from 'lucide-react';

const LoginSessions = () => {
    const [sessions, setSessions] = useState<LoginSession[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await getSessions(3, 0);
            setSessions(response?.sessions || []);
            setLoading(false);
        })();
    }, []);

    return (
        <CardWrapper title="Login Sessions" headerActions={<RecursiveDropdown items={MENU_ITEMS_LOGIN_SESSIONS} />}>
            {loading ? (
                <div className="flex justify-center items-center h-full py-10">
                    <Loader2 className="w-4 h-4 animate-spin" />
                </div>
            ) : (
                <>
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>IP</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Last seen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sessions.map((session) => (
                        <LoginSessionRow key={session.ip_address} session={session} />
                    ))}
                </TableBody>
            </Table>
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Link href="/profile/security/sessions">
                    <Button variant="link">Show All</Button>
                    </Link>
                </CardFooter>
                </>
            )}
        </CardWrapper>
    );
};

export default LoginSessions;
