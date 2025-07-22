import React, { useEffect, useState } from 'react';
import { LogOut, Settings } from 'lucide-react';
import { User } from '@/types/User';
import { useLogOut } from '@/hooks/use-log-out';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

interface ProfileBarProps {
    user: User | null;
    showSettings: boolean;
    onToggleSettings: () => void;
}

const ProfileBar = ({ user, showSettings, onToggleSettings }: ProfileBarProps) => {
    const logOut = useLogOut();
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        const savedAvatar = localStorage.getItem('avatarImage');
        if (savedAvatar) {
            setAvatarUrl(savedAvatar);
        } else {
            setAvatarUrl(undefined);
        }
    }, []);

    return (
        <div className="w-full px-4 pt-2 flex items-center gap-3 bg-background border-t" style={{ height: 80 }}>
            <Avatar className="cursor-pointer" onClick={onToggleSettings}>
                <AvatarImage alt={`${user?.first_name} ${user?.last_name}`} src={avatarUrl} />
                <AvatarFallback>{user?.first_name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={onToggleSettings}>
                <div className="font-semibold truncate">
                    {user?.first_name} {user?.last_name}
                </div>
                <div className="text-xs truncate">{user?.email}</div>
            </div>
            {!showSettings ? (
                <Button variant="ghost" size="icon" className="ml-2" onClick={onToggleSettings}>
                    <Settings className="h-5 w-5" />
                </Button>
            ) : (
                <Button variant="ghost" size="icon" className="ml-2" onClick={logOut}>
                    <LogOut className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
};

export default ProfileBar;
