import { Copy } from 'lucide-react';
import { User } from '@/types/User';
import { Button } from '../ui/button';
import CardWrapper from '../ui/card-wrapper';
import UserProfileRow from './Row';

interface BasicSettingsProps {
    currentUser: User;
}

const BasicSettingsCard = ({ currentUser }: BasicSettingsProps) => {
    const rows = [
        {
            label: 'Email',
            content: <span>{currentUser.email}</span>,
        },
        {
            label: 'Password',
            content: <span>Password last changed 2 months ago</span>,
        },
        {
            label: '2FA',
            content: <span>To be set</span>,
            actionIcon: (
                <Button variant="link" size="sm">
                    Setup
                </Button>
            ),
        },
        {
            label: 'Sign in',
            content: <span />,
        },
        {
            label: 'Team Account',
            content: <span>To be set</span>,
            actionIcon: (
                <Button variant="link" size="sm">
                    Setup
                </Button>
            ),
        },
        {
            label: 'Social Profiles',
            content: <span />,
        },
        {
            label: 'Referral Link',
            content: (
                <div className="flex items-center gap-2 w-[80%]">
                    <span className="truncate">https://lexrag.com/profile</span>{' '}
                    <Copy className="text-muted-foreground hover:text-primary size-4 cursor-pointer" />
                </div>
            ),
            actionIcon: (
                <Button variant="link" size="sm">
                    Re-create
                </Button>
            ),
        },
    ];

    return (
        <CardWrapper title="Basic Settings">
            {rows.map((row) => (
                <UserProfileRow key={row.label} label={row.label} actionIcon={row.actionIcon}>
                    {row.content}
                </UserProfileRow>
            ))}
        </CardWrapper>
    );
};

export default BasicSettingsCard;
