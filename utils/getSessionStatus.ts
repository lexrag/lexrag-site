import { formatDistanceToNow } from 'date-fns';
import { LoginSession } from '@/types/Session';

export const getSessionStatus = (session: LoginSession) => {
    if (session.is_current) return 'Current session';
    return formatDistanceToNow(new Date(session.last_seen), { addSuffix: true });
};
