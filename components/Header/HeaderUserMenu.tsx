'use client';

import Link from 'next/link';
import { User } from '@/types/User';
import { useLogOut } from '@/hooks/use-log-out';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderUserMenuProps {
  user: User;
}

const HeaderUserMenu = ({ user }: HeaderUserMenuProps) => {
  const logOut = useLogOut();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="size-[34px] border-[#015A8D] bg-[#EFF6FF] dark:bg-[#172331] rounded-full inline-flex items-center justify-center text-md font-semibold border text-primary cursor-pointer"
          aria-label="User menu"
        >
          {user?.first_name?.slice(0, 1) || '?'}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={6} className="w-[250px] p-0">
        <div className="flex items-center justify-between px-5 py-2 gap-2">
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <Link
              href="#"
              className="text-sm text-gray-800 hover:text-primary font-semibold truncate"
            >
              {user?.first_name} {user?.last_name}
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-600 hover:text-primary truncate"
            >
              {user?.email}
            </Link>
          </div>
          <Badge variant="primary" appearance="outline">
            Pro
          </Badge>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="rounded-none">
          <Link
            href="/profile"
            className="w-full px-4 py-2 flex items-center gap-2"
          >
            <i className="ki-filled ki-profile-circle" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-4 py-2">
          <Button
            onClick={logOut}
            variant="outline"
            className="w-full justify-center"
          >
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderUserMenu;
