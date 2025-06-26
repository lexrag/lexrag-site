'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMeClient } from '@/api/auth/getMeClient';
import SigninButton from '@/components/Header/SigninButton';
import ThemeSwitch from '@/components/ThemeSwitch';
import HeaderUserMenu from './HeaderUserMenu';

const HeaderCornerMenu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      const user = await getMeClient();
      setUser(user);
    };

    getMe();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <ThemeSwitch />
      {user ? (
        <div className="flex items-center gap-4">
          <div className="h-[40%] border-r-2 border-gray-200" />
          <Link className="flex justify-center items-center" href="/chat/new">
            <i className="ki-filled ki-message-text-2 text-lg mr-1 text-gray-600 hover:text-primary" />
          </Link>
          <div className="tab">
            <HeaderUserMenu user={user} />
          </div>
        </div>
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
