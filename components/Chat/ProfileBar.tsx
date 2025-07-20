import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { User } from '@/types/User';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

interface ProfileBarProps {
    user: User | null;
    mode: 'default' | 'settings';
    onSettings: () => void;
    onLogOut: () => void;
}

const ProfileBar = ({ user, mode, onSettings, onLogOut }: ProfileBarProps) => (
    <div
        className="absolute left-0 bottom-0 w-full px-4 py-4 flex items-center gap-3 border-t bg-background z-50 pointer-events-auto mb-0"
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
        {mode === 'default' ? (
            <Button variant="ghost" size="icon" className="ml-2" onClick={onSettings}>
                <Settings className="h-5 w-5" />
            </Button>
        ) : (
            <Button variant="ghost" size="icon" className="ml-2" onClick={onLogOut}>
                <LogOut className="h-5 w-5" />
            </Button>
        )}
    </div>
);

export default ProfileBar;
