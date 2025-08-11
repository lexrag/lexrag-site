'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function MegaMenu() {
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
                        className={cn(linkClass, 'relative')}
                    >
                        Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4">
                        <div className="grid grid-cols-1 gap-2">
                            <Link href="/features" className="text-sm hover:text-primary">Features</Link>
                            <Link href="/services" className="text-sm hover:text-primary">Services</Link>
                            <Link href="/technology/graphrag" className="text-sm hover:text-primary">Technology</Link>
                            <Link href="/company" className="text-sm hover:text-primary">Company</Link>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
