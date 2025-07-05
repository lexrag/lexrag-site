import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RecursiveDropdown from '@/components/UserProfile/components/RecursiveDropdown';
import { MENU_ITEMS_LOGIN_SESSIONS } from '@/components/UserProfile/constants/MENU_ITEMS';
import { SESSIONS } from '@/components/UserProfile/constants/SESSIONS';
import LoginSessionRow from './components/LoginSessionRow';

const MAX_SESSIONS_TO_SHOW = 3;

const LoginSessions = () => {
    return (
        <CardWrapper title="Login Sessions" headerActions={<RecursiveDropdown items={MENU_ITEMS_LOGIN_SESSIONS} />}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>IP</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Last seen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {SESSIONS.slice(0, MAX_SESSIONS_TO_SHOW).map((session) => (
                        <LoginSessionRow key={session.ip} session={session} />
                    ))}
                </TableBody>
            </Table>
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Link href="/profile/security/sessions">
                    <Button variant="link">Show All</Button>
                </Link>
            </CardFooter>
        </CardWrapper>
    );
};

export default LoginSessions;
