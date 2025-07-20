import React from 'react';
import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';

const SecurityPage = async () => {
    const currentUser: User = await getMeServer();

    return (
        <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
            <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                <Security currentUser={currentUser} />
                <LoginSessions />
            </div>
        </div>
    );
};

export default SecurityPage;
