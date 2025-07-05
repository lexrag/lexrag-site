'use client';

import { useEffect } from 'react';
import { getMeClient } from '@/api/auth/getMeClient';
import { useUser } from '@/providers/user-provider';
import SigninButton from '@/components/Header/SigninButton';
import HeaderUserMenu from './HeaderUserMenu';

const HeaderCornerMenu = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        const getMe = async () => {
            const user = await getMeClient();
            setUser(user);
        };

        getMe();
    }, []);

    return (
        <div className="flex items-center justify-between">
            {user ? (
                <HeaderUserMenu user={user} />
            ) : (
                <div className="flex items-center gap-5">
                    <div className="h-[40%] border-r-2 border-gray-200" />
                    <div className="tab">
                        <SigninButton />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderCornerMenu;
