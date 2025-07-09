import React from 'react';
import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import PageTitle from '@/components/Layout/PageTitle';
import LoginSessions from '@/components/UserProfile/Security/LoginSessions';
import Security from '@/components/UserProfile/Security/Security';

const SecurityPage = async () => {
    const currentUser: User = await getMeServer();

    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                <div className="flex flex-col w-full max-w-2xl gap-8 items-center justify-center px-4">
                    <Security currentUser={currentUser} />
                    <LoginSessions />
                </div>
            </div>
        </section>
    );
};

export default SecurityPage;
