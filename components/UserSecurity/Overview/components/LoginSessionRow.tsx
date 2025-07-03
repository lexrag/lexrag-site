import { LoginSession } from '@/types/Session';
import { Avatar, AvatarImage } from '../../../ui/avatar';
import { TableCell, TableRow } from '../../../ui/table';
import RecursiveDropdown from '../../components/RecursiveDropdown';
import { MENU_ITEMS_LOGIN_SESSIONS } from '../../constants/MENU_ITEMS';

interface LoginSessionRowProps {
    session: LoginSession;
}

const LoginSessionRow = ({ session }: LoginSessionRowProps) => {
    return (
        <TableRow key={session.name}>
            <TableCell>
                <div className="flex items-center gap-2.5">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={session.avatar} alt={session.name} />
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium hover:text-primary">{session.name}</span>
                        <span className="text-xs text-secondary-foreground">{session.connections} connections</span>
                    </div>
                </div>
            </TableCell>
            <TableCell className="text-right text-secondary-foreground">{session.location}</TableCell>
            <TableCell className="text-right text-secondary-foreground">{session.activity}</TableCell>
            <TableCell className="text-right">
                <RecursiveDropdown items={MENU_ITEMS_LOGIN_SESSIONS} />
            </TableCell>
        </TableRow>
    );
};

export default LoginSessionRow;
