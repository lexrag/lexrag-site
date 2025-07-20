import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { User } from '@/types/User';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { useLogOut } from '@/hooks/use-log-out';

interface ProfileBarProps {
    user: User | null;
    showSettings: boolean;
    onToggleSettings: () => void;
}

const ProfileBar = ({ user, showSettings, onToggleSettings }: ProfileBarProps) => {
    const logOut = useLogOut();

    return (
        <div
            className="w-full px-4 py-4 flex items-center gap-3 border-t bg-background"
            style={{ height: 80 }}
        >
            <Avatar>
                <AvatarFallback>{user?.first_name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">
                    {user?.first_name} {user?.last_name}
                </div>
                <div className="text-xs truncate">{user?.email}</div>
            </div>
            {!showSettings ? (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2" 
                    onClick={onToggleSettings}
                >
                    <Settings className="h-5 w-5" />
                </Button>
            ) : (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-2" 
                    onClick={logOut}
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
};

export default ProfileBar;
