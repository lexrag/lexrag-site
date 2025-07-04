'use client';

import { usePathname } from 'next/navigation';
import { MegaMenuSubAccount } from '@/partials/mega-menu/mega-menu-sub-account';
import { MENU_MEGA } from '@/config/menu.config';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Logo } from './Logo';

interface MegaMenuProps {
    isHomePage: boolean;
}

export function MegaMenu({ isHomePage }: MegaMenuProps) {
    const pathname = usePathname();
    const { hasActiveChild } = useMenu(pathname);
    const myAccountItem = MENU_MEGA[2];

    const linkClass = `
    text-sm text-secondary-foreground font-medium bg-transparent
    hover:text-primary hover:bg-transparent 
    focus:text-primary focus:bg-transparent 
    data-[active=true]:text-primary data-[active=true]:bg-transparent 
    data-[state=open]:text-primary data-[state=open]:bg-transparent
  `;

    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-0">
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={cn(linkClass)}
                        data-active={hasActiveChild(myAccountItem.children) || undefined}
                    >
                        <Logo isHomePage={isHomePage} />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-0">
                        <MegaMenuSubAccount items={MENU_MEGA} />
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
